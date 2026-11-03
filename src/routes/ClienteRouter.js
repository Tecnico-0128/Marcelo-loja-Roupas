import * as cliente from '../controllers/ClienteController.js'
import { Router } from 'express'

const router = Router()

router.get('/', cliente.listar)
router.post('/', cliente.cadastrar)
router.put('/:cpf', cliente.atualizar)
router.delete('/:cpf', cliente.remover)


export default router