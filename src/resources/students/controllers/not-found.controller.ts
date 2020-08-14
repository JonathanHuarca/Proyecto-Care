const notFound = async (req, res, next) => { 
    res.status(500).json({
        message: 'Función no encontrada'
    })
}

export default notFound