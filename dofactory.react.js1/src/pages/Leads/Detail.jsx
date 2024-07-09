import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; 
import { get } from "/src/utils/clients/AppClient";

export const Detail = () => {

    console.log("init detail")

    const { id } = useParams();

    const [state, setState] = useState({
        id: id,
        lead: null,

        //showAlert: false,
        //alertMessage: '',

        isLoading: true
    });

    useEffect(() => { // Runs when page, sort, or filter changes

        setState((prevState) => ({
            ...prevState,
            isLoading: true
        }));

        fetchLead();

        console.log('effect: fetch')

    }, [state.id]);

    const fetchLead = async () => {

        const response = await get("/leads/" + id);

        if (response?.status === 200) {

            const result = response.data;

            setState(prevState => ({
                ...prevState,
                lead: result.data,

                isLoading: false
            }));
        } else {

        }
    }


    return <div>Lead Detail</div>
};

export default Detail;
