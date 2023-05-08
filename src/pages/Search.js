import { CssBaseline, Grid, TablePagination, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CardItem from "../components/CardItem";
import Form from "../components/Form";
import { Divider } from '@mui/material';
import axiosInstance from "../axios";

const Search = () => {

    const [form, setForm] = useState(false);
    const [properties, setPropertries] = useState([]);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const submitForm = (form) => {
        setForm(form);
        setPropertries([]);
        getResults(form);
    }

    const getResults = (form) => {
        setError(error)
        const form_obj = formDataToObj(form);
        console.log(form_obj)
        axiosInstance.get("properties/search", {params: form_obj}, {headers: {"Content-Type": "multipart/form-data"}})
            .then((response) => {
                console.log("Search")
                console.log(form)
                
                setPropertries(response.data.objects);
                console.log("data: ", response.data.objects);
                console.log("data length: ", response.data.objects.length);
            })
            .catch(error => {
                // console.error("Search Error");
                // console.error("Search Error fetching data: ", error);
                console.log("Search Error");
                console.log("Search Error fetching data: ", error);
                setError(error)
            });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let body;

    
    
    // else setError(false);//Too many rerenderers
    if(error !== false) {
        body = <Typography>Error fetching data: {error.message},  {error.code}</Typography>
    } else if(form === false) {
        body = <Typography>Submit form to see results </Typography>
    } else{
        console.log("888888888888 "+properties.length);
        body = (
        <React.Fragment>
            <Grid container spacing={4}>
                {properties.slice((page)*rowsPerPage, (page+1)*rowsPerPage).map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <CardItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <Divider />
            <TablePagination component="div" count={properties.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage}/>
        </React.Fragment>
        )
    }
    return (
        <Grid container spacing={2}>
            <Grid item sm={4}>
                <Form submitForm={submitForm} style={{ position:"fixed", top:0 }} />
            </Grid>
            <Grid item sm={8}>
                {body}
            </Grid>
        </Grid>
        )
    function formDataToObj(form){
        return { 
            province: form.get('province'),
            county: form.get('county'),
            city: form.get('city'),
            district: form.get('district'),
            district_neighbourhood: form.get('district_neighbourhood'),
            street: form.get('street'),
            formatted_address: form.get('formatted_address'),
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



export default Search;