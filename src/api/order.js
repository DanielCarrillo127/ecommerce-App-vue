import { API_URL } from "../utils/constants";

export async function createOrderApi(dataOrder) {

  try {
    const url = `${API_URL}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataOrder),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function getOrders(idUser) {
    try {
      const response = await fetch(
        `${API_URL}/orders?populate=*&filters[user]=${idUser}&_sort=created_at:desc`
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }