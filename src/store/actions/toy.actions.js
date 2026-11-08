import { toyService } from '../../services/toy.service.local.js'
import { store } from '../store.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY } from '../toy.reducer.js'


// All toys are are stored in the store
// Use getFilteredToys to get the filtered toys

export function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

	return toyService.query()
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function removeToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function saveToy(toy, isToggle = false) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    const isNew = !toy._id
    const type = isNew ? ADD_TOY : UPDATE_TOY

    return toyService.save(toy, isToggle)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function getStats(state) {
    const filteredToys = getFilteredToys(state)
    
    const total = filteredToys.length
    const done = filteredToys.filter(toy => toy.isDone).length

    return { total, done }
}

// Get toys with filtering applied

export function getFilteredToys(state) {
    const { filterBy, toys } = state.toyModule
    let filteredToys = [...toys]

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        filteredToys = filteredToys.filter(toy => regExp.test(toy.txt))
    }

    if (filterBy.importance) {
        filteredToys = filteredToys.filter(toy => toy.importance >= filterBy.importance)
    }

    if (filterBy.status) {
        filteredToys = filteredToys.filter(toy => 
            filterBy.status === 'done' ? toy.isDone : !toy.isDone)
    }

    return filteredToys
}