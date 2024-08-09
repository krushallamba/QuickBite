import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {

  let dispatch = useDispatchCart()
  let options = props.options
  let priceOptions = Object.keys(options)
  const priceRef = useRef()
  let data = useCart()
  // let foodItem = props.foodItem
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const handleAddtoCart = async ()=>{
    let food = []
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item
        break;
      }
    }
    if(food != []){
      if(food.size === size){
        await dispatch({type:"UPDATE", id: props.foodItem._id, price:finalPrice, qty:qty})
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
        return 
      }
      return 
    }
    await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
    // await console.log(data)
  }
  let finalPrice = qty*parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div class="card mt-3" style={{ width: "20rem", maxHeight: "500px" }}>
        <img src={props.foodItem.img} class="card-img-top" alt="..." style={{'height':'180px','objectFit':'fill'}}/>
        <div class="card-body">
          <h5 class="card-title">{props.foodItem.name}</h5>
          {/* <p class="card-text">
            {props.foodItem.description}
          </p> */}
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {/* <option value="half">Half</option>
              <option value="full">Full</option> */}
              {
                priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>
            <div className="d-inline h-100 fs-5">Rs. {finalPrice}/-</div>
          </div>
          <hr>
          </hr>
          <button className="btn btn-success text-white justify-centre ms-2" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;



// https://img.freepik.com/premium-photo/juicy-american-burger-hamburger-cheeseburger-with-two-beef-patties-with-sauce-basked-black-space_124865-5964.jpg