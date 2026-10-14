import { getAxios } from "@configs/axios";
import {
    ArrayResponseType,
    FuncionarioType,
    ResponseType,
} from "@context/types";
import { funcionarioSchema } from "@schemas/FuncionarioSchema";
import { z } from "zod";

const getFuncionarios = async (): Promise<
    ArrayResponseType<FuncionarioType>
> => {
    const response = await getAxios().get("/funcionarios");

    return response.data;
};

const getFuncionario = async (
    id: string | undefined
): Promise<ResponseType<FuncionarioType>> => {
    const response = await getAxios().get(`/funcionarios/${id}`);

    return response.data;
};

const createFuncionario = async (
    data: z.infer<typeof funcionarioSchema>
): Promise<ResponseType<FuncionarioType>> => {
    const response = await getAxios().post("/funcionarios", data);

    return response.data;
};

const updateFuncionario = async (
    id: string,
    data: Partial<z.infer<typeof funcionarioSchema>>
): Promise<ResponseType<FuncionarioType>> => {
    const response = await getAxios().put(`/funcionarios/${id}`, data);

    return response.data;
};

const deleteFuncionario = async (
    id: string
): Promise<ResponseType<null>> => {
    const response = await getAxios().delete(`/funcionarios/${id}`);

    return response.data;
};

const updateFuncionarioAvatar = async (
    id: string,
    uri: string
): Promise<ResponseType<FuncionarioType>> => {
    const formData = new FormData();

    formData.append("avatar", {
        uri,
        name: `avatar-${id}.jpg`,
        type: "image/jpeg",
    } as any);

    const response = await getAxios({
        contentType: "formData",
    }).post(`/funcionarios/${id}/avatar`, formData);

    return response.data;
};

const removeFuncionarioAvatar = async (
    id: string
): Promise<ResponseType<FuncionarioType>> => {
    const response = await getAxios().delete(
        `/funcionarios/${id}/avatar`
    );

    return response.data;
};

export {
    getFuncionarios,
    getFuncionario,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario,
    updateFuncionarioAvatar,
    removeFuncionarioAvatar,
};