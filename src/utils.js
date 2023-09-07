import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from "multer"; // Importo Multer

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Multer 

const storage = multer.diskStorage ({
    destination:function(req,file,cb){
        cb(null, `${__dirname}/public/images`)
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({storage,onError:function(err,next){
    console.log(err);
    next();
}});

export default  __dirname ;