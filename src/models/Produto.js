import Sequelize from 'sequelize'
import sequelize from '../config/database.js'

const {DataTypes} = Sequelize

const Produtos = sequelize.define('Produtos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'produtos'
})

export default Produtos