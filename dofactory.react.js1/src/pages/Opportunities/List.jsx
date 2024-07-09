import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { get, deleteData } from "/src/utils/clients/AppClient";

import { formatCurrency, formatDate } from "/src/utils/helpers/formatting";

// lookup and filters
import opportunityFilters from "/src/assets/json/opportunityFilters.json";
import opportunityStages from "/src/assets/json/opportunityStages.json";

// controls
import Pager from "/src/components/pagination/Pager";
import Filter from "/src/components/pagination/Filter";
import Sorter from "/src/components/pagination/Sorter";

import Loading from "/src/components/Loading";
import Alert from "/src/components/Alert";
import Delete from "/src/components/Delete";


export const List = () => {

    console.log("init opportunities")

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();



    const pageValue = searchParams.get('page'.toLowerCase()) || '1';
    const pageSizeValue = searchParams.get('pageSize'.toLowerCase()) || '15';
    const sortValue = searchParams.get('sort'.toLowerCase()) || '-id';
    const filterValue = searchParams.get('filter'.toLowerCase()) || '0';
    const searchValue = searchParams.get('search'.toLowerCase()) || '';
    const advancedFilterValue = searchParams.get('advancedfilter'.toLowerCase()) == 'true' ? true : false;

    

    const [state, setState] = useState({
        advancedFilter: advancedFilterValue,
        filters: [],

        page: pageValue,
        pageSize: pageSizeValue,
        sort: sortValue,
        filter: filterValue,
        search: searchValue,

        opportunities: [],
        accounts: [],
        contacts: [],
        people: [],

        // Advanced filter
        name: "",
        contactId: 0,
        accountId: 0,
        ownerId: 0,
        stage: '',
        stages: [],

        totalRows: 0,
        totalPages: 0,

        showDelete: false,
        deleteName: '',
        deleteId: 0,

        showAlert: false,
        alertMessage: '',

        isLoading: true
    });

    useEffect(() => {  // Runs once 

        document.title = "Opportunities";

        decompressSearch();

        const filters = opportunityFilters.map((item) => {

            return {
                value: item.value,
                text: item.text
            };
        });

        const stages = opportunityStages.map((item) => {
            return {
                value: item.value,
                text: item.text
            };
        });
        setState((prevState) => ({
            ...prevState,
            filters: filters,
            stages: stages
        }));

        console.log('effect: once')

    }, []);

    useEffect(() => { // Runs when page, sort, or filter changes

        setState((prevState) => ({
            ...prevState,
            isLoading: true
        }));

        fetchOpportunities()

        console.log('effect: fetch')

    }, [state.page, state.pageSize, state.sort, state.filter, state.search]);

    useEffect(() => {

        // Runs when filter mode changes

        fetchAccounts();
        fetchContacts();
        fetchPeople();

        console.log('effect: advanced')
        //updateQueryString()

    }, [state.advancedFilter]);

    const buildQueryString = () => {

        const params = new URLSearchParams();

        params.append('page', state.page);
        params.append('pageSize', state.pageSize);
        params.append('sort', state.sort);
        params.append('filter', state.filter);
        params.append('search', state.search);
        params.append('advancedfilter', state.advancedFilter);

        return "?" + params.toString();
    }

    const fetchOpportunities = async () => {

        const queryString = buildQueryString();
        const response = await get("/opportunities" + queryString);

        if (response?.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                opportunities: result.data,
                totalRows: result.totalRows,
                totalPages: Math.ceil(result.totalRows / prevState.pageSize),

                isLoading: false
            }));

            // Update browser querystring
            navigate({ search: queryString });
        }
        else {

            showAlert(response);
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
        }
    };

    const compressSearch = () => {

        let search = "";

        if (state.advancedFilter) {

            const dictionary = {};

            if (state.name.length > 0) { dictionary.name = state.name; }
            if (state.contactId > 0) { dictionary.contactId = state.contactId; }
            if (state.accountId > 0) { dictionary.accountId = state.accountId; }
            if (state.ownerId > 0) { dictionary.ownerId = state.ownerId; }
            if (state.stage.length > 0) { dictionary.stage = state.stage; }

            const keyValuePairs = Object.entries(dictionary)
                .map(([key, value]) => `${key}:${value}`);

            search = keyValuePairs.join(",");
        }

        setState(prevState => ({
            ...prevState,
            search: search
        }));
    }

    const decompressSearch = () => {

        if (state.advancedFilter && state.search.length > 0) {

            const pairs = state.search.split(",");

            for (const pair of pairs) {
                const tokens = pair.split(":");
                if (tokens.length < 2) continue;

                const key = tokens[0].trim().toLowerCase();
                const value = tokens[1].trim();

                if (!(key.length > 0 && value.length > 0)) continue;

                let name = "";
                let contactId = 0;
                let accountId = 0;
                let ownerId = 0;
                let stage = "";

                switch (key) {
                    case "name": name = value; break;
                    case "contactid": contactId = parseInt(value); break;
                    case "accountid": accountId = parseInt(value); break;
                    case "ownerid": ownerId = parseInt(value); break;
                    case "stage": stage = value; break;
                    default: break;
                }

                setState(prevState => ({
                    ...prevState,
                    name: name,
                    contactId: contactId,
                    accountId: accountId,
                    ownerId: ownerId,
                    stage: stage
                }));
            }
        }
    }

    const handleFilterChange = (filter) => {

        setState((prevState) => ({
            ...prevState,
            filter: filter,
            page: 1
        }));
    }

    const handlePageChange = (page) => {

        setState((prevState) => ({
            ...prevState,
            page: page
        }));
    }

    const handleSortClick = (sort) => {

        setState((prevState) => ({
            ...prevState,
            sort: sort,
            page: 1
        }));
    }

    const toggleAdvancedFilter = () => {

        setState((prevState) => ({
            ...prevState,
            advancedFilter: !prevState.advancedFilter,
            filter: 0,
            page: 1,

            name: '',
            contactId: 0,
            accountId: 0,
            ownerId: 0,
            stage: '',
            search: ''
        }));
    }

    const handleAdvancedFilter = () => {

        compressSearch();
    }

    const handleAdvancedReset = () => {

        setState(prevState => ({
            ...prevState,

            name: '',
            contactId: 0,
            accountId: 0,
            ownerId: 0,
            stage: '',
            search: '',

            page: 1
        }));
    }

    const onNameChange = (event) => {

        setState((prevState) => ({
            ...prevState,
            name: event.target.value
        }));
    }

    const onOwnerChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            ownerId: event.target.value
        }));
    }

    const onContactChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            contactId: event.target.value
        }));
    }

    const onAccountChange = (event) => {

        setState((prevState) => ({
            ...prevState,
            accountId: event.target.value
        }));
    }

    const onStageChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            stage: event.target.value
        }));
    }

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

    const showDelete = (opportunity) => {
        setState(prevState => ({
            ...prevState,
            showDelete: true,
            deleteName: opportunity.name,
            deleteId: opportunity.id,
        }));
    }

    const hideDelete = () => {
        setState(prevState => ({
            ...prevState,
            showDelete: false,
            deleteName: '',
            deleteId: 0,
        }));
    }

    const deleteOpportunity = async () => {
        
        const response = await deleteData("/opportunities", state.deleteId);

        if (response?.status === 200) {

            await fetchOpportunities();
        }

        hideDelete();
    }

    return (

        <React.Fragment>

            <div className="page-box">

                <div className="d-flex">
                    <div className="page-box-icon">
                        <Link to="/opportunities">
                            <i className="icon-star icon-square icon-opportunity"></i>
                        </Link> Opportunities
                    </div>

                    <div className="ms-auto page-box-new-button-top">
                        <Link className="btn btn-sm btn-light" to="/opportunities/edit"> New </Link>
                    </div>

                    <div className="btn-group filter-buttons" data-bs-toggle="buttons">
                        <button type="button" onClick={toggleAdvancedFilter} className={`standard-toggle btn btn-sm btn-light ${!state.advancedFilter && 'active'}`} title='Standard Filter'><img src="/img/list.svg" width="18" /></button>
                        <button type="button" onClick={toggleAdvancedFilter} className={`standard-toggle btn btn-sm btn-light ${state.advancedFilter && 'active'}`} title='Advanced Filter'><img src="/img/filter.svg" width="18" /></button>
                    </div>

                </div>

                <div id="standard-filter" className={`${state.advancedFilter && 'd-none'}`} >

                    <div className="d-flex">
                        <div className="page-box-filter">

                            <Filter value={state.filter} items={state.filters} onChange={handleFilterChange} />
                        </div>
                        <div className="page-box-items">{state.totalRows} &nbsp;Items</div>
                    </div>

                </div>

                <div id="advanced-filter" className={`${state.advancedFilter || 'd-none'}`}>

                    <div className="row mt-17">

                        <div className="col-4">
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-4 col-form-label">Opp. Name</label>
                                <div className="col-sm-8">
                                    <input type="text" id="name" name="name" value={state.name} onChange={onNameChange} className="form-control"></input>
                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="form-group row">
                                <label htmlFor="contactId" className="col-sm-4 col-form-label">Contact Name</label>
                                <div className="col-sm-8">

                                    <select id="contactId" name="contactId" value={state.contactId} onChange={onContactChange} className="form-select">
                                        <option value="0">-- None --</option>
                                        {state.contacts.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.firstName + " " + item.lastName}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div className="col-4 pr-130">
                            <div className="form-group row">
                                <label htmlFor="stage" className="col-sm-4 col-form-label">Stage</label>
                                <div className="col-sm-8">
                                    <select id="stage" name="stage" value={state.stage} onChange={onStageChange} className="form-select">
                                        {state.stages.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-10 mb-15">
                        <div className="col-4">
                            <div className="form-group row">
                                <label htmlFor="accountId" className="col-sm-4 col-form-label">Account</label>
                                <div className="col-sm-8">

                                    <select id="accountId" name="accountId" value={state.accountId} onChange={onAccountChange} className="form-select">
                                        <option value="0">-- None --</option>
                                        {state.accounts.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="form-group row">
                                <label htmlFor="ownerId" className="col-sm-4 col-form-label">Owner Name</label>
                                <div className="col-sm-8">

                                    <select id="ownerId" name="ownerId" value={state.ownerId} onChange={onOwnerChange} className="form-select">
                                        <option value="0">-- None --</option>
                                        {state.people.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.firstName + " " + item.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="col-4">
                            <div className="pt-3 pl-30">
                                <button type="button" className="btn btn-light btn-sm" onClick={handleAdvancedFilter}> Filter </button>&nbsp;
                                <button type="button" className="btn btn-light btn-sm" onClick={handleAdvancedReset}> Reset </button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="page-box-items-advanced">{state.totalRows} &nbsp;Items</span>
                            </div>
                        </div>
                    </div >

                </div>

            </div>

            <div className="row p-10">
                <div className="col-12">

                    {state.isLoading ? (
                        <Loading />

                    ) : (

                        <React.Fragment>

                            <Alert
                                show={state.showAlert}
                                message={state.alertMessage}
                                onClose={hideAlert}
                            />

                            <Delete
                                show={state.showDelete}
                                name={state.deleteName}
                                onCancel={hideDelete}
                                onDelete={deleteOpportunity}
                            />

                            <table className="table table-list table-sm table-hover">
                                <thead>

                                    <tr>
                                        <th><Sorter sort={state.sort} sortBy="name" onClick={handleSortClick}>Opportunity&nbsp;Name</Sorter></th>
                                        <th><Sorter sort={state.sort} sortBy="accountname" onClick={handleSortClick}>Account&nbsp;Name</Sorter></th>
                                        <th className="text-end pr-10 pr-sm-40"><Sorter sort={state.sort} sortBy="amount" onClick={handleSortClick}>Amount</Sorter></th>
                                        <th><Sorter sort={state.sort} sortBy="closedate" onClick={handleSortClick}>Close&nbsp;Date</Sorter></th>
                                        <th><Sorter sort={state.sort} sortBy="stage" onClick={handleSortClick}>Stage</Sorter></th>
                                        <th><Sorter sort={state.sort} sortBy="probability" onClick={handleSortClick}>Probability</Sorter></th>
                                        <th><Sorter sort={state.sort} sortBy="owneralias" onClick={handleSortClick}>Owner</Sorter></th>
                                        <th></th>
                                    </tr>

                                </thead>
                                <tbody>

                                    {state.opportunities.length == 0 && (
                                        <tr>
                                            <td className="no-items" colspan="7">No records to display</td>
                                        </tr>
                                    )}

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
                                            <td className='text-end'>
                                                <Link className="btn btn-xs btn-light" to={`/opportunities/edit/${item.id}`}>Edit</Link>&nbsp;
                                                <Link className="btn btn-xs btn-light" onClick={() => showDelete(item)}>Delete</Link>&nbsp; &nbsp;
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                            <Pager page={state.page} totalPages={state.totalPages} onChange={handlePageChange} />

                        </React.Fragment>

                    )}

                    <br></br>
                </div>
            </div>

        </React.Fragment >

    );
}

export default List;
