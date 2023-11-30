export interface PinModel {
    pinId: string;
    image: Uint8Array;
    title: string;
    description:string;
    altText:string;
    link:string;
    userId: string;
    imageUrl:string;
    sensitiveContent:boolean;
}