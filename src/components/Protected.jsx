import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Protected = ({ cmp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/news");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return <div>{cmp}</div>;
};

export default Protected;
