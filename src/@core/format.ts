import { StringfiedDate } from "@context/types";

export const clearNumber = (value = "") => {
  return value.replace(/\D+/g, "");
};

export function formatDate(texto: string): string {
  const apenasNumeros = texto.replace(/\D/g, "");
  const limitado = apenasNumeros.slice(0, 8);

  if (limitado.length <= 4) return limitado;
  if (limitado.length <= 6)
    return `${limitado.slice(0, 4)}/${limitado.slice(4)}`;

  return `${limitado.slice(0, 4)}/${limitado.slice(4, 6)}/${limitado.slice(6)}`;
}

export const formatToIsoDate = (data: string): StringfiedDate => {
  let tempDate = data.replace(" ", "T");
  if (!(tempDate.slice(-1).toLocaleLowerCase() == "z")) tempDate += "Z";

  return tempDate;
};

export function formatToValidDate(data: string): string {
  const dataValida = formatToIsoDate(data).replace("Z", "");

  return dataValida;
}

export function formatToIsoDateTime(data: Date | string): string {
  return new Date(data).toISOString();
}

export function formatCNPJ(cnpj: string): string {
  const value = clearNumber(cnpj).slice(0, 14);

  return value
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
}

export function formatTelefone(telefone: string) {
  const value = clearNumber(telefone);

  return value
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
}

export function formatCpf(cpf: string) {
  const value = clearNumber(cpf);

  return value
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatCnpj(cnpj: string) {
  const value = clearNumber(cnpj);

  return value
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1/$2")
    .replace(/(\d{4})(\d{2})$/, "$1-$2");
}
export function formatRg(rg: string) {
  const value = clearNumber(rg);

  if (value.length <= 2) return value;

  let formattedText = value.slice(0, 2);
  if (value.length > 2) {
    formattedText += `.${value.slice(2, 5)}`;
  }
  if (value.length > 5) {
    formattedText += `.${value.slice(5, 8)}`;
  }

  return formattedText;
}
export function formatCep(cep: string): string {
  const value = clearNumber(cep).slice(0, 8);

  return value.replace(/(\d{5})(\d{3})$/, "$1-$2");
}
export function formatReal(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

export function parseReal(text: string): number {
  const clean = text.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(clean);
}

export function parsePercent(text: string): number {
  const clean = text.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(clean);
}

export function formatarMedida(titulo: string): string {
  const mapaFormatacao: { [key: string]: string } = {
    unidade: "UN",
    unidades: "UN",
    metro: "MTS",
    metros: "MTS",
    centimetro: "CM",
    centimetros: "CM",
    milimetro: "MM",
    milimetros: "MM",
    litro: "LT",
    litros: "LT",
    quilograma: "KG",
    quilogramas: "KG",
    grama: "G",
    gramas: "G",
    pacote: "PCT",
    caixa: "CX",
    caixas: "CX",
  };

  const normalizado = titulo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

  return mapaFormatacao[normalizado] || titulo.toUpperCase();
}

export function formatarCampo(valor?: string | null): string {
  return valor && valor.trim() !== "" ? valor : "Não informado";
};
