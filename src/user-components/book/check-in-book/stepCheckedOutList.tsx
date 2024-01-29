// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Theme, styled } from '@mui/material/styles'
import List, { ListProps } from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { GridColDef, DataGrid, GridToolbar, GridRowParams } from '@mui/x-data-grid'
import { BookCheckInOutType } from 'src/types/check-in-out/checkInOutTypes'
import { Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

interface CellType {
  row: BookCheckInOutType
}


const StyledList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))




const StepCheckedOutList = (props: { handleNext: () => void, bookCheckInOutList: BookCheckInOutType[] | undefined, setBookCheckInOutItem: any }) => {
  const breakpointMD = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'lg'))

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })



  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'id',
      headerName: 'Id',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.id}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'userName',
      headerName: 'UserName',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.userName}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'tckn',
      minWidth: 150,
      headerName: 'Tckn',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.tckn}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'PhoneNumber',
      field: 'phoneNumber',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='subtitle1' noWrap >
            {row.phoneNumber}
          </Typography>
        )
      }
    },

  ]



  function handleRowClick(row: any) {
    props.setBookCheckInOutItem(row);
    props.handleNext();
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} xl={12} lg={12} sm={12} >
        {
          props.bookCheckInOutList && <DataGrid
            autoHeight
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            onRowClick={async (e) => handleRowClick(e.row)}
            rows={props.bookCheckInOutList}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        }
      </Grid>
    </Grid>
  )
}

export default StepCheckedOutList
