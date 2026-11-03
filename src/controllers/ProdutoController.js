import * as produtoService from "../services/ProdutoService.js"
import * as clienteService from "../services/ClienteService.js"

export async function listar(req, res) {
    const produto = await produtoService.listarProduto()
    return res.status(200).json(produto)
}

export async function cadastrar(req, res) {
    const { nome, preco, quantidade } = req.body

    if (!nome) {
        return res.status(400).json({ mensagem: "Nome invalido" })
    }

    if (Number(preco) < 0 || !preco || isNaN(preco)) {
        return res.status(400).json({ mensagem: "preco invalido" })
    }

    if (Number(quantidade) < 0 || !quantidade || isNaN(quantidade)) {
        return res.status(400).json({ mensagem: "quantidade invalido" })
    }

    const produtos = await produtoService.listarProduto()

    if (produtos.some(produto => produto.nome === nome)) {
        return res.status(400).json({ mensagem: "Produto ja cadastrado" })
    }

    const cad = await produtoService.cadastrarProduto(req.body)
    return res.status(201).json(cad)
}


export async function compra(req, res) {
    const { nome, quantidade } = req.body

    if (!nome || quantidade === undefined || quantidade === null || quantidade.includes(".") || Number(quantidade) <= 0) {
        return res.status(400).json({ mensagem: "Nome ou quantidade invalida" })
    }

    const produtos = await produtoService.listarProduto()

    const produto = produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase())

    if (!produto) {
        return res.status(400).json({ mensagem: "Produto nao cadastrado" })
    }

    const novaQuantidade = Number(produto.quantidade) + Number(quantidade)

    const produtoAtualizado = await produtoService.atualizarProduto(
         produto.id,
        { quantidade: novaQuantidade }
    )

    return res.status(200).json(produtoAtualizado)
}


export async function venda(req, res) {
    const { nome, quantidade, cliente } = req.body

    const qtd = Number(quantidade)

    if ( !nome || !cliente || quantidade === undefined || quantidade === null || quantidade === "" || !Number.isInteger(qtd) || qtd <= 0) {
        return res.status(400).json({mensagem: "Nome, cliente ou quantidade invalida"})
    }

    const produtos = await produtoService.listarProduto()
    const clientes = await clienteService.buscarClientePorCpf(cliente)

    const produto = produtos.find( p => p.nome.toLowerCase() === nome.toLowerCase() )

    if (!produto) { 
        return res.status(400).json({ mensagem: "Produto nao cadastrado"})
    }

    if (!clientes) {
        return res.status(400).json({ mensagem: "Cliente nao cadastrado"})
    }

    if (Number(produto.quantidade) < qtd) {
         return res.status(400).json({ mensagem: "Estoque insuficiente" })
    }

    const novaQuantidade = Number(produto.quantidade) - qtd

    const produtoAtualizado = await produtoService.atualizarProduto(
        produto.id,
        { quantidade: novaQuantidade }
    )

    return res.status(200).json(produtoAtualizado)
}
