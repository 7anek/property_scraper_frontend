import { Box, Button, Container, CssBaseline, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from 'react';
import GoogleMapsAutocompleteInput from '../components/GoogleMapsAutocomplete'


export default function Form(props) {

  const [property_type, setPropertyType] = useState("flat");
  const [offer_type, setOfferType] = useState("sell");
  const [flat_type, setFlatType] = useState("any");
  const [house_type, setHouseType] = useState("any");
  const [plot_type, setPlotType] = useState("any");
  const [googleMapsAutocompleteServicePlace, setGoogleMapsAutocompleteServicePlace] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    //wyciągnij dane adresowe
    if(googleMapsAutocompleteServicePlace){
      const placeId = googleMapsAutocompleteServicePlace.place_id;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ placeId }, (results, status) => {

        if (status !== "OK" || results.length === 0) {
          console.log('błąd pobierania lokalizacji po place id')
          props.submitForm(data);
          return;
        }
        console.log('geocoder results',results);
        const placeDetails = results[0];

        data.append("formatted_address", placeDetails.formatted_address);

        var province=placeDetails.address_components.find((component) => component.types.includes('administrative_area_level_1'),);
        var county=placeDetails.address_components.find((component) => component.types.includes('administrative_area_level_2'),);
        var city=placeDetails.address_components.find((component) => component.types.includes('locality'),);
        var district=placeDetails.address_components.find((component) => component.types.includes('sublocality_level_1'),);
        var district_neighbourhood=placeDetails.address_components.find((component) => component.types.includes('sublocality_level_2'),);
        var street=placeDetails.address_components.find((component) => component.types.includes('route'),);

        if(province) data.append("province", province.short_name);
        if(county) data.append("county", county.short_name);
        if(city) data.append("city", city.short_name);
        if(district) data.append("district", district.short_name);
        if(district_neighbourhood) data.append("district_neighbourhood", district_neighbourhood.short_name);
        if(street) data.append("street", street.short_name);
        
        props.submitForm(data);
    });
    }else{
      console.log('form to submit: ',data);
      props.submitForm(data);
    }
    
    
  };

  const handleChange = (event) => {
    if(event.target.name==="propertyType") setPropertyType(event.target.value);
    else if(event.target.name==="offerType") setOfferType(event.target.value);
    else if(event.target.name==="flatType") setFlatType(event.target.value);
    else if(event.target.name==="houseType") setHouseType(event.target.value);
    else if(event.target.name==="plotType") setPlotType(event.target.value);
  };

  const handlePlaceChange = (place) => {
    setGoogleMapsAutocompleteServicePlace(place);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <GoogleMapsAutocompleteInput onValueChange={handlePlaceChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="priceMin"
                label="Price Min"
                name="priceMin"
                InputProps={{
                  endAdornment: <InputAdornment position="start">zł</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="priceMax"
                label="Price Max"
                name="priceMax"
                InputProps={{
                  endAdornment: <InputAdornment position="start">zł</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="areaMin"
                label="Area Min"
                name="areaMin"
                InputProps={{
                  endAdornment: <InputAdornment position="start">m2</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="areaMax"
                label="Area Max"
                name="areaMax"
                InputProps={{
                  endAdornment: <InputAdornment position="start">m2</InputAdornment>,
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="propertyTypeLabel">Property Type</InputLabel>
                <Select
                  labelId="propertyTypeLabel"
                  id="propertyType"
                  label="Property Type"
                  value={property_type}
                  name="propertyType"
                  onChange={handleChange}
                >
                  <MenuItem value={"flat"}>Flat</MenuItem>
                  <MenuItem value={"house"}>House</MenuItem>
                  <MenuItem value={"plot"}>Plot</MenuItem>
                  <MenuItem value={"garage"}>Garage</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="offerTypeLabel">Offer Type</InputLabel>
                <Select
                  labelId="offerTypeLabel"
                  id="offerType"
                  name="offerType"
                  value={offer_type}
                  label="Offer Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"sell"}>Sell</MenuItem>
                  <MenuItem value={"rent"}>Rent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="yearOfConstructionFrom"
                label="Construction Year From"
                name="yearOfConstructionFrom"
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="yearOfConstructionTo"
                label="Construction Year To"
                name="yearOfConstructionTo"
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="flatTypeLabel">Flat Type</InputLabel>
                <Select
                  labelId="flatTypeLabel"
                  id="flatType"
                  name="flatType"
                  value={flat_type}
                  label="Flat Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"any"}>Any</MenuItem>
                  <MenuItem value={"block_of_flats"}>Block of Flats</MenuItem>
                  <MenuItem value={"tenement"}>Tenement</MenuItem>
                  <MenuItem value={"apartament"}>Apartament</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="houseTypeLabel">House Type</InputLabel>
                <Select
                  labelId="houseTypeLabel"
                  id="houseType"
                  name="houseType"
                  value={house_type}
                  label="House Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"any"}>Any</MenuItem>
                  <MenuItem value={"detached_house"}>Detached House</MenuItem>
                  <MenuItem value={"semi_detached_house"}>Semi Detached House</MenuItem>
                  <MenuItem value={"terraced_house"}>Terraced House</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="plotTypeLabel">Plot Type</InputLabel>
                <Select
                  labelId="plotTypeLabel"
                  id="plotType"
                  name="plotType"
                  value={plot_type}
                  label="Plot Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"any"}>Any</MenuItem>
                  <MenuItem value={"building"}>Building</MenuItem>
                  <MenuItem value={"recreational"}>Recreational</MenuItem>
                  <MenuItem value={"agricultural"}>Agricultural</MenuItem>
                  <MenuItem value={"forest"}>Forest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>

    </Container>
  );
}