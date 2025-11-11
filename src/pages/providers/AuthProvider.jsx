/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {app} from "../../firebase/firebase.config"
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../customHooks/useAxiosPublic";




export const AuthContext = createContext(null);
const auth=getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic=useAxiosPublic();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log(currentUser)
        setUser(currentUser);
        if (currentUser) {
            const userInfo = { email: currentUser.email };
            axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        console.log(res.data.token);
                        setLoading(false);
                    }
                })
        }
        else {
            localStorage.removeItem('access-token');
            setLoading(false);
        }
        
    });
    return () => {
        return unsubscribe();
    }
}, [axiosPublic])

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    // console.log("hi");
    return signInWithPopup(auth, provider);
  };
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateProfile = (name, url) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logout,
    updateProfile
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;