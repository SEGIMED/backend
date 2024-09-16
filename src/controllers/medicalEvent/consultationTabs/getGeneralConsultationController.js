const getGeneralConsultationController = async (req, res) => {
  try {
    const { id } = req.query;
    
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getGeneralConsultationController;
