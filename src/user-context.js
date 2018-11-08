import { createContext } from 'react'

export default createContext({
    credentials: {},
    signIn: () => {},
    signOut: () => {},
});