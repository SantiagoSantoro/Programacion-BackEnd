import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from "multer"; // Importo Multer
import bcryptjs from 'bcryptjs'; // Importo bcryptjs

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

export const uploader = multer({storage})

// Configuración de Bcryptjs

import bcryptjs from 'bcryptjs'; // Importa bcryptjs

// Configuración de Bcryptjs

export const createHash = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
export const isValidPassword = (userPasswordHash, password) => bcryptjs.compareSync(password, userPasswordHash);

export default  __dirname ;