const express = require('express');
const router = express.Router();
const { createWorkspace, getWorkspaces } = require('../controllers/workspaceController');

router.post('/create', createWorkspace);
router.get('/', getWorkspaces);

module.exports = router;
