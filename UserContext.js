import React, { createContext, useState } from 'react';

export const UserContext = createContext({})

export const ContexProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)


    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                error,
                setError
            }}>
            {children}
        </UserContext.Provider>
    )
}