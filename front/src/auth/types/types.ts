export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  userInfo: {
    id: number;
    name: string;
    email: string;
  };
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Topic {
  title: string;
  description?: string | null;
}

export interface IResponseTopic {
  id: number;
  title: string;
  description?: string | null;
}
