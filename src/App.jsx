import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import { Navbar } from './components/';

// Pages
// import { Home, Wallet, UserProfile, Settings, Footer } from './container/

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes></Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
