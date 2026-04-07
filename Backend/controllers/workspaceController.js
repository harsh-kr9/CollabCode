const Workspace = require('../model/Workspace');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');

const createWorkspace = async (req, res) => {
    try {
        const { name, language } = req.body;
        const userId = req.body.userId;
        const workspace = await Workspace.create({ name, language, owner: userId, members: [userId] });
        res.status(StatusCodes.CREATED).json({ workspace });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create workspace' });
    }
};

const getWorkspaces = async (req, res) => {
    try {
        const userId = req.query.userId;
        const workspaces = await Workspace.find({ members: userId });
        res.status(StatusCodes.OK).json({ workspaces });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch workspaces' });
    }
};

module.exports = { createWorkspace, getWorkspaces };
