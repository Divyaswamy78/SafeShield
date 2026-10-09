const User = require("../models/UserTemp.js")


const adminAuth = async (req, res, next) => {

  try {

    // User ID header se milegi
    const userId = req.headers["user-id"]


    // User ID nahi mili
    if (!userId) {

      return res.status(401).json({
        message: "User authentication required"
      })

    }


    // MongoDB me user find karo
    const user = await User.findById(userId)


    // User exist nahi karta
    if (!user) {

      return res.status(401).json({
        message: "User not found"
      })

    }


    // Admin check
    if (user.role !== "admin") {

      return res.status(403).json({
        message: "Admin access required"
      })

    }


    // User ko request ke andar save karo
    req.user = user


    // Next route par jao
    next()

  } catch (error) {

    console.log(
      "Admin Authentication Error:",
      error
    )

    res.status(500).json({
      message: "Authentication failed"
    })

  }

}


module.exports = adminAuth