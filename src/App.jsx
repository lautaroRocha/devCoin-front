import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// Pages
import { HomePage, WalletPage, UserProfilePage, SignUpPage, LoginPage } from './pages';
import { Navbar } from './components';
import { userContext } from './context/userContext';
import { tokenContext } from './context/tokenContext';

function App() {

    const [user, setUser] = useState();
    const [token, setToken] = useState();

    function logOut() {
        setUser(null);
        setToken(null);
    }

    function logIn(userData, tokenData){
        setUser(userData);
        setToken(tokenData)
    }

    return (
        <>
            <BrowserRouter>
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
                    </tokenContext.Provider>
                </userContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
