import React, { useEffect, useState } from 'react';
import { Skeleton } from "../components/loader";
import { useLocation, useParams } from "react-router-dom"; 
import './styles/productpage.css'

import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { Link,useNavigate, useHistory  } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { RootState } from "../redux/store";




const ProductDetailsPage: React.FC = () => {
    // const user =({id})=>{
    //     id
    // 
    const { productId } = useParams();
    // const { productId } = useParams<{ productId: string }>(); // Access productId from URL params
    // const productIdString = productId ? productId.toString() : ""; // Convert to string (optional)
  const [product, setProduct] = useState<any | null>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   // console.log('Product:', product); // Log product details
    // console.log('iddd'+product._id); //
 const ids= "663f3bdea02b8df9cdc88370";
 const loc = useLocation();
 console.log(loc.state.id);
 
 const dispatch = useDispatch();

//  const addToCartHandler = (cartItem: CartItem) => {
//    if (cartItem.stock < 1) return toast.error("Out of Stock");
//    dispatch(addToCart(cartItem));
//    toast.success("Added to cart");
//  };
 
 const addToCartHandler = (trur) => {
  if (true) return toast.success("Added to Cart");
  dispatch(addToCart(cartItem));
  toast.success("Added to cart");
};
 const CartIcon = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
      <div className="cart-icon">
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cartItems.length}</span>
      </div>
    );
  };

  

 useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
    
        const response = await fetch(`http://localhost:4000/api/v1/product/${loc.state.id}`); // Your API endpoint
        
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        
        const data = await response.json();
       // console.log(product._id); 
        console.log('Full Product Data:', data);  // Log all details
        setProduct(data.product); // Assuming API returns { success: true, product: ... }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductDetails();
  }, []);

  if (isLoading) return <Skeleton />;
  if (error) return <p className="error-message">{error}</p>;

  return (

    <div className="product-details">
      {product ? (
        <>
        <div className="productfull">
          <div className="image-container">
          <img src={`${import.meta.env.VITE_SERVER}/${product.photo}`} alt={product.name} className="product-image" />
          </div>

          <div className="product-info">
            <h2>{product.name}</h2>
    
            <p>Price: ₹{product.price.toLocaleString('en-IN')}</p>
            <p>Stock: {product.stock}</p>
            <p className="description">Category: {product.category}</p>
            {/* Render other essential details here as needed */}
            <div dangerouslySetInnerHTML={{ __html: product.details }} /> 
            <button className= "cartbtn" onClick={() => addToCartHandler()}> Add to cart </button>
            {/* <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button> */}
            {/* ... (ratings, reviews, Add to Cart, and Buy buttons) */}
          </div>
        </div>
        
        </>
      ) : (
        <p>Product not found.</p>
      )}
    
    
    </div>
  );
};

export default ProductDetailsPage;