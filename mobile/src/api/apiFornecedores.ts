import { getAxios } from "@configs/axios";
import { ArrayResponseType, FornecedorType, ResponseType } from "@context/types";
import { fornecedorSchema } from "@schemas/FornecedorSchema";
import { z } from "zod";

const getFornecedores = async (): Promise<ArrayResponseType<FornecedorType>> => {
    const response = await getAxios().get("/fornecedores");

    return response.data;
};

const getFornecedor = async (
    id: string | undefined
): Promise<ResponseType<FornecedorType>> => {
    const response = await getAxios().get(`/fornecedores/${id}`);

    return response.data;
};

const createFornecedor = async (
    data: z.infer<typeof fornecedorSchema>
): Promise<ResponseType<FornecedorType>> => {
    const response = await getAxios().post("/fornecedores", data);

    return response.data;
};

const updateFornecedor = async (
    id: string,
    data: Partial<z.infer<typeof fornecedorSchema>>
): Promise<ResponseType<FornecedorType>> => {
    const response = await getAxios().put(`/fornecedores/${id}`, data);

    return response.data;
};

export const deleteFornecedor = async (
    id: string
): Promise<ResponseType<null>> => {
    const response = await getAxios().delete(`/fornecedores/${id}`);

    return response.data;
};

const updateFornecedorAvatar = async (
    id: string,
    uri: string
): Promise<ResponseType<FornecedorType>> => {
    const formData = new FormData();

    formData.append("avatar", {
        uri,
        name: `avatar-${id}.jpg`,
        type: "image/jpeg",
    } as any);

    const response = await getAxios({
        contentType: "formData",
    }).post(`/fornecedores/${id}/imagem`, formData);

    return response.data;
};

const removeFornecedorAvatar = async (
    id: string
): Promise<ResponseType<FornecedorType>> => {
    const response = await getAxios().delete(`/fornecedores/${id}/imagem`);

    return response.data;
};

export {
    getFornecedores,
    getFornecedor,
    createFornecedor,
    updateFornecedor,
    updateFornecedorAvatar,
    removeFornecedorAvatar,
};