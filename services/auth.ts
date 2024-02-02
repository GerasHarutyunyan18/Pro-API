import { axiosInstance } from "./axiosInstance"

type SignupData = {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
}

export const AuthService = {
    signup: async (data: SignupData) => {
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            return res.data
        } catch {
            return "Network error."
        }
    }
}