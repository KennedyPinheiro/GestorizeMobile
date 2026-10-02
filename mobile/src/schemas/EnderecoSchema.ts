import { z } from "zod";




const onlyNumbers = (value: string) =>
    value.replace(/\D/g, "");


export const enderecoSchema = z.object({
    cep: z
        .string()
        .transform(onlyNumbers)
        .pipe(
            z.string().refine(
                (value) => value === "" || value.length === 8,
                "CEP inválido"
            )
        ),

    logradouro: z
        .string()
        .max(255, "Logradouro muito longo")
        .optional(),

    numero: z
        .string()
        .max(20, "Número muito longo")
        .optional(),

    complemento: z
        .string()
        .max(100, "Complemento muito longo")
        .nullable()
        .optional(),

    bairro: z
        .string()
        .max(100, "Bairro muito longo")
        .optional(),

    cidade: z
        .string()
        .max(100, "Cidade muito longa")
        .optional(),

    estado: z
        .string()
        .length(2, "UF inválida")
        .or(z.literal(""))
        .optional(),
});