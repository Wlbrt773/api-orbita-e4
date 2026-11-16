import type {Request, Response} from "express";
import Animal, { type InterfaceAnimal} from "../models/Pet.js";

class AnimalController {

    //GET - LISTAR TODOS OS ANIMAIS DO BANCO DE DADOS
    static async listar (req: Request, res: Response) {
        try{
                 const listaAnimais = await Animal.find({});
                 res.status(200).json(listaAnimais);
            }catch (erro){
                 res.status(500).json({ mensagem: "Erro ao buscar animal."});
            }
             
    }
    
    //POST - CADASTRAR NOVO ANIMAL NO BANCO DE DADOS
    static async cadastrar (req: Request<{id: string}, {}, InterfaceAnimal>, res: Response) {

        try{
                const {nome, tipoAnimal, especie, raca, genero, idade} = req.body;
            
                const novoAnimal = await Animal.create({
                    nome,
                    tipoAnimal,
                    especie,
                    raca,
                    genero,
                    idade: Number(idade),
                });
            
                    res.status(201).json({
                        mensagem: "Animal Cadastrado com Sucesso!",
                        Animal: novoAnimal
                    });
            }catch (error){
                res.status(500).json({mensagem:"Error ao cadastrar animal."})
            }

    }

    //PUT - ATUALIZAR DADOS DE UM ANIMAL NO BANCO DE DADOS
    static async atualizar (req: Request<{id: string}, {}, InterfaceAnimal>, res: Response) {
    
        try{
                const { id } = req.params;
        
                const {nome, tipoAnimal, especie, raca, genero, idade} = req.body;
        
                const animalAtualizado = await Animal.findByIdAndUpdate(
                    id,
                    {
                        nome,
                        tipoAnimal,
                        especie,
                        raca,
                        genero,
                        idade: Number(idade),
                    },
                    {new: true}
                );
        
                if(!animalAtualizado){
                    res.status(404).json({mensagem: "Animal não encontrado!"});
                    return;
                }
        
                res.status(200).json({
                    mensagem: "Animal atualizado com sucesso!",
                    animal: animalAtualizado
                });
            } catch (error){
                res.status(500).json({mensagem: "Erro ao atualizar animal."})
            }

    }

    //PATCH - ATUALIZAR PARCIALMENTE OS DADOS DE UM ANIMAL NO BANCO DE DADOS
    static async atualizarParcial (req: Request<{id: string}, {}, InterfaceAnimal>, res: Response) {
    
        try{
                const { id } = req.params;
    
                const animalAtualizado = await Animal.findByIdAndUpdate(
                    id,
                    { $set: req.body },
                    { returnDocument: 'after' }
                );
    
                if(!animalAtualizado){
                    res.status(404).json({mensagem: "Animal não encontrado!"});
                    return;
                }
    
                res.status(200).json({
                    mensagem: "Animal atualizado parcialmente com sucesso!",
                    animal: animalAtualizado,
                });
            }catch(error){
                    res.status(500).json({mensagem: "Erro ao atualizar parcialmente o animal."});
            }

    }

    //DELETE - REMOVER UM ANIMAL DO BANCO DE DADOS
    static async remover (req: Request<{id: string}>, res: Response) {
        
        try{

                const { id } = req.params;
            
                const animalRemovido = await Animal.findByIdAndDelete(id);
            
                if(!animalRemovido){
                    res.status(404).json({mensagem: "Animal não encontrado!"});
                    return;
                }
            
                res.status(200).json({
                    mensagem: "animal removido com sucesso!",
                
                });
            }catch(error){
                res.status(500).json({mensagem: "Erro ao remover animal."});
            }
        }
};

export default AnimalController;
