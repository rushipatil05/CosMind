import { useEffect, useState } from "react";
import "./NumberPreLoader.css";

export default function NumberPreloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [active, setActive] = useState(false);
  const [hideCounter, setHideCounter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          setHideCounter(true);
          setActive(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 3000);
          return prev;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader ${active ? "active" : ""}`}>
      <div className={`counter ${hideCounter ? "hide" : ""}`}>{counter}</div>
    </div>
  );
}
