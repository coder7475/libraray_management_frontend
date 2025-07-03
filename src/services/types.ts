export interface IBookApiReseponse {
  success: boolean
  message: string
  data: IBook[],
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface IBookReseponse {
  success: boolean
  message: string
  data: IBook
}

export interface ICreateBookApiResponse {
  sucess: boolean,
  message: string,
  data: IBook
}

export interface IDeleteBook {
  sucess: boolean,
  message: string,
  data: null
}

export interface IBook {
  _id?: string
  title: string
	author: string;
	genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
	isbn: string;
	description?: string;
	copies: number;
	available: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ErrorResponse {
  success: false,
  message: string,
  error: string
}
