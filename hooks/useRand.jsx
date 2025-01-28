import { useEffect, useState } from "react";

const useRand = () => {
  const [rand, setRand] = useState(null);

  useEffect(() => {
    setRand(Math.random());
  }, []);

  return rand;
};

export default useRand;
