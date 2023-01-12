import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components

// Pages
import { Home, Wallet, UserProfile, SettingsPage} from './container'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/wallet" element={<Wallet />}/>
                    <Route path="/user" element={<UserProfile />}/>
                    <Route path='/settings' element={<SettingsPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
