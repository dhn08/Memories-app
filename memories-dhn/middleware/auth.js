import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedDate;
    if (token && isCustomAuth) {
      decodedDate = jwt.verify(token, "test");
      req.userId = decodedDate?.id;
    } else {
      decodedDate = jwt.decode(token);
      req.userId = decodedDate?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
