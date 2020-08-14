import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get teacher ranking controlador'

const getTeacherRanking = (ModelKpi,ModelQuestion,ModelUser) => catchAsync(msgErrorController,async (req, res) => {
  if(req.user.rol === 1||req.user.rol === 0){ //admin o super admin ven los datos generales
    const questions = await ModelQuestion.aggregate([
        {
            $group: {
                _id : "$askedBy",
                n_preguntas: { "$sum": 1 }
            }
        }
    ])
    const sectionAvance = await ModelKpi.aggregate([ //agrupa todos los kpi
        {
            $match : { type_kpi : 0 } //filtrar solo los kpi type : 0 => N° Modulos completados
        },
        {
            $group: { //agruparlos por teacher
                _id : "$id_teacher",              
                n_modulos_completados: { $sum: "$kpi_data" }             
            }                 
        },
        {
          $sort : { //ordenar los kpi  
            n_modulos_completados : -1 //mayor a menor                
          }     
      },    
        
    ])
    const ids = []
    sectionAvance.forEach(element => {
      ids.push(element._id)
    });
    const usersData = await ModelUser.find({_id:{$in:ids}})   
    sectionAvance.forEach(avance => {
      usersData.forEach(user => {
        questions.forEach(question => {               
            if(avance._id.toString() === user._id.toString() && avance._id.toString() === question._id.toString()){                        
              avance.name = user.name
              avance.lastname = user.lastname
              avance.region = user.region
              avance.n_preguntas = question.n_preguntas 
          }
        });   
      });
    });
    res.status(200).json({
        message : "Ranking de profesores por N° Modulos completados, mayor a menor ",
        ranking : sectionAvance
    })
  }
  if(req.user.rol === 7){ // el coordinador ve los datos de su region a cargo
        let region_code = null
        if(req.user.region === 'amazonas' || req.user.region === 'cajamarca'){
            region_code = 0
        }
        if(req.user.region === 'huanuco' || req.user.region === 'pasco'){
            region_code = 1
        }
        const questions = await ModelQuestion.aggregate([          
          {
              $group: {
                  _id : "$askedBy",
                  n_preguntas: { "$sum": 1 }
              }
          }
      ])
      const sectionAvance = await ModelKpi.aggregate([ //agrupa todos los kpi
          {
              $match : { type_kpi : 0 , region : region_code }
          },
          {
              $group: { //agruparlos por teacher
                  _id : "$id_teacher",              
                  n_modulos_completados: { $sum: "$kpi_data" }             
              }                 
          },
          {
            $sort : { //ordenar los kpi  
              n_modulos_completados : -1 //mayor a menor                
            }     
        },    
          
      ])
      const ids = []
      sectionAvance.forEach(element => {
        ids.push(element._id)
      });
      const usersData = await ModelUser.find({_id:{$in:ids}})   
      sectionAvance.forEach(avance => {
        usersData.forEach(user => {
          questions.forEach(question => {               
              if(avance._id.toString() === user._id.toString() && avance._id.toString() === question._id.toString()){                        
                avance.name = user.name
                avance.lastname = user.lastname
                avance.region = user.region
                avance.n_preguntas = question.n_preguntas 
            }
          });   
        });
      });
      res.status(200).json({
          message : `Ranking de profesores por N° Modulos completados, mayor a menor de la region ${req.user.region} :`, //`Ranking de profesores por N° Modulos completados, mayor a menor de la region ${req.user.region} :`
          ranking : sectionAvance
      })

  }     
})
  
export { getTeacherRanking }