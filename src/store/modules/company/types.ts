export interface ActionTypesBase {
  COMPANY_DELETE_REQUEST: string;
  COMPANY_DELETE_SUCCESS: string;
  COMPANY_DELETE_FAILURE: string;

  COMPANY_LIST_REQUEST: string;
  COMPANY_LIST_SUCCESS: string;
  COMPANY_LIST_FAILURE: string;

  COMPANY_ADD_REQUEST: string;
  COMPANY_ADD_SUCCESS: string;
  COMPANY_ADD_FAILURE: string;

  COMPANY_FIND_REQUEST: string;
  COMPANY_FIND_SUCCESS: string;
  COMPANY_FIND_FAILURE: string;

  COMPANY_UPDATE_REQUEST: string;
  COMPANY_UPDATE_SUCCESS: string;
  COMPANY_UPDATE_FAILURE: string;
}

export interface Paginated<T = any> {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    previous_page_url: string
  },
  data: T[]
}

export interface Company {
  id: number;
  cnpj?: string;
  cnae?: string;
  fantasy_name?: string;
  company_name?: string;
  created_at?: string;
}

export interface StateBase {
  item: string | Page | Company | Company[] | null;
  itemEdit: string | Company | Page | null;
  error: boolean;
  loading: boolean;
}

export interface Action {
  type: string;
  payload: string | Company | Page | null;
  meta: any;
  error: any;
}

export interface Page {
	currentPage: number;
	perPage: number;
}