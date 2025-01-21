import { createContext, useReducer } from "react";
import { useContext } from "react";
const AuthContext = createContext({
                                    state: {},
                                    actions : {}
                                    })

const ACTION = {
    LOGIN : "LOGIN",
    LOGOUT : "LOGOUT"
}                    

function reducer(state,action){
    switch(action.type){
        case ACTION.LOGIN:
            return (
                {
                    ...state,
                    id_user : action.payload.id_user,
                    token: action.payload,
                    role : action.payload,
                    isAuthenticated : true
                }
            )
        case ACTION.LOGOUT:
            return({
                isAuthenticated : false
            })
        default:
            return state
    }
}

function AuthProvider({children}){
    const [state,dispatch] =  useReducer(reducer,{
       token : localStorage.getItem("authToken"),
       role : localStorage.getItem("role") ?? "sin definir", 
       isAuthenticated : localStorage.getItem("authToken") ? true : false,
       id_user : localStorage.getItem("id_user") 
    })
    

    const actions = {
        login: (token,role,id_user) =>{
            dispatch({ type: ACTION.LOGIN, payload:{token , role, id_user} })
            localStorage.setItem("authToken",token)
            localStorage.setItem("role",role)
            localStorage.setItem("id_user",id_user)
        } ,
        logout: () =>{
            dispatch({ type: ACTION.LOGOUT })
            localStorage.removeItem("authToken")
            localStorage.removeItem("id_user")
            localStorage.removeItem("role")
        }
    };

    return (
        <AuthContext.Provider value={{state,actions}}>
            {children}
        </AuthContext.Provider>)
}
function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}


export {AuthProvider,AuthContext,useAuth}