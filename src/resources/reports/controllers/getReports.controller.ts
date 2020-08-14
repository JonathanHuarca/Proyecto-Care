import catchAsync from "../../../utils/catchAsync";
import report from "../reports.service";

const errorMessage = "Error en get reports controller"

const getReports = Model => catchAsync(errorMessage, async (req, res) => { 
   /*const id_coordinator = req.body.id_coordinator

   const reports = await Model.find({ created_by: id_coordinator })

   res.status(200).json({
      message: `Reports of coordinator with id ${id_coordinator} founded`,
      reports: reports
   })*/
   const reports = await Model.find({created_by:req.user._id})
   res.status(200).json({
      message : "Reports found:",
      reports : reports
   })
   
})

export default getReports