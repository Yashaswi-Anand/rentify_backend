const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    if (params.model == 'users') {
      if (params.action == 'delete') {
        params.action = 'update'
        params.args['data'] = { deleted: true }
      }
    }
    return next(params)
})

module.exports = prisma;