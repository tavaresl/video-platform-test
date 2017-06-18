import bcrypt from 'bcrypt';

const userEntity = (sequelize, DataType) => {
  const UserEntity = sequelize.define('User', {
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
  // },
  //   {
  //     hooks: {
  //       beforeCreate: (user) => {
  //         const salt = bcrypt.genSaltSync();
  //         user.set('password', bcrypt.hashSync(user.password, salt));
  //       },
  //     },
    });

  return UserEntity;
};

export default userEntity;
