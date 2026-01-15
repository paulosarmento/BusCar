import type { Timestamp } from "firebase/firestore";

// Atualizado para incluir a nova aba se desejar gerenciar paradas globais futuramente
export type TabKey = "carros" | "viagens" | "agendamentos" | "destinos";

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

export type StatusViagem = "aberta" | "fechada" | "cancelada";

export interface Viagem {
  id: string;
  carroId: string;
  origem: string;
  destino: string;
  isTour: boolean;
  dataHora: Date | Timestamp | string;
  capacidadeMax: number;
  vagasReservadas: number;
  status: StatusViagem;
  createdAt: Date | Timestamp | string;
  // Lista de paradas disponíveis nesta viagem
  paradas: Parada[];
}

export interface ViagemFormData {
  carroId: string;
  destino: string;
  origem: string;
  isTour: boolean;
  dataHora: string;
  capacidadeMax: number;
  vagasReservadas: number;
  status: StatusViagem;
  //Paradas no formulário
  paradas: Parada[];
}

// --- Reservas ---
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
  //A escolha específica do passageiro
  paradaEmbarqueId: string;
  paradaDesembarqueId: string;
}

export interface ReservaFormData {
  quantidadeVagas: number;
  reservarCarro: boolean;
  valorTotal: number;
  // IDs selecionados no modal de reserva
  paradaEmbarqueId: string;
  paradaDesembarqueId: string;
}

export interface UseCarrosParams {
  fetchData: () => Promise<void>;
}
interface Destino {
  id: string;
  origem: string;
  destino: string;
  foto: string;
  ativo: boolean;
}
export interface FirebaseData {
  carros: Carro[];
  viagens: Viagem[];
  reservas: Reserva[];
  destinos: Destino[];
}

export interface UseViagensProps {
  fetchData: () => Promise<void>;
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

export interface ReservaDialogProps {
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

export type TipoParada = "embarque" | "desembarque" | "ambos";

export interface Parada {
  id: string;
  nome: string;
  tipo: TipoParada;
  // ordem?: number; // Útil para ordenar o trajeto (ex: Rio -> Saquarema -> Araruama)
}
