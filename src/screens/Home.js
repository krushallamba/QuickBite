import React, {useEffect, useState}from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {

  const [search, setSearch] = useState([]);
  const [foodCat, setfoodCat] = useState([])
  const [foodItem, setfoodItem] = useState([]);
  const loadData = async ()=>{
    let response = await fetch(`${window.location.origin}/api/foodData`, {
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })
    response = await response.json()
    setfoodItem(response[0])
    setfoodCat(response[1])
    // console.log(response[0], response[1])

  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{objectFit:"contain !important"}}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex:"10"}}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success text-white " type="submit">
                Search
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://media.istockphoto.com/photos/paneer-tikka-kabab-in-red-sauce-is-an-indian-dish-made-from-chunks-of-picture-id1257507446?b=1&k=20&m=1257507446&s=170667a&w=0&h=Nd7QsslbvPqOcvwu1bY0rEPZXJqwoKTYCal3nty4X-Y="
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(30%)", height:'100vh'}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0="
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(30%)", objectFit:'fill', height:'100vh'}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/photos/veg-biryani-picture-id1363306527?b=1&k=20&m=1363306527&s=170667a&w=0&h=VCbro7CX8nq2kruynWOCO2GbMGCea2dDJy6O6ebCKD0="
              className="d-block w-100"
              alt="..."
              style={{filter:"brightness(30%)", objectFit:'fill', height:'100vh'}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {
          foodCat != []? foodCat.map((item)=>{
            return (
          <div className="row mb-3">
            <div key={item._id} className="fs-3 m-3">
              {item.CategoryName}
            </div>
            <hr/>
            {foodItem != []? foodItem.filter((data)=> (data.CategoryName === item.CategoryName) && (data.name.toLowerCase().includes(search))).map(filterData=>{
              return (
              <div key={filterData._id} className="col-12 col-md-6 col-lg-3">
                <Card foodItem={filterData} options={filterData.options[0]} />
              </div>
            )
            }) :<div>No such Data found</div>}
          </div>)
          }) : ""


        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;


// http://localhost:5000/api/foodData