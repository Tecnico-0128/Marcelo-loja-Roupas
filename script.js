
// clientes //

let clientes = JSON.parse(localStorage.getItem("clientes")) || []
let produtos = JSON.parse(localStorage.getItem("produtos")) || []

// Cadastrar clientes

function cadCliente() {
    const nome = document.getElementById("nome").value
    const cpf = document.getElementById("cpf").value

    if (!nome || !/^\d{11}$/.test(cpf)) {
        alert("Dados Incorretos Lembre-se CPF somente os numeros, nao e necessario colocar '-' e '.' nele")
        return
    }

    const existe = clientes.find(cliente => cliente.cpf === cpf)

    if (existe) {
        alert("Ja existe um cliente cadastrado com esse CPF")
        return
    }

    const cliente = {
        nome: nome,
        cpf: cpf
    }

    clientes.push(cliente)
    localStorage.setItem("clientes", JSON.stringify(clientes))

    document.getElementById("nome").value = ""
    document.getElementById("cpf").value = ""

    alert("Cliente cadastrado com sucesso!!!!")
}

// Excluir clientes

function exCliente() {
    const cpf = document.getElementById("cpf").value

    if (!/^\d{11}$/.test(cpf)) {
        alert("Dados incorretos. Digite um CPF valido com 11 numeros.")
        return
    }

    const ex = clientes.find(cliente => cliente.cpf === cpf)

    if (!ex) {
        alert("Cliente nao encontrado")
        return
    }

    clientes = clientes.filter(cliente => cliente.cpf !== cpf)
    localStorage.setItem("clientes", JSON.stringify(clientes))

    document.getElementById("cpf").value = ""

    alert("Cliente excluido com sucesso")
}

// Editar cliente

function editCliente() {
    const nome = document.getElementById("nome").value
    const cpf = document.getElementById("cpf").value

    if (!nome || !/^\d{11}$/.test(cpf)) {
        alert("Dados Incorretos, Lembre-se CPF somente os numeros, nao e necessario colocar '-' e '.' nele")
        return
    }

    const ex = clientes.find(cliente => cliente.cpf === cpf)

    if (!ex) {
        alert("Cliente nao encontrado")
        return
    }

    ex.nome = nome

    localStorage.setItem("clientes", JSON.stringify(clientes))

    document.getElementById("nome").value = ""
    document.getElementById("cpf").value = ""

    alert("Cliente editado com suceso")
}

// produtos //


// Cadastrar produtos

function cadProduto() {
    alert("Chamou")
    const nome = document.getElementById("nome").value
    const preco = Number(document.getElementById("preco").value)
    const quantidade = Number(document.getElementById("quantidade").value)

    if (!nome || preco <= 0 || !Number.isInteger(quantidade) || quantidade < 0) {
        alert("Dados incorretos, verifique o nome, preco e quantidade do produto")
        return
    }

    const produto = {
        nome: nome,
        preco: preco,
        quantidade: quantidade
    }

    produtos.push(produto)
    localStorage.setItem("produtos", JSON.stringify(produtos))

    document.getElementById("nome").value = ""
    document.getElementById("preco").value = ""
    document.getElementById("quantidade").value = ""

    alert("Produto cadastrado com sucesso!!!!")
}

// Comprar produtos

function compraProduto() {
    const nome = document.getElementById("nome").value
    const quantidade = Number(document.getElementById("quantidade").value)

    if (!nome || !Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Dados incorretos, digite o nome e uma quantidade valida")
        return
    }

    const produto = produtos.find(produto => produto.nome.toLowerCase() === nome.toLowerCase())

    if (!produto) {
        alert("Produto nao encontrado")
        return
    }


    produto.quantidade += quantidade

    localStorage.setItem("produtos", JSON.stringify(produtos))

    document.getElementById("nome").value = ""
    document.getElementById("quantidade").value = ""

    alert("Compra registrada com sucesso!!!!")
}

// Vender produtos

function vendaProduto() {
    const nome = document.getElementById("nome").value
    const quantidade = Number(document.getElementById("quantidade").value)
    const cliente = document.getElementById("cliente").value

    if (!nome || !Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Dados incorretos digite o nome e uma quantidade valida")
        return
    }

    const produto = produtos.find(produto => produto.nome === nome)
    const clientevv = clientes.find(clientes => clientes.cpf === cliente)

    if (!produto) {
        alert("Produto nao encontrado")
        return
    }

      if (!clientevv) {
        alert("cliente nao encontrado")
        return
    }

    if (produto.quantidade < quantidade) {
        alert("Estoque insuficiente para fazer a venda")
        return
    }

    produto.quantidade -= quantidade

    localStorage.setItem("produtos", JSON.stringify(produtos))

    document.getElementById("nome").value = ""
    document.getElementById("quantidade").value = ""

    alert("Venda realizada com sucesso!!!!")
}

// listagem

if (document.getElementById("lista-cliente")) {
    listarCliente()
    listarProduto()
}

function listarCliente() {
    let div = document.getElementById("lista-cliente")
    for (let cl of clientes) {
        div.innerHTML += `<p>nome: ${cl.nome} | cpf: ${cl.cpf}</p>`
    }
}

function listarProduto() {
    let div = document.getElementById("lista-produto")
    for (let cl of produtos) {
        div.innerHTML += `<p>produto: ${cl.nome} | preco: ${cl.preco} | quantidade ${cl.quantidade}</p>`
    }
}
