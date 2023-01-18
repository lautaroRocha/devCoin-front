import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Home, Wallet, UserProfile, SettingsPage, SignUp, Login } from './container';
import { Navbar} from './components';

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
