import React, { useEffect, useRef, useState } from "react";

import Spinner from "./components/Spinner/Spinner.components";
import ItemView from "./components/ItemView/ItemView.components";
import CustomInput from "./components/CustomInput/CustomInput.components";
import CustomButton from "./components/CustomButton/CustomButton.components";
import Popup from "./components/Popup/Popup.components";
import "./App.css";
import { getUsers, onNumberInputChange, performAction } from "./utils/utils";

const App = () => {
  const [data, setData] = useState([]);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setUser] = useState("");
  const popupRef = useRef();
  const spinnerRef = useRef();
  const inputRef = useRef();
  const targetRef = useRef();
  const nameRef = useRef();
  const cashRef = useRef();
  const creditRef = useRef();
  const getData = async () => {
    try {
      const users = await getUsers();
      setData(users.data);
      setLoading(false);
    } catch (e) {
      console.error(e.response);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    showSpinner();
  }, [loading]);

  const showPopup = (e) => {
    if (typeof e === "object") {
      if (e.target.innerText !== "Confirm" && e.target.innerText !== "Cancel") {
        setAction(e.target.innerText);
        setUser(e.target.getAttribute("userid"));
      }
    } else {
      setAction("");
      setUser("");
    }
    popupRef.current.classList.toggle("hidden");
  };
  const showSpinner = () => {
    if (loading === true) spinnerRef.current.classList.remove("hidden");
    else spinnerRef.current.classList.add("hidden");
  };
  const onConfirm = async () => {
    setLoading(true);
    let targetID;
    if (targetRef.current) {
      targetID = targetRef.current.value;
    }
    try {
      if (action === "Add User") {
        await performAction("", action.toLowerCase(), {
          name: nameRef.current.value,
          cash: +cashRef.current.value,
          credit: +creditRef.current.value,
        });
      } else {
        await performAction(currentUser, action.toLowerCase(), {
          amount: +inputRef.current.value,
          targetID,
        });
      }
      getData();
      showPopup("");
    } catch (e) {
      console.error(e.response);
    } finally {
      setLoading(false);
    }
  };
  const renderContent = () => {
    if (action === "Transfer") {
      return (
        <>
          <h2>{action}</h2>
          <CustomInput
            inputRef={inputRef}
            label="Amount"
            onChange={onNumberInputChange}
            placeHolder="Enter Amount Here..."
          ></CustomInput>
          <CustomInput
            inputRef={targetRef}
            label="Target"
            placeHolder="Enter Target Here..."
          ></CustomInput>
          <div className="button-container">
            <CustomButton text="Confirm" onClick={onConfirm} />
            <CustomButton text="Cancel" onClick={showPopup} />
          </div>
        </>
      );
    } else if (action === "Add User") {
      return (
        <>
          <h2>{action}</h2>
          <CustomInput
            inputRef={nameRef}
            label="Name"
            placeHolder="Enter Amount Here..."
          ></CustomInput>
          <CustomInput
            inputRef={cashRef}
            onChange={onNumberInputChange}
            label="Cash"
            placeHolder="Enter Target Here..."
          ></CustomInput>
          <CustomInput
            inputRef={creditRef}
            onChange={onNumberInputChange}
            label="Credit"
            placeHolder="Enter Target Here..."
          ></CustomInput>
          <div className="button-container">
            <CustomButton text="Confirm" onClick={onConfirm} />
            <CustomButton text="Cancel" onClick={showPopup} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <h2>{action}</h2>
          <CustomInput
            inputRef={inputRef}
            label="Amount"
            onChange={onNumberInputChange}
            placeHolder="Enter Amount Here..."
          ></CustomInput>
          <div className="button-container">
            <CustomButton text="Confirm" onClick={onConfirm} />
            <CustomButton text="Cancel" onClick={showPopup} />
          </div>
        </>
      );
    }
  };
  return (
    <div className="flex-container">
      <Spinner spinnerRef={spinnerRef} />
      <Popup menuRef={popupRef}>{renderContent()}</Popup>
      <CustomButton onClick={showPopup} text="Add User" />
      <div className="list-container">
        {data.map((user) => {
          return <ItemView showPopup={showPopup} user={user} />;
        })}
      </div>
    </div>
  );
};
export default App;
