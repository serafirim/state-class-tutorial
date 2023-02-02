import React, { Component } from 'react'
import './Product.css'

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

export default class Product extends Component {
    // Set up the state
    state = {
        cart: [],
    }

    // -- Functions -----------------------------------
    // Add an item to cart
    add = (product) => {
        this.setState(state => ({
            cart: [...state.cart, product],         // add the entire product to the cart and not just the name
            //total: state.total + product.price    // also remove the total: state.total + product.price
        }))
    }
    // Remove (empty cart)
    remove = (product) => {
        this.setState(state => {
            const cart = [...state.cart] // to avoid mutating the state object, first make a copy of it using the spread operator

            const productIndex = cart.findIndex(p => p.name === product.name)

            // If no product don't re render
            if (productIndex < 0) {
                return
            }

            cart.splice(productIndex, 1) // splice out the item you want from the copy and return the copy in the new object
            return ({
                cart,
                total: state.total - product.price
            })
        })
    }
    // ----------------------------------------------------------------

    // Convert to locale price
    currencyOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }

    getTotal = () => { // assigning an arrow function to a class property is important as without it would create a new this binding, which would interfere with the current this hinding and introduce a bug into our code.
        const total = this.state.cart.reduce((totalCost, item) => totalCost + item.price, 0)

        return total.toLocaleString(undefined, this.currencyOptions) // passing currencyOptions that sets maximum and minimum decimal places for total. NOTE: this is set as a separate property. 
    }

    render() {
        return (
            <div className="wrapper">
                <div>
                    Shopping Cart: {this.state.cart.length} total items.
                </div>

                <div>Total: {this.getTotal()} items</div>

                <div>
                   {products.map(product => (
                        <div key={product.name}>
                            <div className="product">
                                <span role="img" aria-label={product.name}>{product.emoji}</span>
                            </div>

                            <button onClick={() => this.add(product)}>Add</button> <button onClick={() => this.remove(product)}>Remove</button>
                        </div>
                   ))} 
                </div>
            </div>
        )
    }
}