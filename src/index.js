import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";

import About from "./Components/About";
import ContactUs from "./Components/ContactUs";
import reportWebVitals from "./reportWebVitals";
import Error from "./Components/Error";
import Header from "./Components/Header";
import RestaurantsMen from "./Components/RestaurantsMen";

import High from "./Components/High";

function App() {
  return (
    <div>
      <High />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Header />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantsMen />,
      },
    ],
    errorElement: <Error />,
  },
]);

// Render the RouterProvider wrapping your App
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
