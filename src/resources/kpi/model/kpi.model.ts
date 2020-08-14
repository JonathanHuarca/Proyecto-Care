import { Schema, model } from 'mongoose';

const kpiSchema = new Schema({
    id_teacher : {
        type : Schema.Types.ObjectId,
        required : true
    },
    id_module : {
        type : Schema.Types.ObjectId,
        required : true
    },
    name_module:String,
    region : {
        type : String
    },
    cod_region:Number,
    kpi_data : Number,
    type_kpi : {
        type : Number
    }

}, { timestamps: true })

export const kpiModel = model('kpis', kpiSchema)

/*
TYPE_KPI : 
0 => N° Modulos completados
1 => Número de Actividades Completadas
2 => Tiempo promedio por Actividad
3 => Tiempo promedio de profesores en la Web 
4=> Número de descargas de materiales por módulo
*/