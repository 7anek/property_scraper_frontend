import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

export default function SignOut(){

    const navigate = useNavigate();

    useEffect(()=>{
        axiosInstance.post('accounts/token/signout/', {"refresh": localStorage.getItem('jwt_refresh_token')})
            .then((response)=>{
                // console.log("response: "+response);
                if(response.status === 200){
                    
                }
            })
            .catch(error => {
                console.error("Error in handling token: ", error);
                // setError(error)
            })
            .finally(()=>{
                console.log('finally');
                localStorage.removeItem('username');
                localStorage.removeItem('jwt_access_token');
                localStorage.removeItem('jwt_refresh_token');
                navigate('/signin');
            })
    });
}