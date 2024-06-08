import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from './../Firebase/Firebase.config';

export const AuthProvider = createContext();
const Authcontext = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    
    const saveuser = user => {
        const currentUser2 = {
            email: user?.email,
            role: 'guest',
            status: 'Verified'
        }
        console.log(currentUser2)

        fetch(`http://localhost:5000/user`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser2)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            // const userEmail = currentUser?.email || user?.email;
            // const loggedUser = {email : userEmail}
            console.log(currentUser)
            setUser(currentUser);

            if(currentUser){
                saveuser(currentUser);
            }
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
        return () => {
            unSubscribe();
        }
    }, [])


    const googleLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        loading,
        googleLogin,
        user,
        logOut,
    }
    return (
        <AuthProvider.Provider value={authInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

Authcontext.propTypes = {
    children: PropTypes.object
}

export default Authcontext;