import { useEffect, useState } from "react";
import FirebaseAuthentication from "../Pages/Login/Firebase/Firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, getIdToken } from 'firebase/auth';

FirebaseAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (name, email, password, location, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateName(name);
                setSuccess('Registered successfully!');
                setError('');
                setOpen(true);
                setTimeout(() => {
                    const destination = location?.state?.from || '/';
                    history.replace(destination);
                }, 1000);
                // save user to database
                saveUser(email, name, 'POST');
            })
            .catch((error) => {
                setSuccess('');
                setError(error.code);
                setOpen(true);
            })
            .finally(() => setIsLoading(false));
    }

    const updateName = (username) => {
        updateProfile(auth.currentUser, {
            displayName: username
        }).then(() => {

        }).catch((error) => {
            setSuccess('');
            setError(error.code);
            setOpen(true);
        });
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSuccess('Signed In successfully!');
                setError('');
                setOpen(true);
                setTimeout(() => {
                    const destination = location?.state?.from || '/';
                    history.replace(destination);
                }, 1000);
            })
            .catch((error) => {
                setSuccess('');
                setError(error.code);
                setOpen(true);
            })
            .finally(() => setIsLoading(false));
    }

    const googleLogin = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setSuccess('Signed In successfully!');
                setError('');
                setOpen(true);
                setTimeout(() => {
                    const destination = location?.state?.from || '/';
                    history.replace(destination);
                }, 1000);
                // save user to database
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT');
            }).catch((error) => {
                setSuccess('');
                setError(error.code);
                setOpen(true);
            })
            .finally(() => setIsLoading(false));

    }

    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setSuccess('Logged out successfully!');
            setError('');
            setOpen(true);
        }).catch((error) => {
            setSuccess('');
            setError(error.code);
            setOpen(true);
        })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (userInfo) => {
            if (userInfo) {
                getIdToken(userInfo)
                    .then(idToken => {
                        setToken(idToken);
                        localStorage.setItem('idToken', idToken);
                    })
                setUser(userInfo);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth]);

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        console.log(user);
        fetch(`https://agile-headland-44416.herokuapp.com/users`, {
            method: method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    // Admin status check
    useEffect(() => {
        fetch(`https://agile-headland-44416.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.isAdmin));
    }, [user.email]);

    return {
        isLoading,
        user,
        admin,
        token,
        setUser,
        registerUser,
        updateName,
        loginUser,
        googleLogin,
        logOut,
        success,
        error,
        setSuccess,
        setError,
        open,
        setOpen
    }
}

export default useFirebase;