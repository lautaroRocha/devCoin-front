import {Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Pages
import { HomePage, WalletPage, UserProfilePage, SignUpPage, LoginPage } from './pages';
import { Navbar } from './components';
import { userContext } from './context/userContext';
import { tokenContext } from './context/tokenContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [user, setUser] = useState();
    const [token, setToken] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        window.location.pathname === '/login' && navigate('/')
        user && toast.success(`Bienvenido, ${user.first_name}`)
    }, [user]);

    function logOut() {
        setUser(null);
        setToken(null);
    }

    function logIn(userData, tokenData){
        setUser(userData);
        setToken(tokenData);
        navigate('/')
    }

    return (
        <>
                <userContext.Provider value={user}>
                    <tokenContext.Provider value={token}>
                        <Navbar logOut={logOut} />
                        <Routes>
                            <Route path="/" element={<HomePage/>} />
                            <Route path="/wallet" element={<WalletPage />} />
                            <Route path="/profile" element={<UserProfilePage />} />
                            <Route path="/login"
                                element={<LoginPage logIn={logIn} />}
                            />
                            <Route path="/signup" element={<SignUpPage />} />
                        </Routes>
                        <ToastContainer
                            position="bottom-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={true}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                            />
                    </tokenContext.Provider>
                </userContext.Provider>
        </>
    );
}

export default App;
