import { Router } from "express";
import { ApiResponse } from "../utils/api-response.js";
const router = Router();
import { asyncHandler } from "../utils/async-handler.js";
const healthCheck = asyncHandler(async(req, res)=>{
    res.status(200).json(new ApiResponse(200,{message:"server is healthy"}));
})



export { healthCheck };