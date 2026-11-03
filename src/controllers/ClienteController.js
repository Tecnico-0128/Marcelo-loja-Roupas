import * as clienteService from "../services/ClienteService.js"

export async function listar(req, res) {
    const cliente = await clienteService.listarCliente()
    return res.status(200).json(cliente)
}

export async function cadastrar(req, res) {
    const { nome, cpf } = req.body

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
    const cpfRegex = /^\d{11}$/

    if (!nome || !nomeRegex.test(nome.trim())) {
        return res.status(400).json({ mensagem: "Nome invalido" })
    }

    if (!cpfRegex.test(cpf || "")) {
        return res.status(400).json({ mensagem: "CPF invalido" })
    }

    const clientes = await clienteService.listarCliente()

    if (clientes.some(cliente => cliente.cpf === cpf)) {
        return res.status(409).json({ mensagem: "CPF ja cadastrado" })
    }

    const cad = await clienteService.cadastrarCliente(req.body)
    return res.status(201).json(cad)
}

export async function remover(req, res) {
    const { cpf } = req.params

    const cliente = await clienteService.buscarClientePorCpf(cpf)

    if (!cliente) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        })
    }

    await clienteService.removerCliente(cliente.id)

    return res.status(200).json({
        mensagem: "Cliente removido com sucesso"
    })
}

export async function atualizar(req, res) {
    const { cpf } = req.params
    const { nome } = req.body

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/

    if (!nome || !nomeRegex.test(nome.trim())) {
        return res.status(400).json({ mensagem: "Nome invalido" })
    }

    const cliente = await clienteService.buscarClientePorCpf(cpf)

    if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente nao encontrado" })
    }

    const clienteAtualizado = await clienteService.atualizarCliente(
        cliente.id,
        { nome }
    )

    return res.status(200).json(clienteAtualizado)
}

