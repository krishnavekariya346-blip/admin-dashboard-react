import React, { useEffect, useState } from "react";
import { fetchAll, fetchSearch } from "../apis/api";
import ReactPaginate from "react-paginate";
import ItemCard from "./ItemCard";

const DataViewer = ({ type, cart, addToCart, removeFromCart }) => {
  const [data, setData] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const handleDelete = (id) => {
    setDeletedIds((prev) => [...prev, id]);
  };

  // ====================== Fetch All ======================
  const getAll = async (pageNumber = page) => {
    const result = await fetchAll(type, pageNumber, limit);
    setData(result[type]);
    setTotal(result.total);
  };

  // ====================== Search ======================
  const searchData = async () => {
    const result = await fetchSearch(type, search);
    setData(result);
  };

  // ====================== Cart Total ======================
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ====================== Reset when type changes ======================
  useEffect(() => {
    setPage(1);
    getAll(1);
  }, [type]);

  // ====================== Pagination Change ======================
  useEffect(() => {
    if (!search) {
      getAll();
    }
  }, [page]);

  // ====================== Auto Search ======================
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search) {
        searchData();
      } else {
        getAll(1);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-80px)]">
     {/* -------------search bar-------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 className="text-2xl font-semibold capitalize">{type}</h2>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={`Search ${type}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ====================== Grid ====================== */}
      <div className="grow">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {type === "carts"
            ? cart.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  type="carts"
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              ))
            : data
                ?.filter((item) => !deletedIds.includes(item.id))
                .map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    type={type}
                    addToCart={addToCart}
                    onDelete={handleDelete}
                  />
                ))}
        </div>

        {type === "carts" && cart.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No items in cart
          </div>
        )}
      </div>

      {type === "carts" && cart.length > 0 && (
        <div className="mt-10 p-6 bg-white rounded-2xl shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total Items:{" "}
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </h2>

            <h2 className="text-xl font-bold text-green-600">
              Total Price: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </div>
      )}

      {/* ====================== Pagination  ====================== */}
      {search === "" && totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."} // shows dots (...)
            pageCount={totalPages}
            onPageChange={(selectedItem) => setPage(selectedItem.selected + 1)}
            marginPagesDisplayed={1} // show first & last page
            pageRangeDisplayed={3} // show only 3 pages in middle
            containerClassName="flex items-center gap-2"
            pageClassName="px-3 py-1 bg-gray-200 rounded-md cursor-pointer"
            activeClassName="bg-blue-600 text-white"
            previousClassName="px-3 py-1 bg-gray-300 rounded-md cursor-pointer"
            nextClassName="px-3 py-1 bg-gray-300 rounded-md cursor-pointer"
            breakClassName="px-3 py-1"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default DataViewer;
