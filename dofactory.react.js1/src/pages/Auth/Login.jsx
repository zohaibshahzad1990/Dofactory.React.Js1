
import React, { useEffect, useState } from "react";
import { post } from "/src/utils/clients/AuthClient";

import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import useAuth from "/src/utils/auth/useAuth";
import Alert from "/src/components/Alert";

export const Login = () => {

    console.log("init Login the current one")

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const returnUrl = location.state?.from?.pathname || "/home";

    const [state, setState] = useState({

        showPassword: false,

        showAlert: false,
        alertMessage: ''

    });

    const form = useForm({
        defaultValues: {
            userName: "debbie@company.com",
            password: "Secret123!"
        },
        mode: "all"
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    useEffect(() => {  // Runs once 

        document.title = "Login";

        console.log('effect: once')

    }, []);


    const onSubmit = async (data) => {

        const response = await post("/authenticate", data);

        if (response?.status === 200) {

            const result = response.data;

            const token = result.accessToken;
            const userId = result.id;
            const firstName = result.firstName;
            const lastName = result.lastName;
            const email = result.email;
            const role = result.role;

            login({token, userId, firstName, lastName, email, role});
            
            navigate("/home", { replace: true });

        } else {

            localStorage.clear();

            showAlert(response);
        }
    };

    const showAlert = (response) => {

        setState(prevState => ({
            ...prevState,
            showAlert: true,
            alertMessage: response?.data?.message
        }));
    }

    const hideAlert = () => {

        setState(prevState => ({
            ...prevState,
            showAlert: false,
            alertMessage: ''
        }));
    }

    return (
        <React.Fragment>

            <div className="container-fluid bg-light d-sm-flex">

                <div className="w-sm-50 height-500">

                    <div className="text-center">
                        <img src="/img/login.png" className="pt-45 pb-80" />
                    </div>
                    <div className="width-lg-350 m-auto p-15 bg-white border rounded">
                        <div className="text-center">
                            <i className="icon-info" style={{ cursor: 'pointer' }}></i>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate >

                            <div className="py-7">* Email</div>
                            <input id="userName" type="text" className="form-control"
                                {...register('userName', {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    }
                                })} />
                            <div className="field-validation-error">{errors.email?.message}</div>


                            <div className="pt-15 pb-7">* Password</div>

                            <input id="password" type="password" className="form-control"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    pattern: {
                                        value: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$TODO/,
                                        message: "Invalid email"
                                    }
                                })} />
                            <div className="field-validation-error">{errors.password?.message}</div>

                            <div className="d-grid">
                                <input type="submit" className="btn btn-primary btn-block mt-25"
                                    value="Login" />
                            </div>

                        </form>

                    </div>
                </div>

                <div className="ms-auto w-sm-50 p-20" style={{ height: '725px', backgroundImage: 'url(/img/login.jpg)', backgroundRepeat: 'no-repeat' }} >
                    <h3 style={{ color: '#0d4d7d' }}> Customer Relationship <br /> Management</h3 >
                </div>

            </div>
        </React.Fragment >
    );
}


export default Login;