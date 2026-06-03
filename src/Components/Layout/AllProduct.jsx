import React from "react";
import Header from "@/Components/Layout/Header";
import Footer from "@/Pages/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HeartButton from "@/Components/Layout/HeartButton";
import CartButton from "@/Components/Layout/CartButton";

const AllProduct = () => {
  const { mainCategory, subCategory } = useParams();
  const key =
    mainCategory[0].toUpperCase() + mainCategory.slice(1).toLowerCase();
  const key2 =
    subCategory[0].toUpperCase() + subCategory.slice(1).toLowerCase();
  const data =
    useSelector((state) => state.fetchData.data?.[key]?.[key2]) || [];
  const navigate = useNavigate();
  const allItems = Object.values(data).flat(1);

  const getStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i}>{i <= rating ? "⭐" : "☆"}</span>);
    }

    return stars;
  };

  return (
    <>
      <Header />
      <div className="flex  mt-10 items-center lg:items-end flex-col lg:flex-row px-21 justify-start w-full  xl:items-end   gap-5">
        <div className=" rotate-90 lg:rotate-0 bg-red-500 rounded-[5px] h-[40px] w-[15px]"></div>
        <h1 className=" text-2xl font-bold  capitalize">{key2} Products</h1>
      </div>

      <div className="mt-24 px-4  flex justify-center flex-col items-center mb-10 ">
        <div className=" w-[80%] flex justify-evenly gap-6 flex-wrap">
          {allItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[340px] w-full max-w-[280px] overflow-hidden group relative bg-white"
            >
              <div
                onClick={() => navigate(`/DetailPage/${item.id}`)}
                className="relative h-[190px] w-full cursor-pointer bg-white flex items-center justify-center"
              >
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                  -20%
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <HeartButton item={item} />
                </div>
                <img
                  loading="lazy"
                  className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  src={
                    item.images?.[0]?.trim() ||
                    "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  alt={item.name}
                />
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[88%] lg:left-0 lg:transform-none lg:translate-x-0 lg:w-full lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                  <CartButton item={item} />
                </div>
              </div>

              <div className="p-3 flex flex-col gap-1">
                <h3 className="text-base font-medium text-gray-900 truncate">
                  {item.name}
                </h3>
                <h3 className="text-sm text-gray-500 truncate">{item.brand}</h3>
                <h3 className="text-sm text-gray-500 truncate">
                  {item.title || "Product Title"}
                </h3>
                <h3 className="text-sm font-semibold text-red-600">
                  {item.price ? `${item.price}$` : "Price not available"}
                </h3>
                <div className="cursor-pointer text-yellow-400 text-sm flex">
                  {" "}
                  <span className="flex gap-1">
                    {" "}
                    {item.rating} {getStars(item.rating || 0)}{" "}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllProduct;
