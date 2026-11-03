import * as produto from '../controllers/ProdutoController.js'
import { Router } from 'express'

const router = Router()

router.get('/', produto.listar)
router.post('/', produto.cadastrar)
router.post('/venda', produto.venda)
router.post('/compra', produto.compra)



export default router