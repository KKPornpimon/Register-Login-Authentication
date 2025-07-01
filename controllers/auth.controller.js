import createError from "../utils/createError.js";

export const register = (req, res, next) => {
    try {
        /* 
        1. check body
        2. check email in db
        3. encript password
        4. insert user into db
        5. return response
        */

        console.log(req.body);

        res.json({ message: 'Welcome to register controller' });
    } catch (error) {
        next(error);
    }
}

export const login = (req, res) => {    
    res.json({ message: 'Welcome to login controller' });
}