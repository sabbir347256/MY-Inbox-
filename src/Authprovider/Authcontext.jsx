import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from './../Firebase/Firebase.config';

export const AuthProvider = createContext();
const Authcontext = ({children}) => {
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);

    

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,currentUser =>{
            // const userEmail = currentUser?.email || user?.email;
            // const loggedUser = {email : userEmail}
            console.log(currentUser)
            setUser(currentUser);   
            setLoading(false);

            // if(currentUser){
            //     axios.post('https://online-group-study-server-site.vercel.app/jwt',loggedUser, {withCredentials : true})
            //     .then(res => {
            //     })
            // }else{
            //     axios.post('https://online-group-study-server-site.vercel.app/logout',loggedUser,{
            //         withCredentials : true
            //     })
            //     .then(res => {
            //     })
            // }

        });
        return () =>{
            unSubscribe();
        }
    },[])


    const googleLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut =() =>{
        return signOut(auth);
    }

    const authInfo = {
        loading,
        googleLogin,
        user,
        logOut
    }
    return (
        <AuthProvider.Provider value={authInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

Authcontext.propTypes ={
    children : PropTypes.object
}

export default Authcontext;