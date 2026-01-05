import React, { useState } from "react";
import { useFirebaseData } from "./useFirebaseData";
import { PaymentStatus, PixPaymentProps } from "@/types/types";

export function usePixPayment({
  reservaId,
  quantidadeVagas,
  valorPorVaga,
  onPaymentSuccess,
  onClose,
}: PixPaymentProps) {
  const [qrCodeData, setQrCodeData] = React.useState<any>(null);
  const [paymentStatus, setPaymentStatus] =
    React.useState<PaymentStatus | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = React.useState(false);
  const [autoCheckEnabled, setAutoCheckEnabled] = React.useState(false);
  const [checkCount, setCheckCount] = React.useState(0);
  const [paymentApproved, setPaymentApproved] = React.useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = React.useState(false);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = React.useRef(true);
  const maxAutoChecks = 24;

  const valorTotal = quantidadeVagas * valorPorVaga;

  const fetchQRCode = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/pix/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: reservaId,
          value: valorTotal,
          expirationDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ).toISOString(),
          description: `Reserva #${reservaId} - ${quantidadeVagas} vaga(s)`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Erro ao gerar QR code: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.qr_code && !data.qr_code_base64) {
        throw new Error("QR Code não foi gerado. Verifique as configurações.");
      }

      setQrCodeData(data);
      setLoading(false);

      if (data.orderId) {
        setTimeout(() => startAutoCheck(data.orderId), 2000);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao gerar QR code");
      setLoading(false);
    }
  };

  const confirmPaymentInBackend = React.useCallback(
    async (mercadoPagoOrderId: string) => {
      if (isConfirmingPayment || paymentApproved) return true;
      setIsConfirmingPayment(true);
      try {
        const response = await fetch(`/api/reservas/${reservaId}/confirmar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mercadoPagoOrderId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.alreadyConfirmed) return true;
          console.error("Erro ao confirmar pagamento no backend:", errorData);
          return false;
        }

        return true;
      } catch (err) {
        console.error("Erro ao confirmar reserva:", err);
        return false;
      } finally {
        setIsConfirmingPayment(false);
      }
    },
    [reservaId, isConfirmingPayment, paymentApproved]
  );

  const checkPaymentStatus = React.useCallback(
    async (mercadoPagoOrderId: string) => {
      if (!isMountedRef.current || paymentApproved) return true;

      if (paymentStatus?.isPaid) {
        stopAutoCheck();
        return true;
      }

      try {
        setIsCheckingPayment(true);
        const response = await fetch("/api/pix/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: mercadoPagoOrderId }),
        });

        if (response.ok && isMountedRef.current) {
          const status = await response.json();
          setPaymentStatus(status);

          if (status.isPaid) {
            setPaymentApproved(true);
            stopAutoCheck();
            await confirmPaymentInBackend(mercadoPagoOrderId);
            onPaymentSuccess?.();
            return true;
          } else if (status.isExpired || status.isRejected) {
            stopAutoCheck();
            return true;
          }
        }
        return false;
      } catch (err) {
        console.error("Erro ao verificar status:", err);
        return false;
      } finally {
        if (isMountedRef.current) setIsCheckingPayment(false);
      }
    },
    [paymentStatus, paymentApproved, confirmPaymentInBackend, onPaymentSuccess]
  );

  const stopAutoCheck = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    if (isMountedRef.current) {
      setAutoCheckEnabled(false);
      setIsCheckingPayment(false);
    }
  }, []);

  const startAutoCheck = React.useCallback(
    (orderId: string) => {
      if (intervalRef.current || paymentStatus?.isPaid) return;

      setAutoCheckEnabled(true);
      setCheckCount(0);
      checkPaymentStatus(orderId);

      let currentCount = 0;

      intervalRef.current = setInterval(async () => {
        if (!isMountedRef.current) {
          stopAutoCheck();
          return;
        }

        currentCount += 1;
        setCheckCount(currentCount);

        if (currentCount >= maxAutoChecks) {
          stopAutoCheck();
          return;
        }

        const shouldStop = await checkPaymentStatus(orderId);
        if (shouldStop) stopAutoCheck();
      }, 5000);
    },
    [paymentStatus, checkPaymentStatus, stopAutoCheck]
  );

  const copyToClipboard = async () => {
    if (qrCodeData?.qr_code) {
      await navigator.clipboard.writeText(qrCodeData.qr_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const manualCheck = async () => {
    if (qrCodeData?.orderId) await checkPaymentStatus(qrCodeData.orderId);
  };

  return {
    qrCodeData,
    loading,
    error,
    copied,
    isCheckingPayment,
    autoCheckEnabled,
    checkCount,
    paymentApproved,
    isConfirmingPayment,
    valorTotal,
    fetchQRCode,
    copyToClipboard,
    manualCheck,
    isMountedRef,
    intervalRef,
    paymentStatus,
    maxAutoChecks,
  };
}
