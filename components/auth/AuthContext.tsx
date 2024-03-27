import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type AuthContextProps = {
    currentUser: User | null | undefined;
    signInCheck: boolean;
};
  
const AuthContext = createContext<AuthContextProps>({
    currentUser: undefined,
    signInCheck: false,
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [signInCheck, setSignInCheck] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setSignInCheck(true);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return <div>Loading...</div>; // ローディング中はローディング画面を表示
    }

    
    return (
        <AuthContext.Provider value={{ currentUser, signInCheck }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
