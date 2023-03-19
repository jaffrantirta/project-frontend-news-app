import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const StorageContext = createContext({});

export const useNews = () => useContext(StorageContext);

export const store = ({ title, content, is_show, image, tags }) => supabase.from('news').insert([{ title: title, content: content, is_show: is_show, image: image, tags: tags }])

export const update = ({ id, title, content, is_show, image, tags }) => supabase.from('news').update([{ title: title, content: content, is_show: is_show, image: image, tags: tags }]).eq('id', id)

export const show = () => supabase.from('news').select('*').order('created_at', { ascending: false })

export const destroy = (id) => supabase.from('news').delete().eq('id', id)

const StorageProvider = ({ children }) => {
    return (
        <StorageContext.Provider value={{ store, update, show, destroy }}>
            {children}
        </StorageContext.Provider>
    );
};

export default StorageProvider;