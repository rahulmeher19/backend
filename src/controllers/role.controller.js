const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');
const { apiResponse, genApiResponse } = require('./status.controller');

const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  const message = 'Role is Successfully Created!';
  apiResponse.data = { role };
  apiResponse.message = { message };
  console.log(apiResponse);
  return res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { role }, message));
});

const getAllRole = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['roleName', 'roleTitle']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roleService.queryRoles(filter, options);
  const message = 'All Role Detail!';
  apiResponse.data = { result };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { result }, message));
});

const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  const message = 'Role Details!';
  apiResponse.data = { role };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { role }, message));
});

const updateRole = catchAsync(async (req, res) => {
  const role = await roleService.updateRoleById(req.params.id, req.body);
  const message = 'Role is Updated Sucessfully!';
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { role }, message));
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRoleById(req.params.id);
  res.status(httpStatus.OK).send({ message: 'Role is Deleted Successfully!' });
});

module.exports = {
  createRole,
  getAllRole,
  getRole,
  updateRole,
  deleteRole,
};
