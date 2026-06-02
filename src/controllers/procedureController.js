const Procedure = require("../models/Procedure");

const getProcedures = async (req, res) => {
  try {
    const procedures = await Procedure.find();
    res.json(procedures);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProcedures,
};