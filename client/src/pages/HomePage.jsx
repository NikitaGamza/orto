import { Helmet } from 'react-helmet-async';
import ProductList from '../components/menu/ProductList';
import useProductFetch from '../components/products/useProductFetch';
import { useEffect, useState } from 'react';
import { getError } from '../utils.js';
import axios from 'axios';

export default function HomePage() {
  const [products, loading, error] = useProductFetch();
  const [list, setList] = useState(products);
  const [categories, setCategories] = useState([]);
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    setList(products);
  }, [products]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/category`);
        setCategories(data);
      } catch (err) {
        alert(getError(err));
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const cloneList = list;
    if (cloneList !== null && filterList.length !== 0) {
      const newClone = cloneList.filter((param) =>
        filterList.includes(param.categoryId)
      );
      console.log(newClone);
      setList(newClone);
    } else {
      setList(products);
    }
  }, [filterList]);

  const filterSettings = (id) => {
    if (filterList.includes(id)) {
      const deletedFilterItem = filterList.splice(filterList.indexOf(id), 1);
      setFilterList(deletedFilterItem);
      console.log('delete ', filterList);
    } else if (filterList.length === 0) {
      setFilterList([id]);
      console.log('second ', filterList);
    } else {
      setFilterList([...filterList, id]);
      console.log('third ', filterList);
    }
  };

  return (
    <div className="flex_wrap_spacebetween">
      <Helmet>
        <title>OrtoKomi</title>
      </Helmet>

      <div>
        <h3>Фильтры</h3>
        <div>
          <button></button>
          {categories.map((item) => (
            <button>{item.name}</button>
          ))}
          <p>{filterList}</p>
        </div>
      </div>
      <div>
        <h1>Наши товары</h1>

        <ProductList products={list} loading={loading} error={error} />
      </div>
    </div>
  );
}
