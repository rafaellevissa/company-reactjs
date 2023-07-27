import { action } from 'typesafe-actions';
import { ActionTypes } from './consts';
import { Company, Page } from './types';

export function remove(id: string) {
  return action(ActionTypes.COMPANY_DELETE_REQUEST, id);
}

export function list(page: Page) {
  return action(ActionTypes.COMPANY_LIST_REQUEST, page);
}

export function add(payload: any) {
  return action(ActionTypes.COMPANY_ADD_REQUEST, payload);
}

export function find(id: string) {
  return action(ActionTypes.COMPANY_FIND_REQUEST, id);
}

export function update(payload: Company) {
  return action(ActionTypes.COMPANY_UPDATE_REQUEST, payload);
}
