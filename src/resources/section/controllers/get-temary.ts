import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error in get Temary controlador'

const getTemary = (UserModule, UserSection) => catchAsync(msgErrorController,async (req, res) => {
  
    const { nickname } = req.user 
    const { name_module, component } = req.body

    /**
     * Mostrar info pdf de módulo
     */
    const { 
      info, 
      imageURL 
    } = await UserModule
                .findOne({
                  nickname,
                  component,
                  name_module
                })
                .select('info imageURL')
                .lean()
                .populate({ 
                  path: "info", 
                  model: "files" , 
                  select:'pdfURL title'
                })
    
    
    /**
     * Capturamos bloques diferentes con la function destinct()
     */

    const blocks = await UserSection
                          .find({
                            nickname, 
                            component, 
                            name_module
                          })
                          .distinct('name_block')
                          
    
  
    /** updated */
    const total = await UserSection.aggregate([
      {
        $match : {
          nickname: nickname,
          component: component,
          name_module : name_module
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
    const { porcent } = total[0] || 0
    

    /** -------------------------- */
    
    const temaryPromise = blocks.map( async(name_block) => {
      const sections = await UserSection
        .find({
          nickname, 
          name_module, 
          component, 
          name_block
        })
        .populate({
          path: "files", 
          model: "files",
          select:'-completed'
        })
        .populate({
          path: "sent", 
          model: "user_files",
          select:'-completed'
        })
        .sort({section:1})
        .select('_id name_section completed files sent joined')
        .lean()

      const data = {
        title:name_block,
        sections:sections
      }
      return data
    })
    

    const temary = await Promise.all(temaryPromise);

    res.status(200).json({
      message : `Secciones para ${name_module} - ${component}`,
      temary: temary,
      porcent:porcent * 100,
      information:info,
      imageURL: imageURL || '--'
    })

})
  
export default getTemary

/**
 * Structura de json:
 * temary:[
 * {
 *  block:1,
 *  title: 'title of module'
 *  completed: 0,
 *  sections:[
 *    {
 *      title:'title of section',
 *      completed:0,
 *      files:[]
 *    }
 *  ]
 * },
 * {
 *  block:2
 * }
 * ]
 */


 // const dataSections = async (block) => (await UserSection
    //   .find({nickname, name_module, block})
    //   .lean()
    //   .select('module name_module block name_block section name_section completed _id')
    //   .sort({'section':1}))
    // .filter((value, index, self) => {
    //   return self.map(item => item.section).indexOf(value.section) === index
    // }).map(async (item) => {
    //    const data = {
    //     section : item.section,
    //     id:item._id,
    //     completed : item.completed,
    //     title: item.name_section,
    //     activities : (await fnSections(block,item.section)).files
    //   }
    //   return data
    // })

/**
     * Busqueda de secciones por block y section
     */
    // const fnSections  = async (block, section) =>  await UserSection.findOne({component:component, name_module:name_module,block:block,section:section}).lean().select('files').populate({ path: "files", model: "files" })
    /** ------------------------------------- */


    // const modules = await Model.find({nickname, module}).select('block -_id').sort({'section':1, 'module':1})


    // data : funcion que crea un objeto con el block y actividades de contenido
    // const data = sections
    // .filter((value, index, self) => {
    //   return self.map(item => item.block).indexOf(value.block) === index
    // })
    // .map(async (item) => {
    //    const data = {
    //     block : item.block,
    //     title: item.name_block,
    //     completed : await blockCompleted(item.block),
    //     sections : await Promise.all(await dataSections(item.block))
    //   }
    //   return data
    // })






    // const sectionsCompletedPerBlock = await UserSection.aggregate([
    //   {
    //     $match : {
    //       nickname: nickname,
    //       component: component,
    //       name_module : name_module
    //     }
    //   },
    //   {
    //     $group : {
    //       _id : {
    //         nickname:'$nickname',
    //         component:'$component',
    //         module:'$name_module',
    //         block:'$name_block'
    //       },
    //       sections: { $sum: 1},
    //       sectionsCompleted: { $sum: "$completed" },
    //       porcent: { $avg: "$completed" }
    //     }
    //   },
    //   {
    //     $sort : {
    //       name_module : 1
    //     }
    //   },
    // ])

    
    
    /**
     * Bloques completados, si secciones son completadas
     */
    // const blockCompleted = async (block) => {
      // const blocks = await UserSection.find({nickname, name_module, component, block}).lean().select('completed block section')
      // const leng = blocks.length
      // const totalSectionCompleted = blocks.reduce((total, item) => total + item.completed, 0)

      //---------------------------------
      
      // console.log('-----',totalSectionCompleted2[0].totalSectionsByBlock)
      //----------------------------
      // if(leng === totalSectionCompleted){
      //   return 1
      // }
      // return 0
    // }
    /** ---------------------------------------------- */


    /**
     * Secciones por nickname, name_module y component
     */
    // const sections = await UserSection
    //   .find({
    //     nickname, 
    //     name_module, 
    //     component
    //   })
    //   .sort({'section':1})
    
    /** --------------------------------------------- */

    /**
     * Total de secciones completadas
     */
    /** deprected */
    // const totalCompleted = sections.reduce((total, item) => total + item.completed, 0 )