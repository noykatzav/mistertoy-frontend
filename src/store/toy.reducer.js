import { toyService } from '../services/toy.service.local.js'

const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
    isLoading: false
}

export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'

export const SET_IS_LOADING = 'SET_IS_LOADING'


export function toyReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys }
    
        case REMOVE_TOY:
            var toys = state.toys.filter(toy => toy._id !== cmd.toyId)
            return { ...state, toys }
    
        case ADD_TOY:
            var toys = [...state.toys, cmd.toy]
            return { ...state, toys }
    
        case UPDATE_TOY:
            var toys = state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            return { ...state, toys }
    
        case SET_FILTER_BY:
            return { ...state, filterBy: cmd.filterBy }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }
    
        default:
            return state
    }
}