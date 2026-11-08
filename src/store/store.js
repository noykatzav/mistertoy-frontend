import { toyReducer } from './toy.reducer.js'
import { userReducer } from './user.reducer.js'

import { createStore, combineReducers } from 'redux'

const appReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
})
export const store = createStore(appReducer)

window.gStore = store