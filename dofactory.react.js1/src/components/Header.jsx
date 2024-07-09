import React, { useEffect, useState } from "react";
import cloudImage from '/img/cloud.png'

import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from "/src/utils/auth/useAuth";
import NotImplemented from "/src/components/NotImplemented";


export const Header = () => {

    const navigate = useNavigate();
    const { auth, logout } = useAuth();

    const [state, setState] = useState({
        showNotImplemented: false,
        notImplementedModule: ''
    });

    const onNotImplementedOpen = (module) => {

        setState(prevState => ({
            ...prevState,
            showNotImplemented: true,
            notImplementedModule: module

        }));
    }

    const onNotImplementedClose = () => {

        setState(prevState => ({
            ...prevState,
            showNotImplemented: false,
            notImplementedModule: ''

        }));
    }

    return (
        <React.Fragment>

            <NotImplemented
                show={state.showNotImplemented}
                name={state.notImplementedModule}
                onClose={onNotImplementedClose}
            />

            <div className="main-menu d-flex">

                <div className="pt-10 px-15">
                    <img src={cloudImage} style={{ height: 25 }} />
                </div>

                <div>
                    <ul className="nav nav-menu">
                        <li className='nav-item'><NavLink className="nav-link" to="/home">Home</NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="/opportunities">Opportunities</NavLink></li>
                        {/*<li className='nav-item'><NavLink className="nav-link" to="/leads">Leads</NavLink></li>*/}
                        <li className='nav-item'><NavLink className="nav-link" to="javascript:void(0)" onClick={() => onNotImplementedOpen('Leads') }>Leads<sup>&Dagger;</sup></NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="javascript:void(0)" onClick={() => onNotImplementedOpen('Tasks') }>Tasks<sup>&Dagger;</sup></NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="javascript:void(0)" onClick={() => onNotImplementedOpen('Accounts')}>Accounts<sup>&Dagger;</sup></NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="javascript:void(0)" onClick={() => onNotImplementedOpen('Contacts')}>Contacts<sup>&Dagger;</sup></NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="javascript:void(0)" onClick={() => onNotImplementedOpen('Campaigns')}>Campaigns<sup>&Dagger;</sup></NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="javascript:void(0)" onClick={() => onNotImplementedOpen('Cases')}>Cases<sup>&Dagger;</sup></NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to="javascript:void(0)" onClick={() => onNotImplementedOpen('People')}>People<sup>&Dagger;</sup></NavLink></li>
                    </ul>
                </div>

                <div className="ms-auto d-flex">

                    <div className="pt-11 pr-15">

                        <div className="dropdown">
                            <Link className="no-underline" data-bs-toggle="dropdown">
                                <span className="action-circle ml-40">
                                    <i className="text-white font-15 icon-plus"></i>
                                </span>&nbsp;
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="/opportunities/edit">New Opportunity</a>
                                <a className="dropdown-item" onClick={() => onNotImplementedOpen('Leads')} href="javascript:void(0)">New Lead<sup>&Dagger;</sup></a>
                                <a className="dropdown-item" onClick={() => onNotImplementedOpen('Accounts')} href="/accounts/edit">New Account<sup>&Dagger;</sup></a>
                                <a className="dropdown-item" onClick={() => onNotImplementedOpen('Contacts')} href="/contacts/edit">New Contact<sup>&Dagger;</sup></a>
                                <a className="dropdown-item" onClick={() => onNotImplementedOpen('Campaigns')} href="/campaigns/edit">New Campaign<sup>&Dagger;</sup></a>
                                <a className="dropdown-item" onClick={() => onNotImplementedOpen('Cases')} href="/cases/edit">New Case<sup>&Dagger;</sup></a>
                            </div>
                        </div>
                    </div>

                    <div>
                        {auth?.role == "Admin" &&
                            <div className="pt-10">
                                <a className="no-underline" href="/admin">
                                    <span className="action-circle">
                                        <i className="text-white font-15 icon-settings" title="Admin"></i>
                                    </span>&nbsp;
                                </a>
                            </div>
                        }
                    </div>

                    <div>
                        <div className="dropdown mr-15">
                            <Link className="no-underline avatar-wrapper" data-bs-toggle="dropdown" >
                                <div className="action-circle mt-3">{auth?.firstName?.charAt(0)}</div>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link className="dropdown-item disabled pl-5" to="/account">
                                    <div className="d-flex">
                                        <div className="p-5 pr-10">
                                            <div className="avatar" style={{ 'background': '#ff6a00' }}>{auth?.firstName?.charAt(0)}</div>
                                        </div>
                                        <div className="pt-5">
                                            <div>{auth?.firstName + " " + auth?.lastName}</div>
                                            <div className="font-12">{auth?.email}</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" onClick={() => onNotImplementedOpen('My Account')} to="javascript:void(0)">My Account<sup>&Dagger;</sup></NavLink>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" onClick={logout}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;
