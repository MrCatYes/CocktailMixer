import React, { createContext, useContext, useDebugValue, useState } from "react";
import { useNavigate } from "react-router-dom";


type LoginType = {
    token: string;
   remember_me?: boolean | undefined; //TODO case a cocher et retour login
}

interface ProviderProps {
    token:  string,
    login (data: LoginType ): void,
    logout() :void,
}

const AuthContext = createContext<ProviderProps>({
    token: "",
    login: () => {},
    logout: () => {}
})


const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const storedInfo =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const [ token, setToken ] = useState( storedInfo?.token || '')
    const navigate = useNavigate()

    const login = (data:LoginType ) => {
        
        setTimeout(() => {
            const obj = { ...data }
            setToken(data.token)
            localStorage.setItem('user',JSON.stringify(obj))
            navigate('/')
        }, 1000);
        console.log( localStorage)

    }

    const logout = () => {
        setToken("")
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ token, login, logout}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}
