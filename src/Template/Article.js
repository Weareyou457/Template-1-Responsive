import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import './MoreArticle.css';
import './Article.css';

// import ReactPaginate from 'react-paginate';


function Article({ agencyDetails }) {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const navigate = useNavigate();

  const [categories, setCategory] = useState();

  const getCategoryName = (url) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].categories_Name_Url === url) {
        return categories[i].categories_Name_Hindi;
      }
    }
  };

  const getData = async (categories) => {
    try {
      const promises = categories.map((category) =>
        axios.get(
          `http://174.138.101.222:8080/${agencyDetails._id}/get-Postnews/${category}`
        )
      );

      const responses = await Promise.all(promises);

      const newData = responses.map((response, index) => ({
        category: categories[index],
        data: response.data.data,
      }));

      setData((prevData) => [...prevData, ...newData]);
      setFetch(true);

      // console.log("data fetched");
    } catch (error) {
      console.log(error);
    }
  };

  const [input, setInput] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      // console.log(response.data.data, "categories");
      setCategory(response.data.data);

      response.data.data.map((item) => {
        setInput((prev) => [...prev, item.categories_Name_Url]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(input, "input");
  useEffect(() => {
    getCategories();
    getData(input);
  }, [categories?.length]);

  // console.log(data);

  function formatDate(inputDate) {
    // Step 1: Parse the input string into a JavaScript Date object
    const dateObj = new Date(inputDate);

    // Step 2: Extract day, month, and year from the Date object
    const day = dateObj.getUTCDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getUTCFullYear();

    // Step 3: Format the values into "day month year" format
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  }

  return (
    <div className='articles'>
      <h2 className='title'>More Articles</h2>
      {fetch &&
        data.map((item, index) => {
          return (
            <div key={index} className="post">
              <div className="details">
                {item.data.length > 0 && (
                  <p className="l">
                    <span className="category">
                      <Link
                        className='l-a'
                        to={`/${agencyDetails._id}/Category/${item.category}`}
                      >
                        {getCategoryName(item.category)}
                      </Link>
                    </span>
                  </p>
                )}
              </div>
              <div
                className="row">
                {item.data
                  .reverse()
                  .slice(0, 1)
                  .map((news, index) => {
                    return (
                      <div className="post">
                        <div className="thumb">
                          <a href="/">
                            <img className='thumb-img' src={`http://174.138.101.222:8080${news.image}`} alt="" />
                          </a>
                        </div>
                        <h2 className='article-h2'>
                          <a onClick={() => {
                              navigate(
                                `/${agencyDetails._id}/DetailedNews/${news._id}`,
                                {
                                  state: {
                                    item: news,
                                    agencyDetails: agencyDetails,
                                  },
                                }
                              );
                            }}>{news.title}</a>
                        </h2>
                        <p className='post-p'>{formatDate(news.updatedAt)}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  )
}

export default Article;