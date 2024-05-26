const { Prisma } = require("@prisma/client");
const prisma = require("../common/db.config");
const serverResponses = require('../common/responses');
const util = require("../common/util");

module.exports = {
    async getProperties(req, res, next) {
        try {
            console.log(req.body);
            const apartment = util.getApartmentCondition('p', req.body.apartmentType);
            const state = util.getStateCondition('p', req.body.state);
            const region = util.getRegionCondition('p', req.body.region);
            const no_of_bedroom = util.getBedRoomCondition('p', +req.body.no_of_bedroom);

            const properties = await prisma.$queryRaw`
            SELECT * FROM properties AS p
            WHERE 1=1 ${apartment} ${no_of_bedroom} ${state} ${region}
            `;

            serverResponses.successResponse(res, "Properties Fetched Successfully", properties)
        } catch (error) {
            serverResponses.errorResponse(res, error)
        }
    },

    async addNewProperties(req, res, next) {
        try {
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
                    id: +req.query.properties_id
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

    async deleteProperties(req, res, next) {
        try {
            const properties = await prisma.properties.delete({
                where: {
                    id: +req.query.properties_id
                }
            });
            serverResponses.successResponse(res, "Properties Deleted Successfully", null)
        } catch (error) {
            serverResponses.errorResponse(res, error)
        }
    }
}