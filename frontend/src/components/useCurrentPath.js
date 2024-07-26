import { useLocation } from "react-router-dom";

const UseCurrentPath = () => {
  const location = useLocation();
  return location.pathname;
};

export default UseCurrentPath;
