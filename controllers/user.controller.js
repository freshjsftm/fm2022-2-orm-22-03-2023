const createError = require('http-errors');
const { Op } = require('sequelize');
const _ = require('lodash');
const { User } = require('../models');

const checkBody = (body)=>_.pick(body, ['firstName', 'lastName', 'email', 'password', 'birthday', 'isMale']);

module.exports.getOneUserByPk = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const user = await User.findByPk(idUser, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      // throw new Error('404. user not found');
      const error = createError(404, 'User not found');
      return next(error);
    }
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const values = checkBody(body);
    const createdUser = await User.create(values);
    if (!createdUser) {
      return next(createError(400, 'Check your data'));
    }
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    //req -> query -> fname
    const users = await User.findAll({
      ...paginate,
      attributes: { exclude: ['password'] },
      //attributes: ['id','email',['first_name', 'name']]
      // where: {
      //   // firstName: 'Brad',
      //   // lastName : 'Pitt'
      //   // [Op.or]: {
      //   //   firstName: {
      //   //     [Op.ne] : 'Brad'
      //   //   }
      //   // }
      // }
    });
    if (!users) {
      return next(createError(404, 'Users not found'));
    }
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { idUser },
    } = req;
    const values = checkBody(body);
    const [rowsCount, [updatedUser]] = await User.update(values, {
      where: {
        id: {
          [Op.eq]: idUser,
        },
      },
      returning: true,
      //returning: ['email', 'last_name']
    });
    updatedUser.password = undefined; //optimal

    // not optimal
    // const user = updatedUser.get();
    // delete user.password;
    // res.status(202).send({ data: user });

    res.status(202).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    // const userInstance = await User.findByPk(idUser);

    const userUpdated = await userInstance.update(body, {
      returning: true,
    });

    userUpdated.password = undefined;
    res.status(202).send({ data: userUpdated });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userInstance = await User.findByPk(idUser);

    // const deletedUser = await User.destroy({
    //   where: {id: idUser}
    // })
    await userInstance.destroy();

    userInstance.password = undefined;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

// module.exports.createUser = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
