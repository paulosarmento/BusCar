"use client";

import React from "react";
import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Ui/dialog";
import { Button } from "./Ui/button";
import { Input } from "./Ui/input";
import { Label } from "./Ui/label";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { Alert, AlertDescription } from "./Ui/alert";
import { Separator } from "./Ui/separator";
import { motion, AnimatePresence } from "framer-motion";

import type { Carro, ReservaFormData, Viagem } from "@/types/types";

interface PixPaymentProps {
  reservaId: string;
  quantidadeVagas: number;
  valorPorVaga?: number;
  onPaymentSuccess?: () => void;
  onClose?: () => void;
}

interface PaymentStatus {
  mercadoPagoOrderId: string;
  paymentId: string;
  orderStatus: string;
  paymentStatus: string;
  statusDetail: string;
  isPaid: boolean;
  isPending: boolean;
  isProcessing: boolean;
  isExpired: boolean;
  isRejected: boolean;
  totalAmount: string;
  paidAmount: string;
  lastUpdated: string;
  expirationDate: string;
  paymentMethod: string;
  qrCode: string;
  ticketUrl: string;
}

// --- PixPayment ajustado para modal pai  ---
function PixPayment({
  reservaId,
  quantidadeVagas,
  valorPorVaga = 10,
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

  // --- Funções de backend (fetchQRCode, checkPaymentStatus, confirmPaymentInBackend) ---
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

  React.useEffect(() => {
    isMountedRef.current = true;
    fetchQRCode();
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reservaId, valorTotal]);

  return (
    <div className="w-full max-w-md">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
          <p className="text-muted-foreground text-center font-medium">
            Gerando código PIX...
          </p>
        </div>
      ) : error ? (
        <div className="space-y-3 py-4">
          <Alert variant="destructive" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={fetchQRCode} className="flex-1 text-sm">
              <RefreshCw className="mr-1 h-4 w-4" />
              Tentar novamente
            </Button>
            {onClose && (
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 text-sm"
              >
                Fechar
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Status */}
          <AnimatePresence mode="wait">
            {paymentApproved || paymentStatus?.isPaid ? (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md text-sm">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900 text-sm">
                      Pagamento confirmado!
                    </p>
                    <p className="text-green-700 text-xs">
                      Sua reserva foi confirmada
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : paymentStatus?.isExpired || paymentStatus?.isRejected ? (
              <Alert variant="destructive" className="text-xs">
                <XCircle className="h-4 w-4" />
                <AlertDescription className="ml-1">
                  {paymentStatus.isExpired
                    ? "Pagamento expirou. Gere novo código."
                    : "Pagamento rejeitado."}
                </AlertDescription>
              </Alert>
            ) : paymentStatus?.isProcessing ? (
              <Alert className="text-xs">
                <Clock className="h-4 w-4" />
                <AlertDescription className="ml-1">
                  Pagamento em processamento...
                </AlertDescription>
              </Alert>
            ) : null}
          </AnimatePresence>

          {/* Detalhes */}
          <div className="bg-muted rounded-lg p-2 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reserva ID:</span>
              <span className="font-mono">#{reservaId.slice(0, 8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vagas:</span>
              <span className="font-semibold">{quantidadeVagas}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valor/vaga:</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorPorVaga)}
              </span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-primary">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(valorTotal)}
              </span>
            </div>
          </div>

          {/* QR Code */}
          {qrCodeData?.qr_code_base64 && !paymentApproved && (
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-white p-2 rounded-lg border border-border shadow-sm">
                <img
                  src={`data:image/png;base64,${qrCodeData.qr_code_base64}`}
                  alt="QR Code PIX"
                  className="w-48 h-48 object-contain"
                />
              </div>
              {qrCodeData.qr_code && (
                <div className="w-full space-y-1 text-xs">
                  <p className="text-center text-muted-foreground">
                    Ou copie o código:
                  </p>
                  <div className="flex gap-1">
                    <div className="flex-1 bg-muted rounded-md px-2 py-1 font-mono break-all">
                      {qrCodeData.qr_code.substring(0, 30)}...
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Verificação */}
          {!paymentApproved && !paymentStatus?.isPaid && (
            <div className="space-y-2">
              {autoCheckEnabled && (
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>
                    Verificando automaticamente...
                    {checkCount > 0 && ` (${checkCount}/${maxAutoChecks})`}
                  </span>
                </div>
              )}

              <Button
                onClick={manualCheck}
                disabled={isCheckingPayment}
                variant="outline"
                className="w-full text-sm bg-transparent"
              >
                {isCheckingPayment ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Verificar pagamento
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-2">
            {paymentApproved || paymentStatus?.isPaid ? (
              <Button onClick={onClose} className="flex-1 text-sm">
                Concluir
              </Button>
            ) : (
              <>
                {onClose && (
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 text-sm"
                  >
                    Cancelar
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- ReservaDialog ---
interface ReservaDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  viagem: Viagem | null;
  getCarroById(id: string): Carro | undefined;
  formData: ReservaFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReservaFormData>>;
  isSubmitting: boolean;
  onSubmit(e: React.FormEvent): void;
  onClose(): void;
  showPayment?: boolean;
  reservaAtual?: any;
  onPaymentSuccess?: () => void;
}

export function ReservaDialog({
  open,
  onOpenChange,
  viagem,
  getCarroById,
  formData,
  setFormData,
  isSubmitting,
  onSubmit,
  onClose,
  showPayment = false,
  reservaAtual = null,
  onPaymentSuccess,
}: ReservaDialogProps) {
  const carro = getCarroById(viagem?.carroId || "");

  const vagasDisponiveis = useMemo(() => {
    if (!viagem) return 0;
    return viagem.capacidadeMax - viagem.vagasReservadas;
  }, [viagem]);

  const valorTotal = formData.quantidadeVagas * 5;

  if (!viagem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
        {showPayment && reservaAtual ? (
          <div className="py-2">
            <PixPayment
              reservaId={reservaAtual.id}
              quantidadeVagas={reservaAtual.quantidadeVagas}
              valorPorVaga={5}
              onPaymentSuccess={onPaymentSuccess}
              onClose={onClose}
            />
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Reservar Vagas</DialogTitle>
              <DialogDescription>
                Escolha quantas vagas deseja reservar nesta viagem
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              {/* Resumo da Viagem */}
              <div className="rounded-lg bg-muted p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destino:</span>
                  <span className="font-medium">{viagem.destino}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carro:</span>
                  <span className="font-medium">{carro?.modelo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="font-medium">
                    {new Date(viagem.dataHora as string).toLocaleString(
                      "pt-BR",
                      {
                        dateStyle: "short",
                        timeStyle: "short",
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Vagas disponíveis:
                  </span>
                  <span className="font-semibold text-primary">
                    {vagasDisponiveis}
                  </span>
                </div>
              </div>

              {/* Alerta de vagas esgotadas */}
              {vagasDisponiveis === 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Não há vagas disponíveis para esta viagem
                  </AlertDescription>
                </Alert>
              )}

              {/* Campo de quantidade */}
              <div className="grid gap-2">
                <Label htmlFor="quantidade">Quantidade de vagas</Label>
                <Input
                  id="quantidade"
                  type="number"
                  min={1}
                  max={vagasDisponiveis}
                  value={formData.quantidadeVagas}
                  onChange={(e) =>
                    setFormData({
                      quantidadeVagas: Math.min(
                        Math.max(1, Number(e.target.value)),
                        vagasDisponiveis
                      ),
                    })
                  }
                  disabled={vagasDisponiveis === 0}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Máximo permitido: {vagasDisponiveis}{" "}
                  {vagasDisponiveis === 1 ? "vaga" : "vagas"}
                </p>
              </div>

              {/* Cálculo do valor total */}
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor total</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.quantidadeVagas}{" "}
                      {formData.quantidadeVagas === 1 ? "vaga" : "vagas"} × R$
                      10,00
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(valorTotal)}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || vagasDisponiveis === 0}
              >
                {isSubmitting ? "Processando..." : "Prosseguir para Pagamento"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
