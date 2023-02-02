/*
::::::::::::::::::[ NOTES ]:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
* Unlike class-based components, you cannot update several pieces of state with a single function called. 
  Instead, you must call each function individually. This means you can keep stateful objects focused.

* useReducer() is much similiar to how "const total = this.state.cart.reduce((totalCost, item) => totalCost + item.price, 0)" is used

* The action is an object two properties: type and price; The type can be add or remove and price is a number.

* After updating totalReducer, you call setTotal with a type of add and the price which is set using destructing assignment

* Notice how using Hooks reduces how many lines of code the remove function and add function have.
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
*/

import React, { useReducer/*, useState*/ } from 'react'
import './Product.css'

// Currency conversion
const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

// Refactored to account for the whole product to the reducer
function getTotal(cart) {
    const total = cart.reduce((totalCost, item) => totalCost + item.price, 0)
    return total.toLocaleString(undefined, currencyOptions) // undefined is used to use the system locale instead of specifying a locale
}

// Create an array of products
const products = [
    {
        emoji: '🍦',
        name: 'ice cream',
        price: 5
    },
    {
        emoji: '🍩',
        name: 'donuts',
        price: 2.5
    },
    {
        emoji: '🍉',
        name: 'watermelon',
        price: 4
    }
]

// #region --------------------------[ Functions ]-------------------------------------------------------
function cartReducer(state, action) {
    // Below Replaced: return [...state, product]
    switch (action.type) {
        case 'add':
            return [ ...state, action.product ] // Replaced: "return [...state, action.name ]"
        case 'remove':
            // BUGFIX: Going less than 0 
            const productIndex = state.findIndex(item => item.name === action.product.name)
            if (productIndex < 0) {
                return state
            }

            const update = [ ...state ]
            update.splice(productIndex, 1) // Replaced: "update.splice(update.indexOf(action.name), 1)"
            return update
        default:
            return state
    }
}

/* NOTE: Since we use a reducer, we don't need this
function totalReducer(state, action) {
    if (action.type === 'add') {
        return state + action.price
    }    

    return state - action.price
}
*/
// #endregion -------------------------------------------------------------------------------------------

export default function Product() {
    // Create the hook by invoking the useState Hook
    const [ cart, setCart ] = useReducer(cartReducer, []) // replaced "useState([ ])"

    // Try it out: create new piece of state to hold the total.
    //const [ total, setTotal ] = useReducer(totalReducer, 0) // Replaced: "useState(0) // setTotal sets the variable total in the state ???"

    // #region -----------------------------[ Functions ] --------------------------------------
    function add(product) { // NOTE: has to be defined inside the component function to have the same scope
        // Update: Instead of 4 lines of code; just one :)
        // set up a product
        //const { name, price } = product

        //setCart( { name, type: 'add'} ) // Replaced: "setCart(name) // Replaced: "setCart(product.name) //replaced "current => [...current, product.name]"""
        //setTotal({ price, type: 'add'} ) // Replaced: "setTotal(product.price) //replaced "current => current + product.price""

        setCart({ product, type: 'add' })
    }

    function remove(product) {
        // Update: Instead of 4 lines of code; just one :)
        // set up a product
        //const { name, price } = product // is this the copy of the state? 

        //setCart({ name, type: 'remove' })
        //setTotal({ price, type: 'remove' })

        setCart({ product, type: 'remove' })
    }

    /* NOTE: This was removed from the component function scope and added outside (under currencyOptions)
    function getTotal(total) {
        return total.toLocaleString(undefined, currencyOptions) // undefined is used to use the system locale instead of specifying a locale
    }
    */
    // #endregion ------------------------------------------------------------------------------

    // Render
    return (
        <div className="wrapper">
            <div>
                Shopping Cart: {cart.length} total items.
            </div>
            <div>Total: {getTotal(cart)}</div>

            <div>
                {products.map(product => (
                    <div key={product.name}>
                        <div className="product">
                            <span role="img" aria-label={product.name}>{product.emoji}</span>
                        </div>
                        <button onClick={() => add(product)}>Add</button>
                        <button onClick={() => remove(product)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}