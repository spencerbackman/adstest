import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import fbAxios from './fbAxios';
import fbApi from './fbApi';
import fbApiGenderAge from './fbApiGenderAge';

const reducer = combineReducers({
    fbApi,
    fbAxios,
    fbApiGenderAge
})

export default createStore (
    reducer,
    applyMiddleware(thunk)
)