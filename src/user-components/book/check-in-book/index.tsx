import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next'
import { Fragment, useEffect, useState } from "react"
import toast from "react-hot-toast";
import userAxios from "src/user-functions/userAxios";
import { BookCheckInOutType, CheckOutType } from "src/types/check-in-out/checkInOutTypes";
import { BookListItemType } from "src/types/book/bookTypes";
import { ReactDatePickerProps } from "react-datepicker";
import CheckInWizardMain from "./checkInWizardMain";


export default function CheckInBookMain(props: { openCheckInBookPopup: boolean, closeCheckInBookDialog: () => void, bookListItem: BookListItemType }) {


  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const { t } = useTranslation()
  const [isLoadingForCheckOutBook, setIsLoadingForCheckOutBook] = useState(false)
  const [bookCheckInOutList, setBookCheckInOutList] = useState<BookCheckInOutType[]>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const getCheckedOutList = async () => {

      setIsLoadingForCheckOutBook(true)
      setLoading(true)
      const resultAxios = await userAxios.get({
        method: 'Books/get-checked-out-list/?id=' + props.bookListItem.id
      })
      const responseData = await resultAxios?.data.result

      console.log("responseData:", responseData)
      setBookCheckInOutList(responseData.bookCheckInOuts);
      setLoading(false)
    }
    if (props.openCheckInBookPopup) getCheckedOutList()
  }, [props, props.bookListItem.id])

  return (
    <Fragment>

      <Dialog
        fullWidth
        open={props.openCheckInBookPopup}
        maxWidth='lg'
        scroll='body'
        onClose={() => props.closeCheckInBookDialog()}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {props.bookListItem.name + " " + "CheckIn Progress"}
            </Typography>

          </Box>
          {bookCheckInOutList && <CheckInWizardMain bookCheckInOutList={bookCheckInOutList} closeCheckInBookDialog={props.closeCheckInBookDialog} ></CheckInWizardMain>}
        </DialogContent>
      </Dialog>


    </Fragment >
  )
}
