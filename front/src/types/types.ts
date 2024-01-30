export interface AuthResponse{
    body: {
        user: User;
        parqueadero: parqueadero;
        accessToken: string;
        refreshToken: string;
    };

}

export interface AuthResponseError{
    body:{
        error: string;
    }
}
interface ExtendedAuthContext {
    esAutentico: boolean;
    getAccessToken: () => string;
    saveUser: (userData: AuthResponse) => void;
    getRefreshToken: () => string | null;
    getUser: () => User | undefined;
    signOut: () => void;
    getParqueadero: () => parqueadero | undefined;
    createParqueadero: (newParqueadero: parqueadero) => void;
    roles: string[]; // Add this line
  }

export interface User{
    _id: string;
    name: string;
    username: string;
    roles: string[];
}
export interface parqueadero{
    _id: string;
    nombre: string;
    content: string
    longitud: number;
    altura: number ;
}

export interface AccessTokenResponse {
    statusCode: number;
    body: {
      accessToken: string; // Corrected typo here
    };
    error?: string;
  }
  