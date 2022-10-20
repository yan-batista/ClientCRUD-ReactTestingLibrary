import { deleteDoc, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

// Função para criar Clientes
export const createCliente = async (event: any, usersCollectionRef: any, payload: any) => {
  event.preventDefault();
  await addDoc(usersCollectionRef, payload);
};

// Função para atualizar a lista de Clientes
export const updateList = async (usersCollectionRef: any) => {
  const data = await getDocs(usersCollectionRef);

  let dataObj: any[] = [];
  data.forEach((doc) => {
    dataObj.push({ data: doc.data(), id: doc.id });
  });
  return dataObj;
};

// Função para atualizar um Cliente
export const updateCliente = async (payload: any, id: string) => {
  // remove qualquer linha não alterada da payload
  for (const key in payload) {
    if (payload[key] === "" || payload[key] === 0) {
      delete payload[key];
    }
  }

  // editar doc
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, payload);
};

// Função para remover um Cliente
export const removeCliente = async (id: string) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
};
