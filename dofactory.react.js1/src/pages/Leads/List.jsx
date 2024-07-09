import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { get } from "/src/utils/clients/AppClient";
import { formatCurrency, formatDate } from "/src/utils/helpers/formatting";
import filterData from "/src/assets/json/leadFilters.json";

import Pager from "/src/components/pagination/Pager";
import Filter from "/src/components/pagination/Filter";
import Sorter from "/src/components/pagination/Sorter";

export const List = () => {

    console.log("init leads")

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [state, setState] = useState({
        //advancedFilter: false,
        filters: [],

        //page: useState(searchParams.get('page') || '1'),
        //pageSize: useState(searchParams.get('pageSize') || '15'),
        //sort: useState(searchParams.get('sort') || '-id'),
        filter: '0',

        leads: [],
        //accounts: [],
        //contacts: [],
        //people: [],

        totalRows: 0
    });


    useEffect(() => {
        document.title = "Leads";

        const filters = filterData.map((item) => {
            return {
                value: item.value,
                text: item.text
            };
        });

        setState((prevState) => ({
            ...prevState,
            filters: filters
        }));

        fetchLeads();

    }, []);

    useEffect(() => {

        fetchLeads();

    }, [state.filter]);

    const handleFilterChanged = (event) => {

       // alert(event.target.value)
        //setFilter(event.target.value);
        setState((prevState) => ({
            ...prevState,
            filter: event.target.value
        }));

        
        //updateQueryString();

        //getOpportunities();
        //setSearchParams((prevParams) => ({
        //    ...prevParams,
        //    filter: event.target.value
        //}));


        //setState(prevState => ({
        //    ...prevState,
        //    filter: event.target.value
        //}));
    }

    const fetchLeads = async () => {

        const queryString = `?filter=${state?.filter}`; // `?page=${page}&pageSize=${pageSize}&sort=${sort}filter=${filter}&`;
        //alert(queryString)
        const response = await get("/leads" + queryString);

        if (response.status === 200) {

            setState(prevState => ({
                ...prevState,
                leads: response.data.data,
            }));
        }
    };

    return (
        <React.Fragment>
            <div className="page-box">
                <div className="d-flex">
                    <div className="page-box-icon">
                        <Link to="/leads">
                            <i className="icon-star icon-square icon-lead"></i>
                        </Link> Leads
                    </div>

                    <div className="ms-auto page-box-new-button-top">
                        <Link className="btn btn-sm btn-light" to="/leads/edit"> New </Link>
                    </div>

                    <div className="btn-group filter-buttons" data-bs-toggle="buttons">
                        <button type="button" onClick={null} className={`standard-toggle btn btn-sm btn-light active`} title='Standard Filter'><img src="/img/list.svg" width="18" /></button>
                        <button type="button" onClick={null} className={`standard-toggle btn btn-sm btn-light`} title='Advanced Filter'><img src="/img/filter.svg" width="18" /></button>
                    </div>

                </div>

                <div id="standard-filter" className={``} >

                    <div className="d-flex">
                        <div className="page-box-filter">

                            <select name="filter-value" onChange={handleFilterChanged} className="form-select width-240">

                                {state.filters.map((item) => (
                                    <option key={item.value} value={item.value} >
                                        {item.text}
                                    </option>
                                ))}

                            </select>


                        </div>
                        <div className="page-box-items">{state.totalRows} &nbsp;Items</div>
                    </div>
                </div>
            </div>

            <div className="row p-10">
                <div className="col-12">

                    <table className="table table-list table-sm table-hover">
                        <thead>
                            <tr>
                                <th>Lead Name</th>
                                <th>Title</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.leads.map((item) => (
                                <tr key={item.id}>
                                    <td><a className="table-list-link" href={"/leads/" + item.id}>{item.firstName + " " + item.lastName}</a></td>
                                    <td>{item.title}</td>
                                    <td>{item.company}</td>
                                    <td>{item.email}</td>
                                    <td>{item.rating}</td>
                                    <td>{item.status}</td>
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
    );
}

export default List;