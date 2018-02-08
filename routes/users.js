var express = require('express');
var router = express.Router();
var memberController = require('../controllers/memberController.js');
var bookController = require('../controllers/bookController.js');
var bookIssueController = require('../controllers/bookIssueController.js');

/* Member API's. */
router.post('/member/create', memberController.createMember);
router.post('/member/fetch', memberController.fetchMember);
router.post('/member/delete', memberController.deleteMember);

/* Book API's. */
router.post('/book/create', bookController.createBook);
router.post('/book/fetch', bookController.fetchBook);
router.post('/book/delete', bookController.deleteBook);

/* Book Issue API's. */
router.post('/bookIssue/issueBook', bookIssueController.issueBook);
router.post('/bookIssue/collectBook', bookIssueController.collectBook);


module.exports = router;
