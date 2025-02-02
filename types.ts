import { DateToString } from "mongoose";

export interface Post {
    title: string;
    content: string;
    tags: string[];
    createdAt: Date;
}

export interface User {
    username: string;
    password: string;
    role: "ADMIN" | "USER";
}