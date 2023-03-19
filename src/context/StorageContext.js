import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const StorageContext = createContext({});

export const useStorage = () => useContext(StorageContext);

export const upload = ({ bucket_name, file, path }) => supabase.storage.from(bucket_name).upload(path, file, {
    cacheControl: '3600',
    upsert: false
})

const StorageProvider = ({ children }) => {
    return (
        <StorageContext.Provider value={{ upload }}>
            {children}
        </StorageContext.Provider>
    );
};

export default StorageProvider;