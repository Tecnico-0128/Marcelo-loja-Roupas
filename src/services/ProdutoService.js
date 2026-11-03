
import produtos from "../models/Produto.js"

export async function listarProduto() {
    return await produtos.findAll({
        order: [["id", "ASC"]]
    })
}

export async function cadastrarProduto(dados) {
    const { nome, preco, quantidade } = dados

    return await produtos.create({ nome, preco,quantidade})
}

export async function atualizarProduto(id, dados) {
    const produto = await produtos.findByPk(id)

    if (!produto) {
        return null
    }

    await produto.update({ quantidade: dados.quantidade })

    return produto
}
