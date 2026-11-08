import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { SET_USER } from '../user.reducer.js'


export function login(credentials) {
	return userService.login(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
            return loggedinUser
        })
}

export function signup(credentials) {
	return userService.signup(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
            return loggedinUser
        })
}

export function logout() {
	return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, loggedinUser: null })
        })
}

export function updateUser(user) {
	return userService.update(user)
        .then(updatedUser => {
                store.dispatch({ type: SET_USER, loggedinUser: updatedUser })
                return updateUser
        })
}