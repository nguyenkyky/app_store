import React from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../redux/reducer/shopReducer";


function ProductItem(props) {
    const {item} = props;

const dispatch = useDispatch();

  return (
    <div className="card" key={item.id}>
        
      <img
        width={100}
        src={item.image}
        alt=""
      />
      <div className="card-body bg-dark text-white">
        <h2 style={{height:50, fontSize:22}}>{item.name}</h2>
        <p>{item.price}</p>
        <button className="btn-secondary btn    " onClick = {() => {
            const itemCart = { ...item, quantity:1}
            const action = addToCartAction(itemCart);
            dispatch(action);
        }}>
          Add to cart
          <i className="fa fa-shopping-cart ml-1"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
