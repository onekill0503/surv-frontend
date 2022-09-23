import {createStore} from "redux"

const Reducer = (state = {} , action) => {
    switch(action.type){
        case 'SAVE_SESSION':
            return {...state, session: action.data}
        case 'REMOVE_SESSION':
            return {...state , session: undefined}
        default:
            return state
    }
}

const Store = createStore(Reducer)

export default Store;
