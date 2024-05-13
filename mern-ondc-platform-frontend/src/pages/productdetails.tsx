import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Product } from "../types/types";

interface ZoomImageCoordinate {
  x: number;
  y: number;
}

const ProductDetails = (): JSX.Element => {
  const [data, setData] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    photo: "",
    _id: "",
    ratings: 0,
    averageRating: 0,
    totalReviews: 0,
    reviews: []
  });
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const productImageListLoading: null[] = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState<string>("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState<ZoomImageCoordinate>({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchProductDetails = async (): Promise<void> => {
    setLoading(true);
    try {
      // Fetch product details from the server
      const response = await fetch(`/api/product/${params?.id}`);
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.photo);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL: string): void => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = (): void => {
    setZoomImage(false);
  };

  return (
    <div className='container mx-auto p-4'>
      {/* Product Image */}
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
            {/* Product zoom */}
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className='h-full'>
            {/* Product images */}
            {loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {productImageListLoading.map((el, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}></div>
                ))}
              </div>
            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {data?.photo && (
                  <div className='h-20 w-20 bg-slate-200 rounded p-1'>
                    <img src={data.photo} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(data.photo)} onClick={() => handleMouseEnterProduct(data.photo)} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product details */}
        {loading ? (
          <div className='grid gap-1 w-full'>
            {/* Loading placeholders */}
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            {/* Product details */}
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.name}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.name}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>

            <div className='text-red-600 flex items-center gap-1'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{data.price}</p>
              <p className='text-slate-400 line-through'>{data.price}</p>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={() => handleBuyProduct(data._id)}>Buy</button>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white' onClick={() => handleAddToCart(data._id)}>Add To Cart</button>
            </div>

            <div>
              <p className='text-slate-600 font-medium my-1'>Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
