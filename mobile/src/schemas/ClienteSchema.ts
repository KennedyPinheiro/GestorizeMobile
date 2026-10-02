import { z } from "zod";

const onlyNumbers = (value: string) =>
  value.replace(/\D/g, "");

const enderecoSchema = z.object({
  cep: z
    .string()
    .transform(onlyNumbers)
    .pipe(z.string().length(8, "CEP inválido")),

  logradouro: z
    .string()
    .min(1, "Informe o logradouro")
    .max(255, "Logradouro muito longo"),

  numero: z
    .string()
    .min(1, "Informe o número")
    .max(20, "Número muito longo"),

  complemento: z
    .string()
    .max(100, "Complemento muito longo")
    .nullable()
    .optional(),

  bairro: z
    .string()
    .min(1, "Informe o bairro")
    .max(100, "Bairro muito longo"),

  cidade: z
    .string()
    .min(1, "Informe a cidade")
    .max(100, "Cidade muito longa"),

  estado: z
    .string()
    .length(2, "UF inválida")
    .toUpperCase(),
});

const pfSchema = z.object({
  genero: z
    .string()
    .max(30, "Gênero muito longo")
    .nullable()
    .optional(),

  rg: z
    .string()
    .min(1, "Informe o RG")
    .max(20, "RG muito longo"),

  cpf: z
    .string()
    .transform(onlyNumbers)
    .pipe(z.string().length(11, "CPF inválido")),

  data_nascimento: z
    .string()
    .min(1, "Informe a data de nascimento"),
});

const pjSchema = z.object({
  cnpj: z
    .string()
    .transform(onlyNumbers)
    .pipe(z.string().length(14, "CNPJ inválido")),

  razao_social: z
    .string()
    .min(1, "Informe a razão social")
    .max(255, "Razão social muito longa"),

  nome_fantasia: z
    .string()
    .max(255, "Nome fantasia muito longo")
    .nullable()
    .optional(),

  nome_responsavel: z
    .string()
    .min(1, "Informe o responsável")
    .max(255, "Nome do responsável muito longo"),

  cpf_responsavel: z
    .string()
    .transform(onlyNumbers)
    .pipe(z.string().length(11, "CPF do responsável inválido")),

  cargo_responsavel: z
    .string()
    .max(100, "Cargo muito longo")
    .nullable()
    .optional(),
});

export const clienteSchema = z.discriminatedUnion("tipo", [
  z.object({
    nome: z
      .string()
      .min(1, "Informe o nome")
      .max(255, "Nome muito longo"),

    tipo: z.literal("pf"),

    email: z
      .string()
      .email("E-mail inválido")
      .nullable()
      .optional(),

    telefone: z
      .string()
      .max(20, "Telefone muito longo")
      .nullable()
      .optional(),

    endereco: enderecoSchema,

    pf: pfSchema,

    pj: z.array(z.never()),
  }),

  z.object({
    nome: z
      .string()
      .min(1, "Informe a razão social")
      .max(255, "Razão social muito longa"),

    tipo: z.literal("pj"),

    email: z
      .string()
      .email("E-mail inválido")
      .nullable()
      .optional(),

    telefone: z
      .string()
      .max(20, "Telefone muito longo")
      .nullable()
      .optional(),

    endereco: enderecoSchema,

    pf: z.array(z.never()),
    pj: pjSchema,
  }),
]);