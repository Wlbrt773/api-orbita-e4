import { z } from "zod";

//CRIAR AS REGRAS PARA CADASTRO (POST) E ATUALIZAÇÃO (PUT)
export const criarAnimalsValidator = z.object ({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    raca: z.string().min(3, "A raça deve ter pelo menos 3 caracteres."),
    especie: z.string().min(3, "A especie deve ter pelo menos 3 caracteres."),
    idade: z.number().int("O ano do animal deve ser um número inteiro.").max(new Date().getFullYear()),
    genero: z.string().min(3, "O genero deve ter pelo menos 3 caracteres."),
    cover: z
        .string()
        .url("A capa deve ser uma URL válida.")
        .optional()
        .or (z.literal(""))
        .transform((val) => (val === "" ? undefined:val)),
});

export const atualizarAnimalsValidator = criarAnimalsValidator.partial();