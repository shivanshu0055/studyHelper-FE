import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const useAuthStore=create(
    persist(
        (set)=>({
            token:null,
            userID:null,
            isAuthenticated:false,

            login:(token,userID)=>{
                
                set({
                    token:token,
                    userID:userID,
                    isAuthenticated:true
                })
            },

            logout:()=>{
                set({
                    token:null,
                    userID:null,
                    isAuthenticated:false
                })
            }
        }),
        {
            name:"auth-storage"
        }
    )
)