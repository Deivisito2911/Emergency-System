import { MarkerIconEnum, MarkerIconKeys } from "../components/markerIcons";

export interface Markers {
  id: string;
  tipoEmergencia: MarkerIconEnum;
  latitud: number;
  longitud: number;
  icon?: string;
}