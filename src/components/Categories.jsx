import React, { useEffect, useState } from "react";
import { useLazyFetchCategoriesQuery, useLazyFetchCompaniesQuery } from "../features/api";
import { useNavigate } from "react-router-dom";

const CategoryGrid = () => {

const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  
   
  
  
  const [fetchCategories ] = useLazyFetchCategoriesQuery();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res1 = await fetchCategories();
  
          const catData = res1?.data?.categories
  
          setCategoryData(catData);
         
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);


  return (
    <section className="h-auto overflow-y-auto  p-2 border-t-4 border-base-100 bg-base-200 mb-6">
      {/* <div className="border-b border-base-300 pb-0">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Shop By Category
        </h2>
      </div> */}
      <div className="flex flex-row  w-full justify-center md:gap-6 lg:gap-6 gap-2  items-center overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
        {categoryData?.slice(1, categoryData.length).map((category) => (
          <button
            onClick={() =>
              navigate(
                `/products?search=&category=${category?.name}&company=all&order=none&price=1000000&shipping=true`
              )
            }
            key={category.id}
            className="flex flex-col max-w-[8rem] items-center hover:cursor-pointer justify-center bg-base-100 p-2 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={category.image.url}
              alt={category.name}
              className="w-[5rem] h-[4rem] object-cover rounded-md mb-2"
            />
            <span className="text-[0.7rem] text-center font-semibold">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
