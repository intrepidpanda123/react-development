const BakeryItem = (props) => {
  const { item, callback } = props;

  return(
    <div style={{borderWidth: "2px", borderStyle: "solid", margin: "16px", padding: "16px", display: "inline-block"}}>
      <p> {item.name} </p>
      <p> {`price: ${item.price}`} </p>
      <p> {`calories: ${item.calories}`} </p>
      <p> {`type: ${item.type}`} </p>
      <p> {`${item.dietary.map((item) => item + "-free")}`} </p>
      <img src={item.filepath} aria-label={item} width="200" style={{display: "block", margin: "8px auto"}}/>
      <button onClick={() => {callback(item)}}> Add to Cart </button>
    </div>
  );
}

export default BakeryItem;