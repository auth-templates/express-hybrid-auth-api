interface User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin' | string; // Adjust roles as needed
    created_at: Date;
}