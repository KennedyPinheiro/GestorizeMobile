import { getAxios } from "@configs/axios";
import { ArrayResponseType, ClienteType, ResponseType } from "@context/types";
import { clienteSchema } from "src/schemas/ClienteSchema";
import { z } from "zod";

const getClientes = async (): Promise<ArrayResponseType<ClienteType>> => {
    const response = await getAxios().get("/clientes");

    return response.data;
};

const getCliente = async (
    id: string | undefined
): Promise<ResponseType<ClienteType>> => {
    const response = await getAxios().get(`/clientes/${id}`);

    return response.data;
};

const createCliente = async (
    data: z.infer<typeof clienteSchema>
): Promise<ResponseType<ClienteType>> => {
    const response = await getAxios().post("/clientes", data);

    return response.data;
};

const updateCliente = async (
    id: string,
    data: Partial<z.infer<typeof clienteSchema>>
): Promise<ResponseType<ClienteType>> => {
    const response = await getAxios().put(`/clientes/${id}`, data);

    return response.data;
};

export const deleteCliente = async (
    id: string
): Promise<ResponseType<null>> => {
    const response = await getAxios().delete(`/clientes/${id}`);
    return response.data;
};

export {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
};