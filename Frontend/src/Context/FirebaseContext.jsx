import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           if (user) {
             setUser(user);
           } else {
             setUser(null);
           }
           setLoading(false);
         });
         return () => unsubscribe();
    } else {
        setLoading(false);
    }
  }, []);

  const signupUserwithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInUserWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInUserWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider value={{ 
      user,
      loading,
      signupUserwithEmailAndPassword,
      signInUserWithEmailAndPassword,
      signInUserWithGoogle,
      signoutUser
    }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
