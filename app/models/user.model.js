module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: false,
      },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        active: {
          type: DataTypes.TINYINT(1),
          defaultValue: 0
        },
      createdBy: { type: DataTypes.INTEGER },
      updatedBy: { type: DataTypes.INTEGER },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }  
    });

  return User;
};
