import { SafeUrl } from "@angular/platform-browser";
export interface HomePin {
    pinId: string;
    image: Uint8Array;
    imagenURL?: SafeUrl; // Nueva propiedad para almacenar la URL segura de la imagen
  }