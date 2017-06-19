const categorymodel = (sequelize, DataType) => {
  const schema = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    active: {
      type: DataType.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  };

  const Categorymodel = sequelize.define('Category', schema);

  return Categorymodel;
};

export default categorymodel;
