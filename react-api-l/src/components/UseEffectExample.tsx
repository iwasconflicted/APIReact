import { useEffect, useState } from "react"


const UseEffectExample = () => {

const [count, setCount] = useState(0)

// UseEffect/// In react the UseEffect hook is used to manage side effects in functional components
// fetching data, manually update DOM, setting timers


// useEffect takes in a callback function and takes in two arguments
useEffect(() => {

//This is the effect function. Code will run after every render 


// optional clean up function. Code here runs before the component is unmounted or before the effect runs again.
// return () => {
//     console.log('clean up function')
// }

}, [/*dependency array*/]);

// what ever is in our [] is our dependency. It will make our useEffect fire every time this changes
// if you provide an empty array[], the effect will only run once after the initial render

// You can have multiple useEffects


useEffect(() => {
  
console.log('this will re-run every time our dependency has changed The count is ', count);


}, [])

  useEffect(() => {
   console.log('Subscribe inside our useEffect');
   
  
    return () => {
   console.log('Unsubscribe from our clean up function', count);
   
    }
  }, [count])
  








// handle increment
const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
}
// handle decrement
const handleDecrement = () => {
    setCount((prevCount) => prevCount -1)
}


  return (
    <>
        <h1 className="text-center">UseEffect Example 1</h1>
        <div className="row">

        </div>
        <div>
        <p>{count}</p>    
        </div>


<div>


 <button className="btn btn-outline-primary mx-3 m-2" onClick={handleIncrement}>Increment</button>

</div>

<div>

<button className="btn btn-outline-primary mx-3 m-2" onClick={handleDecrement}>Decrement</button>

</div>




       
    </>
  )
}

export default UseEffectExample