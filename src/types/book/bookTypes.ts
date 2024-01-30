import { ThemeColor } from 'src/@core/layouts/types'
import { DateType } from '../forms/reactDatepickerTypes'

export type BookListItemType = {
  id: number
  name: string
  isbn: string
  stockAmount: number
  checkOutAmount: number
  status: boolean
  availableAmount: number
  avatarColor: ThemeColor
  price: 0
  publishDate: Date
}

export type AddBookType = {
  name: string
  isbn: string
  price: number
  stockAmount: number
  publishDate: Date
}

export type UpdateBookType = {
  id: number
  name: string
  isbn: string
  price: number
  stockAmount: number
  publishDate: Date
}
