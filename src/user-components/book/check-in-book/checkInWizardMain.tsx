// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStepper, { StepperProps } from '@mui/material/Stepper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Step Components
import StepCheckedOutList from './stepCheckedOutList'
import StepCheckInConfirmation from './stepCheckInConfirmation'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { BookCheckInOutType } from 'src/types/check-in-out/checkInOutTypes'
import { Button } from '@mui/material'
import { Box } from '@mui/system'

const steps = [
  {
    title: 'Checked-Out-Books',
    icon: (
      <svg id='wizardCart' width='28' height='28' viewBox='0 0 58 54' xmlns='http://www.w3.org/2000/svg'>
        <g fillRule='nonzero'>
          <path d='M57.927 34.29V16.765a4 4 0 0 0-4-4h-4.836a.98.98 0 1 0 0 1.963h3.873a3 3 0 0 1 3 3v15.6a3 3 0 0 1-3 3H14.8a4 4 0 0 1-4-4v-14.6a3 3 0 0 1 3-3h3.873a.98.98 0 1 0 0-1.963H10.8V4.909a.98.98 0 0 0-.982-.982H7.715C7.276 2.24 5.752.982 3.927.982A3.931 3.931 0 0 0 0 4.909a3.931 3.931 0 0 0 3.927 3.927c1.825 0 3.35-1.256 3.788-2.945h1.121v38.29a.98.98 0 0 0 .982.983h6.903c-1.202.895-1.994 2.316-1.994 3.927A4.915 4.915 0 0 0 19.637 54a4.915 4.915 0 0 0 4.908-4.91c0-1.61-.79-3.03-1.994-3.926h17.734c-1.203.895-1.994 2.316-1.994 3.927A4.915 4.915 0 0 0 43.2 54a4.915 4.915 0 0 0 4.91-4.91c0-1.61-.792-3.03-1.995-3.926h5.921a.98.98 0 1 0 0-1.964H10.8v-4.91h43.127a4 4 0 0 0 4-4zm-54-27.417a1.966 1.966 0 0 1-1.963-1.964c0-1.083.88-1.964 1.963-1.964.724 0 1.35.398 1.691.982h-.709a.98.98 0 1 0 0 1.964h.709c-.34.584-.967.982-1.69.982zm15.71 45.163a2.949 2.949 0 0 1-2.946-2.945 2.949 2.949 0 0 1 2.945-2.946 2.95 2.95 0 0 1 2.946 2.946 2.949 2.949 0 0 1-2.946 2.945zm23.563 0a2.949 2.949 0 0 1-2.945-2.945 2.949 2.949 0 0 1 2.945-2.946 2.949 2.949 0 0 1 2.945 2.946 2.949 2.949 0 0 1-2.945 2.945z' />
          <path d='M33.382 27.49c7.58 0 13.745-6.165 13.745-13.745C47.127 6.165 40.961 0 33.382 0c-7.58 0-13.746 6.166-13.746 13.745 0 7.58 6.166 13.746 13.746 13.746zm0-25.526c6.497 0 11.782 5.285 11.782 11.781 0 6.497-5.285 11.782-11.782 11.782S21.6 20.242 21.6 13.745c0-6.496 5.285-11.781 11.782-11.781z' />
          <path d='M31.77 19.41c.064.052.136.083.208.117.03.015.056.039.086.05a.982.982 0 0 0 .736-.027c.049-.023.085-.066.13-.095.07-.046.145-.083.202-.149l.02-.021.001-.001.001-.002 7.832-8.812a.98.98 0 1 0-1.467-1.304l-7.222 8.126-5.16-4.3a.983.983 0 0 0-1.258 1.508l5.892 4.91z' />
        </g>
      </svg>
    )
  },
  {
    title: 'Checkin-Confirmations',
    icon: (
      <svg id='wizardConfirm' width='28' height='28' viewBox='0 0 58 54' xmlns='http://www.w3.org/2000/svg'>
        <g fillRule='nonzero'>
          <path d='M7.2 14.4h13.5a.9.9 0 1 0 0-1.8H7.2a.9.9 0 1 0 0 1.8zM7.2 11.7h8.1a.9.9 0 1 0 0-1.8H7.2a.9.9 0 1 0 0 1.8zM21.6 16.2a.9.9 0 0 0-.9-.9H7.2a.9.9 0 1 0 0 1.8h13.5a.9.9 0 0 0 .9-.9z' />
          <path d='M49 3.6H27.9V.9a.9.9 0 1 0-1.8 0v2.7H5a5 5 0 0 0-5 5v27.8a5 5 0 0 0 5 5h19.827L13.764 52.464a.899.899 0 1 0 1.272 1.272L26.1 42.673V51.3a.9.9 0 1 0 1.8 0v-8.627l11.064 11.063a.898.898 0 0 0 1.272 0 .899.899 0 0 0 0-1.272L29.173 41.4H49a5 5 0 0 0 5-5V8.6a5 5 0 0 0-5-5zm-.8 36H5.8a4 4 0 0 1-4-4V9.4a4 4 0 0 1 4-4h42.4a4 4 0 0 1 4 4v26.2a4 4 0 0 1-4 4z' />
          <path d='M36.9 18h4.127L30.24 28.787l-7.464-7.463a.899.899 0 0 0-1.272 0l-11.34 11.34a.899.899 0 1 0 1.272 1.272L22.14 23.233l7.464 7.463a.898.898 0 0 0 1.272 0L42.3 19.273V23.4a.9.9 0 1 0 1.8 0v-6.3a.897.897 0 0 0-.9-.9h-6.3a.9.9 0 1 0 0 1.8z' />
        </g>
      </svg>
    )
  }
]

const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  margin: 'auto',
  maxWidth: 800,
  justifyContent: 'space-around',

  '& .MuiStep-root': {
    cursor: 'pointer',
    textAlign: 'center',
    paddingBottom: theme.spacing(8),
    '& .step-title': {
      fontSize: '1rem'
    },
    '&.Mui-completed + svg': {
      color: theme.palette.primary.main
    },
    '& + svg': {
      display: 'none',
      color: theme.palette.text.disabled
    },

    '& .MuiStepLabel-label': {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      svg: {
        marginRight: theme.spacing(1.5),
        fill: theme.palette.text.primary
      },
      '&.Mui-active, &.Mui-completed': {
        '& .MuiTypography-root': {
          color: theme.palette.primary.main
        },
        '& svg': {
          fill: theme.palette.primary.main
        }
      }
    },

    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      '& + svg': {
        display: 'block'
      },
      '& .MuiStepLabel-label': {
        display: 'block'
      }
    }
  }
}))

const CheckInWizardMain = (props: { closeCheckInBookDialog: () => void, bookCheckInOutList: BookCheckInOutType[] | undefined }) => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [bookCheckInOutItem, setBookCheckInOutItem] = useState<BookCheckInOutType | undefined>()

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const submitCheckIn = (_bookCheckInOutItem: BookCheckInOutType | undefined) => {
    null
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepCheckedOutList handleNext={handleNext} bookCheckInOutList={props.bookCheckInOutList} setBookCheckInOutItem={setBookCheckInOutItem} />
      case 1:
        return <StepCheckInConfirmation submitCheckIn={submitCheckIn} bookCheckInOutItem={bookCheckInOutItem} />
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }
  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          color='secondary'
          variant='outlined'
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<Icon icon='mdi:arrow-left' />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={stepCondition ? 'success' : 'primary'}
          {...(!stepCondition ? { endIcon: <Icon icon='mdi:arrow-right' /> } : {})}
          onClick={() => (stepCondition ? alert('Submitted..!!') : handleNext())}
        >
          {stepCondition ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }

  return (
    <Card>
      <CardContent sx={{ py: 5.375 }}>
        <StepperWrapper>
          <Stepper activeStep={activeStep} connector={<Icon icon='mdi:chevron-right' />}>
            {steps.map((step, index) => {
              return (
                <Step key={index} onClick={() => setActiveStep(index)} sx={{}}>
                  <StepLabel icon={<></>}>
                    {step.icon}
                    <Typography className='step-title'>{step.title}</Typography>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}
        {renderFooter()}
      </CardContent>
    </Card>
  )
}

export default CheckInWizardMain
