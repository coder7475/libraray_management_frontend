export interface IBookApiReseponse {
  success: boolean
  message: string
  data: IBook[]
}

export interface IBook {
  _id: string
  title: string
  author: string
  genre: string
  isbn: string
  description: string
  copies: number
  available: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
