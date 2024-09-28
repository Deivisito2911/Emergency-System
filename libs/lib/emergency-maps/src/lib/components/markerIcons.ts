import urbanoIcon from '../../assets/icons/Urbano.svg';
import forestalIcon from '../../assets/icons/Forestal.svg';
import transportacionIcon from '../../assets/icons/Transportacion.svg';
import industrialIcon from '../../assets/icons/Industrial.svg';
import superficieIcon from '../../assets/icons/Superficie.svg';
import subsueloIcon from '../../assets/icons/Subsuelo.svg';
import defaultIcon from '../../assets/icons/Default.svg';

export const DEFAULT_ICON= defaultIcon;
export enum MarkerIconEnum {
  Urbano = "Urbano",
  Forestal = "Forestal",
  Industrial = "Industrial",
  Superficie = "Superficie",
  Subsuelo = "Subsuelo",
  Transportacion = "Transportacion",
}

export type MarkerIconMap = {
  [key in MarkerIconEnum]: string;
};
const markerIcons: MarkerIconMap = {
  Urbano: urbanoIcon,
  Forestal: forestalIcon,
  Industrial: industrialIcon,
  Superficie: superficieIcon,
  Subsuelo: subsueloIcon,
  Transportacion: transportacionIcon,
};

export type MarkerIconKeys = keyof typeof markerIcons;

export default markerIcons;
