import z from "zod";


export const registerUserZodSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional(),

    picture: z
        .url("Picture must be a valid URL")
        .optional(),
    isVerified: z
        .boolean()
        .optional(),
    isDeleted: z
        .boolean()
        .optional()
});

export const updateUserZodSchema = registerUserZodSchema.partial();

export const loginUserZodSchema = z.object({
    email: z
        .email({ message: "Invalid email address" })
        .optional(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters")
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, "Password must contain at least one special character")
        .optional()
})

