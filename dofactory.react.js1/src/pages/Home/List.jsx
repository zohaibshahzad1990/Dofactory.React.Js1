
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from "/src/utils/helpers/formatting";

import { get } from "/src/utils/clients/AppClient";

import Loading from "/src/components/Loading";
import Alert from "/src/components/Alert";

export const List = () => {

    console.log("init home")

    const [state, setState] = useState({
        summary: {},
        opportunities: [],

        showAlert: false,
        alertMessage: '',

        isLoading: false
    });

    useEffect(() => {

        document.title = "Home";

        setState(prevState => ({
            ...prevState,
            isLoading: true
        }));

        fetchSummary();
        fetchOpportunities();

        console.log('once')

    }, []);

    const fetchSummary = async () => {

        const response = await get("/opportunities/summary");

        if (response?.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                summary: result.data,
            }));
        }
        else {

            showAlert(response);
        }
    };

    const fetchOpportunities = async () => {

        console.log("fetch home")

        const response = await get("/opportunities?page=1&pagesize=10&sort=-amount");

        if (response?.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                opportunities: result.data,
                isLoading: false
            }));
        }
        else {

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

            <div className="page-box">
                <div className="page-box-icon">Welcome</div>
            </div>

            {state.isLoading ? (
                <Loading />

            ) : (

                <React.Fragment>

                    <Alert
                        show={state.showAlert}
                        message={state.alertMessage}
                        onClose={hideAlert}
                    />

                    <div className="page-box">
                        <div className="row pt-15">

                            <div className="col">
                                <Link className="no-underline" to="/opportunities?advancedfilter=false&filter=2">
                                    <div className="callout" style={{ backgroundColor: '#20A8D8' }}>
                                        <div className="callout-stage">Open</div>
                                        <div className="row callout-body">
                                            <div className="col-5 callout-amount">{state?.summary?.openAmount}</div>
                                            <div className="col-7 text-end callout-items">{state?.summary?.openCount} Items</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col">
                                <Link className="no-underline" to="/opportunities?advancedfilter=true&search=stage:Closed+Won">
                                    <div className="callout" style={{ backgroundColor: '#63C2DE' }}>
                                        <div className="callout-stage">Closed Won</div>
                                        <div className="row callout-body">
                                            <div className="col-5 callout-amount">{state?.summary?.closedWonAmount}</div>
                                            <div className="col-7 text-end callout-items">{state?.summary?.closedWonCount} Items</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col">
                                <Link className="no-underline" to="/opportunities?advancedfilter=true&search=stage:Closed+Lost">
                                    <div className="callout" style={{ backgroundColor: '#F86C6B' }}>
                                        <div className="callout-stage">Closed Lost</div>
                                        <div className="row callout-body">
                                            <div className="col-5 callout-amount">{state?.summary?.closedLostAmount}</div>
                                            <div className="col-7 text-end callout-items">{state?.summary?.closedLostCount} Items</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col">
                                <Link className="no-underline" to="/opportunities">
                                    <div className="callout" style={{ backgroundColor: '#F8CB00' }}>
                                        <div className="callout-stage">Closed Won</div>
                                        <div className="row callout-body">
                                            <div className="col-5 callout-amount">{state?.summary?.totalAmount}</div>
                                            <div className="col-7 text-end callout-items">{state?.summary?.totalCount} Items</div>

                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>

                    <div className="row p-10">
                        <div className="col-12">

                            <div className="home-heading">Top 10 Deals:</div>

                            <table className="table table-list table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th>Opportunity Name</th>
                                        <th>Account Name</th>
                                        <th className="text-end pr-10 pr-sm-40">Amount</th>
                                        <th className="">Close Date</th>
                                        <th>Stage</th>
                                        <th>Probability</th>
                                        <th>Owner</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {state.opportunities.map((item) => (
                                        <tr key={item.id}>
                                            <td><a className="table-list-link" href={"/opportunities/" + item.id}>{item.name}</a></td>
                                            <td>{item.accountName}</td>
                                            <td className="text-end pr-10 pr-sm-40">{formatCurrency(item.amount)}</td>
                                            <td className="">{formatDate(item.closeDate)}</td>
                                            <td>{item.stage}</td>
                                            <td className="position-relative">
                                                <div className="percent" style={{ fontSize: '12px', width: item.probability + '%' }}>{item.probability}%</div>
                                            </td>
                                            <td>{item.ownerAlias}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <br></br>
                            <br></br>
                        </div>
                    </div>

                </React.Fragment>
            )}

        </React.Fragment>
    );
}

export default List;
