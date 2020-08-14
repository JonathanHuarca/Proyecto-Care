import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get modules controlador'

const getModules = (Module, UserModule, UserSection) => catchAsync(msgErrorController,async (req, res) => {

    const { nickname, rol } = req.user
    
    const total = await UserSection.aggregate([
      {
        $match : {
          nickname: nickname
        }
      },
      {
        $group : {
          _id : {
            nickname:'$nickname',
            module:'$name_module'
          },
          sections: { $sum: 1},
          sectionsCompleted: { $sum: "$completed" },
          porcent: { $avg: "$completed" }
        }
      },
      {
        $sort : {
          name_module : 1
        }
      },
    ])



    await Promise.all(total.map( async (module) => {
      if(module.porcent === 1){
        const userModule = await UserModule.findOne({
          nickname, 
          name_module:module._id.module
        })

        userModule.completed = 1
        userModule.save()
      }
    }))

    const modules = await Module.find({"createdBy.rol":1 })
    .populate({ 
      path: "info", 
      model: "files" , 
      select:'pdfURL title'
    })
    .lean()
  

    const totalModules = await UserSection.aggregate([
      {
        $match : {
          nickname: nickname
        }
      },
      {
        $group : {
          _id : {
            nickname:'$nickname',
            component:'$component',
            module:'$name_module'
          },
          sections: { $sum: 1},
          sectionsCompleted: { $sum: "$completed" },
          porcent: { $avg: "$completed" }
        }
      },
      {
        $sort : {
          name_module : 1
        }
      },
    ])
    // console.log('lala', totalModules)
    const userModules2 = totalModules.map( item => {
      let obj = {
        nickname:item._id.nickname,
        component:item._id.component,
        name_module:item._id.module,
        porcent: item.porcent * 100
      }
      return obj
    })
    // const { porcent } = total[0] || 0
    const userModules = await UserModule.find({nickname})
    .populate({ 
      path: "info", 
      model: "files" , 
      select:'pdfURL title'
    }).lean()

    switch(rol){
      case 1:
        
        return res.status(200).json({
          message:`Modulos disponibles para el usuario ${nickname}`,
          modules:modules
        })
        
      case 2:
        
        let modulesPerEmotional = modules.filter(module => (module.component === 'socioemocional' && module.publish === true))
        return res.status(200).json({
          message:`Modulos disponibles para el usuario ${nickname}`,
          rol:4,
          modules: modulesPerEmotional,
          userModules: userModules2
        })
      case 3:
      
        let modulesPerPedagogical = modules.filter(module => (module.component === 'pedagógico' && module.publish === true))
        return res.status(200).json({
          message:`Modulos disponibles para el usuario ${nickname}`,
          rol:4,
          modules: modulesPerPedagogical,
          userModules: userModules2
        })
      case 6:
    
        let modulesPerManagement = modules.filter(module => (module.component === 'gestión' && module.publish === true))
        return res.status(200).json({
          message:`Modulos disponibles para el usuario ${nickname}`,
          rol:4,
          modules:  modulesPerManagement,
          userModules: userModules2
        })
      case 4:
      
        let selectModules = modules.filter(module => (module.component !== 'gestión' && module.publish === true))
        return res.status(200).json({
          message:`Modulos disponibles para el usuario ${nickname}`,
          rol:4,
          modules: selectModules,
          userModules: userModules2
        })
        
      default:
        const modules2 = await Module.find({"createdBy.rol":1 , publish:true})
        .populate({ 
          path: "info", 
          model: "files" , 
          select:'pdfURL title'
        })
        .lean()
        return res.status(200).json({
          message:`Modulos disponibles para el usuario ${nickname}`,
          default:true,
          modules: modules2,
          userModules: userModules2
        })
        
    }
})
  
export default getModules