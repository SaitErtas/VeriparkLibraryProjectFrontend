import { ThemeColor } from 'src/@core/layouts/types'

export type BookListType = {
  id: number
  name: string
  isbn: string
  stockAmount: number
  checkOutAmount: number
  status: boolean
  availableAmount: number
  avatarColor: ThemeColor
}

export type AddBookType = {
  name: string
  isbn: string
  price: number
  stockAmount: number
  publishDate: Date
}
