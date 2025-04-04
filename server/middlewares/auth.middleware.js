import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies.token ||  // ✅ Check cookie first
        req.headers["authorization"]?.replace("Bearer ", "");  // ✅ Check headers

    if (!token) {
        return next(new errorHandler("Invalid token", 400));  // ❌ Fix error message
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenData;
        next();
    } catch (error) {
        return next(new errorHandler("Unauthorized, Invalid Token", 401)); // ✅ Better error handling
    }
});
