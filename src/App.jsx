import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Pages
import { HomePage, WalletPage, UserProfilePage, SignUpPage, LoginPage, VerifyPage, RecoveryPage, CoinDetailPage } from './pages';
import { Navbar } from './components';
import { sessionContext, coinsContext} from './context';
import * as URL from './utils/URL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConvertPage from './pages/ConvertPage/ConvertPage';
import axios from 'axios';
import getProfilePictureURL from './utils/getProfilePicURL';
import socketIO from "socket.io-client";


function App() {
    
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [prices, setPrices] = useState()
    const [wallet, setWallet] = useState();
    const [coins, setCoins] = useState();
    const [userPictureURL, setUserPictureURL] = useState();
    const [transactions, setTransactions] = useState();
    const [socket, setSocket] = useState()


    const navigate = useNavigate();

    let sessionData = { user : user, token : token}
    let coinsData = {prices : prices, wallet : wallet, coins : coins, transactions : transactions}
   
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    }, []);

    useEffect(()=>{
        axios.get(URL.prices).then((res) => setPrices(res.data));
    }, [])

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

    useEffect(()=>{
        if(user){
            fetch(URL.transaction+'/'+user.hex_code, {headers : {'x-access-token' : token}})
                .then(res => res.json())
                .then(data => {
                    if(data.message){
                        toast.error(data.message)
                    }else{
                        setTransactions(data)
                    }
                })
                .catch(error => toast.error(error))
        }
    }, [user])

    useEffect(()=>{
        if(!socket){
            const socket = socketIO.connect(URL.socket);
            socket && setSocket(socket)
        }
      }, [])

    function logOut() {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    function logIn(userData, tokenData) {
        setUser(userData);
        setToken(tokenData);
        navigate('/');
        toast.success(`Bienvenido, ${userData.first_name}`);
    }

    function updateUserState() {
        localStorage.removeItem('user');
        axios
            .get(URL.users + '/' + user.hex_code)
            .then((res) => {
                setUser(res.data.data[0]),
                localStorage.setItem('user', JSON.stringify(res.data.data[0]));
            })
            .catch((error) => toast.error('Ocurrió un error'));
    }

    function updateUserTransactions(){
        fetch(URL.transaction+'/'+user.hex_code, {headers : {'x-access-token' : token}})
                .then(res => res.json())
                .then(data => {
                    if(data.message){
                        toast.error(data.message)
                    }else{
                        setTransactions(data)
                    }
                })
                .catch(error => toast.error(error))
    }

    if(socket){
        socket.off("new-transfer").on("new-transfer", (arg) => {
            const data = JSON.parse(arg)
            if(data.receiver == user.hex_code){
                toast.info('Has recibido una transferencia')
                updateUserState()
               updateUserTransactions()
            } 
        })

    }

    return (
        <sessionContext.Provider value={sessionData}>
        <coinsContext.Provider value ={coinsData}> 
            <Navbar logOut={logOut} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/wallet"element={<WalletPage update={updateUserState} socket={socket}/>}/>
                <Route path="/profile" element={ <UserProfilePage wallet={wallet} update={updateUserState} url={userPictureURL}/>}/>
                <Route path="/login" element={<LoginPage logIn={logIn} />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/verify/:email" element={<VerifyPage />} />
                <Route path="/convert" element={<ConvertPage />} />
                <Route path="/coins/:id" element={<CoinDetailPage update={updateUserState}/>} />
                <Route path="/recovery/:email" element={<RecoveryPage />} />
            </Routes>
            <ToastContainer position="bottom-left"
                                autoClose={4000}
                                hideProgressBar={true}
                                newestOnTop={true}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"/>
        </coinsContext.Provider>
        </sessionContext.Provider>
    );
}

export default App;
