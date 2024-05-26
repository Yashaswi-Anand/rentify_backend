const { Prisma } = require("@prisma/client");
const prisma = require("./db.config");
const jwt = require('jsonwebtoken');

module.exports = {
    async getUserDetails(user_email) {
        const user_data = await prisma.user.findFirst({
            where: {
                email: user_email
            }
        })
        if (!user_data) {
            throw Error("User detail not found...")
        }
        return user_data
    },
}