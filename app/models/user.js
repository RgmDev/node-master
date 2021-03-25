const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class User extends Model {}

User.init({
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  surname: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  role: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  image: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }
},{
  sequelize,
  modelName: 'user'
})

module.exports = User