import jwt from "jsonwebtoken"

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
   if(!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    })
   }

   req.id = decoded.userId;
   next();
  } catch (error) {
    console.log(error)
  }
}