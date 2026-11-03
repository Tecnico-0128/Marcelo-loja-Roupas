import express from 'express'
import ClienteRouter from './src/routes/ClienteRouter.js'
import ProdutoRouter from './src/routes/ProdutoRouter.js'
import sequelize from './src/config/database.js'

const app = express()
app.use(express.json())


app.use('/produto', ProdutoRouter)
app.use('/cliente', ClienteRouter)


app.use((req, res) => {
  res.status(404).json({ erro: "Rota nao encontrada" })

})


try {
  await sequelize.authenticate()
  await sequelize.sync()
  app.listen(3000, () => console.log('Servidor iniciado.'))
} catch (erro) {
  console.error('Falha ao iniciar:', erro)
  process.exit(1)
}