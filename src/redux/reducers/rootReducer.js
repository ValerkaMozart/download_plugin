
import {combineReducers} from 'redux'
import imageFileReducer from "./imageFileReducer";

export default combineReducers({
    filesImage: imageFileReducer
})