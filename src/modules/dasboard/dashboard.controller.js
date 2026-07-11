import asyncHandler from "../../common/utils/asyncHandler.js";
import { getDashboardDataService } from "./dashboard.service.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const data = await getDashboardDataService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data,
  });
});
