import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <div>
        <h1>Navbar</h1>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default Root;
