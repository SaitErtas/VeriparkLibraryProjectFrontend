import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next'
import { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { AddBookType } from "src/types/book/bookTypes";
import userAxios from "src/user-functions/userAxios";

import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from "src/views/forms/form-elements/pickers/PickersCustomInput"

export default function AddBook(props: { openAddBookPopup: boolean, closeAddBookDialog: () => void }) {


  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const { t } = useTranslation()
  const [isLoadingForAddBook, setIsLoadingForAddBook] = useState(false)
  const [addBookType, setAddBookType] = useState<AddBookType>({ isbn: "", name: "", price: 0, publishDate: new Date(), stockAmount: 0 })

  const addBook = async () => {

    setIsLoadingForAddBook(true)
    const resultAxios = await userAxios.post({
      method: 'Books/create-book/',

      data: addBookType

    })
    const responseData = await resultAxios?.data.result

    if (resultAxios?.status == 200) await toast.success(t('Adding book is successfull').toString())

    setAddBookType({ isbn: "", name: "", price: 0, publishDate: new Date(), stockAmount: 0 })
    setIsLoadingForAddBook(false)

    props.closeAddBookDialog()
  }

  const UserDatePickers = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
    return (
      <DatePicker
        selected={addBookType.publishDate}
        id='callback-change'
        popperPlacement={popperPlacement}
        customInput={<CustomInput label='Publish Date' />}
        onChange={(date: Date) => {
          setAddBookType({
            publishDate: date, name: addBookType.name, isbn: addBookType.isbn, price: addBookType.price, stockAmount: addBookType.stockAmount
          })
        }}
      />
    )
  }


  return (
    <Fragment>
      {
        1 == 1 &&

        <Dialog
          fullWidth
          open={props.openAddBookPopup}
          maxWidth='sm'
          scroll='body'
          onClose={() => props.closeAddBookDialog()}
        >
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>



            <Box sx={{}}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{}}>
                  ADD BOOK
                </Typography>

              </Box>
              <Box sx={{ mt: 1, mb: 5 }}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label={t('Name')}
                  value={addBookType.name}
                  onChange={e => {
                    setAddBookType({
                      isbn: addBookType.isbn, name: "" + e.target.value, price: addBookType.price, publishDate: addBookType.publishDate, stockAmount: addBookType.stockAmount
                    })
                  }}
                />
              </Box>
              <Box sx={{ mt: 1, mb: 5 }}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label={t('ISBN')}
                  value={addBookType.isbn}
                  onChange={e => {
                    setAddBookType({
                      isbn: "" + e.target.value, name: addBookType.name, price: addBookType.price, publishDate: addBookType.publishDate, stockAmount: addBookType.stockAmount
                    })
                  }}
                />
              </Box>
              <Box sx={{ mt: 1, mb: 5 }}>
                <TextField
                  fullWidth
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  label={t('Price')}
                  value={addBookType.price}
                  onChange={e => {
                    setAddBookType({
                      price: Number(e.target.value), name: addBookType.name, isbn: addBookType.isbn, publishDate: addBookType.publishDate, stockAmount: addBookType.stockAmount
                    })
                  }}
                />
              </Box>
              <Box sx={{ mt: 1, mb: 5 }}>
                <UserDatePickers popperPlacement={popperPlacement} ></UserDatePickers>
              </Box>
              <Box sx={{ mt: 1, mb: 5 }}>
                <TextField
                  fullWidth
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  label={t('StockAmount')}
                  value={addBookType.stockAmount}
                  onChange={e => {
                    setAddBookType({
                      stockAmount: Number(e.target.value), name: addBookType.name, price: addBookType.price, publishDate: addBookType.publishDate, isbn: addBookType.isbn
                    })
                  }}
                />
              </Box>
            </Box>{' '}
          </DialogContent>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
            {isLoadingForAddBook && (
              <Fragment>
                <CircularProgress color='inherit' size={20} />
              </Fragment>
            )}
            {!isLoadingForAddBook && (
              <Button variant='contained' disabled={isLoadingForAddBook} sx={{ width: "100%" }} color='primary' onClick={async () => {
                setIsLoadingForAddBook(true);
                await addBook();
              }
              }>
                {t('Add Book')}
              </Button>
            )}

            {/* <Typography variant="body2" sx={{ mb: 5, lineHeight: '2rem' }}>
            {console.log(error)}
            {JSON.stringify(error)}
          </Typography> */}



          </DialogActions>

        </Dialog>

      }
    </Fragment >
  )
}
