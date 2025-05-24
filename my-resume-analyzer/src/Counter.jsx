// import { useState } from "react";

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h2>Count: {count}</h2>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <button onClick={() => setCount(count - 1)}>Decrement</button>

//     </div>
//   );
// }

// export default Counter;

import { useState } from "react";

function ClickCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>Click Count: {count}</h2>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default ClickCounter;

