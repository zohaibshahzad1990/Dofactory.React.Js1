import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { get, deleteData } from "/src/utils/clients/AppClient";

import { formatCurrency, formatDate, formatPercent } from "/src/utils/helpers/formatting";

import { OutputText } from "/src/components/controls/OutputText";
import { OutputCheckbox } from "/src/components/controls/OutputCheckbox";

import Loading from "/src/components/Loading";
import Alert from "/src/components/Alert";


export const Detail = () => {

    console.log("init detail")

    const { id } = useParams();

    const [state, setState] = useState({
        opportunity: null,

        showAlert: false,
        alertMessage: '',

        isLoading: true
    });

    useEffect(() => {  // Runs once 

        document.title = "Opportunity Detail";

        setState((prevState) => ({
            ...prevState,
            isLoading: true
        }));

        fetchOpportunity();

        console.log('effect: once')

    }, []);

    const fetchOpportunity = async () => {

        const response = await get("/opportunities/" + id);

        if (response?.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                opportunity: result.data,

                isLoading: false
            }));

        } else {

            showAlert(response);
        }
    };

    const showAlert = (response) => {

        setState(prevState => ({
            ...prevState,
            showAlert: true,
            alertMessage: response.data?.data?.message
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

            {state.isLoading ? (<Loading />) : (

                <React.Fragment>

                    <Alert
                        show={state.showAlert}
                        message={state.alertMessage}
                        onClose={hideAlert}
                    />

                    <div className="page-box d-flex">
                        <div>
                            <div className="page-box-icon"><Link to={`/opportunities`}><i className="icon-star icon-square icon-lead"></i></Link> Opportunities</div>
                            <div className="page-box-name">{state.opportunity.name}</div>
                        </div>
                        <div className="d-flex">
                            <div className="page-box-data-first">Account<br />{state.opportunity.accountName}</div>
                            <div className="page-box-data">Close Date<br />{formatDate(state.opportunity.closeDate)}</div>
                            <div className="page-box-data">Amount<br />{formatCurrency(state.opportunity.amount)}</div>
                            <div className="page-box-data-last">Owner<br />{state.opportunity.ownerAlias}</div>
                        </div>
                        <div className="ms-auto">
                            <div className="page-box-buttons">
                                <Link className="btn btn-sm btn-light" to={`/opportunities/edit/${id}`}>Edit</Link> &nbsp;
                                <Link className="btn btn-sm btn-light" onClick={null}>Delete</Link>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane-row row mb-20">

                        <div className="col-12 col-sm-6">
                            <OutputText label="Owner" value={state.opportunity.ownerAlias}></OutputText>
                            <OutputText label="Opportunity Name" value={state.opportunity.name}></OutputText>
                            <OutputCheckbox label="Private" value={state.opportunity.isPrivate}></OutputCheckbox>
                            <OutputText label="Account Name" value={state.opportunity.accountName}></OutputText>
                            <OutputText label="Contact Name" value={state.opportunity.contactName}></OutputText>
                            <OutputText label="Type" value={state.opportunity.type}></OutputText>
                            <OutputText label="Lead Source" value={state.opportunity.leadSource}></OutputText>
                            <OutputText label="Description" value={state.opportunity.description}></OutputText>
                        </div>

                        <div className="col-12 col-sm-6">
                            <OutputText label="Amount" value={formatCurrency(state.opportunity.amount)}></OutputText>
                            <OutputText label="Expected Revenue" value={formatCurrency(state.opportunity.expectedRevenue)}></OutputText>
                            <OutputText label="Quantity" value={state.opportunity.quantity}></OutputText>
                            <OutputText label="Next Step" value={state.opportunity.nextStep}></OutputText>
                            <OutputText label="CloseDate" value={formatDate(state.opportunity.closeDate)}></OutputText>
                            <OutputText label="Stage" value={state.opportunity.stage}></OutputText>
                            <OutputText label="Probability" value={formatPercent(state.opportunity.probability)}></OutputText>
                        </div>
                    </div>

                </React.Fragment>
            )}

        </React.Fragment >
    );
};

export default Detail;
