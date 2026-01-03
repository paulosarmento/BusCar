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
}

export interface ReservaFormData {
  quantidadeVagas: number;
}

export interface UseReservasProps {
  userId: string | undefined;
  fetchData: () => Promise<void>;
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
