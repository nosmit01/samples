import { map, find, countBy, sumBy } from 'lodash';

const data = {
  cart: [],
  cartTotalPrice: 0,
};

export default (state = data, action = {}) => {
  let newState = {};
  let arr = [];

  switch (action.type) {
    case 'SET_INIT':
      return Object.assign({}, state, action.obj);
    case 'TOGGLE_SELECTED_PIZZA':
      {
        newState = Object.assign({}, state);
        arr = [...state.pizzaSizes];

        newState.pizzaSizes = map(arr, (a) => {
          a.selected = a.name === action.pizza.toLowerCase();
          return a;
        });

        newState.name = action.pizza.toLowerCase();
        newState.basePrice = action.toppings.basePrice;
        newState.toppings = map(action.toppings.toppings, (t) => {
          t.selected = t.defaultSelected;
          return t;
        });

        newState.maxToppings = action.toppings.maxToppings;
        newState.toppingCount = countBy(newState.toppings, t => t.selected).true;

        return newState;
      }
    case 'TOGGLE_SELECTED_TOPPING':
      {
        newState = Object.assign({}, state);
        arr = [...state.toppings];

        const topping = find(arr, a => a.topping.name === action.topping);
        topping.selected = !topping.selected;

        newState.toppingCount = countBy(arr, t => t.selected).true;

        return newState;
      }
    case 'ADD_TO_CART':
      {
        newState = Object.assign({}, state);
        arr = [...state.pizzaSizes];

        const totalToppingsPrice = sumBy(newState.toppings, t => t.topping.price);
        const totalPizzaPrice = newState.basePrice + totalToppingsPrice;

        newState.cart.push({
          name: newState.name.toUpperCase(),
          price: totalPizzaPrice,
        });

        newState.cartTotalPrice = parseFloat(sumBy(newState.cart, c => c.price));
        newState.pizzaSizes = map(arr, (a) => {
          a.selected = false;
          return a;
        });

        newState.toppings = [];
        newState.toppingCount = 0;
        newState.maxToppings = 0;

        return newState;
      }
    default:
      return state;
  }
};
