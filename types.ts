export interface Post {
    title: string;
    content: string;
    tags: string[];
}

export interface User {
    username: string;
    password: string;
    role: "ADMIN" | "USER";
}