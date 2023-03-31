import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import Loading from "../components/Loading";
import PropertiesTable from "../components/PropertiesTable";
import TableSkeleton from "../components/TableSkeleton";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [properties, setPropertries] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axiosInstance.get("properties/")
            .then((response) => {
                console.log("handling successful response in Home");
                console.log(localStorage.getItem("username"));
                console.log(localStorage.getItem("jwt_access_token"));
                console.log(localStorage.getItem("jwt_refresh_token"));
                // if(response){
                    setPropertries(response.data);
                    console.log("data: ", response.data);
                // }
                
            })
            .catch(error => {
                console.log("handling error in Home");
                console.log("Home Error fetching data: ", error);
                // console.error("Error response: ", error.response);
                // setError(error)
            })
            .finally(() => {
                setLoading(false);
            });
        
    }, [setLoading])//odpal poraz drugi useEffect jeśli loading się zmieni

    if(loading){ 
        return (
        <React.Fragment>
            <Loading />
            <TableSkeleton />
        </React.Fragment>);
    }
    // if(error !== false) return <Typography>Error fetching data: {error}</Typography>
    return <PropertiesTable properties={properties}/>
};

export default Home;