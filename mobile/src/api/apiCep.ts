export type CepResponse = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    erro?: boolean;
};

export async function getCep(cep: string): Promise<CepResponse> {
    const response = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
    );

    if (!response.ok) {
        throw new Error("Não foi possível consultar o CEP.");
    }

    const data: CepResponse = await response.json();

    if (data.erro) {
        throw new Error("CEP não encontrado.");
    }

    return data;
}