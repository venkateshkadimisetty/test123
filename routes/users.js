var express = require('express');
var router = express.Router();
var memberController = require('../controllers/memberController.js');
var bookController = require('../controllers/bookController.js');
var bookIssueController = require('../controllers/bookIssueController.js');
var userController = require('../controllers/userController.js');

/* Member API's. */
router.post('/member/create', memberController.createMember);
router.post('/member/fetch', memberController.fetchMember);
router.get('/member/listAllMembers', memberController.listAllMembers);
router.post('/member/delete', memberController.deleteMember);

/* Book API's. */
router.post('/book/create', bookController.createBook);
router.post('/book/fetch', bookController.fetchBook);
router.get('/book/listAllBooks', bookController.listAllBooks);
router.post('/book/delete', bookController.deleteBook);

/* Book Issue API's. */
router.post('/bookIssue/issueBook', bookIssueController.issueBook);
router.post('/bookIssue/collectBook', bookIssueController.collectBook);

/* User API's. */
router.post('/user/create', userController.createUser);


module.exports = router;
