import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { HomePage, WalletPage, UserProfilePage, SignUpPage, LoginPage } from './pages';
import { Navbar } from './components';

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
