export type CheckOutType = {
  bookId: number
  userName: string
  bookName: string
  tckn: number
  phoneNumber: string
}

export type CheckInPostType = {
  chekcInOutId: number
}

export type BookCheckInOutsType = {
  id: number
  userName: string
  tckn: number
  phoneNumber: number
  checkOutDate: Date
  checkInDate: Date
  realizedCheckInDate: Date
  punishmentDayCount: number
  punishmentAmount: number
}
