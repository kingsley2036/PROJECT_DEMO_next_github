import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk' // 用来处理异步
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0
}
const userInitialState = {
  username: 'jack',
  age: 10
}

const ADD = 'ADD'
function reducer(state = initialState, action) {
  // console.log('TCL: reducer', state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name
      }
    default:
      return state
  }
}

const allReducers = combineReducers({
  counter: reducer,
  user: userReducer
})

// const store = createStore(
//   allReducers,
//   {
//     counter: initialState,
//     user: userInitialState
//   },
//   composeWithDevTools(applyMiddleware(ReduxThunk))
// )

// store.subscribe(() => {
//   console.log('TCL: 订阅')
//   console.log('TCL: store', store.getState())
// })

export function add(num) {
  return {
    type: ADD,
    num,
  }
}

export function update(name) {
  return { type: UPDATE_USERNAME, name }
}

function asyncUpdate(name) {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(update(name))
    },1000)
  }
}

// store.dispatch({ type: ADD })

// store.dispatch(update('爱吃啥'))

// store.dispatch(asyncUpdate('异步'))


export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign({}, {
      counter: initialState,
      user: userInitialState
    }, state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )

  return store
}
