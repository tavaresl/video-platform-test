import bcrypt from 'bcrypt-nodejs';

const usermodel = (sequelize, DataType) => {
  const schema = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  };

  const options = {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.set('password', bcrypt.hashSync(user.password, salt));
      },
    },
  };

  const Usermodel = sequelize.define('User', schema, options);

  Usermodel.hasSamePassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  return Usermodel;
};

export default usermodel;
