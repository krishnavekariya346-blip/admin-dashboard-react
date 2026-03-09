import axios from "axios";

const BASE_URL = "https://dummyjson.com";

//Fetch List with Pagination
export const fetchAll = async (type, page = 1, limit = 12) => {
  const skip = (page - 1) * limit;

  const res = await axios.get(`${BASE_URL}/${type}`, {
    params: {limit, skip},
  });
  return res.data;
};

//Fetch Single Item
export const fetchSingle = async (type, id) => {
  const res = await axios.get(`${BASE_URL}/${type}/${id}`);
  return res.data;
};

//Search
export const fetchSearch = async (type, query) => {
  const res = await axios.get(`${BASE_URL}/${type}/search`, {
    params: { q: query },
  });
  return res.data[type] || res.data;
};

// ================= Delete Item (DummyJSON Simulation) =================
export const deleteItem = async (type, id) => {
  // DummyJSON supports DELETE but it won't really remove data
  const res = await axios.delete(`${BASE_URL}/${type}/${id}`);
  return res.data;
};