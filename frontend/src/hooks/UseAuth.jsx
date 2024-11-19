import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const authContext = createContext();

function useAuth() {
    const [authed, setAuthed] = useState(localStorage.getItem('jwt') !== null);
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    // Load JWT from Local Storage on component mount
    useEffect(() => {
        const storedJwt = localStorage.getItem('jwt');
        if (storedJwt) {
            setToken(storedJwt);
            setAuthed(true);
        }
    }, []);

    const authAxios = useMemo(() => {
        const instance = axios.create({
            baseURL: "/",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Add a response interceptor to handle token expiration
        instance.interceptors.response.use(
            response => response, // On successful response, return as normal
            error => {
                if (error.response && error.response.status === 401) {
                    setToken(null);
                    localStorage.removeItem('jwt');
                    setAuthed(false);

                    // Redirect to login page
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [token]);

    return {
        authed, authAxios, login(username, password) {
            return new Promise((resolve, reject) => {
                axios.post('api/auth/token', {}, { auth: { username, password }})
                    .then(response => {
                        const newJwt = response.data;
                        setToken(newJwt);
                        localStorage.setItem('jwt', newJwt);
                        setAuthed(true);
                        resolve();
                    }).catch(error => {
                    reject(new Error(error.message));
                })
            });
        }, logout() {
            return new Promise((resolve) => {
                setToken(null);
                localStorage.removeItem('jwt');
                setAuthed(false);
                resolve();
            });
        },

    };
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}