
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Footer = ({page_name}) => {
  const agencyDetails = useSelector((state) => {
    return state.User;
  });
  const [ad, setAd] = useState();

  const fetchAd= async ()=>{
    try {
      const response = await axios.get(`http://174.138.101.222:8080/${agencyDetails._id}/${page_name}/Footer/get-Advertisement`)
      // console.log(response.data.data[0])
      setAd(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchAd();
  },[agencyDetails,page_name])
  return (
    <>
      <div className="container-fluid bg-light pt-5 px-sm-3 px-md-5">
        <div className="row" style={{display:"flex",justifyContent:"space-between"}}>
          <div className="col-lg-4 col-md-6 mb-5">
            <a href="index.html" className="navbar-brand">
              <h1
                className="mb-2 mt-n2 display-8 text-danger"
                style={{ wordBreak: "break-word" }}
              >
                
                {agencyDetails.publication_name}
               </h1>
            </a>
            <p >{agencyDetails.publisher_BIO}</p>
            <div className="d-flex justify-content-start mt-4">
              <a
                className="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: 38, height: 38 }}
                href={`https://${agencyDetails.pub_social_twitter}`}
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: 38, height: 38 }}
                href={`https://${agencyDetails.pub_social_facebook}`}
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: 38, height: 38 }}
                href={`https://${agencyDetails.pub_social_linkedin}`}
                target="_blank"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                className="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: 38, height: 38 }}
                href={`https://${agencyDetails.pub_social_instagram}`}
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                className="btn btn-outline-secondary text-center mr-2 px-0"
                style={{ width: 38, height: 38 }}
                href={`https://${agencyDetails.pub_social_youtube}`}
                target="_blank"
              >
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>








          <div className="col-lg-2 col-md-6 mb-5">
            <h4 className="font-weight-bold mb-4">Quick Links</h4>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-secondary mb-2" href="#">
                <i className="fa fa-angle-right text-dark mr-2" />
                About
              </a>
              <a className="text-secondary mb-2" href="#">
                <i className="fa fa-angle-right text-dark mr-2" />
                Advertise
              </a>
              <a className="text-secondary mb-2" href="#">
                <i className="fa fa-angle-right text-dark mr-2" />
                Privacy &amp; policy
              </a>
              <a className="text-secondary mb-2" href="#">
                <i className="fa fa-angle-right text-dark mr-2" />
                Terms &amp; conditions
              </a>
              <a className="text-secondary" href="#">
                <i className="fa fa-angle-right text-dark mr-2" />
                Contact
              </a>
            </div>
          </div>
          

        
        </div>
      </div>
     
     
    </>
  );
};

export default Footer;
