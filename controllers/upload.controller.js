
exports.uploadCtrl = (req,res,next)=>{

    if(!req.file){
        res.status(417).json({messageError:"Tienes que mandar un archivo"})
        return;
    }
    res.status(201).json({imgUrl:req.file.path})
}

exports.uploadMultipleCtrl = (req,res,next)=>{

    if(!req.files){
        res.status(417).json({messageError:"Tienes que mandar un archivo"})
        return;
    }
    const imgUrls = req.files.map((item)=>{
        return item.path
    })
    res.status(201).json({imgUrls})
}