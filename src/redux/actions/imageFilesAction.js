import {ADD_IMAGE, ADD_IMAGE_CODE} from "./ActionsTypes";

export function imageAdd (files) {
    return dispatch => {
        dispatch(add(files))
    }
}



export function add (files) {

    return {
        type: ADD_IMAGE,
        payload: files
    }
}
