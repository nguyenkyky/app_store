import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemAction, changeQuantityAction } from "../../redux/reducer/shopReducer";

function Cart(props) {
  const { cart } = useSelector((state) => state.shopReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    width={50}
                    src={item.image}
                  ></img>
                </td>
                <td>{item.price}</td>
                <td>
                  <button className="btn btn-outline-primary mr-2" onClick={() => {
                    const itemQuantity = {
                      id:item.id,
                      quantity:-1
                    }
                    const action = changeQuantityAction(itemQuantity);
                    dispatch(action)
                  }}>-</button>
                  {item.quantity}
                  <button className="btn btn-outline-primary ml-2" onClick = {() => {
                     const itemQuantity = {
                      id:item.id,
                      quantity:-1
                    }
                    const action = changeQuantityAction(itemQuantity);
                    dispatch(action)
                  }}>+</button>

                  </td>
                <td>{item.quantity * item.price}</td>
                <td>
                  <button className="btn btn-danger" onClick = {() => {
                    const action = deleteItemAction(item.id);
                    dispatch(action);
                  }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
