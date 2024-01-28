import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next'
import { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast";
import userAxios from "src/user-functions/userAxios";
import { CheckOutType } from "src/types/check-in-out/checkInOutTypes";
import { BookListItemType } from "src/types/book/bookTypes";
import { ReactDatePickerProps } from "react-datepicker";
import CheckInWizardMain from "./CheckInWizardMain";

export default function CheckInBookMain(props: { openCheckInBookPopup: boolean, closeCheckInBookDialog: () => void, bookListItem: BookListItemType }) {


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

    props.closeCheckInBookDialog()
  }

  return (
    <Fragment>





      <Dialog
        fullWidth
        open={props.openCheckInBookPopup}
        maxWidth='sm'
        scroll='body'
        onClose={() => props.closeCheckInBookDialog()}
      >
        <CheckInWizardMain></CheckInWizardMain>
      </Dialog>


    </Fragment >
  )
}
