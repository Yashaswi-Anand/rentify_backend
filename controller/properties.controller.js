const prisma = require("../common/db.config");
const serverResponses = require('../common/responses')

module.exports = {
    async getProperties(req, res, next) {
        try {
            const properties = await prisma.properties.findMany();
            serverResponses.successResponse(res, "Properties Fetched Successfully", properties)
        } catch (error) {
            serverResponses.errorResponse(res, error)
        }
    },

    async addNewProperties(req, res, next) {
        try {
            console.log(req.body);
            const properties = await prisma.properties.create({
                data: {
                    state: req.body.state,
                    region: req.body.region,
                    nearby: req.body.nearby,
                    apartment: req.body.apartment,
                    no_of_bedroom: +req.body.no_of_bedroom,
                    price: req.body.price,
                    description: req.body.description,
                    seller_id: +req.body.seller_id
                }
            });
            serverResponses.successResponse(res, "Properties Added Successfully", properties)
        } catch (error) {
            serverResponses.errorResponse(res, error)
        }
    },

    async updateProperties(req, res, next) {
        try {
            const properties = await prisma.properties.update({
                where: {
                    id: +req.body.properties_id
                },
                data: {
                    state: req.body.state,
                    region: req.body.region,
                    nearby: req.body.nearby,
                    apartment: req.body.apartment,
                    no_of_bedroom: +req.body.no_of_bedroom,
                    price: req.body.price,
                    description: req.body.description,
                    seller_id: +req.body.seller_id
                }
            });
            serverResponses.successResponse(res, "Properties Updated Successfully", properties)
        } catch (error) {
            serverResponses.errorResponse(res, error)
        }
    },
}