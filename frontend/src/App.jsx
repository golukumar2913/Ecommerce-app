import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import { ThemeProvider } from "./Context/themecontext";
import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
