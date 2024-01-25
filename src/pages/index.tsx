// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'


// ** Third Party Components
import axios from 'axios'

import UserAxiosHeader from 'src/configs/userAxiosHeader'

import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { BookListType } from 'src/types/book/bookTypes'
import { AppDispatch, RootState } from 'src/store'
import userAxios from 'src/user-functions/userAxios'
import toast from 'react-hot-toast'
import auth from 'src/configs/auth'
import { useRouter } from 'next/router'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Button, useTheme } from '@mui/material'
import AddBook from './books/add/AddBook'

interface CellType {
  row: BookListType
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))


const RowOptions = ({ id }: { id: number | string }) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleCheckIn = () => {

    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/user/view/overview/'
        >
          <Icon icon='mdi:book-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:check-outline' fontSize={20} />
          CheckOut
        </MenuItem>
        <MenuItem onClick={handleCheckIn} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='icon-park:check-in' fontSize={20} />
          CheckIn
        </MenuItem>
      </Menu>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'isbn',
    headerName: 'ISBN',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.isbn}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 150,
    headerName: 'stockAmount',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.stockAmount}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'CheckOutAmount',
    field: 'checkOutAmount',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='subtitle1' noWrap >
          {row.checkOutAmount}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const Home = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [openAddBookPopup, setOpenAddBookPopup] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })


  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const [bookList, setBookList] = useState<BookListType[]>()
  const router = useRouter()

  // ** Hooks

  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'



  useEffect(() => {
    getBookList()
  }, [])




  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const getBookList = async () => {
    setLoading(true)
    const resultAxios = await userAxios.get({
      method: 'Books/list/'
    })
    const responseData = await resultAxios?.data.result

    console.log("responseData:", responseData)
    setBookList(responseData.books);
    setLoading(false)
  }


  return (

    <Grid container spacing={6} sx={{ justifyContent: 'center', mt: 2 }}>

      <Grid item xs={12} xl={8} lg={8} sm={8}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{}}>
                VERİPARK LIBRARY PROJECT
              </Typography>

            </Box>
          </CardContent>
        </Card>

      </Grid>

      <Grid item xs={12} xl={8} lg={8} sm={8}>
        <Card>
          <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              BOOKS
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button sx={{ mb: 2 }} onClick={() => setOpenAddBookPopup(true)} variant='contained'>
                Add Book
              </Button>
            </Box>
          </Box>
          {

            bookList && <DataGrid
              autoHeight
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              rows={bookList}
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
        </Card>

      </Grid>



      <AddBook openAddBookPopup={openAddBookPopup} setOpenAddBookPopup={setOpenAddBookPopup} ></AddBook>
    </Grid >

  )
}


Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Home.guestGuard = true

export default Home
