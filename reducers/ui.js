export const VIEW_HOME_PAGE = 'ui/view/HOME_PAGE';
export const VIEW_CREATE_NEW = 'ui/view/VIEW_CREATE_NEW';

export const CHANGE_VIEW = 'ui/CHANGE_VIEW';

export const changeView = view => ({ type: CHANGE_VIEW, payload: { view } });

const initialState = {
  view: VIEW_HOME_PAGE,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VIEW:
      return { ...state, view: action.payload.view };
    default:
      return state;
  }
}
