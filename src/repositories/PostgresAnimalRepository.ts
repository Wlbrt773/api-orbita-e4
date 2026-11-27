import prisma from "../config/dbConnectPostgres.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { IAnimalRepository, AnimalDTO, FiltroAnimalDTO,} from "./IAnimalRepository.js";

export class PostgresAnimalRepository implements IAnimalRepository {
    
    async listar(): Promise<AnimalDTO[]> {
        return await prisma.animal.findMany();
    }

    async buscarPorId(id: string): Promise<AnimalDTO | null> {
        return await prisma.animal.findUnique({
            where: { id },
        });
    }

    async buscarPorFiltro(filtro: FiltroAnimalDTO): Promise<AnimalDTO[]> {
        const where: Prisma.AnimalWhereInput = {};

        if (filtro.tipoAnimal) {
            where.tipoAnimal = {
                contains: filtro.tipoAnimal,
                mode: "insensitive",
            };
        }

        if (filtro.raca) {
            where.raca = {
                contains: filtro.raca,
                mode: "insensitive",
            };
        }

        if (filtro.idade !== undefined) {
            where.idade = Number(filtro.idade);
        }

        return await prisma.animal.findMany({ where });
    }

    async cadastrar(dados: AnimalDTO): Promise<AnimalDTO> {
        return await prisma.animal.create({
            data: {
                ...(dados.id !== undefined ? { id: dados.id } : {}),
                nome: dados.nome,
                tipoAnimal: dados.tipoAnimal,
                especie: dados.especie,
                raca: dados.raca,
                genero: dados.genero,
                idade: Number(dados.idade),
                ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
            },
        });
    }

    async atualizar(id: string, dados: AnimalDTO): Promise<AnimalDTO[]> {
        try {
            const atualizado = await prisma.animal.update({
                where: { id },
                data: {
                    nome: dados.nome,
                    tipoAnimal: dados.tipoAnimal,
                    especie: dados.especie,
                    raca: dados.raca,
                    genero: dados.genero,
                    idade: Number(dados.idade),
                    ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
                },
            });
            return [atualizado];
        } catch (error: any) {
            if (error?.code === "P2025") {
                return [];
            }
            throw error;
        }
    }

    async atualizarParcial(
        id: string,
        dados: Partial<AnimalDTO>
    ): Promise<AnimalDTO | null> {
        try {
            const data: Prisma.AnimalUpdateInput = {};

            if (dados.nome !== undefined) data.nome = dados.nome;
            if (dados.tipoAnimal !== undefined) data.tipoAnimal = dados.tipoAnimal;
            if (dados.especie !== undefined) data.especie = dados.especie;
            if (dados.raca !== undefined) data.raca = dados.raca;
            if (dados.genero !== undefined) data.genero = dados.genero;
            if (dados.idade !== undefined) data.idade = Number(dados.idade);
            if (dados.cover !== undefined) data.cover = dados.cover;

            return await prisma.animal.update({
                where: { id },
                data,
            });
        } catch (error: any) {
            if (error?.code === "P2025") {
                return null;
            }
            throw error;
        }
    }

    async remover(id: string): Promise<boolean> {
        try {
            await prisma.animal.delete({
                where: { id },
            });
            return true;
        } catch (error: any) {
            if (error?.code === "P2025") {
                return false;
            }
            throw error;
        }
    }
}