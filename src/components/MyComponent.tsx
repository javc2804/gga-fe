import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { login } from "../store/actions/authActions";

const MyComponent: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    const user = { id: 1, name: "John Doe" };
    dispatch(login(user));
  };

  return (
    <div>
      {auth.isAuthenticated ? "Logged in" : "Not logged in"}
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default MyComponent;
