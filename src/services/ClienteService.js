import clientes from "../models/Cliente.js"

export async function listarCliente() {
    return await clientes.findAll({
        order: [["id", "ASC"]]
    })
}

export async function buscarClientePorCpf(cpf) {
    return await clientes.findOne({ where: { cpf } })
}

export async function cadastrarCliente(dados) {
    const { nome, cpf } = dados
    return await clientes.create({ nome, cpf })
}

export async function removerCliente(id) {
    const cliente = await clientes.findByPk(id)

    if (cliente) {
        await cliente.destroy()
    }

    return cliente
}

export async function atualizarCliente(id, dados) {
    const cliente = await clientes.findByPk(id)

    if (cliente) {
        await cliente.update({
            nome: dados.nome
        })
    }

    return cliente
}