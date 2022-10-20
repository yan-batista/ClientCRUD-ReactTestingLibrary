import React, { useState } from "react";
import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import * as handlers from "../pages/Clientes/handlers";
import { BrowserRouter } from "react-router-dom";
import Form from "../pages/Clientes/novo_form/index";
import Clientes from "../pages/Clientes/index";

// Testes de interface para o formulário durante a criação de um novo cliente
describe("Criar Cliente", () => {
  test("deve ser possível acessar o input de criar", () => {
    render(<Form />, { wrapper: BrowserRouter });
    const nomeInput = screen.getByTestId("nomeInput");

    expect(nomeInput).toBeInTheDocument();
  });

  test("deve ser possível acessar o botão Enviar do formulário, mas não o botão Editar", () => {
    render(<Form />, { wrapper: BrowserRouter });
    const enviarBtn = screen.getByTestId("enviarBtn");
    const editarBtn = screen.queryByText("Editar");

    expect(enviarBtn).toBeInTheDocument();
    expect(editarBtn).toBe(null);
  });

  test("deve ser possível alterar o input e select para salvar o estado onChange", () => {
    render(<Form />, { wrapper: BrowserRouter });
    const nomeInput = screen.getByTestId<HTMLInputElement>("nomeInput");
    const estadoInput = screen.getByTestId<HTMLSelectElement>("slEstado");

    fireEvent.change(estadoInput, { target: { value: "rj" } });
    fireEvent.change(nomeInput, { target: { value: "Nome1" } });

    expect(nomeInput.value).toBe("Nome1");
    expect(estadoInput.value).toBe("rj");
  });

  test("deve ser possível dar submit no form", () => {
    render(<Form />, { wrapper: BrowserRouter });
    const nomeInput = screen.getByTestId<HTMLInputElement>("nomeInput");
    const enviarBtn = screen.getByTestId<HTMLButtonElement>("enviarBtn");
    const createClienteSpy = jest.spyOn(handlers, "createCliente");

    fireEvent.change(nomeInput, { target: { value: "Nome1" } });
    fireEvent.click(enviarBtn);

    expect(createClienteSpy).toHaveBeenCalled();
  });
});

describe("Listar Cliente", () => {
  test("deve ser exibida a tabela de clientes", () => {
    render(<Clientes />, { wrapper: BrowserRouter });
    const tabelaClientes = screen.getByTestId("tabela-clientes");

    expect(tabelaClientes).toBeInTheDocument();
  });

  test("deve iniciar a tabela com uma linha no thead e vazia no tbody", () => {
    render(<Clientes />, { wrapper: BrowserRouter });
    const tabelaClientes = screen.getByTestId("tabela-clientes");

    expect(tabelaClientes.childElementCount).toBe(2); // table
    expect(tabelaClientes.children[0].childElementCount).toBe(1); // child[0] -> thead
    expect(tabelaClientes.children[1].childElementCount).toBe(0); // child[1] -> tbody
  });

  test("deve ser possível acessar e clicar no botão de atualizar lista", () => {
    render(<Clientes />, { wrapper: BrowserRouter });
    const atualizarListaBtn = screen.getByTestId<HTMLButtonElement>("atualizarListaBtn");
    const atualizarListaSpy = jest.spyOn(handlers, "updateList");

    fireEvent.click(atualizarListaBtn);

    expect(atualizarListaBtn).toBeInTheDocument();
    expect(atualizarListaSpy).toHaveBeenCalled();
  });
});

describe("Remover Cliente", () => {
  test("deve ser possível acessar o botão Remover no formulário", () => {
    render(
      <Form
        nome="nome1"
        idade="20"
        email="nome1@gmail.com"
        cpf="123.456.789-01"
        telefone="(22) 00000-0000"
        estado="rj"
        bairro="bairro1"
        cidade="cidade1"
        rua="rua1"
        numero="1"
        cep="11111-111"
        editar
        id="fakeId123"
      />,
      { wrapper: BrowserRouter }
    );
    const removerBtn = screen.getByTestId("removerBtn");

    expect(removerBtn).toBeInTheDocument();
  });

  test("deve ser possível chamar a função de remover cliente ao clicar no botão", () => {
    render(
      <Form
        nome="nome1"
        idade="20"
        email="nome1@gmail.com"
        cpf="123.456.789-01"
        telefone="(22) 00000-0000"
        estado="rj"
        bairro="bairro1"
        cidade="cidade1"
        rua="rua1"
        numero="1"
        cep="11111-111"
        editar
        id="fakeId123"
      />,
      { wrapper: BrowserRouter }
    );
    const removerBtn = screen.getByTestId("removerBtn");
    const removerClienteSpy = jest.spyOn(handlers, "removeCliente");

    fireEvent.click(removerBtn);

    expect(removerClienteSpy).toHaveBeenCalled();
  });
});

describe("Editar Cliente", () => {
  test("deve ser possível acessar o input de editar com dado existente", () => {
    render(
      <Form
        nome="nome1"
        idade="20"
        email="nome1@gmail.com"
        cpf="123.456.789-01"
        telefone="(22) 00000-0000"
        estado="rj"
        bairro="bairro1"
        cidade="cidade1"
        rua="rua1"
        numero="1"
        cep="11111-111"
        editar
        id="fakeId123"
      />,
      { wrapper: BrowserRouter }
    );
    const nomeInput = screen.getByTestId<HTMLInputElement>("nomeInput");
    const estadoSelect = screen.getByTestId<HTMLSelectElement>("slEstado");

    expect(nomeInput).toBeInTheDocument();
    expect(nomeInput.value).toBe("nome1");
    expect(estadoSelect).toBeInTheDocument();
    expect(estadoSelect.value).toBe("rj");
  });

  test("deve ser possível acessar o botão Editar no formulário", () => {
    render(
      <Form
        nome="nome1"
        idade="20"
        email="nome1@gmail.com"
        cpf="123.456.789-01"
        telefone="(22) 00000-0000"
        estado="rj"
        bairro="bairro1"
        cidade="cidade1"
        rua="rua1"
        numero="1"
        cep="11111-111"
        editar
        id="fakeId123"
      />,
      { wrapper: BrowserRouter }
    );
    const editarBtn = screen.getByTestId("editarBtn");

    expect(editarBtn).toBeInTheDocument();
  });

  test("deve ser possível alterar o valor do input", () => {
    render(
      <Form
        nome="nome1"
        idade="20"
        email="nome1@gmail.com"
        cpf="123.456.789-01"
        telefone="(22) 00000-0000"
        estado="rj"
        bairro="bairro1"
        cidade="cidade1"
        rua="rua1"
        numero="1"
        cep="11111-111"
        editar
        id="fakeId123"
      />,
      { wrapper: BrowserRouter }
    );
    const nomeInput = screen.getByTestId<HTMLInputElement>("nomeInput");

    fireEvent.change(nomeInput, { target: { value: "novoNome1" } });

    expect(nomeInput.value).toBe("novoNome1");
  });

  test("deve ser possível realizar a edição ao clicar no botão Editar", () => {
    render(
      <Form
        nome="nome1"
        idade="20"
        email="nome1@gmail.com"
        cpf="123.456.789-01"
        telefone="(22) 00000-0000"
        estado="rj"
        bairro="bairro1"
        cidade="cidade1"
        rua="rua1"
        numero="1"
        cep="11111-111"
        editar
        id="fakeId123"
      />,
      { wrapper: BrowserRouter }
    );
    const nomeInput = screen.getByTestId<HTMLInputElement>("nomeInput");
    const atualizarClienteSpy = jest.spyOn(handlers, "updateCliente");
    fireEvent.change(nomeInput, { target: { value: "novoNome1" } });
    const editarBtn = screen.getByTestId("editarBtn");

    fireEvent.click(editarBtn);

    expect(atualizarClienteSpy).toBeCalled();
  });
});
