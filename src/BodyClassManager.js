import { useEffect } from "react";
import { useSelector } from "react-redux";

const BodyClassManager = () => {
  const isLoaded = useSelector((state) => state.intro.isLoaded);

  useEffect(() => {
    if (isLoaded) {
      document.body.classList.remove("loaded");
    } else {
      document.body.classList.add("loaded");
    }
  }, [isLoaded]);

  return null;
};

export default BodyClassManager;
