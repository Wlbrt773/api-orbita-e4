
//IMPORTA O METODO ROUTER DO EXPRESS
import { Router } from "express";

//IMPORTA O CONTROLLER DE ANIMAIS
import AnimalController from "../controllers/animalControler.js";

//INICIALIZAR O GERENCIADOR DE ROTAS EXPRESS
const router = Router();

//CRIAÇÃO DE ROTAS DA ENTIDADE ANIMAL
router.get("/animais", AnimalController.listar);
router.post("/animais", AnimalController.cadastrar);
router.put("/animais/:id", AnimalController.atualizar);
router.patch("/animais/:id", AnimalController.atualizarParcial);
router.delete("/animais/:id", AnimalController.remover);
