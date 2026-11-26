import type {Request, Response} from "express";
import Animal, { type InterfaceAnimal} from "../models/Pet.js";
import type { IAnimalRepository, FiltroAnimalDTO, AnimalDTO } from "../repositories/IAnimalRepository.js";

class AnimalController {

    private animalRepository: IAnimalRepository;

    constructor(animalRepository: IAnimalRepository){
        this.animalRepository = animalRepository;
    }


    //GET - LISTAR TODOS OS ANIMAIS DO BANCO DE DADOS
    async listar (req: Request, res: Response) {
        try{
                const listaAnimais = await this.animalRepository.listar();
                res.status(200).json(listaAnimais);
            }catch (erro){
                res.status(500).json({ mensagem: "Erro ao buscar animal."});
        }
    }


    //GET - BUSCAR UM LIVRO ESPECÍFICO PELO ID - REQ PARAMS
    async buscarPorId (req: Request<{id: string}>, res: Response){
        try{
            const { id } = req.params;
            const animalEncontrado = await this.animalRepository.buscarPorId(id);

            if (!animalEncontrado){
                res.status(404).json({mensagem: "animal não encontrado."});
                return
            }

            res.status(200).json(animalEncontrado);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar animal po ID."});
        
        }
    }

    //GET - FILTRAR ANIMAIS POR CRITÉRIOS OPCIONAIS - REQ QUERY
    async buscarPorFiltro (req: Request, res: Response) {
        try{
            //Extrair os possíveis filtros enviados após o "?" na url
            const { tipoAnimal, raca, idade } = req.query;

            //criar um objeto vazio para receber apenas os filtros preenchidos
            const filtros: FiltroAnimalDTO = {};

            if(tipoAnimal){
                filtros.tipoAnimal = String(tipoAnimal) //busca exata
            }

            if(raca){
                filtros.raca = String(raca)//busca exata
            }

            if (idade) {
                filtros.idade = Number(idade);
            }

            const animaisFiltrados = await this.animalRepository.buscarPorFiltro(filtros);
            res.status(200).json(animaisFiltrados)

        }catch(error){
                res.status(500).json({mensagem:"Error ao filtrar animal."})
            }

        }


    //POST - CADASTRAR NOVO ANIMAL NO BANCO DE DADOS
    async cadastrar (req: Request<{},{}, InterfaceAnimal>, res:Response) {

            try{
            const novoAnimal = await this.animalRepository.cadastrar(req.body);

                    res.status(201).json({
                        mensagem: "Animal Cadastrado com Sucesso!",
                        Animal: novoAnimal
                    });
            }catch (error){
                res.status(500).json({mensagem:"Error ao cadastrar animal."})
            }

    }

    //PUT - ATUALIZAR DADOS DE UM ANIMAL NO BANCO DE DADOS
    async atualizar (req: Request<{id: string}, {}, InterfaceAnimal>, res: Response) {
    
        try{
                const { id } = req.params;
                const animalAtualizado = await this.animalRepository.atualizar(id, req.body);
        
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
    async atualizarParcial (req: Request<{id: string}, {}, InterfaceAnimal>, res: Response) {
    
        try{
                const { id } = req.params;
                
                const animalAtualizado = await this.animalRepository.atualizarParcial(id, req.body);

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
    async remover (req: Request<{id: string}>, res: Response) {
        
        try{
        const { id } = req.params;
            
        const animalRemovido = await this.animalRepository.remover(id);
            
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
