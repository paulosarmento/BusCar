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
}

export interface Reserva {
  id: string;
  viagemId: string;
  usuarioId: string;
  aceitaLotacao4: boolean;
  status: "confirmada" | "cancelada" | string;
  createdAt?: string;
}

export interface ReservaFormData {
  aceitaLotacao4: boolean;
}

export interface UseReservasProps {
  userId: string | undefined;
  fetchData: () => Promise<void>;
}

export interface Viagem {
  id: string;
  dataHora: Date | Timestamp | string;
  carroId: string;
  capacidadeMax: number;
  status: "aberta" | "fechada" | "cancelada";
  createdAt?: Date | Timestamp | string;
}

export interface ViagemFormData {
  carroId: string;
  dataHora: string;
  capacidadeMax: number;
  status: string;
}

export interface UseViagensProps {
  fetchData: () => Promise<void>;
}
