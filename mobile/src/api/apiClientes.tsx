import { getAxios } from "@configs/axios"
import { ArrayResponseType, ClienteType } from "@context/types";

const getClientes = async (
): Promise<ArrayResponseType<ClienteType>> => {
    const response = await getAxios().get("/clientes");

    return response.data;
};


export {
    getClientes
}