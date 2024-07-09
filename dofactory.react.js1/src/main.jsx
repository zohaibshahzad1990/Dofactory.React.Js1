import React from 'react'
import ReactDOM from 'react-dom/client'

import {AuthProvider } from '/src/utils/auth/AuthProvider'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'simple-line-icons/dist/styles/simple-line-icons.css'
import './assets/css/app.css'
import './assets/css/apputils.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
)
