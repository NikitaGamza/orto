import axios from "axios";

export const getProductCategory = async () => {
  const data = await axios.get(`/api/products/categories`)
  return data
}
