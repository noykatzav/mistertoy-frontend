import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

// toys = [
//         {
//             _id: 't101',
//             name: 'Talking Doll',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 123,
//             labels: ['Doll', 'Battery Powered', 'Baby'],
//             createdAt: 1631031801011,
//             inStock: true,
//         },
//         {
//             _id: 't102',
//             name: 'Remote Control Car',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 189,
//             labels: ['On wheels', 'Battery Powered', 'Outdoor'],
//             createdAt: 1632031801011,
//             inStock: true,
//         },
//         {
//             _id: 't103',
//             name: 'Jungle Adventure Puzzle',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 65,
//             labels: ['Puzzle', 'Baby'],
//             createdAt: 1633031801011,
//             inStock: true,
//         },
//         {
//             _id: 't104',
//             name: 'Creative Art Set',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 89,
//             labels: ['Art', 'Baby'],
//             createdAt: 1634031801011,
//             inStock: false,
//         },
//         {
//             _id: 't105',
//             name: 'Family Trivia Board Game',
//             imgUrl: 'hardcoded-url-for-now',
//             price: 110,
//             labels: ['Box game'],
//             createdAt: 1635031801011,
//             inStock: true,
//         },
//     ]

const STORAGE_KEY = 'toys'
_createToys()

export const toyService = {
    query,
    get,
    save,
    remove,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
    .then(toys => {

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toys = toys.filter(toy => regExp.test(toy.name))
        }

        if (filterBy.minPrice) {
            toys = toys.filter(toy => toy.price >= filterBy.minPrice)
        }

        return toys
    })
}

function get(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy(name = '', price = 100) {
    return { name, price, inStock: true }
}

function getDefaultFilter() {
    return { txt: '', minPrice: 0, pageIdx: 0 }
}

function getDefaultSort() {
    return { sortField: 'createdAt', sortDir: -1 } 
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)

    if (toys && toys.length > 0) return 

    toys = []
    const names = ['Talking Doll', 'Remote Control Car', 'Jungle Adventure Puzzle', 'Creative Art Set', 'Family Trivia Board Game']
    for (let i = 0; i < 20; i++) {
        const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
        toys.push(_createToy(name + (i + 1), utilService.getRandomIntInclusive(5, 800)))
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}

function _createToy(name, price) {
    const toy = getEmptyToy(name, price)
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}