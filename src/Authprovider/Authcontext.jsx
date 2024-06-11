import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
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

        fetch(`https://assignment-12-server-site-pi.vercel.app/user`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser2)
        })
            .then(res => res.json())
            .then(data => {

            })
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            setUser(currentUser);

            if (currentUser) {
                saveuser(currentUser);
            }
            setLoading(false);

            if (currentUser) {
                axios.post('http://localhost:5000/jwt',loggedUser, {withCredentials : true})
                
              
            } else {
                axios.post('http://localhost:5000/logout',loggedUser, {withCredentials : true})
                
            }

        });
        return () => {
            unSubscribe();
        }
    }, [])


    const googleLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        loading,
        googleLogin,
        user,
        logOut,
        signIn,
        createUser
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