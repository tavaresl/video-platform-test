import bcrypt from 'bcrypt-nodejs';

const userEntity = (sequelize, DataType) => {
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

  const UserEntity = sequelize.define('User', schema, options);

  UserEntity.hasSamePassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  return UserEntity;
};

export default userEntity;
