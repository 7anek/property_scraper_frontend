import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktopScreen = useMediaQuery(theme.breakpoints.up('md'));

  // const isMobileScreen = useMediaQuery('(max-width: 600px)');
  let tableWidth = 'calc(100% - 48px)'; // Domyślna szerokość dla desktopu

  if (isMobileScreen) {
    tableWidth = 'calc(100vw - 48px)'; // Szerokość dla smartfona
  } else if (isTabletScreen) {
    tableWidth = 'calc(100vw - 48px - 240px)'; //minus paddingi i menu boczne
  }
  // const tableWidth = isMobileScreen
  //   ? 'calc(100vw - 48px)'
  //   : `calc(100% - 48px)`; // 48px to suma marginesów na bokach
  return (
    // <Box sx={{ height: '100vh', width: '100%' }}>
    //- top menu i marginesy
    <Box sx={{ height: (window.innerHeight-64-24-24)+"px", width: tableWidth, maxWidth: '100%' }}>
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