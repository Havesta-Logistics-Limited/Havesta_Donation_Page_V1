import React from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Landingpage from "./pages/Landingpage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Landingpage />} />
        {/* <Route path="/about" element={<About />} /> */}
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
