import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { Link,useNavigate, useHistory, useLocation  } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { RootState } from "../redux/store";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
 
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  // const history = useHistory();

  // const handleProductClick = (productId: string) => {
  //   history.push(`/product/${productId}`);
  // };

  const navigate = useNavigate();
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`,{state:{id:productId}}); // Navigate to the product details page with the productId
    console.log("lets see detials");
    console.log(productId);
  };


  // const handleProductClick = (productId: string) => {
  //   // Redirect to product details page
 // console.log("Lets see this product details page");
  //   history.push(`/productsdetails/${productId}`);
  // };




  const CartIcon = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    return (
      <div className="cart-icon">
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cartItems.length}</span>
      </div>
    );
  };

  // Render the CartIcon component
  <CartIcon />

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    
    <div className="home">
    
      <section></section>
    
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {isLoading ? (
          <Skeleton width="100vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard ids= {i._id}
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
             handler={addToCartHandler}
              photo={i.photo}
              ratings={i.ratings}
              onClick={() => handleProductClick(i._id)} 
          //   onClick={handleProductClick(i._id)} // Add onClick handler to redirect to product page
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
