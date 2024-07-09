import React from "react";
import { Link } from 'react-router-dom';

export function Index() {
    
    console.log("init Landing")

    localStorage.clear();

    return (
        <React.Fragment>

            <header className="d-flex">
                <div>
                    <Link to="/"><img src="/img/logo.png" className="height-30 mt-1" /></Link>
                </div>
                <div className="ms-auto">
                    <Link to="/login" className="btn btn-primary">LOGIN</Link>
                </div>
            </header>

            <div className="height-400" style={{ backgroundImage: 'url(/img/landing.jpg)', backgroundRepeat: 'no-repeat', backgroundPosition: 'left' }}>
                <div className="pt-30 pl-45" style={{ color: '#0d4d7d' }}>
                    <h3>CRM was built<br /> with .NET+React!</h3>
                    <div>Login and see <br />what's possible.</div>
                </div>
            </div>

            <div className="container">
                <div className="row pt-25">

                    <div className="col-12 col-md-6 pb-40">
                        <div className="p-20">

                            <h3> Welcome</h3>

                            <p className="pt-25">
                                CRM is a modern Customer Relationship Management system that was modeled after
                                the popular Salesforce solution.
                            </p>
                            <p>
                                It features many of the same entities
                                as in Salesforce, including, leads, campaigns, contacts, accounts,
                                opportunities, and a host of other facilities. Together they allow
                                sales and marketing
                                teams to collaborate and operate better and more efficiently.<br />
                            </p>
                            <p>
                                This solution was developed with <i>.NET + React</i> using the
                                Ultra Clean&nbsp; Architecture as its foundation. You can do the same:
                                build beautiful, responsive solutions quickly and effectively.
                            </p>
                            <p>
                                This application is fully <span className="">DX</span> (Design Excellence&trade;) and
                                <span className="">CX</span> (Code Excellence&trade;) compliant with an attractive, easy-to-use UI.
                            </p>

                        </div>
                    </div>

                    <div className="col-12 col-md-6">

                        <div className="p-20">

                            <h3> Features</h3>
                            <br />
                            <ul>
                                <li>Attractive UI</li>
                                <li>Sorting</li>
                                <li>Pagination</li>
                                <li>Search</li>
                                <li>Standard and Advanced Filtering</li>
                                <li>Live Aggregate Reporting</li>
                                <li>Excel Import and Export</li>
                                <li>Administrative Console</li>
                                <li>Authentication and Authorization</li>
                                <li>Numerous Cross-Cutting Concerns</li>
                                <li>Minimal Code (Low code)</li>
                                <li>Easy and fast to Design</li>
                                <li>Easy and fast to Develop</li>
                                <li>Easy and fast to Maintain</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Index;