import { SafeUrl } from "@angular/platform-browser";
export interface CommentModel{    
    commentId: string;
    userId: string;
    comment: string;
    pinId: string;
    profilePhoto: Uint8Array;
    username: string;
    profilePhotoURL: SafeUrl;
}