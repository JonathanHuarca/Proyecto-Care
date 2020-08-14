import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en get Kpi data controlador'

const getKpiData = (Model) => catchAsync(msgErrorController,async (req, res,next) => {
    const amazonas = await Model.find({region:'amazonas', type_kpi:'0'})
    const cajamarca = await Model.find({region:'cajamarca', type_kpi:'0'})
    const huanuco = await Model.find({region:'huanuco', type_kpi:'0'})
    const pasco = await Model.find({region:'pasco', type_kpi:'0'})

    

    if(req.user.rol === 1||req.user.rol === 0){ //admin o super admin ven los datos generales

        const dataAmazonas = amazonas.reduce( (total, item)  => total + item.kpi_data, 0)
        const dataCajamarca = cajamarca.reduce( (total, item)  => total + item.kpi_data, 0)
        const dataHuanuco = huanuco.reduce( (total, item)  => total + item.kpi_data, 0)
        const dataPasco = pasco.reduce( (total, item)  => total + item.kpi_data, 0)

        const kpis = await Model.aggregate([
        {
            $group : {
                _id : "$type_kpi",
                total: { $sum: "$kpi_data" },
                promedio: { $avg: "$kpi_data" }
            }
        },
        {
            $sort : {
                _id : 1
            }     
        },  
      ])
      
      kpis.forEach(element => {
          switch (element._id) {
                case 0:
                    delete element._id
                    element.promedio = parseInt(element.promedio) 
                    element.metrica = 'N° Modulos completados'
                    break;
                case 1:
                    delete element._id
                    element.promedio = parseInt(element.promedio) 
                    element.metrica = 'Número de Actividades Completadas'
                    break;
                case 2:
                    delete element._id
                    element.promedio = parseInt(element.promedio) 
                    element.metrica = 'Tiempo promedio por Actividad'
                    break;
                case 3:
                    delete element._id
                    element.promedio = parseInt(element.promedio) 
                    element.metrica = 'Tiempo promedio de profesores en la Web'
                    break;
                case 4:
                    delete element._id
                    element.promedio = parseInt(element.promedio) 
                    element.metrica = 'Número de descargas de materiales por módulo'
                    break;          
              default:
                  break;
          }
      });
      res.status(200).json({
          message : "promedio general de todos los kpis",
          kpiData : {
            kpis:kpis,
            datasets:[
                {
                    region:'amazonas',
                    data:[dataAmazonas]
                },
                {
                    region:'cajamarca',
                    data:[dataCajamarca]
                },
                {
                    region:'huanuco',
                    data:[dataHuanuco]
                },
                {
                    region:'pasco',
                    data:[dataPasco]
                }
            ]
        }
      })
    }
    if(req.user.rol === 7){ // el coordinador ve los datos de su region a cargo
        let region_code = null
        let dataAmazonas = 0
        let dataCajamarca = 0
        let dataHuanuco = 0
        let dataPasco = 0

        if(req.user.region === 'amazonas' || req.user.region === 'cajamarca'){
            dataAmazonas = amazonas.reduce( (total, item)  => total + item.kpi_data, 0)
            dataCajamarca = cajamarca.reduce( (total, item)  => total + item.kpi_data, 0)
            
            region_code = 0
        }
        if(req.user.region === 'huanuco' || req.user.region === 'pasco'){
            dataHuanuco = huanuco.reduce( (total, item)  => total + item.kpi_data, 0)
            dataPasco = pasco.reduce( (total, item)  => total + item.kpi_data, 0)

            region_code = 1
        }
        const kpis = await Model.aggregate([
            {
                $match : {
                    cod_region : region_code
                }
            },
            {
                $group : {
                    _id : "$type_kpi",               
                    total: { $sum: "$kpi_data" },
                    promedio: { $avg: "$kpi_data" }               
                }
            },
            {
                $sort : {
                    _id : 1              
                }     
            },  
        ])
        
        kpis.forEach(element => {
            switch (element._id) {
                  case 0:
                      delete element._id
                      element.promedio = parseInt(element.promedio) 
                      element.metrica = 'N° Modulos completados'
                      break;
                  case 1:
                      delete element._id
                      element.promedio = parseInt(element.promedio) 
                      element.metrica = 'Número de Actividades Completadas'
                      break;
                  case 2:
                      delete element._id
                      element.promedio = parseInt(element.promedio) 
                      element.metrica = 'Tiempo promedio por Actividad'
                      break;
                  case 3:
                      delete element._id
                      element.promedio = parseInt(element.promedio) 
                      element.metrica = 'Tiempo promedio de profesores en la Web'
                      break;
                  case 4:
                      delete element._id
                      element.promedio = parseInt(element.promedio) 
                      element.metrica = 'Número de descargas de materiales por módulo'
                      break;          
                default:
                    break;
            }
        });

        

        res.status(200).json({
            message : `Promedio de todos los kpis de la region ${req.user.region} :`,
            kpiData : {
                kpis:kpis,
                datasets:[
                    {
                        module:'module01',
                        data:[dataAmazonas, dataCajamarca, dataHuanuco, dataPasco]
                    },
                    {
                        module:'module02',
                        data:[dataAmazonas, dataCajamarca, dataHuanuco, dataPasco]
                    },
                    {
                        module:'module03',
                        data:[dataAmazonas, dataCajamarca, dataHuanuco, dataPasco]
                    },
                    {
                        module:'module04',
                        data:[dataAmazonas, dataCajamarca, dataHuanuco, dataPasco]
                    }
                ]
            }
        })
    }
  })
  
  export { getKpiData }