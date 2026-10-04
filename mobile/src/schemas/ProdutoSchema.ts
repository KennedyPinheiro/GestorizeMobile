import { z } from "zod";

const produtoSchema = z.object({
  nome: z
    .string()
    .min(1, "O nome do produto é obrigatório.")
    .max(255, "O nome do produto deve ter no máximo 255 caracteres."),

  descricao: z
    .string()
    .nullable()
    .optional(),

  preco_custo: z
    .number({
      message: "O preço de custo deve ser informado.",
    })
    .min(0, "O preço de custo não pode ser negativo."),

  porcentagem_lucro: z
    .number({
      message: "A porcentagem de lucro deve ser informada.",
    })
    .min(0, "A porcentagem de lucro não pode ser negativa."),

  preco_venda: z
    .number({
      message: "O preço de venda deve ser informado.",
    })
    .min(0, "O preço de venda não pode ser negativo."),

  estoque: z
    .number({
      message: "O estoque deve ser informado.",
    })
    .min(0, "O estoque não pode ser negativo."),

  data_entrada: z
    .string()
    .nullable(),

  validade: z
    .string()
    .nullable(),

  categoria_id: z
    .string()
    .min(1, "A categoria é obrigatória."),

  fornecedor_id: z
    .string()
    .min(1, "O fornecedor é obrigatório."),

  unidade_medida_id: z
    .string()
    .min(1, "A unidade de medida é obrigatória."),
});

export { produtoSchema };