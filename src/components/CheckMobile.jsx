import { useEffect, useState } from "react";

const checkMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const sizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", sizeChange);

    return () => {
      window.removeEventListener("resize", sizeChange);
    };
  }, []);

  return width <= 768;
};

export default checkMobile;
