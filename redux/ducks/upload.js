export const ADD_PIC = "add_pic";

export function addPic(){
    return { type: ADD_PIC}
}

const initialState = {image : null};

export default function addPicReducer(state = initialState, action){
    console.log(state)
    switch (action.type){
        case ADD_PIC:
            return { ...state, image: action.payload }
        default:
            return state
    }
}