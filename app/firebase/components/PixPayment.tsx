import { PixPaymentProps } from "@/types/types";
import {
  AlertCircle,
  Check,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "../../components/Ui/alert";
import { Button } from "../../components/Ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@radix-ui/react-select";
import { usePixPayment } from "@/hooks/usePixPayment";

export function PixPayment({
  reservaId,
  quantidadeVagas,
  valorPorVaga,
  onPaymentSuccess,
  onClose,
}: PixPaymentProps) {
  const {
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
  } = usePixPayment({
    reservaId,
    quantidadeVagas,
    valorPorVaga,
    onPaymentSuccess,
    onClose,
  });

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
