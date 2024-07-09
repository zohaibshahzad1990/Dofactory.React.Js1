
import React, { Suspense,useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './utils/auth/RequireAuth';
import axios  from "axios";

const Layout = React.lazy(() => import("./components/Layout"));

const Login = React.lazy(() => import("./pages/Auth/Login"));
const NotFound = React.lazy(() => import("./pages/Landing/NotFound"));
const Error = React.lazy(() => import("./pages/Landing/Error"));
const Landing = React.lazy(() => import("./pages/Landing/Index"));

const loading = (
    <div className="pt-10 text-center fst-italic">
        Loading...
    </div>
);

const App = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
    }, []);
    return (

        <BrowserRouter>
            <Suspense fallback={loading}>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/login" element={<Login />} />

                    <Route exact path="/notfound" element={<NotFound />} />
                    <Route exact path="/error" element={<Error />} />

                    <Route path="*" name="Authenticate" element={<RequireAuth />}>
                        <Route path="*" name="Home" element={<Layout />} /> 
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>

    )
};

export default App;

