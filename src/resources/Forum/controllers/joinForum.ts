import catchAsync from "../../../utils/catchAsync";
import { await } from "signale";

let msgErrorController = "Error en join Forum  controlador";

const joinForum = (user_model, forum_model , section_model) =>
  catchAsync(msgErrorController, async (req, res, next) => {
    const findGroup = await user_model
      .find({ "teachers": req.user._id.toString() })
      .select({
        name: 1,
        lastname: 1,
        rol: 1,
      });
    if (!findGroup) {
      res.status(500).json({
        message: "El usuario no tiene asesor,gestor o psicologo",
      });
    } else {
      let asesor,
        gestor,
        psicologo = null;
      findGroup.forEach((element) => {
        
        if (element.rol === 3) {
          asesor = element._id;
        }
        if (element.rol === 6) {
          gestor = element._id;
        }
        if (element.rol === 2) {
          psicologo = element._id;
        }
        
      });
      if (!asesor || !psicologo) {
        res.status(500).json({
          message: "El usuario no cuenta con asesor o psicologo",
        });
      } else {
        const forum = await forum_model.find({
          id_asesor: asesor,
          id_psicologo: psicologo,
          //id_section: req.body.id_section,
          id_activity : req.body.id_activity
        });
        if (forum.length === 0) {
          const newForum = new forum_model({            
            id_asesor: asesor || null,
            id_psicologo: psicologo || null,
            id_gestor: gestor || null,
            //id_section: req.body.id_section,
            id_activity : req.body.id_activity
          });
          newForum.members.push(req.user._id);
          const foro = await newForum.save();
          const section = await section_model.findById(req.body.id_section)
          section.joined = true
          await section.save()
          res.status(200).json({
            message: "Foro creado y teacher agregado",
            forum: foro,
          });
        } else {
          forum[0].members.push(req.user._id);
          await forum[0].save();
          const section = await section_model.findById(req.body.id_section)
          section.joined = true
          await section.save()
          res.status(200).json({
            message: "Foro encontrado y teacher agregado",
            forum: forum,
          });
        }
      }
    }
  });

export default joinForum;
