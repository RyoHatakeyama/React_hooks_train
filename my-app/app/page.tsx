"use client";

import React, { useCallback, useState, useMemo } from "react";

// eslint-disable-next-line react/display-name
const Child_1 = React.memo(() => {
  return (
    <>
      <p>Child_2コンポーネントです</p>
    </>
  );
});

// eslint-disable-next-line react/display-name
const Child_2 = React.memo((props: { handleClick: () => void }) => {
  return (
    <>
      <p>Child_1コンポーネントです</p>
      <button onClick={props.handleClick}>クリック</button>
    </>
  );
});

export default function Parent() {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClick = useCallback(() => {
    console.log("click");
  }, []);

  const [count, setCount] = useState(0);
  const double = (count: number) => {
    let i = 0;
    while (i < 10000000) i++;
    return count * 2;
  };

  const doubleCount = useMemo(() => double(count), [count]);

  return (
    <div>
      <p>親コンポーネントです。</p>
      <input
        type="text"
        onChange={handleChange}
        value={text}
        className="border-2"
      />
      <Child_1 />
      <Child_2 handleClick={handleClick} />
      <p>親コンポーネントで重い計算処理</p>
      <p>
        Counter: {count}, {doubleCount}
      </p>
      <button onClick={() => setCount(count + 1)}>Increment Count2</button>
    </div>
  );
}
