import './App.css';
import React, { useState } from 'react';
import BakeryItem from './BakeryItem';

const items = [
  {
    name: "Cinnamon Apple Turnover",
    price: 2.5,
    calories: 120,
    type: "pastry",
    dietary: ["nut"],
    visible: true,
    filepath: "images/cinn-apple.png"
  },
  {
    name: "Classic French Brioche",
    price: 13,
    calories: 1300,
    type: "bread",
    dietary: ["nut"],
    visible: true,
    filepath: "images/class-french.png"
  },
  {
    name: "Rosemary Ciabatta",
    price: 4,
    calories: 1230,
    type: "bread",
    dietary: ["nut", "dairy"],
    visible: true,
    filepath: "images/rose-ciab.png"
  },
  {
    name: "Coconut Macaroons",
    price: 4,
    calories: 97,
    type: "pastry",
    dietary: ["nut", "dairy"],
    visible: true,
    filepath: "images/coco-mac.png"
  },
  {
    name: "Blueberry Pound Cake",
    price: 26,
    calories: 930,
    type: "cake",
    dietary: ["nut"],
    visible: true,
    filepath: "images/blue-pound.png"
  },
  {
    name: "Oatmeal Cookies",
    price: 2.5,
    calories: 80,
    type: "pastry",
    dietary: ["gluten"],
    visible: true,
    filepath: "images/oat-cook.png"
  },
  {
    name: "Orange Muffins",
    price: 4.5,
    calories: 130,
    type: "pastry",
    dietary: ["nut"],
    visible: true,
    filepath: "images/orange-muffin.png"
  },
  {
    name: "Apricot Cheesecake",
    price: 40,
    calories: 1300,
    type: "cake",
    dietary: ["gluten", "nut"],
    visible: true,
    filepath: "images/apricot-cheese.png"
  },
  {
    name: "Maple Pecan Croissant",
    price: 3.5,
    calories: 110,
    type: "pastry",
    dietary: [],
    visible: true,
    filepath: "images/maple-pecan.png"
  },
  {
    name: "Pumpkin Pie",
    price: 28,
    calories: 2400,
    type: "pastry",
    dietary: ["gluten", "nut"],
    visible: true,
    filepath: "images/pump-pie.png"
  },
  {
    name: "Strawberry Shortcake",
    price: 37,
    calories: 1640,
    type: "cake",
    dietary: ["nut"],
    visible: true,
    filepath: "images/straw-cake.png"
  },
  {
    name: "Croissant",
    price: 2.5,
    calories: 100,
    type: "pastry",
    dietary: ["nut"],
    visible: true,
    filepath: "images/croiss.png"
  },
];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function App() {
  const dietaryOptions = [
    [ "nut", false ],
    [ "gluten", false ],
    [ "dairy", false ],
  ]

  const typeOptions = [
    [ "pastry", false ],
    [ "cake", false ],
    [ "bread", false ],
  ]

  const sortOptions = [
    "name",
    "price",
    "calories",
  ]

  const [ filterDietary, setFilterDietary ] = useState(new Map(dietaryOptions));
  const [ filterType, setFilterType ] = useState(new Map(typeOptions));
  const [ bakeryItems, setBakeryItems ] = useState([...items]);

  const [ cart ] = useState(new Map());
  const [ total, setTotal ] = useState(0);
  const [ cartList, setCartList ] = useState([]);

  const [ sortMode, setSortMode ] = useState("name");

  const updateBakeryItems = () => {
    setBakeryItems(bakeryItems.map((item) => {
      for (const [tag, checked] of filterDietary) {
        if (checked && !item.dietary.includes(tag)) {
          return {
            ...item,
            visible: false,
          };
        }
      }
      for (const [tag, checked] of filterType) {
        if (checked && !item.type.includes(tag)) {
          return {
            ...item,
            visible: false,
          };
        }
      }
      return {
        ...item,
        visible: true,
      };
    }));
  }

  const onChangeValue = (filter) => (event) => {
    filter.set(event.target.value, !filter.get(event.target.value));
    updateBakeryItems();
  }

  const onRadioValueChange = (event) => {
    setSortMode(event.target.value);
  }

  const resetAll = () => {
    setFilterDietary(new Map(dietaryOptions));
    setFilterType(new Map(typeOptions));
    setBakeryItems([...items]);
    setCartList(new Map());
    setTotal(0);
    setCartList([]);
    setSortMode("name");
  }

  const createCartList = () => {
    const newCartList = [];
    let total = 0;
    cart.forEach((value, key) => {
      newCartList.push({name: key, count: value.count, price: value.price});
      total += value.count * value.price;
    })
    setCartList(newCartList);
    setTotal(Math.round(total * 100) / 100);
  }

  const addToCart = (item) => {
    if (!cart.has(item.name)) cart.set(item.name, {count: 1, price: item.price});
    else cart.set(item.name, {...cart.get(item.name), count: cart.get(item.name).count + 1});
    createCartList();
  }

  const removeFromCart = (item) => {
    if (cart.get(item.name).count === 1) cart.delete(item.name); 
    else cart.set(item.name, {...cart.get(item.name), count: cart.get(item.name).count - 1});
    createCartList();
  }

  return (
    <div className="App">
      <div className="left-pane" style={{position: "fixed", height: "100vh", overflowY: "auto", top: "0", left: "0", width: "400px"}}>
        <button onClick={resetAll}> Reset page </button>
        <div className="sort-options">
          <p> <b> Sorting Options </b> </p>
          {sortOptions.map((item) => {
            return(
              <div key={item}>
                <label htmlFor={item}> Sort by {capitalizeFirstLetter(item)} </label>
                <input
                  name={item}
                  type="radio"
                  value={item}
                  checked={sortMode === item}
                  onChange={onRadioValueChange}
                />
              </div>
            );
          })}
        </div>

        <div className="filter-options">
          <p> <b> Filtering Options </b> </p>
          {dietaryOptions.map((item) => {
            return (
              <div key={item[0]}>
                <label htmlFor={item[0]}> {`${capitalizeFirstLetter(item[0])}-free`} </label>
                <input
                  name={item[0]}
                  type="checkbox"
                  value={item[0]}
                  checked={filterDietary.get(item[0])}
                  onChange={onChangeValue(filterDietary)}
                />
              </div>
            );
          })}
          {typeOptions.map((item) => {
            return (
              <div key={item[0]}>
                <label htmlFor={item[0]}> {capitalizeFirstLetter(item[0])} </label>
                <input
                  name={item[0]}
                  type="checkbox"
                  value={item[0]}
                  checked={filterType.get(item[0])}
                  onChange={onChangeValue(filterType)}
                />
              </div>
            );
          })}
        </div>

        <div className="cart">
          <p> <b> Your Cart </b></p>
          <p>Total: ${total}</p> 
          {cartList.map((item) => (
            <div key={item.name}>
              <p style={{display: "inline"}}> {`${item.count}x ${item.name} @${item.price}ea`} </p> 
              <button onClick={() => {removeFromCart(item)}}> Remove 1x from Cart </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bakery-items" style={{position: "absolute", left: "400px"}}> 
        {bakeryItems.sort((a, b) => {
          return a[sortMode] > b[sortMode] ? 1 : -1;
        }).filter((item) => item.visible).map((item) => {
          return(
            <BakeryItem key={item.name} item={item} callback={addToCart} />
          );
        })}
      </div>

    </div>
  );
}

export default App;
