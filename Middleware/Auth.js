import jwt from "jsonwebtoken";
const Secreat_key = "secreat_123";
const fetchUser = async (req, res, next) => {
  const token = req.header("auth");
  if (!token) {
    res.status(401).send({ error: "please autheticaztion using valid token" });
  } else {
    try {
      const data = jwt.verify(token, Secreat_key);
    
      req.user = data.id;
      next();
    } catch (error) {
        res.status(401).send({erros : "please authenticate using a valid token"})
    }
  }
};

export default fetchUser;
