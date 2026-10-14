import { getAxios } from "@configs/axios";
import {
    ArrayResponseType,
    PermissaoType,
    ResponseType,
    RoleType,
} from "@context/types";

const getPapeis = async (): Promise<ArrayResponseType<RoleType>> => {
    const response = await getAxios().get("/acessos/papeis");

    return response.data;
};

const getPermissoes = async (): Promise<
    ArrayResponseType<PermissaoType>
> => {
    const response = await getAxios().get("/acessos/permissoes");

    return response.data;
};

const definirPermissoesDoPapel = async (
    roleId: string,
    permissions: string[]
): Promise<ResponseType<RoleType>> => {
    const response = await getAxios().put(
        `/acessos/papeis/${roleId}/permissoes`,
        { permissions }
    );

    return response.data;
};

const definirPermissoesDoUsuario = async (
    userId: string,
    permissions: string[]
): Promise<ResponseType<null>> => {
    const response = await getAxios().put(
        `/acessos/users/${userId}/permissoes`,
        { permissions }
    );

    return response.data;
};

export {
    getPapeis,
    getPermissoes,
    definirPermissoesDoPapel,
    definirPermissoesDoUsuario,
};