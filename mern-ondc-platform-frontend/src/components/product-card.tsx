import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { useNavigate } from "react-router-dom";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  ratings: number;
  handler: (cartItem: CartItem) => string | undefined;
  onClick: (productId: string) => void; // Add onClick prop
};

const ProductCard: React.FC<ProductsProps> = ({
  productId,
  price,
  name,
  photo,
  stock,
  ratings,
  handler,
  onClick, // Receive the onClick prop
}) => {

  return (
    <div className="product-card" onClick={() => onClick(productId)}>
      {/* Make the entire card clickable */}
      <img src={`${server}/${photo}`} alt={name} className="w-full h-full object-cover" />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            handler({ productId, price, name, photo, stock, quantity: 1, ratings });
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
