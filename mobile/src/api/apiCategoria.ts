import { getAxios } from "@configs/axios";
import {
    ArrayResponseType,
    CategoriaType,
    ResponseType,
    UnidadeMedidaType,
} from "@context/types";

const getCategorias = async (): Promise<ArrayResponseType<CategoriaType>> => {
    const response = await getAxios().get("/categorias");

    return response.data;
};

const createCategoria = async (
    nome: string
): Promise<ResponseType<CategoriaType>> => {
    const response = await getAxios().post("/categorias", {
        nome,
    });

    return response.data;
};

const getUnidadesMedida = async (): Promise<ArrayResponseType<UnidadeMedidaType>> => {
    const response = await getAxios().get("/unidades-medida");
    return response.data;
};

export {
    getCategorias,
    createCategoria,
    getUnidadesMedida
};