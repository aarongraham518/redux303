//Create the redux store requirements and store below
const redux = require('redux');
const createStore = redux.createStore;

const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;

const axios = require('axios');

//Define the state
const intialState = {
    loading: false,
    users: [],
    error: ''
}

//Define the actions

//declaring the const for the action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE= 'FETCH_USERS_FAILURE';

//Create the Action Creators
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = intialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

/* The thunk middleware will allow the ability for an action
    creator to return a function
*/
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data is the array of users
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                //error.message gives discription of error
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {console.log(store.getState())});
store.dispatch(fetchUsers());

/*  Recap: async actions
    Import redux thunk middleware
        pass it to the createStore function.
            which will allow an action creator to return a function, rather 
            than an action. The function can now handle asynchronous tasks.
            and also dispatch regular actions which will be handled by the 
            reducer
*/
