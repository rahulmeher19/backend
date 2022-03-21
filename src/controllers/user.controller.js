const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { apiResponse, genApiResponse } = require('./status.controller');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const message = 'User is Successfully Created!';
  apiResponse.data = { user };
  apiResponse.message = { message };
  console.log(apiResponse);
  return res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { user }, message));
});

const getAllUser = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email', 'firstName', 'phoneNo']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  const message = 'All User Detail!';
  apiResponse.data = { result };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { result }, message));
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const message = 'User Details!';
  apiResponse.data = { user };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { user }, message));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  const message = 'User is Updated Sucessfully!';
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { user }, message));
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.OK).send({ message: 'User is Deleted Successfully!' });
});

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
};
