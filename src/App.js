import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AppContext from "./context"; //1)если конекст мы создаем в отдельном файле

import "./scss/app.scss";

function App() {
  const [searchValu, setSerchValu] = React.useState("");
  console.log(searchValu);

  return (
<AppContext.Provider value={{searchValu,setSerchValu}}>
<div className="wrapper">
      <Header searchValu={searchValu} setSerchValu={setSerchValu}/>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
</AppContext.Provider>
  );
}

export default App;
