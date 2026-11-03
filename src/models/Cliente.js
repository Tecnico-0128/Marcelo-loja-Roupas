import Sequelize from 'sequelize'
import sequelize from '../config/database.js'

const {DataTypes} = Sequelize

const Clientes = sequelize.define('Clientes', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
        
    }
}, {
    timestamps: false,
    tableName: 'Clientes'
})

export default Clientes