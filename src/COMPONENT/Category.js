// import Topbar from "../Template/Topbar";
// import Navbar from "../Template/Navbar";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
// import Footer from "../Template/Footer";
import { useSelector } from "react-redux";
import Header from "./Header";
import TopbarStart from "./TopbarStart";
import Navigation from "./Navigation";
import Footer from "./Footer";
import '../App.css'
import CategoryPage from "./CategoryPage";

function Category() {
    const agencyDetails = useSelector((state) => {
        return state.User;
    });
    const navigate = useNavigate();
    const { category } = useParams();
    const { id } = useParams();
    const [data, setData] = useState();
    const getData = async () => {
        try {
            let response = await axios.get(
                `http://174.138.101.222:8080/${agencyDetails._id}/get-Postnews/${category}`
            );
            console.log("Category API Called");
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="centre">
            {/* <Header /> */}
            {<TopbarStart page_name={"Categories_Page"} />}
            {<Navigation page_name={"Categories_Page"} agencyDetails={agencyDetails} />}
            {<CategoryPage/>}
            {<Footer page_name={'Categories_Page'} agencyDetails={agencyDetails} />}
        </div>

    )
}

export default Category