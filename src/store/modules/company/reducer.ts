import produce from 'immer';

import type { Action, StateBase } from './types';

import { ActionTypes, InitialState } from './consts';

function reducer(state = InitialState, action: Action): StateBase {
  switch (action.type) {
    case ActionTypes.COMPANY_DELETE_REQUEST:
    case ActionTypes.COMPANY_LIST_REQUEST:
    case ActionTypes.COMPANY_ADD_REQUEST:
      return produce(state, draft => {
        draft.item = action.payload;
        draft.loading = true;
        draft.error = false;
      });
    case ActionTypes.COMPANY_DELETE_SUCCESS:
    case ActionTypes.COMPANY_LIST_SUCCESS:
    case ActionTypes.COMPANY_ADD_SUCCESS:
      return produce(state, draft => {
        draft.item = action.payload;
        draft.loading = false;
        draft.error = false;
      });
    case ActionTypes.COMPANY_DELETE_FAILURE:
    case ActionTypes.COMPANY_LIST_FAILURE:
    case ActionTypes.COMPANY_ADD_FAILURE:
      return produce(state, draft => {
        draft.item = action.payload;
        draft.loading = false;
        draft.error = true;
      });
    case ActionTypes.COMPANY_FIND_REQUEST:
    case ActionTypes.COMPANY_UPDATE_REQUEST:
      return produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.itemEdit = action.payload;
      });
    case ActionTypes.COMPANY_FIND_SUCCESS:
    case ActionTypes.COMPANY_UPDATE_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.itemEdit = action.payload;
      });
    case ActionTypes.COMPANY_FIND_FAILURE:
    case ActionTypes.COMPANY_UPDATE_FAILURE:
        return produce(state, draft => {
          draft.loading = false;
          draft.error = true;
          draft.itemEdit = action.payload;
        });
    default:
      return state;
  }
}

export default reducer;
