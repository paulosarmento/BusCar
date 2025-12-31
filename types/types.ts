import { Timestamp } from "firebase/firestore";

export type TabKey = "carros" | "viagens" | "agendamentos";
export type TipoCarro = "van" | "spin" | "doblo" | "carro";

export const CAPACIDADE_POR_TIPO: Record<TipoCarro, number> = {
  van: 15,
  spin: 7,
  doblo: 7,
  carro: 4,
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
  tipo: "van" | "spin" | "doblo" | "carro";
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

export interface Reserva {
  id: string;
  viagemId: string;
  usuarioId: string;
  quantidadeVagas: number;
  status: "confirmada" | "cancelada" | string;
  createdAt?: string;
}

export interface ReservaFormData {
  quantidadeVagas: number;
}

export interface UseReservasProps {
  userId: string | undefined;
  fetchData: () => Promise<void>;
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
