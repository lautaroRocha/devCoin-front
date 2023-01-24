import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/index.css';
import {BrowserRouter} from 'react-router-dom'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBnLJcHGdHgVbDVGgpNsyIKaidShEiY-eQ",
    authDomain: "devcoin-6355c.firebaseapp.com",
    projectId: "devcoin-6355c",
    storageBucket: "devcoin-6355c.appspot.com",
    messagingSenderId: "330217268970",
    appId: "1:330217268970:web:95306c76a91d1d94a89993"
  };

const app = initializeApp(firebaseConfig);  

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </React.StrictMode>
);
