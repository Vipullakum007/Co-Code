const z = require('zod');
const { login, register } = require('../controllers/auth-controller');

const sighupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name should be at least 3 characters long" })
        .max(255, { message: "Name should be at most 255 characters long" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .min(6, { message: "Email should be at least 6 characters long" })
        .max(255, { message: "Email should be at most 255 characters long" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password should be at least 8 characters long" })
        .max(255, { message: "Password should be at most 255 characters long" })

});

const loginSchema = z.object({
    email: z
        .string({ required_error: "Name is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "email must be atleast 3 chars." })
        .max(255, { message: "email must not be more than 255 chars" }),

    password: z
        .string({ required_error: "password is required" })
        .min(7, { message: "password must be atleast 7 chars." })
        .max(1024, { message: "password must not be more than 1024 chars" }),
});

module.exports = { sighupSchema, loginSchema }