var express = require('express');
var router = express.Router();
var memberController = require('../controllers/memberController.js');
var bookController = require('../controllers/bookController.js');
var bookIssueController = require('../controllers/bookIssueController.js');
var userController = require('../controllers/userController.js');
var bookLogsController = require('../controllers/bookLogController.js');

/* Member API's. */
router.post('/member/create', memberController.createMember);
router.post('/member/fetch', memberController.fetchMember);
router.post('/member/update', memberController.updateMember);
router.get('/member/listAllMembers', memberController.listAllMembers);
router.post('/member/delete', memberController.deleteMember);
router.post('/member/collectFine', memberController.collectFine);

/* Book API's. */
router.post('/book/create', bookController.createBook);
router.post('/book/fetch', bookController.fetchBook);
router.get('/book/list/:bookId', bookController.fetchBookById);
router.post('/book/update', bookController.updateBook);
router.get('/book/listAllBooks', bookController.listAllBooks);
router.post('/book/delete', bookController.deleteBook);

/* Book Issue API's. */
router.get('/bookIssue/listAllBookIssues', bookIssueController.listAllBookIssues);
router.get('/bookIssue/fetchIssueBookDetails/:memberId', bookIssueController.fetchBookIssuesMemeberId);
router.post('/bookIssue/issueBook', bookIssueController.issueBook);
router.post('/bookIssue/fetchIssueBookDetails', bookIssueController.fetchBookIssueDetials);
router.post('/bookIssue/collectBook', bookIssueController.collectBook);

/*Book Logs API's*/
router.get('/bookLogs/listBookLogs', bookLogsController.listAllBookLogs);

/* User API's. */
router.post('/user/create', userController.createUser);
router.get('/user/profile', userController.fetchUser);


module.exports = router;
