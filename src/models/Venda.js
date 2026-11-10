import Sequelize from 'sequelize'
import sequelize from '../config/database.js'

const {DataTypes} = Sequelize

const Vendas = sequelize.define('Venda', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cliente:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'vendas'
})

export default Vendas