import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    console.log("helllo");
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
    console.log(headerToken);
    const token = headerToken.split(" ")[1];
    console.log("tokennnnnnnverify", token);
    if (!token) return res.status(401).json({ error: "Access denied" });
    const decoded = jwt.verify(token, "p123");
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    console.log("drecode",decoded)
    console.log("verifyrole",decoded.role)
    console.log(req.userId); 
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
