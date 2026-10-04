import { getAxios } from "@configs/axios";
import {
    ArrayResponseType,
    ProdutoType,
    ResponseType,
} from "@context/types";

import { produtoSchema } from "src/schemas/ProdutoSchema";
import { z } from "zod";

const getProdutos = async (): Promise<
    ArrayResponseType<ProdutoType>
> => {
    const response = await getAxios().get("/produtos");

    return response.data;
};

const getProduto = async (
    id: string | undefined
): Promise<ResponseType<ProdutoType>> => {
    const response = await getAxios().get(`/produtos/${id}`);

    return response.data;
};

const createProduto = async (
    data: z.infer<typeof produtoSchema>
): Promise<ResponseType<ProdutoType>> => {
    const response = await getAxios().post(
        "/produtos",
        data
    );

    return response.data;
};

const updateProduto = async (
    id: string,
    data: Partial<z.infer<typeof produtoSchema>>
): Promise<ResponseType<ProdutoType>> => {
    const response = await getAxios().put(
        `/produtos/${id}`,
        data
    );

    return response.data;
};

const deleteProduto = async (
    id: string
): Promise<ResponseType<null>> => {
    const response = await getAxios().delete(
        `/produtos/${id}`
    );

    return response.data;
};

const adicionarImagemProduto = async (
    id: string,
    uri: string,
    principal: boolean = false
): Promise<ResponseType<any>> => {
    const formData = new FormData();

    formData.append("imagem", {
        uri,
        name: `produto-${id}-${Date.now()}.jpg`,
        type: "image/jpeg",
    } as any);

    formData.append(
        "principal",
        principal ? "1" : "0"
    );

    const response = await getAxios({
        contentType: "formData",
    }).post(
        `/produtos/${id}/imagem`,
        formData
    );

    return response.data;
};

const removerImagemProduto = async (
    id: string
): Promise<ResponseType<null>> => {
    const response = await getAxios().delete(
        `/produtos/${id}/imagem`
    );

    return response.data;
};

const definirImagemPrincipal = async (
    id: string
): Promise<ResponseType<any>> => {
    const response = await getAxios().put(
        `/produtos/${id}/imagem/principal`
    );

    return response.data;
};

export {
    getProdutos,
    getProduto,
    createProduto,
    updateProduto,
    deleteProduto,
    adicionarImagemProduto,
    removerImagemProduto,
    definirImagemPrincipal,
};