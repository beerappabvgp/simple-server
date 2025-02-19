import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

export const jwt_secret = "jwt_secret";
export const userMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                msg: "Token not found ....",
            });
        }
         
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        console.log("decoded: ", decoded);
        const { id, exp } = decoded;
        // check the expiry of the token
        let currentTime = new Date().getTime();
        currentTime = currentTime / 1000;
        if (exp < currentTime) {
            return res.status(400).json({
                msg: "Token expired ...."
            });
        } 
        req.user = id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "Some issue with the token ....",
        });
    }
};
