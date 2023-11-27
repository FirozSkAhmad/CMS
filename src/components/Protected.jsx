import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ cmp }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return <div>{cmp}</div>;
};

export default Protected;
