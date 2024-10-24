import { prisma } from './client.js'

async function createData() {
  const newUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@admin.com',
      phone: '13260660000',
      password: '65b015adbdc94eb5f1b7bdf013679c8c:4924f0fc3dc7d400d9bb968e56e16d0a468c8bce7bae58cd0885c77ee50e6cefc8cb68fae59fafedcc44fa26b052e46f4ed9a4b4112cab481c9fe84304b7c86e',
    },
  })
  console.log(newUser)
}

createData()
