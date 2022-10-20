import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { createCliente, removeCliente, updateCliente } from "../handlers";

import "./style.css";

export default function NovoCliente(props: any) {
  // input states
  const [newNome, setNewNome] = useState("");
  const [newIdade, setNewIdade] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCPF, setNewCPF] = useState("");
  const [newTelefone, setNewTelefone] = useState("");
  const [newEstado, setNewEstado] = useState("");
  const [newBairro, setNewBairro] = useState("");
  const [newCidade, setNewCidade] = useState("");
  const [newRua, setNewRua] = useState("");
  const [newNumero, setNewNumero] = useState("");
  const [newCEP, setNewCEP] = useState("");

  // Navigate Hook para fazer um redirect após enviar os dados
  const navigate = useNavigate();

  // Função para criar um novo Documento no banco
  const clientesCollectionRef = collection(db, "users");
  const payload = {
    nome: newNome,
    idade: newIdade,
    email: newEmail,
    cpf: newCPF,
    telefone: newTelefone,
    estado: newEstado,
    bairro: newBairro,
    cidade: newCidade,
    rua: newRua,
    numero: newNumero,
    cep: newCEP,
  };

  // Função para editar um documento no banco
  const updateClienteHandler = async (event: any, payload: any) => {
    event.preventDefault();
    updateCliente(payload, props.id);
    navigate("/clientes");
  };

  const removeClienteHandler = async (event: any) => {
    event.preventDefault();
    removeCliente(props.id);
    navigate("/clientes");
  };

  return (
    <div className="container">
      <div className="form-container">
        {!props.editar && <h1>Novo Cliente</h1>}
        {props.editar && <h1>Editar Cliente</h1>}
        <form className="cadastro_cliente_form" data-testid="form">
          <div>
            <label>Nome:</label>
            <input
              type="text"
              placeholder="Nome"
              defaultValue={props.nome}
              data-testid="nomeInput"
              name="nomeInput"
              onChange={(event) => {
                setNewNome(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Idade:</label>
            <input
              type="text"
              placeholder="Idade"
              defaultValue={props.idade}
              onChange={(event) => {
                setNewIdade(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="seu_nome@provedor.com"
              defaultValue={props.email}
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
            />
          </div>

          <div>
            <label>CPF:</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              maxLength={14}
              defaultValue={props.cpf}
              onChange={(event) => {
                setNewCPF(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Telefone:</label>
            <input
              type="text"
              placeholder="(22) 00000-0000"
              maxLength={15}
              defaultValue={props.telefone}
              onChange={(event) => {
                setNewTelefone(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Estado:</label>
            <select
              name="slEstado"
              id="slEstado"
              data-testid="slEstado"
              value={props.estado}
              onChange={(event) => {
                setNewEstado(event.target.value);
              }}
            >
              <option defaultValue="true" hidden>
                Estado
              </option>
              <option value="ac">Acre</option>
              <option value="al">Alagoas</option>
              <option value="am">Amazonas</option>
              <option value="ap">Amapá</option>
              <option value="ba">Bahia</option>
              <option value="ce">Ceará</option>
              <option value="df">Distrito Federal</option>
              <option value="es">Espírito Santo</option>
              <option value="go">Goiás</option>
              <option value="ma">Maranhão</option>
              <option value="mt">Mato Grosso</option>
              <option value="ms">Mato Grosso do Sul</option>
              <option value="mg">Minas Gerais</option>
              <option value="pa">Pará</option>
              <option value="pb">Paraíba</option>
              <option value="pr">Paraná</option>
              <option value="pe">Pernambuco</option>
              <option value="pi">Piauí</option>
              <option value="rj">Rio de Janeiro</option>
              <option value="rn">Rio Grande do Norte</option>
              <option value="ro">Rondônia</option>
              <option value="rs">Rio Grande do Sul</option>
              <option value="rr">Roraima</option>
              <option value="sc">Santa Catarina</option>
              <option value="se">Sergipe</option>
              <option value="sp">São Paulo</option>
              <option value="to">Tocantins</option>
            </select>
          </div>

          <div className="enderecoDiv">
            <label>Endereço:</label>
            <div className="endereco-container">
              <input
                type="text"
                placeholder="Bairro"
                defaultValue={props.bairro}
                onChange={(event) => {
                  setNewBairro(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Cidade"
                defaultValue={props.cidade}
                onChange={(event) => {
                  setNewCidade(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Rua"
                defaultValue={props.rua}
                onChange={(event) => {
                  setNewRua(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Número"
                className="inputNumero"
                defaultValue={props.numero}
                onChange={(event) => {
                  setNewNumero(event.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <label>CEP:</label>
            <input
              type="text"
              placeholder="00000-000"
              className="inputCep"
              maxLength={9}
              defaultValue={props.cep}
              onChange={(event) => {
                setNewCEP(event.target.value);
              }}
            />
          </div>

          {/* Botões */}
          <div className="btn-container">
            <div className="btn-group">
              {/* Renderiza o botão Enviar caso não exista a prop Editar */}
              {!props.editar && (
                <button
                  className="btn"
                  onClick={(e) => {
                    createCliente(e, clientesCollectionRef, payload);
                    navigate("/clientes");
                  }}
                  data-testid="enviarBtn"
                >
                  Enviar
                </button>
              )}

              {/* Renderiza o botão de Editar caso exista a prop Editar */}
              {props.editar && (
                <button
                  className="btn"
                  data-testid="editarBtn"
                  onClick={(event) => {
                    updateClienteHandler(event, payload);
                  }}
                >
                  Editar
                </button>
              )}

              {/* Renderiza o Cancelar */}
              <Link to="/clientes">
                <button className="btn lm5">Cancelar</button>
              </Link>
            </div>

            {props.editar && (
              <button
                className="btn red removerBtn"
                data-testid="removerBtn"
                onClick={(event) => {
                  removeClienteHandler(event);
                }}
              >
                Remover
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
