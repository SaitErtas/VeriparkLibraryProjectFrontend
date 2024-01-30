import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next'
import { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast";
import userAxios from "src/user-functions/userAxios";

import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import CustomInput from "src/views/forms/form-elements/pickers/PickersCustomInput"
import { UpdateBookType } from "src/types/book/bookTypes";

export default function UpdateBook(props: { openUpdateBookPopup: boolean, closeUpdateBookDialog: () => void, updateBookItem: UpdateBookType }) {


  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const { t } = useTranslation()
  const [isLoadingForAddBook, setIsLoadingForAddBook] = useState(false)
  const [updateBookItem, setUpdateBookType] = useState<UpdateBookType>({
    id: props.updateBookItem.id, isbn: props.updateBookItem.isbn,
    name: props.updateBookItem.name, price: props.updateBookItem.price, publishDate: new Date(props.updateBookItem.publishDate),
    stockAmount: props.updateBookItem.stockAmount
  })


  useEffect(() => {
    console.log("props:", props)
    setUpdateBookType({
      id: props.updateBookItem.id, isbn: props.updateBookItem.isbn, name: props.updateBookItem.name, price: props.updateBookItem.price,
      publishDate: new Date(props.updateBookItem.publishDate),
      stockAmount: props.updateBookItem.stockAmount
    })
  }, [props])

  const updateBook = async () => {

    setIsLoadingForAddBook(true)
    const resultAxios = await userAxios.post({
      method: 'Books/update-book/',

      data: updateBookItem

    })
    const responseData = await resultAxios?.data.result

    if (resultAxios?.status == 200) await toast.success(t('Updating book is successfull').toString())

    setUpdateBookType({ id: 0, isbn: "", name: "", price: 0, publishDate: new Date(), stockAmount: 0 })
    setIsLoadingForAddBook(false)

    props.closeUpdateBookDialog()
  }

  const UserDatePickers = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
    return (
      <DatePicker

        selected={updateBookItem.publishDate}
        id='callback-change'
        popperPlacement={popperPlacement}
        customInput={<CustomInput label='Publish Date' />}
        onChange={(date: Date) => {
          setUpdateBookType({
            id: updateBookItem.id, publishDate: date, name: updateBookItem.name, isbn: updateBookItem.isbn, price: updateBookItem.price, stockAmount: updateBookItem.stockAmount
          })
        }}
      />
    )
  }


  return (
    <Fragment>
      {
        props &&

        <Dialog
          fullWidth
          open={props.openUpdateBookPopup}
          maxWidth='sm'
          scroll='body'
          onClose={() => props.closeUpdateBookDialog()}
        >
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>



            <Box sx={{}}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{}}>
                  UPDATE BOOK
                </Typography>

              </Box>
              <Box sx={{ mt: 1, mb: 5 }}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label={t('Name')}
                  value={updateBookItem.name}
                  onChange={e => {
                    setUpdateBookType({
                      id: props.updateBookItem.id, isbn: updateBookItem.isbn, name: "" + e.target.value, price: updateBookItem.price, publishDate: updateBookItem.publishDate, stockAmount: updateBookItem.stockAmount
                    })
                  }}
                />
              </Box>
              <Box sx={{ mt: 1, mb: 5 }}>
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label={t('ISBN')}
                  value={updateBookItem.isbn}
                  onChange={e => {
                    setUpdateBookType({
                      id: props.updateBookItem.id, isbn: "" + e.target.value, name: updateBookItem.name, price: updateBookItem.price, publishDate: updateBookItem.publishDate, stockAmount: updateBookItem.stockAmount
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
                  value={updateBookItem.price}
                  onChange={e => {
                    setUpdateBookType({
                      id: props.updateBookItem.id, price: Number(e.target.value), name: updateBookItem.name, isbn: updateBookItem.isbn, publishDate: updateBookItem.publishDate, stockAmount: updateBookItem.stockAmount
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
                  value={updateBookItem.stockAmount}
                  onChange={e => {
                    setUpdateBookType({
                      id: props.updateBookItem.id, stockAmount: Number(e.target.value), name: updateBookItem.name, price: updateBookItem.price, publishDate: updateBookItem.publishDate, isbn: updateBookItem.isbn
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
                await updateBook();
              }
              }>
                {t('Update Book')}
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
