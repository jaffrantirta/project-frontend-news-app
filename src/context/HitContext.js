import { createContext, useContext } from "react";
import { supabase } from "../auth/Client";

const HitContext = createContext({});

export const useCategory = () => useContext(HitContext);

export const store = (name) => supabase.from('hits').insert([{ name: name }])

export const update = (id, name) => supabase.from('hits').update([{ name: name }]).eq('id', id)

export const show = () => supabase.from('hits').select('*').order('created_at', { ascending: false })

export const destroy = (id) => supabase.from('hits').delete().eq('id', id)

export const updateOrCreate = async (newsId) => await supabase
    .from('hits')
    .select('*')
    .eq('news_id', newsId)
    .then(({ data: hits }) => {
        if (hits.length > 0) {
            const hitId = hits[0].id
            const hitCount = hits[0].hit + 1
            supabase
                .from('hits')
                .update({ hit: hitCount })
                .eq('id', hitId)
                .then(() => console.info('hit updated'))
                .catch(error => console.error(error))
        } else {
            supabase
                .from('hits')
                .insert({ news_id: newsId, hit: 1 })
                .then(() => console.info('hit created'))
                .catch(error => console.error(error))
        }
    })
    .catch(error => {
        console.error(error)
    })

const HitProvider = ({ children }) => {
    return (
        <HitContext.Provider value={{ store, update, show, destroy, updateOrCreate }}>
            {children}
        </HitContext.Provider>
    );
};

export default HitProvider;