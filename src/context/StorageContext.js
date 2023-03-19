import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const StorageContext = createContext({});

export const useStorage = () => useContext(StorageContext);

export const upload = ({ bucket_name, file, path }) => supabase.storage.from(bucket_name).upload(path, file, {
    cacheControl: '3600',
    upsert: false
})

export const remove = ({ bucket_name, path }) => supabase.storage.from(bucket_name).upload(['news/d56aa2d3-3748-40d4-b43e-2ec1b902c24a'])

const StorageProvider = ({ children }) => {
    return (
        <StorageContext.Provider value={{ upload, remove }}>
            {children}
        </StorageContext.Provider>
    );
};

export default StorageProvider;