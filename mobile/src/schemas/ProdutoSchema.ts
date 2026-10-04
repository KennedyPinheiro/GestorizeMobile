import { z } from "zod";

export const produtoSchema = z.object({
  nome: z
    .string()
    .min(1, "Informe o nome do produto")
    .max(255, "O nome deve ter no máximo 255 caracteres"),

  descricao: z
    .string()
    .nullable()
    .optional(),

  quantidade: z
    .number()
    .min(0, "A quantidade não pode ser negativa"),

  data_entrada: z
    .string()
    .min(1, "Informe a data de entrada"),

  data_validade: z
    .string()
    .nullable()
    .optional(),

  preco_custo: z
    .number()
    .min(0, "O preço de custo não pode ser negativo"),

  margem_lucro: z
    .number()
    .min(0, "A margem de lucro não pode ser negativa"),

  categoria_id: z
    .number()
    .min(1, "Selecione uma categoria"),

  fornecedor_id: z
    .number()
    .min(1, "Selecione um fornecedor"),

  medida_id: z
    .number()
    .min(1, "Selecione uma unidade de medida"),
});

export type ProdutoFormData = z.input<typeof produtoSchema>;