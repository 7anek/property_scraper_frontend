import axios from 'axios';
import history from "./history";


const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:8000/",
    baseURL: process.env.REACT_APP_REAL_ESTATE_API_URL,
    headers: {
        "ngrok-skip-browser-warning": "any" 
    }
    // headers: {
    //     "Authorization": "JWT "+localStorage.getItem('jwt_access_token')
    // }
});

// const AxiosInterceptor = (axiosInstance) => {
// const navigate = useNavigate();

axiosInstance.interceptors.request.use(request => {
    console.log("refresh: " + localStorage.getItem('jwt_refresh_token'));
    console.log(axiosInstance.defaults);
    // console.log('Starting Request', JSON.stringify(request, null, 2));
    //TODO - sprawdzić czy wchodze tu na url signin/refresh/, jeśli tak to tego asuthorization nieustawiam, bo mam wysłać refresh tokena
    if (localStorage.getItem('jwt_access_token')) {
        console.log('jest access token');
        // request.headers["Authorization"] = "JWT "+localStorage.getItem('jwt_access_token');
        request.headers["Authorization"] = "Bearer " + localStorage.getItem('jwt_access_token');
    } else {
        console.log('niema access tokena');
    }
    console.log('Starting Request with Authorization', JSON.stringify(request, null, 2));
    return request
}, (error) => {
    console.log("Axios requesr error: " + error);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    console.log("AxiosInterceptor response successful");
    return response;
}, (error) => {
    console.log("AxiosInterceptor error");
    if (error.hasOwnProperty("response")) {
        // console.log("AxiosInterceptor error "+error+" typ: "+typeof(error)+" status: "+error.response.status);
        if (error.response.status === 401) {
            console.log("AxiosInterceptor unauthorized");
            console.log(error.response);
            console.log(error.response.config.url);
            console.log(axiosInstance.defaults);
            if (error.response.data.detail === "Authentication credentials were not provided.") {
                console.log("request was sended with wrong headers");
                // strona rejestracji i logowania niewymaga wysyłania nagłąwka z Authentication więc z tych stron tutaj nietrafię
                // jeśli ich niedostarczyłem to znaczy że ich niema więc muszę się zalogować
                history.push("/signin");
            } else if (error.response.config.url === "accounts/token/signin/refresh/") {
                console.log("refresh token is not valid or expired - you must log in");
                localStorage.clear();
                // window.location.href="/signin";
                history.push("/signin");
                // return Promise.resolve();
            } else if (error.response.data.detail === "Given token not valid for any token type") {
                console.log("access token propably expired");

                if (localStorage.getItem('jwt_access_token')) {
                    return axiosInstance.post('accounts/token/signin/refresh/', { refresh: localStorage.getItem('jwt_refresh_token') })
                        .then((response) => {
                            console.log("AxiosInterceptor refresh response" + response);
                            localStorage.setItem('jwt_access_token', response.data.access);
                            var new_config = error.config
                            new_config.headers["Authorization"] = response.data.access;
                            console.log(axiosInstance.defaults);
                            // axiosInstance.defaults.url =
                            // 		'JWT ' + response.data.access;
                            return axiosInstance(new_config);
                        })
                        .catch(error => {
                            console.log("Error refreshing access token: ");
                            // console.log(error);
                            return error;
                            // setError(error)
                        })
                }
            }else if (error.response.data.detail === "No active account found with the given credentials"){
                console.log("podano złe dane logowania");
            }else if (error.response.data.code === "user_not_found") {
                console.log("User not found - wylogowywanie i przekierowanie na stronę logowania");
                localStorage.clear();
                history.push("/signin");
            }
            // window.location.href="/signin";
            // navigate('/signin');
        } else if (error.response.status === null) {
            console.log("AxiosInterceptor propably CORS error " + error);
        } else {
            console.log("AxiosInterceptor error " + error);
        }
    } else {
        console.log("AxiosInterceptor error no error.response");
        
    }
    return Promise.reject(error);
});
// }

// AxiosInterceptor(axiosInstance);

export default axiosInstance;

// export default AxiosInterceptor;

