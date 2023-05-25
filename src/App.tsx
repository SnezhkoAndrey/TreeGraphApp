import React from "react";
import "./App.scss";
import CategoriesMain from "./views/CategoriesMain";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <CategoriesMain />
    </div>
  );
}

export default App;
