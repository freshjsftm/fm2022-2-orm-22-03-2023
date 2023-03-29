const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const paginate = require('../middlewares/paginate.mw');
const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/:idUser', UserController.getOneUserByPk);
userRouter.get('/', paginate,  UserController.getAllUsers);
userRouter.patch('/:idUser', checkUser, UserController.updateUser);
userRouter.delete('/:idUser', checkUser, UserController.deleteUser);
userRouter.patch('/instance/:idUser', checkUser, UserController.updateUserInstance);

module.exports = userRouter;