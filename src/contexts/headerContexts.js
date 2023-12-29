import { createContext, useContext, useMemo } from "react";
import useSessionStorage from "../Hooks/useSessionStorage";
import { GetBlogs } from "../api/serverApi";
import { useQuery } from '@tanstack/react-query';

const HeaderContexts = createContext(null)

const HeaderContextProvider = ({children}) => {
    const [isUser = true, setUser] = useSessionStorage("user", false);
    const { isLoading, error, data , refetch} = useQuery({
        queryKey: ['Blogs'],
        queryFn: GetBlogs,
      });
    
    const contextValue = useMemo(()=> ({
        isUser,
        setUser,
        isLoading,
        error,
        data,
        refetch
    }), [isUser,setUser, isLoading, error, data, refetch]);
    
    return(
        <HeaderContexts.Provider value={contextValue}>
            {children}
        </HeaderContexts.Provider>
    )
}

export const useHeaderContext = () => {
    const contextValue = useContext(HeaderContexts)
    if(contextValue === null){
        throw new Error("useHeaderContext must be used within a HeaderContextProvider")
    }
    return contextValue
}

export default HeaderContextProvider