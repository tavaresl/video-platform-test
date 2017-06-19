const categoryEntity = (sequelize, DataType) => {
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

  const CategoryEntity = sequelize.define('Category', schema);

  return CategoryEntity;
};

export default categoryEntity;
