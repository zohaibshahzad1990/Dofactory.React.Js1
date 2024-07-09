import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { get, post, put } from "/src/utils/clients/AppClient";
import { types, defaultObject } from "/src/utils/helpers/mapping";

import { formatCurrency, formatDate } from "/src/utils/helpers/formatting";

import opportunityStages from "/src/assets/json/opportunityStages.json";
import opportunityTypes from "/src/assets/json/opportunityTypes.json";
import opportunityLeadSources from "/src/assets/json/opportunityLeadSources.json";

import Loading from "/src/components/Loading";
import Alert from "/src/components/Alert";

export const Edit = () => {

    console.log("init edit")

    const { id = 0 } = useParams();

    const navigate = useNavigate();

    // Form handling
    const form = useForm();
    const { register, setValue, reset, handleSubmit, formState } = form;
    const { errors } = formState;

    const [state, setState] = useState({
        opportunity: null,

        accounts: [],
        contacts: [],
        people: [],

        stages: [],
        types: [],
        leadSources: [],

        showAlert: false,
        alertMessage: '',

        isLoading: true
    });

    useEffect(() => {  // Runs once

        document.title = (id > 0 ? "Edit" : "New") + " Opportunity";

        const stages = opportunityStages.map((item) => {
            return {
                value: item.value,
                text: item.text
            };
        });

        const types = opportunityTypes.map((item) => {
            return {
                value: item.value,
                text: item.text
            };
        });

        const leadSources = opportunityLeadSources.map((item) => {
            return {
                value: item.value,
                text: item.text
            };
        });

        setState((prevState) => ({
            ...prevState,
            stages: stages,
            types: types,
            leadSources: leadSources
        }));

        fetchAccounts();
        fetchContacts();
        fetchPeople();

        fetchOpportunity();

        console.log('effect: once')

    }, []);

    const fetchOpportunity = async () => {

        let opportunity = defaultObject(types.OPPORTUNITY);

        if (id > 0) {

            const response = await get("/opportunities/" + id);

            if (response.status === 200) {

                const result = response.data;

                opportunity = prepareForDisplay(result.data);

            } else {

                showAlert(response);
            }
        }

        setState(prevState => ({
            ...prevState,
            opportunity: opportunity,
            isLoading: false
        }));

        reset();

        for (const key in opportunity) {
            if (key === "stageHistories") {
                continue;
            }
            setValue(key, opportunity[key]);
        }
    };

    const fetchAccounts = async () => {

        // fetch accounts only once

        if (state.accounts.length > 0) return;

        const queryString = "?page=1&pagesize=100&sort=name";
        const response = await get("/accounts" + queryString);

        if (response.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                accounts: result.data
            }));

        } else {

            showAlert(response);
        }
    };

    const fetchContacts = async () => {

        // fetch contacts only once

        if (state.contacts.length > 0) return;

        const queryString = "?page=1&pagesize=100&sort=name";
        const response = await get("/contacts" + queryString);

        if (response.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                contacts: result.data
            }));

        } else {

            showAlert(response);
        }
    };

    const fetchPeople = async () => {

        // fetch people only once

        if (state.people.length > 0) return;

        const queryString = "?page=1&pagesize=100&sort=name";
        const response = await get("/people" + queryString);

        if (response.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                people: result.data
            }));

        } else {

            showAlert(response);
        }
    };

    const onSubmit = async (data) => {

        //const response = id === 0 ?
        //    await post("/opportunities", data) :
        //    await put("/opportunities/" + id, id, data);

        data = prepareForSave(data);


        if (id === 0) {

            const response = await post("/opportunities", data);

            if (response.status === 201) {  // Created status

                //const result = response.data;

                navigate(-1) ;

            } else {

                showAlert(response);
            }

        } else {

            const response = await put("/opportunities", id, data);

            if (response.status === 200) {

                //const result = response.data;

                navigate(-1);

            } else {

                showAlert(response);
            }
        }
        //console.log('form submitted' + data);
    }

    const prepareForDisplay = (opportunity) => {

        if (opportunity.closeDate) {
            opportunity.closeDate = formatDate(opportunity.closeDate);
        }

        return opportunity;
    }

    const prepareForSave = (opportunity) => {

        if (opportunity.closeDate) {
            opportunity.closeDate = opportunity.closeDate.toJSON();
        }
        //if (opportunity.accountName === null) {
        //    opportunity.accountName = '';
        //}
        //if (opportunity.contactName === null) {
        //    opportunity.contactName = '';
        //}
        //if (opportunity.type === null) {
        //    opportunity.type = '';
        //}
        //if (opportunity.leadSource === null) {
        //    opportunity.leadSource = '';
        //}
        //if (opportunity.nextStep === null) {
        //    opportunity.nextStep = '';
        //}
        //if (opportunity.stage === null) {
        //    opportunity.stage = '';
        //}
        //if (opportunity.closeDate === null) {
        //    opportunity.closeDate = '';
        //}
        //if (opportunity.description === null) {
        //    opportunity.description = '';
        //}
        //if (opportunity.campaignId === null) {
        //    opportunity.campaignId = 0;
        //}
        //if (opportunity.ownerAlias === null) {
        //    opportunity.ownerAlias = '';
        //}
        //if (opportunity.createdDate === null) {
        //    opportunity.createdDate = '';
        //}

        return opportunity;
    }


    const showAlert = (response) => {

        setState(prevState => ({
            ...prevState,
            showAlert: true,
            alertMessage: response.data?.message
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

                <div className="page-box-icon">
                    <Link to="/opportunities">
                        <i className="icon-star icon-square icon-opportunity"></i>
                    </Link> Opportunities
                </div>
                <div className="page-box-name">{id > 0 ? "Edit" : "New"} Opportunity</div>

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


                        <form onSubmit={handleSubmit(onSubmit)} noValidate >

                            <div className="row p-25">

                                <div className="col-12 col-sm-6">

                                    <div className="row mb-8">
                                        <label htmlFor="ownerId" className="col-sm-4 col-form-label">* Owner</label>
                                        <div className="col-sm-8">

                                            <select id="ownerId" className="form-select"
                                                {...register('ownerId', {
                                                    required: {
                                                        value: true,
                                                        message: "Owner is required"
                                                    },
                                                    validate: value => value > 0 || 'Owner is required'
                                                })} >
                                                <option key="0" value="0">-- None --</option>
                                                {state.people.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.firstName + " " + item.lastName}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="field-validation-error">{errors.ownerId?.message}</div>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="name" className="col-sm-4 col-form-label">* Opportunity Name</label>
                                        <div className="col-sm-8">
                                            <input id="name" type="text" className="form-control"
                                                {...register('name', {
                                                    required: {
                                                        value: true,
                                                        message: "Name is required"
                                                    }
                                                })} />
                                            <div className="field-validation-error">{errors.name?.message}</div>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="isPrivate" className="col-sm-4 col-form-label">Private</label>
                                        <div className="col-sm-8">
                                            <input type="checkbox" id="isPrivate" className="mt-11"
                                                {...register("isPrivate")} ></input>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="accountId" className="col-sm-4 col-form-label">* Account Name</label>
                                        <div className="col-sm-8">
                                            <select id="accountId" className="form-select"
                                                {...register('accountId', {
                                                    valueAsNumber: true,
                                                    required: {
                                                        value: true,
                                                        message: "Account is required"
                                                    },
                                                    validate: value => value > 0 || 'Account is required'
                                                })} >
                                                <option key="0" value="0">-- None --</option>
                                                {state.accounts.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="field-validation-error">{errors.accountId?.message}</div>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="contactId" className="col-sm-4 col-form-label">Contact Name</label>
                                        <div className="col-sm-8">
                                            <select id="contactId" className="form-select"
                                                {...register("contactId", {
                                                    valueAsNumber: true
                                                })}>
                                                <option key="0" value="0">-- None --</option>
                                                {state.contacts.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.firstName + " " + item.lastName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="type" className="col-sm-4 col-form-label">Type</label>
                                        <div className="col-sm-8">
                                            <select id="type" className="form-select"
                                                {...register("type")}>
                                                {state.types.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.text}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="leadSource" className="col-sm-4 col-form-label">Lead Source</label>
                                        <div className="col-sm-8">
                                            <select id="leadSource" className="form-select"
                                                {...register("leadSource")}>
                                                {state.leadSources.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.text}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="description" className="col-sm-4 col-form-label">Description</label>
                                        <div className="col-sm-8">
                                            <textarea id="description" rows="3" className="form-control"
                                                {...register("description")} >
                                            </textarea>
                                        </div>
                                    </div>

                                </div>


                                <div className="col-12 col-sm-6">

                                    <div className="row mb-8">
                                        <label htmlFor="amount" className="col-sm-4 col-form-label">Amount $</label>
                                        <div className="col-sm-8">
                                            <input id="amount" type="text" className="form-control"
                                                {...register("amount", {
                                                    valueAsNumber: true
                                                })} ></input>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="expectedRevenue" className="col-sm-4 col-form-label">Expected Revenue $</label>
                                        <div className="col-sm-8">
                                            <input id="expectedRevenue" type="text" className="form-control"
                                                {...register("expectedRevenue", {
                                                    valueAsNumber: true
                                                })} ></input>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="quantity" className="col-sm-4 col-form-label">Quantity</label>
                                        <div className="col-sm-8">
                                            <input id="quantity" type="text" className="form-control"
                                                {...register("quantity")} ></input>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="nextStep" className="col-sm-4 col-form-label">Next Step</label>
                                        <div className="col-sm-8">
                                            <input id="nextStep" type="text" className="form-control"
                                                {...register("nextStep")}></input>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="closeDate" className="col-sm-4 col-form-label">Close Date</label>
                                        <div className="col-sm-8">
                                            <input id="closeDate" type="text" className="form-control"
                                                {...register("closeDate", {
                                                    valueAsDate: true
                                                })} ></input>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="stage" className="col-sm-4 col-form-label">Stage</label>
                                        <div className="col-sm-8">
                                            <select id="stage" className="form-select"
                                                {...register("stage")}>
                                                {state.stages.map((item) => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.text}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-8">
                                        <label htmlFor="probability" className="col-sm-4 col-form-label">* Probability%</label>
                                        <div className="col-sm-8">
                                            <input id="probability" type="text" className="form-control"
                                                    {...register("probability", {
                                                        valueAsNumber: true,
                                                        required: {
                                                            value: true,
                                                            message: "Probability is required"
                                                        }
                                                })}></input>
                                            <div className="field-validation-error">{errors.probability?.message}</div>
                                        </div>
                                    </div>

                                </div>

                            </div >
                            <div className="button-bar">
                                <input type="submit" className="btn btn-sm btn-light" value='Save' />&nbsp;&nbsp;
                                <Link className="btn btn-sm btn-light" onClick={() => navigate(-1)} >Cancel</Link>
                            </div>

                        </form>

                    </div>
                </React.Fragment>
            )}
            <br />
            <br />

        </React.Fragment>
    );
}

export default Edit;
