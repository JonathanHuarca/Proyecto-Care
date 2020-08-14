import catchAsync from "../../../utils/catchAsync";
import pdf from "pdf-to-base64";

const errorMessage: String = "Error en pdf to base 64 controller"

const pdfs = [
    {
        title:'MODULO VIRTUAL 0_-0001',
        module:0,
        index:1001,
        section:'',
        block:1,
    },
    // {
    //     title:'MODULO VIRTUAL 0_-0002',
    //     module:0,
    //     index:1002,
    //     section:'',
    //     block:1,
    // },
    // {
    //     title:'MODULO VIRTUAL 0_-0003',
    //     module:0,
    //     index:1003,
    //     section:'',
    //     block:1,
    // },
    // {
    //     title:'MODULO VIRTUAL 0_-0004',
    //     module:0,
    //     index:1004,
    //     section:'',
    //     block:1,
    // },
    // {
    //     title:'MODULO VIRTUAL 0_-0005',
    //     module:0,
    //     index:1005,
    //     section:'',
    //     block:1,
    // },
    // {
    //     title:'MODULO VIRTUAL 0_-0006',
    //     module:0,
    //     index:1006,
    //     section:'',
    //     block:1,
    // },
    // {
    //     title:'MODULO VIRTUAL 0_-0007',
    //     module:0,
    //     index:1007,
    //     section:'',
    //     block:1,
    // }
]
const pdfToBase64 = catchAsync(errorMessage, async (req, res) => {
    const promisePdf = []
    
    pdfs.map(item => {
        promisePdf.push(pdf(`./upload/${item.title}.pdf`))
    })

    const data = await Promise.all(promisePdf)
    console.log(data)
    res.status(200).json({
        message:'pdf',
        test:'test',
        pdf64:data[0]
    })
})

export default pdfToBase64