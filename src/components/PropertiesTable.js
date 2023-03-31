import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'service_name',
    headerName: 'Serivice',
    width: 110,
    editable: true,
  },
  {
    field: 'type_of_property',
    headerName: 'Property type',
    width: 110,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 250,
    editable: true,
  },
  {
    field: 'area',
    headerName: 'Area',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
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
  return (
    // <Box sx={{ height: '100vh', width: '100%' }}>
    <Box sx={{ height: (window.innerHeight-64-24-24)+"px", width: '100%' }}>
      <DataGrid
        rows={properties}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}