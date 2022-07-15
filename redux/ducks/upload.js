export const ADD_PIC = "add_pic";
export const ADD_PROFILE_PIC = "add_profile_pic";
export const USERNAME = "username";


export function addPic(){
    return { type: ADD_PIC}
}
export function addProfilePic(){
    return { type: ADD_PROFILE_PIC}
}
export function saveUsername(){
    return { type: USERNAME}
}




const initialState = {image : null, username: null};

export default function addPicReducer(state = initialState, action){
    console.log(state)
    switch (action.type){
        case ADD_PIC:
            return { ...state, image: action.payload }
        case USERNAME:
            return { ...state, username: action.payload }
        default:
            return state
    }
}