export interface CreatePinModel {
    image: Uint8Array;
    title: string;
    description: string;
    altText: string;
    link: string;
    userId: number;
    url: string;
    sensitiveContent: boolean;
  }