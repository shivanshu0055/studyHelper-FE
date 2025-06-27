import { create } from "zustand";

export const useEditorStore=create((set)=>({

    editorText:"",
    editorJSON:{
        type: 'doc',
        content: [{ type: 'paragraph' }]
    },
    title:"",
    subject:"",
    
    setEditorText:(editorText)=>{
        set({editorText:editorText})
    },

    setEditorJSON:(editorJSON)=>{
        set({editorJSON:editorJSON})
    },

    setTitle:(title)=>{
        set({title:title})
    },

    setSubject:(subject)=>{
        set({subject:subject})
    }

}))
