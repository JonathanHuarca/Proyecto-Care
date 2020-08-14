import catchAsync from "../../../utils/catchAsync";
const errorMessage = "Error en get reports controller"

const getReportsAdmin = (report_model,user_model) => catchAsync(errorMessage, async (req, res) => {

   const allReports = await report_model.find()
   /*const idTeachers = await report_model.aggregate([
        {
            $group:{
                _id : '$created_by'
            }
        }
   ])
   const ids = []
   idTeachers.forEach(element => {
       ids.push(element._id)
   });
   const finalReport = []
   const users = await user_model.find({_id : {$in:ids}}).select({name : 1,lastname:1})
   allReports.forEach(report => {
       users.forEach(user => {        

        if(report.created_by === user._id){
            finalReport.push({
                name_teacher : user.name,
                lastname_teacher : user.lastname
            })
            
            }
        });
   });
*/
   res.status(200).json({
      message : "All reports found :",
      reports : allReports
   })
   
})

export default getReportsAdmin