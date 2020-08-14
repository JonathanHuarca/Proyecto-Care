import catchAsync from '../../../utils/catchAsync'
import XLSX from 'xlsx'
let msgErrorController = 'Error en add user controlador'


const addUser_excel = Model => catchAsync(msgErrorController, async (req, res,next) => {
    const {rol} = req.body    
    if(req.files){
        if(rol === '45'){
            const wb = XLSX.read(req.files.file.data)
            const pages = wb.SheetNames
            let array = []
            const ws = wb.Sheets[pages[1]]
            const pageJson = XLSX.utils.sheet_to_json(ws)
            console.log("pagina_excel",pageJson );
            array = pageJson
            const usersFinal = []
            let cond1 = false
            let infoError2 = null
            array.forEach(async (userInfo2) => {  //VERIFICAR SI EL EXCEL TIENE LOS CAMPOS NECESARIOS     
                console.log(userInfo2.NICKNAME , userInfo2["CONTRASEÑA"] , userInfo2.CARGO);
                if(cond1===false){
                    console.log("loop");      
                    if(!userInfo2.NICKNAME || !userInfo2["CONTRASEÑA"] || !userInfo2.CARGO){
                        console.log("undefined");
                        cond1 = true
                        infoError2 = userInfo2['N°']
                        /*res.status(400).json({
                            message: `need nickname, password and rol at line : ${userInfo2['N°']}`
                        })*/
                    }
                }           
            });
            let cond3 = false
            if(cond1){ //SI NO TIENE DEVOLVER ERROR
                res.status(400).json({
                    message: `need nickname, password and rol at line : ${infoError2}`
                })
                //cond1=true
                cond3=true
            }
            //let cond2 = new Boolean(false);
            
            let infoError = null
            
            let cond2 = false   
            if(cond1===false){  //SI NO HAY ERROR, VERIFICAR SI EXISTEN USUARIOS REPETIDOS
                await Promise.all(array.map(async (userInfo) => {
                    if(cond2 === false){                
                            const existUser = await Model.findOne({nickname: userInfo.NICKNAME});
                            if(existUser){
                                cond2 = true
                                infoError = userInfo['N°']
                                cond3 = true
                                /*res.status(500).json({
                                    message : `nickname ya existe en linea : ${userInfo['N°']}`
                                })*/
                            }
                                    
                    }
                })) 
            }
            if(cond2){ //SI HAY REPETIDOS DEVOLVER ERROR
                res.status(500).json({
                    message : `nickname ya existe en linea : ${infoError}`
                })
                cond3=true
            }

            if(cond3===false){ //FINALMENTE CREAR LOS USUARIOS Y GUARDARLOS
                await Promise.all(array.map(async (userInfo) => {
                    let rol_code = null;
                    if (userInfo.CARGO === "Docente") {
                    rol_code = 4;
                    }
                    if (userInfo.CARGO === "Directivo") {
                    rol_code = 5;
                    }
                    const user = new Model({
                        name: userInfo.NOMBRES,
                        lastname: userInfo.APELLIDOS,
                        nickname: userInfo.NICKNAME,
                        password: userInfo["CONTRASEÑA"],
                        region: userInfo.REGION,
                        gender: userInfo.GENERO,
                        modular_code: userInfo["CÓDIGO MODULAR"],
                        iiee: userInfo["II.EE"],
                        features_iiee: userInfo["CARACTERÍSTICA DE LA II.EE"],
                        distrit: userInfo.DISTRITO,
                        populated_center: userInfo["CENTRO POBLADO"],
                        rol: rol_code,
                        email: userInfo["CORREO ELECTRÓNICO"],
                        phone: userInfo.CELULAR,
                        pssd : userInfo['CONTRASEÑA'],
                        created_by: req.user._id,
                    });
                    await user.save()
                    usersFinal.push(user);
                }))
                res.status(200).json({
                    message : "users created",
                    users : usersFinal
                })

            }
        }
        if(rol === '236'){
            const wb = XLSX.read(req.files.file.data)
            const pages = wb.SheetNames
            console.log(pages);
            let array = []
            const ws = wb.Sheets[pages[0]]
            const pageJson = XLSX.utils.sheet_to_json(ws)
            console.log("pagina_excel",pageJson );
            array = pageJson
            const usersFinal = []
            let cond1 = false
            let infoError2 = null
            array.forEach(async (userInfo2) => {  //VERIFICAR SI EL EXCEL TIENE LOS CAMPOS NECESARIOS     
                console.log(userInfo2.NICKNAME , userInfo2["CONTRASEÑA"] , userInfo2.CARGO);
                if(cond1===false){
                    console.log("loop");      
                    if(!userInfo2.NICKNAME || !userInfo2["CONTRASEÑA"] || !userInfo2.CARGO){
                        console.log("undefined");
                        cond1 = true
                        infoError2 = userInfo2['N°']
                        /*res.status(400).json({
                            message: `need nickname, password and rol at line : ${userInfo2['N°']}`
                        })*/
                    }
                }           
            });
            let cond3 = false
            if(cond1){ //SI NO TIENE DEVOLVER ERROR
                res.status(400).json({
                    message: `need nickname, password and rol at line : ${infoError2}`
                })
                //cond1=true
                cond3=true
            }
            //let cond2 = new Boolean(false);
            
            let infoError = null
            
            let cond2 = false   
            if(cond1===false){  //SI NO HAY ERROR, VERIFICAR SI EXISTEN USUARIOS REPETIDOS
                await Promise.all(array.map(async (userInfo) => {
                    if(cond2 === false){                
                            const existUser = await Model.findOne({nickname: userInfo.NICKNAME});
                            if(existUser){
                                cond2 = true
                                infoError = userInfo['N°']
                                cond3 = true
                                /*res.status(500).json({
                                    message : `nickname ya existe en linea : ${userInfo['N°']}`
                                })*/
                            }
                                    
                    }
                })) 
            }
            if(cond2){ //SI HAY REPETIDOS DEVOLVER ERROR
                res.status(500).json({
                    message : `nickname ya existe en linea : ${infoError}`
                })
                cond3=true
            }

            if(cond3===false){ //FINALMENTE CREAR LOS USUARIOS Y GUARDARLOS
                await Promise.all(array.map(async (userInfo) => {
                    let rol_code = null;
                    if (userInfo.CARGO === "Gestor") {
                        rol_code = 6;
                    }
                    if (userInfo.CARGO === "Psicologo") {
                        rol_code = 2;
                    }
                    if (userInfo.CARGO === "Asesor") {
                        rol_code = 3;
                    }
                    const user = new Model({
                        name: userInfo.NOMBRES,
                        lastname: userInfo.APELLIDOS,
                        nickname: userInfo.NICKNAME,
                        password: userInfo["CONTRASEÑA"],
                        region: userInfo.REGION,
                        gender: userInfo.GENERO,
                        rol: rol_code,
                        email: userInfo["CORREO ELECTRÓNICO"],
                        phone: userInfo.CELULAR,
                        pssd : userInfo['CONTRASEÑA'],
                        created_by: req.user._id,
                    });
                    await user.save()
                    usersFinal.push(user);
                }))
                res.status(200).json({
                    message : "users created",
                    users : usersFinal
                })

            }
        }
        if(rol === '7'){
            const wb = XLSX.read(req.files.file.data)
            const pages = wb.SheetNames
            console.log(pages);
            let array = []
            const ws = wb.Sheets[pages[0]]
            const pageJson = XLSX.utils.sheet_to_json(ws)
            console.log("pagina_excel",pageJson );
            array = pageJson
            const usersFinal = []
            let cond1 = false
            let infoError2 = null
            array.forEach(async (userInfo2) => {  //VERIFICAR SI EL EXCEL TIENE LOS CAMPOS NECESARIOS     
                console.log(userInfo2.NICKNAME , userInfo2["CONTRASEÑA"] , userInfo2.CARGO);
                if(cond1===false){
                    console.log("loop");      
                    if(!userInfo2.NICKNAME || !userInfo2["CONTRASEÑA"] || !userInfo2.CARGO){
                        console.log("undefined");
                        cond1 = true
                        infoError2 = userInfo2['N°']
                        /*res.status(400).json({
                            message: `need nickname, password and rol at line : ${userInfo2['N°']}`
                        })*/
                    }
                }           
            });
            let cond3 = false
            if(cond1){ //SI NO TIENE DEVOLVER ERROR
                res.status(400).json({
                    message: `need nickname, password and rol at line : ${infoError2}`
                })
                //cond1=true
                cond3=true
            }
            //let cond2 = new Boolean(false);
            
            let infoError = null
            
            let cond2 = false   
            if(cond1===false){  //SI NO HAY ERROR, VERIFICAR SI EXISTEN USUARIOS REPETIDOS
                await Promise.all(array.map(async (userInfo) => {
                    if(cond2 === false){                
                            const existUser = await Model.findOne({nickname: userInfo.NICKNAME});
                            if(existUser){
                                cond2 = true
                                infoError = userInfo['N°']
                                cond3 = true
                                /*res.status(500).json({
                                    message : `nickname ya existe en linea : ${userInfo['N°']}`
                                })*/
                            }
                                    
                    }
                })) 
            }
            if(cond2){ //SI HAY REPETIDOS DEVOLVER ERROR
                res.status(500).json({
                    message : `nickname ya existe en linea : ${infoError}`
                })
                cond3=true
            }

            if(cond3===false){ //FINALMENTE CREAR LOS USUARIOS Y GUARDARLOS
                await Promise.all(array.map(async (userInfo) => {
                    let rol_code = null;
                    if (userInfo.CARGO === "Coordinador") {
                        rol_code = 7;
                    }
                    const regions = userInfo['REGIÓN'].split("-")
                    console.log(regions);             
                    const user = new Model({
                        name: userInfo.NOMBRES,
                        lastname: userInfo.APELLIDOS,
                        nickname: userInfo.NICKNAME,
                        password: userInfo["CONTRASEÑA"],
                        regions: regions,
                        gender: userInfo.GENERO,
                        rol: rol_code,
                        email: userInfo["CORREO ELECTRÓNICO"],
                        pssd : userInfo['CONTRASEÑA'],
                        phone: userInfo.CELULAR,
                        created_by: req.user._id,
                    });
                    await user.save()
                    usersFinal.push(user);
                }))
                res.status(200).json({
                    message : "users created",
                    users : usersFinal
                })

            }
        }
    }else{
        res.status(500).json({
            message : "archivo no encontrado"
        })
    }
    


    

    // array.forEach(async (userInfo, index) => {
    //   let stopForeach = false;
    //   console.log(stopForeach);
    //   if (!stopForeach) {
    //     // console.log(userInfo);
    //     // console.log(index);
    //     // console.log(stopForeach);
    //     if (!userInfo.NICKNAME || !userInfo["CONTRASEÑA"] || !userInfo.CARGO) {
    //       /*res.status(400).json({
    //             message: `need nickname, password and rol at line : ${userInfo['N°']}`
    //         })
    //         next()*/
    //       stopForeach = true;
    //     } else {
    //       const existUser = await Model.findOne({nickname: userInfo.NICKNAME});
    //       console.log(existUser);
    //       if (!existUser) {
    //         let rol_code = null;
    //         if (userInfo.CARGO === "Docente") {
    //           rol_code = 4;
    //         }
    //         if (userInfo.CARGO === "Directivo") {
    //           rol_code = 5;
    //         }
    //         const user = new Model({
    //           name: userInfo.NOMBRES,
    //           lastname: userInfo.APELLIDOS,
    //           nickname: userInfo.NICKNAME,
    //           password: userInfo["CONTRASEÑA"],
    //           region: userInfo.REGION,
    //           gender: userInfo.GENERO,
    //           modular_code: userInfo["CÓDIGO MODULAR"],
    //           iiee: userInfo["II.EE"],
    //           features_iiee: userInfo["CARACTERÍSTICA DE LA II.EE"],
    //           distrit: userInfo.DISTRITO,
    //           populated_center: userInfo["CENTRO POBLADO"],
    //           rol: rol_code,
    //           email: userInfo["CORREO ELECTRÓNICO"],
    //           phone: userInfo.CELULAR,
    //           created_by: req.user._id,
    //         });
    //         console.log("xd1");
    //         //const user = await Model.create(userInfo)
    //         await user.save();
    //         console.log("xd2");
    //         console.log(user);
    //         usersFinal.push(user);
    //       } else {
    //         //   res.status(400).json({
    //         //     message: `Nickname already exists at line : ${userInfo['N°']}`
    //         //   });
    //         //   next()
    //         console.log("existe");
    //         stopForeach = true;
    //         console.log(stopForeach);
    //       }
    //     }
    //   }
    // });
    /*res.status(201).json({
        message: "users created",
        users : usersFinal
    })*/

    /*const {
        nickname,
        password,
        rol
    } = req.body

    if ((!nickname || !password || !rol)) {
        return res.status(400).send({
            message: 'need nickname, password and rol'
        })
    }
    const existUser = await Model.findOne({ nickname: nickname })
    if (!existUser) {
        if (req.user.rol > 0) {        //cambiar por el rol del que hace la operacion
            req.body.created_by = req.user._id
            await Model.create(req.body)
            res.status(201).json({
                message: "user created"
            })
        } else {
            res.status(401).json({
                message: "Admin cannot add super Admins"
            })
        }
    } else {
        res.status(400).json({
            message: "Nickname already exists"
        })
    }*/
})

export { addUser_excel }