import catchAsync from "../../../utils/catchAsync";

const errorMessage: String = "Error en controlado get Ranking Question"

const getRankingQuestion = (model_question,model_user) => catchAsync(errorMessage, async (req, res) => {
    console.log(req.user);
    const {rol} = req.user
    if(rol === 7){ //cordinador
        const regions_user = req.user.regions      

        /*if(region_user == 'huanuco' || region_user == 'pasco'){       
            region_code = 0
            region_message = 'huanuco y pasco'
        }
        if(region_user == 'amazonas' || region_user == 'cajamarca'){
            region_code = 1
            region_message = 'amazonas y cajamarca'
        }*/
        const questionsTotal = await model_question.aggregate([
            {
                $match : {region:{$in:regions_user}}
            },
            {
                $group : {
                    _id : '$askedBy',
                    n_preguntas: { "$sum": 1 },
                    answer : {$push:'$answer'}  
                    
                }
            },
            {            
                    $sort : { //ordenar los kpi  
                        n_preguntas : -1 //mayor a menor                
                    }   
            }
        ])
        const IDs = []
        questionsTotal.forEach(element => {
            IDs.push(element._id)
            element.n_respuestas = element.answer.length
            delete element.answer
        });
        const usersData = await model_user.find({_id:{$in:IDs}}).select({name:1,lastname:1,rol:1,region :1})
    
        questionsTotal.forEach(question => {
            usersData.forEach(user => {
                if(question._id.toString()===user._id.toString()){
                    question.name = user.name
                    question.lastname = user.lastname
                    question.user_region = user.region
                    if(user.rol === 4){
                        question.rol_user = 'Docente'
                    }
                    if(user.rol === 5){
                        question.rol_user = 'Directivo'
                    }
                }
            });
        });
        res.status(200).json({
            message : `ranking de preguntas de las regiones ${regions_user} :`,
            questions : questionsTotal
        })

    }else{ //admin o superadmin
        const questionsTotal = await model_question.aggregate([
            {
                $group : {
                    _id : '$askedBy',
                    n_preguntas: { "$sum": 1 },
                    answer : {$push:'$answer'}  
                    
                }
            },
            {            
                    $sort : { //ordenar los kpi  
                        n_preguntas : -1 //mayor a menor                
                    }   
            }
        ])
        const IDs = []
        questionsTotal.forEach(element => {
            IDs.push(element._id)
            element.n_respuestas = element.answer.length
            delete element.answer
        });
        const usersData = await model_user.find({_id:{$in:IDs}}).select({name:1,lastname:1,rol :1,region:1})
    
        questionsTotal.forEach(question => {
            usersData.forEach(user => {
                if(question._id.toString()===user._id.toString()){
                    question.name = user.name
                    question.lastname = user.lastname
                    question.user_region = user.region
                    if(user.rol === 4){
                        question.rol_user = 'Docente'
                    }
                    if(user.rol === 5){
                        question.rol_user = 'Directivo'
                    }
                }
            });
        });
        res.status(200).json({
            message : "ranking general de preguntas",
            questions: questionsTotal
        })
    }
    

})

export default getRankingQuestion