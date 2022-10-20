import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { updateList } from "./handlers";
import "./style.css";

export default function Clientes() {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState<any[]>([]);

  // Busca dados do localStorage (se existir) quando carregar a tela
  // e coloca no estado de users
  useEffect(() => {
    const clientes = localStorage.getItem("clientes");
    if (clientes !== null) setUsers(JSON.parse(clientes));
  }, []);

  const handleListUpdate = async () => {
    const usersData = await updateList(usersCollectionRef);
    const usersObj = usersData.map((user) => ({ ...user.data, id: user.id }));
    setUsers(usersObj);
    localStorage.setItem("clientes", JSON.stringify(usersObj));
  };

  return (
    <>
      <div className="container">
        <div className="center">
          <div className="title-container">
            <h1>Clientes Cadastrados</h1>
            <button className="btn active" data-testid="atualizarListaBtn" onClick={handleListUpdate}>
              Atualizar Lista
            </button>
          </div>
          <table className="users-table" data-testid="tabela-clientes">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Estado</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Rua</th>
                <th>Número</th>
                <th>CEP</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                return (
                  <tr key={idx} data-testid="cliente-table-row">
                    <td>{user.nome}</td>
                    <td>{user.idade}</td>
                    <td>{user.email}</td>
                    <td>{user.cpf}</td>
                    <td>{user.telefone}</td>
                    <td>{user.estado}</td>
                    <td>{user.cidade}</td>
                    <td>{user.bairro}</td>
                    <td>{user.rua}</td>
                    <td>{user.numero}</td>
                    <td>{user.cep}</td>
                    <td>
                      <Link to={`/clientes/editar/${user.id}`}>
                        <button className="icon edit-icon rm10">
                          <FontAwesomeIcon icon={solid("pencil")} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to="/clientes/novo">
            <button className="btn">Novo</button>
          </Link>
        </div>
      </div>
    </>
  );
}
