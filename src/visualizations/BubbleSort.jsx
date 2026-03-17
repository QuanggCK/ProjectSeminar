import { useState } from "react";

function BubbleSort() {

  const [array, setArray] = useState([5,3,8,4,2,7]);

  const bubbleSort = () => {
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }

      }
    }

    setArray(arr);
  };

  return (
    <div style={{padding:"20px"}}>

      <h2>Bubble Sort Visualization</h2>

      <div style={{display:"flex",gap:"10px",alignItems:"flex-end"}}>

        {array.map((num,index)=>(
          <div
            key={index}
            style={{
              width:"40px",
              height:num*20,
              background:"cyan",
              textAlign:"center",
              color:"black"
            }}
          >
            {num}
          </div>
        ))}

      </div>

      <br/>

      <button onClick={bubbleSort}>
        Sort
      </button>

    </div>
  );
}

export default BubbleSort;