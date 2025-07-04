import axios from "axios";
import { create } from "zustand";

export const useNoteStore=create((set)=>({

    notes:[],

    fetchNote:async (monthObj)=>{
        
        const sessionInfo=JSON.parse(localStorage.getItem('auth-storage'))
        // console.log(sessionInfo.state.token);
        const formatted=monthObj.format('YYYY-MM')
        // console.log(formatted);
        
        const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getNotesByMonth?month=${formatted}`,
            {
                headers:{
                    "authorization":"<Bearer> "+sessionInfo.state.token
                }
            }
        )

        // console.log(res.data.notes);
        
        set({notes:res.data.notes})
    },

    addNote:(newNote)=>{
        set((state)=>({notes:[newNote,...state.notes]}))
    },

    deleteNote:(noteID)=>{
        set((state)=>({notes:state.notes.filter((note)=>note._id!==noteID)}))
    },

    editNote:(newNote)=>{
        set((state)=>({
            notes:state.notes.map((note)=>{
                if(note._id===newNote._id){
                    return newNote
                }
                return note
            })
        }))
        
        
    }
    
}))
