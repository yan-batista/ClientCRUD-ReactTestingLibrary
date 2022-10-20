import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../novo_form/index";

export default function EditarForm(props: any) {
  const { id } = useParams();
  const [payload, setPayload] = useState({
    nome: "",
    idade: "",
    email: "",
    cpf: "",
    telefone: "",
    estado: "",
    bairro: "",
    cidade: "",
    rua: "",
    numero: "",
    cep: "",
  });

  // função para buscar dados do localStorage como payload para registrar no form:
  useEffect(() => {
    const data = localStorage.getItem("clientes");
    let JSONdata = null;
    if (data !== null) JSONdata = JSON.parse(data);

    for (let i = 0; i < JSONdata.length; i++) {
      if (JSONdata[i].id === id) {
        const newPayload = {
          nome: JSONdata[i].nome,
          idade: JSONdata[i].idade,
          email: JSONdata[i].email,
          cpf: JSONdata[i].cpf,
          telefone: JSONdata[i].telefone,
          estado: JSONdata[i].estado,
          bairro: JSONdata[i].bairro,
          cidade: JSONdata[i].cidade,
          rua: JSONdata[i].rua,
          numero: JSONdata[i].numero,
          cep: JSONdata[i].cep,
        };
        setPayload(newPayload);
      }
    }
  }, [id]);

  return (
    <>
      <Form
        nome={payload.nome}
        idade={payload.idade}
        email={payload.email}
        cpf={payload.cpf}
        telefone={payload.telefone}
        estado={payload.estado}
        bairro={payload.bairro}
        cidade={payload.cidade}
        rua={payload.rua}
        numero={payload.numero}
        cep={payload.cep}
        editar
        id={id}
      ></Form>
    </>
  );
}
