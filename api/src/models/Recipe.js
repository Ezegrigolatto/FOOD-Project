const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: { 
      type: DataTypes.REAL,
      allowNull: true
    },
    healthy: {
      type: DataTypes.REAL,
      allowNull: true
    },
    steps:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
