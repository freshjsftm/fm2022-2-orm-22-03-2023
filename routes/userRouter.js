const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/user.mw');
const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.patch('/:idUser', checkUser, UserController.updateUser);
userRouter.delete('/:idUser', checkUser, UserController.deleteUser);
userRouter.patch('/instance/:idUser', checkUser, UserController.updateUserInstance);

module.exports = userRouter;