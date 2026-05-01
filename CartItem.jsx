import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      // Remove '$' string formatting to do math
      const costNumber = parseFloat(item.cost.substring(1));
      totalAmount += costNumber * item.quantity;
    });
    return totalAmount;
  };

  // Calculate total cost based on quantity for an individual item
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.substring(1));
    return costNumber * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity drops to 0, remove the item entirely
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 className="total-cart-amount">Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="cart-items-wrapper">
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-cost">Unit Price: {item.cost}</p>
              
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value"> {item.quantity} </span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              
              <p className="cart-item-total">Total: ${calculateTotalCost(item)}</p>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn">
        <a href="/plants">
          <button className="get-started-button">Continue Shopping</button>
        </a>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default CartItem;
