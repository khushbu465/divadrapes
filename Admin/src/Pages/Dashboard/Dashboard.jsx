import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import OptionCard from '../../Components/HomeContent/Cards/OptionCard'
import Breadcrumb from "../../Common/Breadcrumb"
// import WelcomeCard from "../../Components/HomeContent/WelcomeCard";

const Dashboard = () => {
  const [tblog, setTblog] = useState();
  const [tuser, setTuser] = useState();
  const [news, setNews] = useState();
  const [joiner, setJoiner] = useState();
  const [contact, setContact] = useState();
  const [gallery, setGallery] = useState();

  useEffect(() => {
    fecthgallery();
    fetchItems();
    fetchImages();
    fetchnews();
    getUsers();
    getblogs();
  }, []);
  const token = localStorage.getItem('authToken');
  const getblogs = async () => {
    try {
      const api_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${api_url}/blog/getall`);
      const results = await response.json();
      setTblog(results.length);
    } catch (error) {
      console.error(error);
    }
  };
  const getUsers = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${apiUrl}/registrations/getusers`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setTuser(result.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchnews = async () => {
    try {
      const base_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${base_url}/news/getnews`);
      const results = await response.json();
      setNews(results.length);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchImages = async () => {
    try {
      const Url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${Url}/newjoiners/getImg`);
      const results = await response.json();
      setJoiner(results.length);
    } catch (err) {
      console.log(err, 'images fetching error')
    }
  };
  const fetchItems = async () => {
    try {
      const base_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${base_url}/contacts/getuser`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const results = await response.json();
      setContact(results.length);
    } catch (error) {
      console.error(error);
    }
  };
  const fecthgallery = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${apiUrl}/gallery/getGallery`);
      const results = await response.json();
      setGallery(results.length);
    } catch (error) {
      console.log(error, "images not fetch")
    }
  };
  return (
    <>
      <div id="layout-wrapper">
        <div className="main-content">
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumb breadcrumbItem="Dashboard" title="Dashboard" />
              <Row>
                <Col xl={12}>
                  <Row>
                    <OptionCard title="Sliders" counts={tblog} linkhere="/Blog" iconClass="bx-copy-alt" />
                    <OptionCard title=" Banners" counts={tuser} linkhere="/Users" iconClass="bx-user" />
                    <OptionCard title="Brands" counts={news} linkhere="/News" iconClass="bx-news" />
                    <OptionCard title="New Joiners" counts={joiner} linkhere="/NewJoiners" iconClass="bx-user" />
                    <OptionCard title="Offers" counts={contact} linkhere="/Contactus" iconClass="bxs-detail" />
                    <OptionCard title="All Products" counts={gallery} linkhere="/Gallery" iconClass="bx-news" />
                    <OptionCard title="All Customers" counts="Add new news" linkhere="/AddNews" iconClass="bx-file" />
                    <OptionCard title="Category" counts="Add new blog" linkhere="/AddBlog" iconClass="bx-plus-circle" />
                    <OptionCard title="Orders" counts={joiner} linkhere="/NewJoiners" iconClass="bx-user" />
                    <OptionCard title=" All Contacts" counts={contact} linkhere="/Contactus" iconClass="bxs-detail" />
                    <OptionCard title="Gallery" counts={gallery} linkhere="/Gallery" iconClass="bx-news" />
                    <OptionCard title="Add News" counts="Add new news" linkhere="/AddNews" iconClass="bx-file" />
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
