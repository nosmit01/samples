export function onInit(obj) {
  return {
    type: 'SET_INIT',
    obj,
  };
}
export function onToggleSelectedPizza(pizza, toppings) {
  return {
    type: 'TOGGLE_SELECTED_PIZZA',
    pizza,
    toppings,
  };
}
export function onToggleSelectedTopping(topping) {
  return {
    type: 'TOGGLE_SELECTED_TOPPING',
    topping,
  };
}
export function onAddToCart() {
  return {
    type: 'ADD_TO_CART',
  };
}