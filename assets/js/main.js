console.log(Redux)
console.log(ReduxThunk)

// Constants
const WITHDRAW_MONEY = "WITHDRAW_MONEY"
const DEPOSITE_MONEY = "DEPOSITE_MONEY"

const ADD_PRODUCT = "ADD_PRODUCT"

const GET_PRODUCTS = "GET_PRODUCTS"


// Action Creators
const withdraw = (amount) => {
  return {
    type: WITHDRAW_MONEY,
    payload: amount
  }
}

const deposite = (amount) => {
  return {
    type: DEPOSITE_MONEY,
    payload: amount
  }
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product
  }
};

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products
  }
}

const fetchProducts = () => {

  return async (dispatch) => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    console.log(data)
    dispatch(getProducts(data))
  }
}


// Reducers
const bankReducer = (state = 1000, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return state - action.payload;
    case DEPOSITE_MONEY:
      return state + action.payload;
    default:
      return state;
  }


}
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.payload];
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
}

const appReducer = Redux.combineReducers({
  bank: bankReducer,
  products: productsReducer
});

const store = Redux.createStore(appReducer, Redux.applyMiddleware(ReduxThunk))

console.log(store)


console.log(store.getState())
store.dispatch(withdraw(100))
console.log(store.getState())
store.dispatch(withdraw(200))
console.log(store.getState())
store.dispatch(withdraw(300))
console.log(store.getState())
store.dispatch(deposite(100))
console.log(store.getState())
store.dispatch(deposite(200))
console.log(store.getState())
store.dispatch(deposite(300))
console.log(store.getState())





console.log(store.dispatch(fetchProducts()))

let amountInput = document.querySelector("#amount")

let amountValue = document.querySelector("#value");
amountValue.innerHTML = store.getState().bank;

document.querySelector("#withdraw").addEventListener('click', () => {
  store.dispatch(withdraw(+amountInput.value))
})

document.querySelector("#deposite").addEventListener('click', () => {
  store.dispatch(deposite(+amountInput.value))
})


store.dispatch(addProduct({ id: 1, title: 'product 1' }))
console.log(store.getState())


store.subscribe(() => {
  console.log("CURRENT STATE", store.getState())
  amountValue.innerHTML = store.getState().bank;
})