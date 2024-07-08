import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "./form-component/form";
import Grandparent from "./component/grandparent";
import Layout from "./component/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Voting from "./component/voting";
import LogIn from "./form-component/logIn";
import Counter from "./component/counter";
import Component1 from "./useContext/component1";
import Container from "./form-component/container";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="form" element={<Form />} />
          <Route path="grandparent" element={<Grandparent />} />
          <Route path="voting" element={<Voting />} />
          <Route path="counter" element={<Counter />} />
          <Route path="logIn" element={<LogIn />} />
          <Route path="component1" element={<Component1 />} />
          <Route path="container" element={<Container />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
