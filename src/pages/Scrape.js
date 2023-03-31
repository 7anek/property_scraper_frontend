import { Grid, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../axios";
import Form from "../components/Form";
import GallserySkeleton from "../components/GallerySkeleton";
import Loading from "../components/Loading";
import PropertiesTable from "../components/PropertiesTable";

const Scrape = () => {

    const [form, setForm] = useState(false);
    const [job_id, setJobId] = useState(false);
    const [error, setError] = useState(false);

    const submitForm = (f) => {
        const form_temp = formDataToObj(f);
        setForm(form_temp);
        setError(false);
        console.log('submited form: ',form)
        console.log('form temp: ',form_temp)
        if(form_temp){
            axios.post("http://127.0.0.1:8000/api/properties/scrape", form_temp, {headers: {"Content-Type": "multipart/form-data"}})
                .then((response) => {
                    setJobId(response.data);
                    console.log("job id: ", job_id);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    setError(error);
                });
        }else{
            console.log("form not submited");
        }
    }

    let body;

    if(error !== false) {
        body = <p>Error fetching data: {error.message},  {error.status_code}</p>
    }
    else if(job_id){
        console.log("xxxxxxxxxxxxxx "+job_id);
        body=<ScrapeResponse job_id={job_id} />
        // body = <p>Scrapping is being processed with job_id {job_id} </p>
    }
    else if(form) {
        body = <Typography>Your form is submitted, your request is being scheduled</Typography>
    }else{
        body = <Typography>Submit form to see results </Typography>
    }
    
    // else setError(false);//Too many rerenderers
    
    console.log("999999999 "+job_id);
    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <Form submitForm={submitForm}/>
            </Grid>
            <Grid item md={8}>
                {body}
            </Grid>
        </Grid>
        )

    function formDataToObj(form){
        return { 
            localization: form.get('localization'),
            price_min: form.get('priceMin') ? parseInt(form.get('priceMin')) : form.get('priceMin'), 
            price_max: form.get('priceMax') ? parseInt(form.get('priceMax')) : form.get('priceMax'), 
            area_min: form.get('areaMin') ? parseInt(form.get('areaMin')) : form.get('areaMin'), 
            area_max: form.get('areaMax') ? parseInt(form.get('areaMax')) : form.get('areaMax'), 
            property_type: form.get('propertyType'),
            offer_type: form.get('offerType'), 
            year_of_construction_from: form.get('yearOfConstructionFrom') ? parseInt(form.get('yearOfConstructionFrom')) : form.get('yearOfConstructionFrom'), 
            year_of_construction_to: form.get('yearOfConstructionTo') ? parseInt(form.get('yearOfConstructionTo')) : form.get('yearOfConstructionTo'),
            flat_type: form.get('flatType') === "any" ? "" : form.get('flatType'),
            house_type: form.get('houseType') === "any" ? "" : form.get('houseType'),
            plot_type: form.get('plotType') === "any" ? "" : form.get('plotType')
        };
        // return Object.fromEntries(form);
    }
}


function ScrapeResponse(props){

    const [properties, setProperties] = useState(false);
    const [error, setError] = useState(false);
    console.log('ScrapeResponse '+properties.length+" job_id "+props.job_id);
    useEffect(() => {
        console.log('ScrapeResponse useEffect '+properties.length+" job_id "+props.job_id);
        const intervalId = setInterval(() => {
        if(props.job_id){
            axiosInstance.get("properties/scrape/"+props.job_id)
            .then((response) => {
                console.log("ScrapeResponse response: ", response);
                if(response.status===200){
                    setProperties(response.data);
                    clearInterval(intervalId);
                }else if(response.status === 202){
                    console.log('response.status 202');
                }
                
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setError(error);
                clearInterval(intervalId);
            })
            .finally(()=>{
                console.log('finally');
            })
        }else{
            console.log("No job_id - spierdalaj");
        }
        },5000);
        return () => clearInterval(intervalId);
    }, [props.job_id]);

    if(error !== false) {
        return <Typography>Error fetching data: {error.message},  {error.status_code}</Typography>
    }
    else if(properties === false){
        return (
        <React.Fragment>
            <Loading />
            <GallserySkeleton />
        </React.Fragment>);
    }else if(properties === []){
        return <Typography>No results, expand your search criteria</Typography>
    }
    else if(properties) {
       return <PropertiesTable properties={properties}/>
    }

}


export default Scrape;