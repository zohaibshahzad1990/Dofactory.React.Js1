import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7081/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

//axiosInstance.interceptors.request.use(
//    (config) => {
//        if (!config.headers.authToken) {
//            const authToken = localStorage.getItem("token");
//            //const storeId = localStorage.getItem("storeId");
//            config.headers.authToken = authToken ? authToken : "";
//            //config.headers.storeId = storeId ? storeId : "";
//        }
//        return config;
//    },
//    (error) => {
//        return Promise.reject(error);
//    },
//);

//axiosInstance.interceptors.response.use(
//    (config) => {
//        if (!config.headers.authToken) {
//            const authToken = localStorage.getItem("token");
//            //config.headers.authToken = authToken ? authToken : "";
            
//        }
//        return config;
//    },
//    (error) => {
//        return Promise.reject(error);
//    },
//);

//const getData = async (path) => {
//    try {
//        const response = await axiosInstance.get(path);
//        return {
//            status: response.status,
//            data: response.data,
//        };
//    } catch (error) {
//        if (error.response) {
//            if (error.response.status === 403 || error.response.status === 401) {
//                window.location.href = "/";
//                localStorage.clear();
//            }
//            return {
//                status: error.response.status,
//                data: error.response.data.error,
//            };

//        }
//    }
//};

const postData = async (path, data) => {
    try {
        const response = await axiosInstance.post(path, JSON.stringify(data));
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            return {
                status: -1, // Or any code to indicate timeout
                data: 'Request timed out',
            };
        }
        if (error.code === 'ERR_NETWORK') {
            return {
                status: -1, // Or any code to indicate network error
                data: 'Network error',
            };
        }
        if (error.response) {
            return {
                status: error.response.status,
                data: error.response.data.error,
            };
        }
    }
};
            //if (error.response.status === 403 || error.response.status === 401) {
            //    window.location.href = "/";  // Unauthorized: back to start
            //    localStorage.clear();
            //}

export { postData as post }; // getData as get,