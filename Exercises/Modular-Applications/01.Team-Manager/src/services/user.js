import * as request from '../services/requester.js';

const host = 'http://localhost:3030';

const endpoints = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: `${host}/users/logout`,
    create: `${host}/data/teams`,
    getAll: `${host}/data/teams`,
    getOne: (id) => `${host}/data/teams/${id}`,
    edit: (id) => `${host}/data/teams/${id}`,
    getMembers: (query) => `${host}/data/members?where=${query}`,
    getAllMembers: `${host}/data/members?where=status%3D%22member%22`,
    getTeamMembers: (teamId) => `${host}/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
    joinTeam: `${host}/data/members`,
    myTeams: (userId) => `${host}/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
    approve: (memberId) => `${host}/data/members/${memberId}`,
    deciline: (memberId) => `${host}/data/members/${memberId}`
}

export const register = (email, username, password, repass) => request.post(endpoints.register, { email, username, password, repeatPassword: repass });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => request.get(endpoints.logout);

export const create = (data) => request.post(endpoints.create, data);

export const edit = (teamId, data) => request.put(endpoints.edit(teamId), data);

export const getOne = (teamId) => request.get(endpoints.getOne(teamId));

export const getAll = () => request.get(endpoints.getAll);

export const getMyTeams = (userId) => request.get(endpoints.myTeams(userId));

export const getMembers = (query) => request.get(endpoints.getMembers(query));

export const getAllMembers = () => request.get(endpoints.getAllMembers);

export const getTeamMembers = (teamId) => request.get(endpoints.getTeamMembers(teamId));

export const joinTeam = (teamId) => request.post(endpoints.joinTeam, { teamId: teamId });

export const approveJoin = (memberId, data) => request.put(endpoints.approve(memberId), data);

export const decilineJoin = (memberId) => request.del(endpoints.deciline(memberId));