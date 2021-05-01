const grpc = require('grpc')

const customersProto = require('../utils/customers-proto')
const services = require('./services')

const server = new grpc.Server()

server.addService(customersProto.CustomerService.service, {
  getAll: services.getAll,
  get: services.get,
  insert: services.insert,
  update: services.update,
  remove: services.remove 
})

server.bindAsync('127.0.0.1:30043', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running on port 30043');
  server.start()
})