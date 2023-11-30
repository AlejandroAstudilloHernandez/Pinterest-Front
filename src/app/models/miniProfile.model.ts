import { SafeUrl } from "@angular/platform-browser";
export interface MiniProfile {
    username: string;
    profilePhoto: Uint8Array;
    email: string;
    imageURL?: SafeUrl;
  }