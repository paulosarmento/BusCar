import type { Timestamp } from "firebase/firestore";

export type TabKey = "carros" | "viagens" | "agendamentos";
export type TipoCarro = "van" | "spin" | "doblo" | "carro" | "moto";

export const TIPOS_CARRO: TipoCarro[] = [
  "van",
  "spin",
  "doblo",
  "carro",
  "moto",
];

export const CAPACIDADE_POR_TIPO: Record<TipoCarro, number> = {
  van: 15,
  spin: 7,
  doblo: 7,
  carro: 4,
  moto: 1,
};

export interface Carro {
  id: string;
  modelo: string;
  placa: string;
  ativo: boolean;
  foto: string;
  tipo: TipoCarro;
  capacidade: number;
}

export interface CarroFormData {
  modelo: string;
  placa: string;
  ativo: boolean;
  foto: string;
  tipo: TipoCarro;
  capacidade: number;
}

export interface UseCarrosParams {
  fetchData: () => Promise<void>;
}

export interface FirebaseData {
  carros: any[];
  viagens: any[];
  reservas: any[];
}

export type StatusViagem = "aberta" | "fechada" | "cancelada";

export interface Viagem {
  id: string;
  carroId: string;
  destino: string;
  isTour: boolean;
  dataHora: Date | Timestamp | string;
  capacidadeMax: number;
  vagasReservadas: number;
  status: StatusViagem;
  createdAt: Date | Timestamp | string;
}

export interface ViagemFormData {
  carroId: string;
  destino: string;
  isTour: boolean;
  dataHora: string;
  capacidadeMax: number;
  vagasReservadas: number;
  status: StatusViagem;
}

export interface UseViagensProps {
  fetchData: () => Promise<void>;
}

export type StatusReserva = "pendente_pagamento" | "confirmada" | "cancelada";

export interface Reserva {
  id: string;
  viagemId: string;
  usuarioId: string;
  quantidadeVagas: number;
  status: StatusReserva;
  valorTotal: number;
  mercadoPagoOrderId?: string;
  createdAt: Date | Timestamp | string;
  codigoDaReserva: number;
}

export interface ReservaFormData {
  quantidadeVagas: number;
  reservarCarro: boolean;
  valorTotal: number;
}

export interface UseReservasProps {
  userId: string | undefined;
}

export interface PixPaymentData {
  qrCode: string;
  qrCodeBase64: string;
  orderId: string;
  amount: number;
}

export interface PixPaymentStatus {
  status: "pending" | "approved" | "rejected" | "cancelled";
  orderId: string;
}

// --- ReservaDialog ---
export interface ReservaDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;
  viagem: Viagem | null;
  getCarroById(id: string): Carro;
  formData: ReservaFormData;
  setFormData: React.Dispatch<React.SetStateAction<ReservaFormData>>;
  isSubmitting: boolean;
  onSubmit(e: React.FormEvent): void;
  onClose(): void;
  showPayment?: boolean;
  reservaAtual?: any;
  onPaymentSuccess?: () => void;
}

export interface PixPaymentProps {
  reservaId: string;
  quantidadeVagas: number;
  valorPorVaga: number;
  onPaymentSuccess?: () => void;
  onClose?: () => void;
}

export interface PaymentStatus {
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
