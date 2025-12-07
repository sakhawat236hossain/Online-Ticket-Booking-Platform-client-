import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(user);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }

const updateUserProfile = (profile)=>{
    return updateProfile (auth.currentUser, profile);
}


// observe auth state change

  useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
   
      setLoading(false);
    });
    return () => unsubscribe();
  },[])

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    googleLogin,
    logOutUser,
    setUser,
    updateUserProfile,
  };
return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;