import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    id: 1,
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    id: 2,
    field: 'area',
    headerName: 'Area',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
    id: 3,
    field: 'address',
    headerName: 'address',
    width: 250,
    editable: true,
  },
  {
    id: 4,
    field: 'service_name',
    headerName: 'Serivice',
    width: 110,
    editable: true,
  },
  {
    id: 5,
    field: 'service_url',
    headerName: 'URL',
    width: 110,
    editable: true,
  },
  {
    id: 6,
    field: 'property_type',
    headerName: 'Property type',
    width: 110,
    editable: true,
  },
  {
    id: 7,
    field: 'offer_type',
    headerName: 'Offer type',
    width: 110,
    editable: true,
  },
  {
    id: 8,
    field: 'modify_date',
    headerName: 'Last Update',
    type: 'dateTime',
    width: 150,
    valueGetter: ({ value }) => value && new Date(value),
    editable: true,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];



export default function PropertiesTable({properties}) {
  const getRowId = (row) => row.id;
  return (
    // <Box sx={{ height: '100vh', width: '100%' }}>
    <Box sx={{ height: (window.innerHeight-64-24-24)+"px", width: '100%' }}>
      <DataGrid
        rows={properties}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={15}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}