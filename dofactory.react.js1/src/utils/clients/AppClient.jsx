import axios from "axios";
import { jwtDecode } from "jwt-decode";
//import { useNavigate } from 'react-router-dom';
//import useAuth from "/src/utils/auth/useAuth";


const axiosInstance = axios.create({
    baseURL: "https://localhost:7081/api/v2/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

//axiosInstance.interceptors.request.use(
//    (config) => {
//        if (!config.headers.authToken) {
//            const authToken = localStorage.getItem("token");
//            const storeId = localStorage.getItem("storeId");
//            config.headers.authToken = authToken ? authToken : "";
//            config.headers.storeId = storeId ? storeId : "";
//        }
//        return config;
//    },
//    (error) => {
//        return Promise.reject(error);
//    },
//);

axiosInstance.interceptors.response.use(
    (response) => {
        const token = localStorage.getItem('token');

        if (token && isTokenExpired(token)) {

            // Token has expired. Back to login

            localStorage.clear();
            window.location.href = "/login";  
            
            throw new Error('Token expired');
        }

        return response; // Return the unmodified response object
    },
    (error) => {
        return Promise.reject(error); // Pass the error to the next catch block
    }
);


const isTokenExpired = (token) => {

    const decodedToken = jwtDecode(token);
    if (decodedToken.exp < Date.now() / 1000) {
        return true;
    }
    return false;
}

const getData = async (path) => {
    try {
        const response = await axiosInstance.get(path);
        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/";  // Unauthorized: back to start
                localStorage.clear();
            }
            return {
                status: error.response.status,
                data: error.response.data
            };
        }
    }
};

const postData = async (path, data) => {
    try {
        const response = await axiosInstance.post(path, JSON.stringify(data));
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/";  // Unauthorized: back to start
                localStorage.clear();
            }
            return {
                status: error.response.status,
                data: error.response.data
            };
        }
    }
};

const putData = async (path, id, data) => {
    try {
        //const d = {
        //    "id": 0,
        //    "name": "string",
        //    "accountId": 0,
        //    "accountName": "string",
        //    "contactId": 0,
        //    "contactName": "string",
        //    "type": "string",
        //    "leadSource": "string",
        //    "amount": 0,
        //    "expectedRevenue": 0,
        //    "quantity": "string",
        //    "nextStep": "string",
        //    "probability": 100,
        //    "stage": "string",
        //    "closeDate": "2024-06-27T05:07:42.571Z",
        //    "isPrivate": true,
        //    "isClosed": true,
        //    "description": "string",
        //    "campaignId": 0,
        //    "ownerId": 0,
        //    "ownerAlias": "string",
        //    "createdDate": "2024-06-27T05:07:42.571Z",
        //    "stageHistories": []
        //};


        const json = JSON.stringify(data);
        const response = await axiosInstance.put(`${path}/${id}`,json);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/";  // Unauthorized: back to start
                localStorage.clear();
            }
            return {
                status: error.response.status,
                data: error.response.data
            };
        }
    }
};

const deleteData = async (path, id) => {
    try {
        const response = await axiosInstance.delete(`${path}/${id}`);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                window.location.href = "/";  // Unauthorized: back to start
                localStorage.clear();
            }
            return {
                status: error.response.status,
                data: error.response.data
            };
        }
    }
};

export { getData as get, postData as post, putData as put, deleteData };