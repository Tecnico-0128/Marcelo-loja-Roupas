
import produtos from "../models/Produto.js"
import vendas from "../models/Venda.js"

export async function listarProduto() {
    return await produtos.findAll({
        order: [["id", "ASC"]]
    })
}

export async function listarVenda() {
    return await vendas.findAll({
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

export async function cadVenda(dados) {
     const { nome, quantidade, cliente } = dados

    return await vendas.create({ nome, quantidade, cliente})
    
}
