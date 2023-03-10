import React,{useState} from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn : false,
    login: (token)=>{},
    logout: ()=>{}
});
export const  AuthContextProvider =(props)=>{
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const userISLoggedIn = !!token; 

    const logInHandler =(token)=>{
        setToken(token);
        localStorage.setItem('token', token);
        
        setTimeout(()=>{
            localStorage.clear();
            logOutHandler();
        },300000

        )
        
    }
    
    const logOutHandler =()=>{
        setToken(null);
        localStorage.removeItem('token');
        
    }
    
    const contextValue = {
        token: token,
        isLoggedIn: userISLoggedIn,
        login: logInHandler,
        logout: logOutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>)
 }
export default AuthContext;