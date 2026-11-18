
//IMPORTA O METODO ROUTER DO EXPRESS
import { Router } from "express";

//IMPORTA O CONTROLLER DE ANIMAIS
import AnimalController from "../controllers/animalControler.js";

//INICIALIZAR O GERENCIADOR DE ROTAS EXPRESS
const router = Router();

//1 - ROTAS FIXAS E DE BUSCA
router.get("/animais", AnimalController.listar);
router.get("/animais/busca", AnimalController.buscarPorFiltro);

//2 - ROTAS DE BUSCA COM PARÂMETRO DINÂMICO
router.get("/animais:id", AnimalController.buscarPorId);

//CRIAÇÃO DE ROTAS DA ENTIDADE ANIMAL
router.post("/animais", AnimalController.cadastrar);
router.put("/animais/:id", AnimalController.atualizar);
router.patch("/animais/:id", AnimalController.atualizarParcial);
router.delete("/animais/:id", AnimalController.remover);

//EXPORTA AS ROTAS CONFIGURADAS PARA SEREM USADAS NO APP.TS

export default router;