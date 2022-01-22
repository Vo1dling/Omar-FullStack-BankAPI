import React, { useEffect, useState } from "react";
import api from "./api/api";
import Spinner from "./components/Spinner/Spinner.components";
import ItemView from "./components/ItemView/ItemView.components";
import CustomInput from "./components/CustomInput/CustomInput.components";
import CustomButton from "./components/CustomButton/CustomButton.components";
import Popup from "./components/Popup/Popup.components";
import "./App.css";
import { getUsers } from "./utils/utils";

function App() {
  const [data, setData] = useState([]);
  const getData = () => {
    const users = getUsers();
    console.log(users);
  };
  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}
export default App;
