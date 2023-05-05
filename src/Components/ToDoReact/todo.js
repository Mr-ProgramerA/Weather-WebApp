import React, { useState, useEffect } from "react";
import "./style.css";

const getItemsFromLocalStorage = () => {
  // merhod1 (problem with method 1 is if app is running in one browser and if there is any data stored in the localstorage then the will not run in any other browser hence use method 2)

  // return JSON.parse(localStorage.getItem("myTodoList"));

  // method2

  const list = localStorage.getItem("myTodoList");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getItemsFromLocalStorage());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add Items function
  const addItem = () => {
    if (!inputData) {
      alert("pls enter data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setToggleButton(false);
      setIsEditItem(null);
      setInputData("");
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // edit Items
  const editItem = (index) => {
    const item_to_edit = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_to_edit.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // delete item function
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => curElem.id != index);
    setItems(updatedItems);
  };

  // Remove all items
  const removeAll = () => {
    setItems([]);
  };

  // Setting Data in LocalStorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/Todo.svg" alt="logo" />
            <figcaption>Write anything to list ✌</figcaption>
          </figure>

          {/* add items */}

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items "
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem} />
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem} />
            )}
          </div>
          {/* Show list items */}

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn "
                      onClick={() => editItem(curElem.id)}
                      //  ##========================## to be continuoued from here ##========================##
                    />
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove all items */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={
                removeAll
                // one more method but creates "to many re-render" error
                // () => setItems([])
              }
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
