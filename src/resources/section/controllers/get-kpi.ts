import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en getKpi controlador'

/** ---total de documentos por region --- */
const docPerRegion = (Model,region,module) => Model.find(item => (item._id.region === region && item._id.module === module))|| {completed:0}
/** =====  */


/** ---- total de documentos por región y módulo--- -*/
const docsPerRegionAndModule = async (Model, param, completed, porcent) => await Model.aggregate([
  {$match : {}},
  {
    $group : {
      _id : {
        region:'$region',
        module:"$name_module"
      },
      [param]: { $sum: 1},
      [completed]: { $sum: "$completed" },
      [porcent]: { $avg: "$completed" }
    }
  },
  {
    $sort : {
      "_id.region" : 1
    }
  }
])
/** ======== */


const getKpi = (User, UserModule, UserSection, UserFile, UserTime) => catchAsync(msgErrorController,async (req, res) => {
  const { nickname, rol } = req.user
  console.log(req.user)
  /** Lista de regiones*/
  // const regions = await UserSection
  //                         .find({nickname:'docente_prueba'})
  //                         .distinct('region')
  let regions = []
  if(rol === 7){
    regions = req.user.regions
  }else{
    regions = ['amazonas','cajamarca', 'huanuco', 'pasco']
  }
  /** ================ */
  
  /** Lista de modulos */
  const modules = await UserSection
                          .find({nickname:'docente_prueba'})
                          .distinct('name_module')
  /** ================ */


  /** 
   * Card 1
   * */
  
  const userModules = await docsPerRegionAndModule(UserModule, 'modules', 'completed', 'porcent')

  const avgModulesCompleted = userModules.reduce((total, item) => total + item.completed, 0)
  
  let dmc:any = {}
  modules.map(module => {  
    dmc[module] = []
    regions.map(region => {
      dmc[module] = [...dmc[module], docPerRegion(userModules, region, module).completed]
    })
      // docPerRegion(userModules, 'amazonas',module).completed, 
      // docPerRegion(userModules, 'cajamarca',module).completed,
      // docPerRegion(userModules, 'huanuco',module).completed,
      // docPerRegion(userModules, 'pasco',module).completed
    
    return dmc
  })
  let dataModulesCompleted = dmc;

  const card1 = {
    title:'Número de módulos completados',
    average:avgModulesCompleted / regions.length,
    index:0,
    unit:'',
    data: dataModulesCompleted
  }
  /** =============================== */
  
  /** 
   * Card 2
   * */
  const test = await docsPerRegionAndModule(UserSection, 'sections', 'completed', 'porcent')

  const avgSectionsCompleted = test.reduce((total, item) => total + item.completed, 0)

  let dsc:any = {}
  modules.map(module => {  
      dsc[module] = []
      regions.map(region => {
        dsc[module] = [...dsc[module], docPerRegion(test, region, module).completed]
      })
      // docPerRegion(test, 'amazonas',module).completed, 
      //   docPerRegion(test, 'cajamarca',module).completed,
      //   docPerRegion(test, 'huanuco',module).completed,
      //   docPerRegion(test, 'pasco',module).completed
    return dsc
  })
  let dataSectionsCompleted = dsc;

  const card2 = {
    title:'Número de secciones completadas',
    average:avgSectionsCompleted / regions.length,
    index:1,
    unit:'',
    data:dataSectionsCompleted
  }
  /** =============================== */
 

  /** 
   * Card 3
   * */
  const userTimePerActivity = await UserFile.aggregate([
    {
      $match : {
        
      }
    },
    {
      $group : {
        _id : {
          region:'$region',
          module:'$name_module'
        },
        time: { $sum: '$time_in_seconds'},
        
      },
    },
    {
      $sort : {
        "_id.nickname" : 1
      },
    }
  ])
  
  const avgTimePerActivity = userTimePerActivity.reduce((total, item) => total + item.time, 0)

  let dataTimeActivity = [0,0,0,0]
  if(userTimePerActivity.length){
    let dta:any = {}
    modules.map(module => {  
      dta[module] = []
      regions.map(region => {
        dta[module] = [...dta[module], ((docPerRegion(userTimePerActivity, region, module).time || 0) / 3600).toFixed(2)]
      })
      // ((docPerRegion(userTimePerActivity, 'amazonas',module).time || 0) / 3600).toFixed(2), 
        // ((docPerRegion(userTimePerActivity, 'cajamarca',module).time || 0) / 3600).toFixed(2),
        // ((docPerRegion(userTimePerActivity, 'huanuco',module).time || 0) / 3600).toFixed(2),
        // ((docPerRegion(userTimePerActivity, 'pasco',module).time || 0) / 3600).toFixed(2)
      return dta
    })
    dataTimeActivity = dta;
  }

  const card3 = {
    title:'Tiempo promedio por actividad',
    average:((avgTimePerActivity / 3600) / regions.length).toFixed(2),
    index:2,
    unit:'hrs',
    data:dataTimeActivity
  }
  /** ============================= */

  /**
   * Card 4
   */
  // session_init: String,
  //   session_end: String,
  //   duration: String,
  //   duration_seconds: Number
  const userTimePerUser = await UserTime.aggregate([
    {
      $match : {
        
      }
    },
    {
      $group : {
        _id : {
          region:'$region'
        },
        completed:{$sum:'$time'}
      },
    },
    {
      $sort : {
        "_id.region" : 1
      },
    }
  ])
  // console.log('--------', userTimePerUser)
  const avgTimePerUser = userTimePerUser.reduce((total, item) => total + item.completed, 0)

  let dataTimeWeb = [0,0,0,0]
  if(userTimePerActivity.length){
    let dtw:any = {}
    modules.map(module => {  
      dtw[module] = []
      regions.map(region => {
        dtw[module] = [...dtw[module], ((docPerRegion(userTimePerActivity, region, module).completed || 0) / 3600).toFixed(2)]
      })
        // ((docPerRegion(userTimePerActivity, 'amazonas',module).completed || 0) / 3600).toFixed(2), 
        // ((docPerRegion(userTimePerActivity, 'cajamarca',module).completed || 0) / 3600).toFixed(2),
        // ((docPerRegion(userTimePerActivity, 'huanuco',module).completed || 0) / 3600).toFixed(2),
        // ((docPerRegion(userTimePerActivity, 'pasco',module).completed || 0) / 3600).toFixed(2)
      
      return dtw
    })
    dataTimeWeb = dtw;
  }

  const card4 = {
    title:'Tiempo promedio de profesores en la web',
    average:((avgTimePerUser  / regions.length) / 3600).toFixed(2) ,
    index:3,
    unit:'hrs',
    data:dataTimeWeb
  }
  /** ================= */

  /**
   * Card 5
   */
  const downloadsPerRegionAndModule = await UserFile.aggregate([
    {
      $match : {
        
      }
    },
    {
      $group : {
        _id : {
          region:'$region',
          module:'$name_module'
        },
        completed: { $sum: '$number_of_downloads'},
        
      },
    },
  ])
  // console.log(downloadsPerRegionAndModule)
  const avgDowloadsPerRegionAndModule = downloadsPerRegionAndModule.reduce((total, item) => total + item.completed, 0)

  let downloadsPerRegion = [0,0,0,0]
  if(userTimePerActivity.length){
    let dpr:any = {}
    modules.map(module => {  
      dpr[module] = []
      regions.map(region => {
        dpr[module] = [...dpr[module], docPerRegion(downloadsPerRegionAndModule, region, module).completed]
      })
        // docPerRegion(downloadsPerRegionAndModule, 'amazonas',module).completed, 
        // docPerRegion(downloadsPerRegionAndModule, 'cajamarca',module).completed,
        // docPerRegion(downloadsPerRegionAndModule, 'huanuco',module).completed,
        // docPerRegion(downloadsPerRegionAndModule, 'pasco',module).completed
      
      return dpr
    })
    downloadsPerRegion= dpr;
  }
  const card5 = {
    title:'Número de descargas de materiales por módulo',
    average:avgDowloadsPerRegionAndModule / regions.length ,
    index:4,
    unit:'',
    data:downloadsPerRegion
  }
  /** ================= */
  res.status(200).json({
    regions,
    modules,
    kpi:{
      cardTitle:[
        card1,
        card2,
        card3,
        card4,
        card5
      ]
    }
  })
})
  
export default getKpi

