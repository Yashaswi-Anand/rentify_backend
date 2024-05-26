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

    getApartmentCondition (table_reference, apartment) {
        return apartment 
            ? Prisma.sql`AND ${Prisma.raw(`${table_reference}.apartment`)}::text = ${apartment}::text` 
            : Prisma.empty;
    },

    getStateCondition (table_reference, state) {
        return state 
            ? Prisma.sql`AND ${Prisma.raw(`${table_reference}.state`)}::text = ${state}::text` 
            : Prisma.empty;
    },
    
    getRegionCondition (table_reference, region) {
        return region 
            ? Prisma.sql`AND ${Prisma.raw(`${table_reference}.region`)}::text = ${region}::text` 
            : Prisma.empty;
    },
    
    getBedRoomCondition  (table_reference, bedroom) {
        return bedroom 
            ? Prisma.sql`AND ${Prisma.raw(`${table_reference}.no_of_bedroom`)}::int = ${bedroom}::int` 
            : Prisma.empty;
    }
}