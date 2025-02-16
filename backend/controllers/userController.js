
const User = require('../models/User'); 

const searchUser = async (req, res) => {
  const { query } = req.body;
  console.log("Search query:", query); // Debugging line

  try {
    const user = await User.findOne({ username: query });
    console.log("User found:", user); // Debugging line

    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(404).json({ exists: false, message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { searchUser };
