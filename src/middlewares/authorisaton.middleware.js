import Permission from "../models/permissions.models.js";
import RolePermissionMapping from "../models/rolePermissionMapping.models.js";

// Middleware to check if user has required permission
const checkAuthorisation = (requiredPermissionName) => async (req, res, next) => {
  try {
    // 1. Find the permission document
    const permissionDoc = await Permission.findOne({
      permissionName: requiredPermissionName,
      enabled: true,
    }).lean();

    if (!permissionDoc) {
      return res.status(403).json({
        message: `Permission "${requiredPermissionName}" is not registered or disabled`,
      });
    }

    const permissionId = String(permissionDoc._id);

    // 2. Get user's roleId from req.user
    const roleId = req.user?.roleId;
    if (!roleId) {
      return res.status(401).json({
        message: "User role not found. Please re-authenticate.",
      });
    }

    // 3. Fetch the mapping for the role
    const mappingDoc = await RolePermissionMapping.findOne({ role: roleId }).lean();
    if (!mappingDoc) {
      return res.status(403).json({
        message: "This role has no permissions assigned.",
      });
    }

    // 4. Check if permission exists in role's permissionsList
    const hasPermission = mappingDoc.permissionsList.some(
      (id) => String(id) === permissionId
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
      });
    }

    // If Permission granted
    next();
  } catch (err) {
    console.error("Authorisation system failed:", err);
    return res.status(500).json({
      message: "Internal server error during authorisation.",
    });
  }
};

export default checkAuthorisation;
