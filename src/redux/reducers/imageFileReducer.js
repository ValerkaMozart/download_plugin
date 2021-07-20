import {ADD_IMAGE} from "../actions/ActionsTypes";

let inicialState = {
    file: []
}
export default function imageFileReducer (state = inicialState, action) {
    switch (action.type) {
        case ADD_IMAGE :
            return {
                file: action.payload
            }



        default :
            return state
    }
}

