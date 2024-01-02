import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from "multer"; // Importo Multer
import bcryptjs from 'bcryptjs'; // Importo Bcryptjs


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// Configuración de Multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadFolder = 'public'; // Carpeta predeterminada

        // Determinar la carpeta de destino según el tipo de archivo
        if (req.body.type === 'profile') {
            uploadFolder = join(__dirname, 'public', 'profiles');
        } else if (req.body.type === 'product') {
            uploadFolder = join(__dirname, 'public', 'products');
        } else if (req.body.type === 'document') {
            uploadFolder = join(__dirname, 'public', 'documents');
        }

        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploader = multer({storage})


// Configuración de Bcryptjs

export const createHash = (password) => bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
export const isValidPassword = (userPasswordHash, password) => bcryptjs.compareSync(password, userPasswordHash);



export default  __dirname ;



