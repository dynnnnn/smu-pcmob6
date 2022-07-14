export const LIGHT_MODE = "light_mode";
export const DARK_MODE = "dark_mode";
export const UPLOAD_PIC = "upload_pic";
export const DELETE_PIC = "delete_pic";
export const CHANGE_MODE = "change_mode";
export const LIST_MODE = "list_mode";

const initialState = { isDark: false, profilePicture: null, isList: false };


export function changeModeAction() {
  return { type: CHANGE_MODE };
}
export function uploadPicAction() {
  return { type: UPLOAD_PIC };
}
export function deletePicAction() {
  return { type: DELETE_PIC };
}
export function listAction() {
  return { type: LIST_MODE };
}

export default function accountPrefReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MODE:
      return {
        ...state,
        isDark: !state.isDark,
      };
    case UPLOAD_PIC:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case DELETE_PIC:
      return {
        ...state,
        profilePicture: null,
      };
    case LIST_MODE:
      return {
        ...state,
        isList: !state.isList,
      };

    default:
      return state;
  }
}
