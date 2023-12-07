import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebaseConfig/firebaseConfig";


export const AuthContext = createContext(null)
function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubcribe = () => {
            onAuthStateChanged(auth, cuser => {
                setUser(cuser)
                setLoading(false)
            })
        }
        return unSubcribe();
    }, [])

    const creatuserwithemail = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const provider = new GoogleAuthProvider()
    const signupWihtGoogle = () => {
        return signInWithPopup(auth, provider)
    }
    const signInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }
    const logOut = () => {
        return signOut(auth)
    }

    const globaldata = {
        user, loading,setLoading,
        signupWihtGoogle,
        creatuserwithemail,
        signInWithEmail, updateUserProfile,
        logOut
    }
    return (
        <AuthContext.Provider value={globaldata}> {children}</AuthContext.Provider>
    );
}

export default AuthProvider;