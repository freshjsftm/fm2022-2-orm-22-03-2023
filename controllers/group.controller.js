const createError = require('http-errors');
const _ = require('lodash');
const { Group, User } = require('../models');

module.exports.createUserGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const values = _.pick(body, [
      'name',
      'description',
      'isAdult',
    ]);
    const group = await Group.create(values);
    if (!group) {
      return next(createError(400, 'Bad request'));
    }

    const user = await User.findByPk(body.userId);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    await group.addUser(user);

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userWithGroups = await User.findByPk(idUser, {
      include: {
        model: Group,
        through: {
          attributes: ['created_at'],
        },
      },
    });
    if (!userWithGroups) {
      return next(createError(404, 'not found'));
    }
    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addImageGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      file: { filename },
    } = req;
    //console.log(req.file)
    const [rowCount, [updatedGroup]] = await Group.update(
      { imagePath: filename },
      { where: { id: idGroup }, returning: true }
    );

    res.status(200).send({ data: updatedGroup });
  } catch (error) {
    next(error);
  }
};

// module.exports.createUserGroup = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
