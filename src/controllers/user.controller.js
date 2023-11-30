const asyncHandler = require("../utils/asyncHandler");
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/user.model');
const uploadOnCloudinary = require('../utils/cloudinary');

const registerUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email, password } = req.body;
    if (fullName === "") throw new ApiError(400, "fullName is required");
    if (userName === "") throw new ApiError(400, "userName is required");
    if (email === "") throw new ApiError(400, "email is required");
    if (password === "") throw new ApiError(400, "password is required");

    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existingUser) {
        throw new ApiError(409, "User with email or username is already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) throw new ApiError(400, "avatarImage is required");

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverLocalPath);

    if (!avatar) throw new ApiError(400, "avatarImage is required");

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        userName: userName.toLowerCase(),
        coverImage: coverImage?.url || "",
        email,
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) throw new ApiError("Something went wrong");

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    );
});

module.exports = { registerUser };
