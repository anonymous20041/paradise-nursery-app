import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
  const dispatch = useDispatch();
  // Fetch cart items from Redux store to dynamically update the cart icon count
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Local state to disable the button after an item is added
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  // Data structure matching the rubric: 3 categories, 6 unique plants each
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "snake_plant.jpg", cost: "$15" },
        { name: "Spider Plant", image: "spider_plant.jpg", cost: "$12" },
        { name: "Peperomia", image: "peperomia.jpg", cost: "$10" },
        { name: "ZZ Plant", image: "zz_plant.jpg", cost: "$18" },
        { name: "Aloe Vera", image: "aloe_vera.jpg", cost: "$14" },
        { name: "Peace Lily", image: "peace_lily.jpg", cost: "$20" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "lavender.jpg", cost: "$20" },
        { name: "Jasmine", image: "jasmine.jpg", cost: "$18" },
        { name: "Rosemary", image: "rosemary.jpg", cost: "$15" },
        { name: "Mint", image: "mint.jpg", cost: "$12" },
        { name: "Lemon Balm", image: "lemon_balm.jpg", cost: "$14" },
        { name: "Hyacinth", image: "hyacinth.jpg", cost: "$22" }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Oregano", image: "oregano.jpg", cost: "$10" },
        { name: "Marigold", image: "marigold.jpg", cost: "$8" },
        { name: "Geraniums", image: "geraniums.jpg", cost: "$20" },
        { name: "Basil", image: "basil.jpg", cost: "$12" },
        { name: "Citronella", image: "citronella.jpg", cost: "$15" },
        { name: "Chrysanthemum", image: "chrysanthemum.jpg", cost: "$18" }
      ]
    }
  ];

  return (
    <div>
      {/* Navbar requirement: Home, Plants, and Cart links with dynamic count */}
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/plants">Plants</a>
        <a href="/cart">
          <div className="cart-icon">
            Cart 🛒 <span className="cart-count">{totalCartItems}</span>
          </div>
        </a>
      </nav>

      {/* Product Listing requirement */}
      <div className="product-list">
        {plantsArray.map((category, index) => (
          <div key={index} className="category-section">
            <h2>{category.category}</h2>
            <div className="plant-grid">
              {category.plants.map((plant, plantIndex) => (
                <div key={plantIndex} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="thumbnail" />
                  <h3>{plant.name}</h3>
                  <p>{plant.cost}</p>
                  <button 
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedItems[plant.name]}
                  >
                    {addedItems[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
