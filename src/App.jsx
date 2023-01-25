import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Pages
import {
    HomePage,
    WalletPage,
    UserProfilePage,
    SignUpPage,
    LoginPage,
    VerifyPage,
    RecoveryPage,
} from './pages';
import { Navbar } from './components';
import { userContext, tokenContext, walletContext, coinsContext } from './context';
import * as URL from './utils/URL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConvertPage from './pages/ConvertPage/ConvertPage';
import axios from 'axios';
import getProfilePictureURL from './utils/getProfilePicURL';

function App() {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [wallet, setWallet] = useState();
    const [coins, setCoins] = useState();
    const [userPictureURL, setUserPictureURL] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = sessionStorage.getItem('user');
        const savedToken = sessionStorage.getItem('token');
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        window.location.pathname === '/login' && navigate('/');
    }, [user]);

    useEffect(() => {
        if (user) {
            fetch(URL.wallet + `/${user.hex_code}`, { headers: { 'x-access-token': token } })
                .then((res) => res.json())
                .then((data) => {
                    setCoins(data.coins.data);
                    setWallet(data.wallet);
                })
                .catch((error) => console.log(error));
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getProfilePictureURL(user.email, setUserPictureURL);
        }
    }, [user]);

    function logOut() {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

    function logIn(userData, tokenData) {
        setUser(userData);
        setToken(tokenData);
        navigate('/');
        toast.success(`Bienvenido, ${userData.first_name}`);
    }

    function updateUserState() {
        sessionStorage.removeItem('user');
        axios
            .get(URL.users + '/' + user.hex_code)
            .then((res) => {
                setUser(res.data.data[0]),
                    sessionStorage.setItem('user', JSON.stringify(res.data.data[0]));
            })
            .catch((error) => toast.error('Ocurrió un error'));
    }

    return (
        <>
            <userContext.Provider value={user}>
                <tokenContext.Provider value={token}>
                    <coinsContext.Provider value={coins}>
                        <walletContext.Provider value={wallet}>
                            <Navbar logOut={logOut} />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/wallet"
                                    element={<WalletPage update={updateUserState} />}
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <UserProfilePage
                                            wallet={wallet}
                                            update={updateUserState}
                                            url={userPictureURL}
                                        />
                                    }
                                />
                                <Route path="/login" element={<LoginPage logIn={logIn} />} />
                                <Route path="/signup" element={<SignUpPage />} />
                                <Route path="/verify/:email" element={<VerifyPage />} />
                                <Route path="/convert" element={<ConvertPage />} />
                            </Routes>
                            <ToastContainer
                                position="bottom-left"
                                autoClose={4000}
                                hideProgressBar={true}
                                newestOnTop={true}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                            />
                        </walletContext.Provider>
                    </coinsContext.Provider>
                </tokenContext.Provider>
            </userContext.Provider>
        </>
    );
}

export default App;
