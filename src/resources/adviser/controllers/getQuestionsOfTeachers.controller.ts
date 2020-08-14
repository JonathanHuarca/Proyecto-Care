import catchAsync from "../../../utils/catchAsync";

const errorMessage: String = "Error en get questions of teachers controller";

const getQuestionsOfTeacher = ( ModelT, ModelQ ) => catchAsync( errorMessage, async ( req, res ) => {
    const cargos = [
      "Superadmin",
      "Admin",
      "Psicólogo",
      "Asesor pedagógico",
      "Docente",
      "Docente Directivo",
      "Gestor",
      "Coordinador",
    ];
  
    // const id_manager = req.body.id_manager;
    const id_manager = req.user._id;
    let all_questions = [];
    
    let teachers = await ModelT.findById(id_manager);
    if ( teachers ) {
      // Búsqueda del profesor
      if (teachers.teachers.length !== 0) {
        teachers.teachers.forEach(async (teacher) => {

          let dataTeacher = {
            id_teacher: null,
            name: null,
            lastname: null,
            position: null,
            numberOfQuestionsAnswered: 0,
            questions: [],
          };

          let teacher_data = await ModelT.findById(teacher);
          if(teacher_data){
            let questions = await ModelQ.find({ askedBy: teacher_data._id }).select(
              "question module block section files rol answer createdAt region"
            );
            const region_user = req.user.regions
            // Búsqueda de preguntas
            questions.forEach(question => {
              if (teachers.rol === question.rol && question.region === region_user.find(element => question.region === element )) {
                dataTeacher.questions.push(question);
                if (!question.answeredBy) {
                  dataTeacher.numberOfQuestionsAnswered++;
                }
              }
            });
  
            dataTeacher.id_teacher = teacher_data.id
            dataTeacher.position = cargos[ teacher_data.rol ] || null;
            dataTeacher.name = teacher_data.name || null;
            dataTeacher.lastname = teacher_data.lastname || null;
            all_questions.push(dataTeacher);
          }
          

          // Condición para que retorne la data
          if (all_questions.length === teachers.teachers.length) {
            return res.status(200).json({
              message: "question of teachers founded",
              teachers_questions: all_questions.sort(function (a, b) {
                return b.numberOfQuestionsAnswered - a.numberOfQuestionsAnswered;
              }),
            });
          }

        });
      } else { 
        res.status(500).json({
          message: "El usuario no tiene profesores a su cargo"
        })
      }
    } else {
      res.status( 500 ).json( {
        message: "No se encontró al usuario",
      } );
    }
  } );

export default getQuestionsOfTeacher;
