export const BaseURL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.3:4000";

export const Test = new URL("/api/test", BaseURL);

export const AuthUserURL = new URL("/api/login", BaseURL);
export const SignupUserURL = new URL("/api/signup", BaseURL);

export const TopicsURL = new URL("/api/topics", BaseURL);
