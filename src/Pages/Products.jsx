import React, { useContext, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import "../Components/navbar.css"
import { LoginContext } from "../Components/Context";

function Products() {
  const [products, setProducts] = useState([]);
  const [search,setSeach] = useState("");
  const [remove,removeFilter] = useState(false);
  const {user} = useContext(LoginContext)

  const handleChange=(e)=>{
    setSeach(e.target.value);
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    setProducts(products.filter((item,index)=>{
        return item.productCategory.productCategoryName.toLowerCase().includes(search.toLowerCase())
    }))
    if(search){
        removeFilter(true)
        setSeach("")
    }
    
  }

  const removeFilterHandler= async()=>{
    try {
        const data = await fetch(
          "https://api.kalpav.com/api/v1/product/category/retail"
        );
        const res = await data.json();
        if (res.response) {
          setProducts(res.response);
        }
      } catch (error) {
        console.error(error);
      }
      removeFilter(false)
  }
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetch(
          "https://api.kalpav.com/api/v1/product/category/retail",{
            headers:{
                    'Authorization': `Bearer ${user.access_token}`
            }
          }
        );
        const res = await data.json();
        if (res.response) {
          setProducts(res.response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);
  return (
    <div className="h-screen">

    <form className="bg-gray-300 h-[70px] flex justify-center items-center mx-16 my-3 rounded-lg shadow-lg p-4 gap-3" onSubmit={handleSearch}>
        <input value={search} onChange={handleChange} className="w-full h-full bg-transparent px-3 outline-none text-xl max-md:text-sm"placeholder="Search products"></input>
        <button className="w-[50px]"><GoSearch size={30} color="green"></GoSearch></button>
        {remove && <button type="button" onClick={removeFilterHandler} className="px-5 py-2 bg-red-500 text-stone-100 rounded-lg shadow-lg hover:scale-105 transition-all max-md:text-sm max-md:p-2 ">Remove Filter</button>}
    </form>
    <div className="flex flex-wrap gap-3 justify-center  py-10">
      {products.map((item, index) => {
        return (
          <div key={index} className="w-[350px] h-[400px] bg-sky-300 rounded-lg shadow-lg shadow-gray-400 p-2 flex flex-col justify-evenly items-center">
            <img
              src={item.productCategory.productCategoryImage}
              className="w-[110px]"
            ></img>
            <p className="text-xl font-semibold">
              {item.productCategory.productCategoryName}
            </p>
            <p className="flex items-center gap-3 border rounded-lg py-2 px-5 justify-center shadow-lg bg-green-300">
                {"Retail "}{item.productCategory.retail?": Yes":": No"}
            </p>
            <p className="flex items-center gap-3 border rounded-lg py-2 px-5 justify-center shadow-lg bg-orange-200 ">
                {"Whole-Sale "}{item.productCategory.wholeSale?": Yes":": No"}
            </p>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Products;
