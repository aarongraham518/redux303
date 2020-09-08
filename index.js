// import redux from 'redux';
const redux = require('redux');
const createStore = redux.createStore;

//Actions

//Action definition
/* An action is an object with a type property
   An action creator is a function that returns an action
*/
const BUY_CAKE = 'BUY_CAKE';
function buyCake() {
    return{
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

//Reducer
//(previousstate, action) => newState
const initialState = {
    numOfCakes: 10
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}

/*  createStore takes in the reducer function as a param.
        the reducer function has the initial state of the application.
            this is required for the store to make the state transitions
            based on the actions recieved.
    
*/
const store = createStore(reducer);
//getState allows us access to the store
console.log('Initial state', store.getState());

//allow the app to subscribe to changes in the store using subscribe
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));

//The store provides a dispatch method to update the state
    //dispatch method takes in an action as its param
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

//unscribe from any changes in the store
unsubscribe();

/* Tracing the code:
        1)  line 41 creating the store
            the param is the reducer function that 
            controls the state transitions
        2)  Once the store is created, we log the initial state of the 
            of the application which is the intial state.
            numOfCakes: 10
        3)  We then setup a listener to the store via subscribe()
            so anytime the store updates, we log the state to the console

        4)  When we dispatch the first action, the reducers sees the
            action.type is 'BUY_CAKE' and will try to match the case

        Note) Action creators are better than simply actions in our
            dispatch
            
// switch(action.type){
//     case 'INCREMENT':
//         return state + action.payload;
//     case 'DECREMENT':
//         return state - 1;
//     case 'ZEROMENT':
//         return state = 0;
//     default:
//         return state;
// }