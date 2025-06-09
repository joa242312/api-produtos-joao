const express = require('express')
const router = express.Router()
const produtosController = require('../controllers/produtos')
const authMiddlware = require('../middlewares/auth')
const produtosMiddleware = require('../middlewares/produtos')

router.get('/produtos', authMiddlware.ValidateToken, produtosController.getProdutos)
router.post('/produtos', authMiddlware.ValidateToken, produtosMiddleware.validateCreateProduto,
    produtosController.createProduto
)
router.delete(
    '/produtos/:id', authMiddlware.ValidateToken, produtosMiddleware.validateDeleteProduto,
    produtosController.deleteProduto
)

module.exports = router;