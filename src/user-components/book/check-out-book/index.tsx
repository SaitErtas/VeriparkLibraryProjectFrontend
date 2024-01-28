import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next'
import { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast";
import userAxios from "src/user-functions/userAxios";
import { CheckOutType } from "src/types/check-in-out/checkInOutTypes";
import { BookListItemType } from "src/types/book/bookTypes";
import { ReactDatePickerProps } from "react-datepicker";

export default function CheckOutBook(props: { openCheckOutBookPopup: boolean, closeCheckOutBookDialog: () => void, bookListItem: BookListItemType }) {


  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const { t } = useTranslation()
  const [isLoadingForCheckOutBook, setIsLoadingForCheckOutBook] = useState(false)
  const [checkOutBookType, setCheckOutBookType] = useState<CheckOutType>({ bookId: props.bookListItem.id, bookName: props.bookListItem.name, userName: "", tckn: 0, phoneNumber: "" })


  useEffect(() => {
    setCheckOutBookType({ bookId: props.bookListItem.id, bookName: props.bookListItem.name, userName: "", tckn: 0, phoneNumber: "" })
  }, [props.bookListItem.id, props.bookListItem.name])

  const CheckOutBook = async () => {

    setIsLoadingForCheckOutBook(true)
    const resultAxios = await userAxios.post({
      method: 'Books/book-check-out/',

      data: checkOutBookType

    })
    const responseData = await resultAxios?.data.result

    if (resultAxios?.status == 200) await toast.success(t('CheckOut book is successfull').toString())

    setCheckOutBookType({ bookId: 0, bookName: "", userName: "", tckn: 0, phoneNumber: "" })
    setIsLoadingForCheckOutBook(false)

    props.closeCheckOutBookDialog()
  }

  return (
    <Fragment>





      <Dialog
        fullWidth
        open={props.openCheckOutBookPopup}
        maxWidth='sm'
        scroll='body'
        onClose={() => props.closeCheckOutBookDialog()}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <Box sx={{}}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{}}>
                CHECKOUT BOOK
              </Typography>
            </Box>

            <Box sx={{ mt: 1, mb: 5 }}>
              <TextField
                fullWidth
                disabled
                InputLabelProps={{ shrink: true }}
                label={t('BookId')}
                value={checkOutBookType.bookId}
              />
            </Box>

            <Box sx={{ mt: 1, mb: 5 }}>
              <TextField
                fullWidth
                disabled
                InputLabelProps={{ shrink: true }}
                label={t('BookName')}
                value={checkOutBookType.bookName}
              />
            </Box>
            <Box sx={{ mt: 1, mb: 5 }}>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={t('UserName')}
                value={checkOutBookType.userName}
                onChange={e => {
                  setCheckOutBookType({
                    bookId: checkOutBookType.bookId, bookName: checkOutBookType.bookName, userName: e.target.value, tckn: checkOutBookType.tckn, phoneNumber: checkOutBookType.phoneNumber
                  })
                }}
              />
            </Box>
            <Box sx={{ mt: 1, mb: 5 }}>
              <TextField
                fullWidth
                type="number"
                InputLabelProps={{ shrink: true }}
                label={t('Tckn')}
                value={checkOutBookType.tckn}
                onChange={e => {
                  setCheckOutBookType({
                    bookId: checkOutBookType.bookId, bookName: checkOutBookType.bookName, userName: checkOutBookType.userName, tckn: Number(e.target.value), phoneNumber: checkOutBookType.phoneNumber
                  })
                }}
              />
            </Box>
            <Box sx={{ mt: 1, mb: 5 }}>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={t('PhoneNumber')}
                value={checkOutBookType.phoneNumber}
                onChange={e => {
                  setCheckOutBookType({
                    bookId: checkOutBookType.bookId, bookName: checkOutBookType.bookName, userName: checkOutBookType.userName, tckn: checkOutBookType.tckn, phoneNumber: e.target.value
                  })
                }}
              />
            </Box>
          </Box>{' '}
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          {isLoadingForCheckOutBook && (
            <Fragment>
              <CircularProgress color='inherit' size={20} />
            </Fragment>
          )}
          {!isLoadingForCheckOutBook && (
            <Button variant='contained' disabled={isLoadingForCheckOutBook} sx={{ width: "100%" }} color='primary' onClick={async () => {
              setIsLoadingForCheckOutBook(true);
              await CheckOutBook();
            }
            }>
              {t('Check Out Book')}
            </Button>
          )}

          {/* <Typography variant="body2" sx={{ mb: 5, lineHeight: '2rem' }}>
            {console.log(error)}
            {JSON.stringify(error)}
          </Typography> */}



        </DialogActions>

      </Dialog>


    </Fragment >
  )
}
