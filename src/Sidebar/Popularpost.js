import React, { useState, useEffect } from 'react';
import './Popularpost.css';
import './Sidebar.css';
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
function Popularpost({page_name,agencyDetails}) {
  const { id } = useParams();

  const [breakingNews, setBreakingNews] = useState();
  const fetchBreakingNews = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${id}/getBreakingNews`
      );
      // console.log(response.data.data, "breaking");
      setBreakingNews(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('aaa', breakingNews)

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  const [ad, setAd] = useState();

  const fetchAd = async () => {
    try {
      const response = await axios.get(`http://174.138.101.222:8080/${id}/${page_name}/Below_Breaking_News/get-Advertisement`)
      // console.log(response.data.data[0])
      setAd(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAd();
  }, [id, page_name])


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
    <div>
      <div className="box">
        <h2 className='title'>Trending</h2>
        {breakingNews &&
          breakingNews.map((news, index) => {
            return (
              <div style={{ display: "flex", padding: "0px 10px 10px 10px" }}>
                <div className="part1">
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={
                      news.image
                        ? `http://174.138.101.222:8080${news.image}`
                        : `https://www.newsclick.in/sites/default/files/2018-09/xfakenews_0.jpg.pagespeed.ic_.232PSP6q2x_0.jpg`
                    } alt="loaded" />
                </div>
                <div className="part2" style={{ marginLeft: "10px" }}>
                  <p>{news.category} / {formatDate(news.updatedAt)}</p>
                  <a style={{ fontSize: "15px" }} href="/">{news.title}</a>
                </div>
              </div>
            );
          })}
      </div>
      
          <div>
            <h4>advertisement</h4>
          </div>
          <div className="image">
            <img src={`http://174.138.101.222:8080${ad?.image}`} alt="Ads" />
          </div>
        </div>
  )
}

export default Popularpost;