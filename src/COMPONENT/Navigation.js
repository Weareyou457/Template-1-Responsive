// import React from 'react';
import './Navigation.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



function Navigation() {
  const agencyDetails = useSelector((state) => {
    return state.User;
  });

  const [categories, setCategory] = useState();
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      // console.log(response.data.data, "categories");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='Categories-Block'>
      <ul className="Categories">
        <li className='Categories-li'><Link className='Categories-a ' to={`/${agencyDetails._id}`}> Home</Link></li>
        <li className='Categories-li'><Link className='Categories-a ' to={`/${agencyDetails._id}`}> Single News</Link></li>
        <li className="Categories-li">
          <Link
            to={`/${agencyDetails._id}`}
            className="Categories-a"
            data-bs-toggle="dropdown"
          >
            Categories
          </Link>
          <div className="dropdown-menu rounded-0 m-0">
            {categories &&
              categories.map((item, index) => {
                return (
                  <Link
                    to={`/${agencyDetails._id}/Category/${item.categories_Name_Url}`}
                    state={agencyDetails}
                    key={index}
                    className="dropdown-item"
                  >
                    {item.categories_Name_English}
                  </Link>
                );
              })}
          </div>
        </li>

        <li className='Categories-li'><Link className='Categories-a ' to={`/${agencyDetails._id}`}> Contact</Link></li>
      </ul>
    </div>
  )
}

export default Navigation;