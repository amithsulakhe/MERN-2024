const { z } = require("zod");
const signUpSchema = z.object({
  userName: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 chars" })
    .max(225, { message: "Name must be not more than 225 chars" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email must be at least of 3 chars" })
    .max(225, { message: "Email must be not more than 225 chars" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 chars" })
    .max(20, { message: "Phone must be not more than 20 chars" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least of 7 chars" })
    .max(1024, { message: "Password must be not more than 1024 chars" }),
});

module.exports = signUpSchema;
