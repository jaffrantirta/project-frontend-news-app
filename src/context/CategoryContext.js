import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const CategoryContext = createContext({});

export const useCategory = () => useContext(CategoryContext);

export const store = (name) => supabase.from('categories').insert([{ name: name }])

export const update = (id, name) => supabase.from('categories').update([{ name: name }]).eq('id', id)

export const show = () => supabase.from('categories').select('*').order('created_at', { ascending: false })

export const supa = () => supabase

export const destroy = (id) => supabase.from('categories').delete().eq('id', id)

const CategoryProvider = ({ children }) => {
    return (
        <CategoryContext.Provider value={{ store, update, show, destroy, supa }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;