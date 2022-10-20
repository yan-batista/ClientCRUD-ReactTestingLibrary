// Dependências
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home/index";
import Clientes from "./pages/Clientes/index";
import NovoClienteForm from "./pages/Clientes/novo_form/index";
import EditarClienteForm from "./pages/Clientes/editar_form/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="clientes/novo" element={<NovoClienteForm />} />
          <Route path="clientes/editar/:id" element={<EditarClienteForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
