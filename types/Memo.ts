import { Timestamp } from "firebase/firestore";

export interface Memo {
    id: string;
    bodyText: string;
    updatedAt: Timestamp;
    createdAt: Timestamp
}