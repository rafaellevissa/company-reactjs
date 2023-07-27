import type { Action, Company, Page, Paginated } from './types';
import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from './consts';
import api from '../../../services/api';

export function* add({ payload }: Action): Generator {
  try {
    const cnpj = (payload as Company)?.cnpj?.replace(/\D/g, '');

    const updatedPayload = {
      ...payload as Company,
      cnpj 
    };
    const response: unknown = yield call(api.post, '/company', updatedPayload);

    const { data, status } = response as AxiosResponse<Company>;

    if (status !== 201) {
      throw response;
    }

    yield put({
      type: ActionTypes.COMPANY_ADD_SUCCESS,
      payload: data,
    });

    window.location.reload()
  } catch (failed) {
    yield put({
      type: ActionTypes.COMPANY_ADD_FAILURE,
      payload: null,
    });
  }
}

export function* find({ payload }: Action): Generator {
  try {
    const url = encodeURIComponent('/company/' + payload);
    const response: unknown = yield call(api.get, url);

    const { data, status } = response as AxiosResponse<Company>;

    if (status !== 200) {
      throw response;
    }

    yield put({
      type: ActionTypes.COMPANY_FIND_SUCCESS,
      payload: data,
    });
  } catch (failed) {
    yield put({
      type: ActionTypes.COMPANY_FIND_FAILURE,
      payload: null,
    });
  }
}

export function* list({ payload }: Action): Generator {
  try {
    const request = payload as Page;
    const url = request.currentPage ?
      `/company?page=${request.currentPage + 1}&perPage=${request.perPage}`:
      '/company';

    const response: unknown = yield call(api.get, url);

    const { data, status } = response as AxiosResponse<Paginated<Company>>;

    if (status !== 200) {
      throw response;
    }

    yield put({
      type: ActionTypes.COMPANY_LIST_SUCCESS,
      payload: data,
    });
  } catch (failed) {
    yield put({
      type: ActionTypes.COMPANY_LIST_FAILURE,
      payload: null,
    });
  }
}

export function* remove({ payload }: Action): Generator {
  try {
    const url = encodeURIComponent('/company/' + payload);
    const response: unknown = yield call(api.delete, url);

    const { data, status } = response as AxiosResponse<any>;

    if (status !== 200) {
      throw response;
    }

    yield put({
      type: ActionTypes.COMPANY_DELETE_SUCCESS,
      payload: data,
    });

    window.location.reload()
  } catch (failed) {
    yield put({
      type: ActionTypes.COMPANY_DELETE_FAILURE,
      payload: null,
    });
  }
}

export function* update({ payload }: Action): Generator {
  try {
    const request = payload as Company;
    
    const { id, ...requestPayload } = request;
    const url = encodeURIComponent('/company/' + id);

    const response: unknown = yield call(api.put, url, requestPayload);

    const { data, status } = response as AxiosResponse<Company>;

    if (status !== 200) {
      throw response;
    }

    yield put({
      type: ActionTypes.COMPANY_UPDATE_SUCCESS,
      payload: data,
    });

    window.location.reload()
  } catch (failed) {
    yield put({
      type: ActionTypes.COMPANY_UPDATE_FAILURE,
      payload: null,
    });
  }
}

export default all([
  takeLatest(ActionTypes.COMPANY_DELETE_REQUEST, remove),
  takeLatest(ActionTypes.COMPANY_LIST_REQUEST, list),
  takeLatest(ActionTypes.COMPANY_ADD_REQUEST, add),
  takeLatest(ActionTypes.COMPANY_FIND_REQUEST, find),
  takeLatest(ActionTypes.COMPANY_UPDATE_REQUEST, update),
]);
