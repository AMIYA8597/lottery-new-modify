import React from 'react';
import useCounter from './useCounter';

function Counter() {
  const [count, increment, decrement] = useCounter(0, 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
