import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const checkIsUserPasswordCorrect = async (hashedPass: string, pass: string) => {
    return await bcrypt.compare(pass, hashedPass);
}

export const generateAccessToken = async (user: any) => {

    return jwt.sign(
        {
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
            isActive: user.isActive
        },
        "lds-secret-123875438-key",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

