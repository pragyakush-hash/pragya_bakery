const checkRole = (...allowedRoles) => {
  console.log("hello inside checkrole",)
  console.log(allowedRoles,"allowedrole11")
  return (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      console.log(allowedRoles,"allowedrole22")
      res.status(403).json({ message: "Access denied : Not authorized" });
    }
    next();
  };
};
export default checkRole;
