// validate with yup
import {object, string} from 'yup';

const registerSchema = object({
    email: string().email("email ไม่ถูกต้อง").required(),
    name: string().min(3, "ชื่อต้องมีอย่างน้อย 3 ตัวอักษร").max(50),
    password: string().min(6, "password ต้องมีอย่างน้อย 6 ตัวอักษร"),
});

const loginSchema = object({
    email: string().email("email ไม่ถูกต้อง").required(),
    password: string().min(6, "password ต้องมีอย่างน้อย 6 ตัวอักษร"),
});

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        // console.log(error);
        const errTxt = error.errors.join(', ');
        const err = new Error(errTxt);
        next(err);
        
    }
}
export { registerSchema, loginSchema, validate };