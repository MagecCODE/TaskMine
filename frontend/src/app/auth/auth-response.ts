export interface AuthResponse {
    user: {
        id: number;        
        name: string;
        username: string;
        password: string;
        email : string;
    },
    access_token: string
}