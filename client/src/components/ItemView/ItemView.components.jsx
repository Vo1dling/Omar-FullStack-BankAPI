import React from "react";
import CustomButton from "../CustomButton/CustomButton.components";
import "./ItemView.styles.css";
const ItemView = ({ user, showPopup }) => {
  const { name, credit, cash } = user;
  return (
    <div style={{ border: "3px solid black" }} className="item-view">
      <h3>Name : {name}</h3>
      <p>Cash : {cash}&#8362;</p>
      <p>Credit : {credit}&#8362;</p>

      <div className="button-container">
        <CustomButton onClick={showPopup} userid={user._id} text="Deposit" />
        <CustomButton onClick={showPopup} userid={user._id} text="Withdraw" />
        <CustomButton onClick={showPopup} userid={user._id} text="Transfer" />
        <CustomButton
          onClick={showPopup}
          userid={user._id}
          text="Update Credit"
        />
      </div>
    </div>
  );
};
export default ItemView;
