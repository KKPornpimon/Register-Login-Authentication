import prisma from "../config/prisma.js";
import createError from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        /* 
        1. check body
        2. check email in db
        3. encript password
        4. insert user into db
        5. return response
        */
       // 1. check body
       const { email, name, password } = req.body;

        //2. check email in db
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user){
            createError(400, 'Email already exists');
        }
        
        //3. encript password
        const hashPassword = bcrypt.hashSync(password, 10);

        //4. insert user into db
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashPassword
            }
        });

        //5. return response
        res.json({ message: 'Register Successfully!!' });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {   
    /*
    1. validate body
    2. check email in db
    3. check password
    4. create jwt token
    5. return response
    */ 
    // 1. validate body
    const { email, password } = req.body;

    // 2. check email in db
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (!user) {
        createError(404, 'Email or Password is Invalid!!');
    }

    // 3. check password
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
        createError(404, 'Email or Password is Invalid!!');
    }

    // 4. create jwt token
    // เอาอะไรไปใส่ใน token ก็ได้ แต่ไม่ควรใส่ password
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

   // 5. return response
    res.json({
        message: 'Login Successfully!!',
        payload: payload,
        token: token
    });
}