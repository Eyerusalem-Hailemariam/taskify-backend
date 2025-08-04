function authorizedRoles(...roles) {
  return (req, res, next) => {
    const userRole = req.user?.user_role;
    console.log("User role:", userRole);
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
    }

    next();
  };
}

module.exports = {
  authorizedRoles,
};
