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

const getProcedureById = async (req, res) => {
  try {
    const procedure = await Procedure.findById(req.params.id);

    if (!procedure) {
      return res.status(404).json({
        message: "Procedure not found",
      });
    }

    res.json(procedure);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProcedures,
  getProcedureById,
};