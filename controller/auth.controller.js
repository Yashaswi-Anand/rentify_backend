const prisma = require("../common/db.config");
const serverResponses = require('../common/responses')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt_round  = 10;

module.exports = {
    async register(req, res, next) {
        try {
            let body_data = req.body;
            if (!body_data.email || !body_data.password) {
                throw Error('Please send proper data in input fields');
            }

            const user_data = await prisma.users.findFirst({
                where: {
                    email: body_data.email
                }
            })

            if (user_data) {
                throw Error('User already exists');
            }

            // const encryptedPassword = await bcrypt.hash(body_data.password, salt_round);

            const user_registed_data = await prisma.users.create({
                data: {
                    first_name : body_data.first_name,
                    last_name  : body_data.last_name,
                    email      : body_data.email,
                    phone      : body_data.phone,
                    role       : body_data.role,
                    password   : body_data.password
                }
            })

            if (!user_registed_data) {
                throw Error("Unable to Register this user");
            }

            serverResponses.successResponse(res, "User Registered Successfully", user_registed_data)
        }
        catch (error) {
            serverResponses.errorResponse(res, error.message, 'Unable to Register this user')
        }
    },

    async login(req, res, next) {
        try {
            let body_data = req.body;
            if (!body_data.email || !body_data.password) {
                throw Error('Please send proper data in input fields');
            }

            const user_data = await prisma.users.findFirst({
                where: {
                    email: body_data.email
                }
            })

            if (!user_data) {
                throw Error('User does not exists');
            }

            if (user_data.password !== user_data.password) {
                throw Error('Incorrect Password');
            }

            // const decryptedPassword = bcrypt.compareSync(body_data.password, user_data.password);
            // if (!decryptedPassword) {
            //     throw Error('Incorrect Password');
            // }

            // // generate jwt token
            // const token = jwt.sign({ user_id: user_data.id, user_email: user_data.email }, process.env.TOKEN);

            serverResponses.successResponse(res, "User Logged In Successfully", user_data)
        }
        catch (error) {
            serverResponses.errorResponse(res, error.message, 'unable to fetch scans')
        }
    }
}