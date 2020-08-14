import catchAsync from '../../../utils/catchAsync'

let msgErrorController = 'Error en last section controlador'

const userRols = {
  0:'superadmin',
  1:'admin',
  2:'psicologo',
  3:'asesor pedagógico',
  4:'docente',
  5:'directivo',
  6:'gestor',
  7:'coordinador'
}

const components = {
  'gestión':'gestion',
  'socioemocional':'socioemocional',
  'pedagógico':'pedagogico'
}

const selectRolName = (rol) => {
  return userRols[rol]
}

const reportOfLastSections = (User,UserSection,LastSection) => catchAsync(msgErrorController,async (req, res) => {
  
  /**
   *  Reporte de ultimas secciones vistas por usuario 
   * */
  const personsIDs = await LastSection
                              .find()
                              .distinct('user')

  const lastSections = await LastSection
                              .find()
                              .populate({
                                path:'user', 
                                model:'users', 
                                select:'name lastname rol'
                              })
                              .populate({
                                path:'id_section', 
                                model:'user_sections', 
                                select:'name_module component section'
                              })

// console.log(lastSections)
  let personsPromise = []
  let user = {
    name:'No existe',
    lastname:'------',
    rol:'------',
    region:'---------'
  }
  personsIDs.map( item =>{
    if(!item) user
    personsPromise.push(User.findById(item).select('name lastname rol region'))
  })

  let persons = await Promise.all(personsPromise)
  
  let reporte =   persons.map( item => {
    const {name, lastname, rol, region} = item
    let data = {
      cargo: selectRolName(rol),
      region: region,
      nombre: `${name} ${lastname}`,
      comentarios:'',
      gestion:'',
      socioemocional:'',
      pedagogico:''
    }
    lastSections.map( ls => {
      const { component, name_module, section } = ls.id_section
      let arr = name_module.split('')[2]
      if(ls.user.name === item.name && ls.user.lastname === item.lastname){
        data[components[component]] = `${name_module} - Sección ${section}`
      }
    })
    
    return data
  })
  

  // const data = temp.filter((value:any, index, self:any) => {
  //   return self.map(item => item.nombre).indexOf(value.nombre) === index})
  res.status(200).json({
    message : "reporte de ultimas secciones vistas",
    data : reporte
  })

})
  
export default reportOfLastSections