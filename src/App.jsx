import {Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Pages
import { HomePage, WalletPage, UserProfilePage, SignUpPage, LoginPage, VerifyPage} from './pages';
import { Navbar } from './components';
import { userContext } from './context/userContext';
import { tokenContext } from './context/tokenContext';
import * as URL from './utils/URL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConvertPage from './pages/ConvertPage/ConvertPage';


function App() {

    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [wallet, setWallet] = useState()
    const [coins, setCoins] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        const savedUser = sessionStorage.getItem('user')
        const savedToken = sessionStorage.getItem('token')
        if(savedUser && savedToken){
            setUser(JSON.parse(savedUser))
            setToken(savedToken)
        }
    }, [])

    useEffect(() => {
        window.location.pathname === '/login' && navigate('/')
        user && toast.success(`Bienvenido, ${user.first_name}`)
    }, [user]);

    useEffect(()=>{
        if(user && !wallet){
            fetch(URL.wallet+`/${user.hex_code}`)
                .then(res => res.json())
                .then(data => {setCoins(data.coins.data); setWallet(data.wallet)})
                .catch(error => console.log(error))
        }
    }, [user])

    function logOut() {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
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
                            <Route path="/verify/:email" element={<VerifyPage />}/>
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
                    </tokenContext.Provider>
                </userContext.Provider>
        </>
    );
}

export default App;
