const { Router } = require('express');
const GroupController = require('../controllers/group.controller');

const groupRouter = Router();

groupRouter.post('/', GroupController.createUserGroup);
//GET http://localhost:3000/api/groups/users/23 HTTP/1.1
groupRouter.get('/users/:idUser', GroupController.getUserGroups);

module.exports = groupRouter;
