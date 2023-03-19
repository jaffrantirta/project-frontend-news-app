import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const NewsContext = createContext({});

export const useNews = () => useContext(NewsContext);

export const store = ({ title, content, is_show, image, tags }) => supabase.from('news').insert([{ title: title, content: content, is_show: is_show, image: image, tags: tags }])

export const update = ({ id, title, content, is_show, image, tags }) => supabase.from('news').update([{ title: title, content: content, is_show: is_show, image: image, tags: tags }]).eq('id', id)

export const show = () => supabase.from('news').select('*').order('created_at', { ascending: false })

export const destroy = (id) => supabase.from('news').delete().eq('id', id)

export const selectSingleById = (id) => supabase.from('news').select('*').eq('id', id).single()

const NewsProvider = ({ children }) => {
    return (
        <NewsContext.Provider value={{ store, update, show, destroy, selectSingleById }}>
            {children}
        </NewsContext.Provider>
    );
};

export default NewsProvider;