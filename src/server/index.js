const grpc = require('grpc')
const { v4: uuid } = require('uuid')

const customersProto = require('../utils/customers-proto')

const server = new grpc.Server()

const customers = [
  {
      id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
      name: "John Doe",
      age: 23,
      address: "Address 1"
  },
  {
      id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
      name: "Jane Doe",
      age: 45,
      address: "Address 2"
  }
];

server.addService(customersProto.CustomerService.service, {
  getAll: (_, callback) => {
    callback(null, { customers })
  },
  get: (call, callback) => {
    const customer = customers.find(customer => customer.id === call.request.id)

    if (customer) {
      callback(null, customer)
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: 'Not found' })
    }
  },
  insert: (call, callback) => {
    const customer = call.request;
    customer.id = uuid();
    customers.push(customer);

    callback(null, customer);
  },
  update: (call, callback) => {
    const customer = customers.find(customer => customer.id === call.request.id)

    if (customer) {
      customer.name = call.request.name
      customer.age = call.request.age
      customer.address = call.request.address

      callback(null, customer)
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: 'Not found' })
    }
  },
  remove: (call, callback) => {
    const index = customers.findIndex(customer => customer.id === call.request.id)

    if (index >= 0) {
      customers.splice(index, 1)
      callback(null, {})
    } else {
      callback({ code: grpc. status.NOT_FOUND, details: 'Not found' })
    }
  }
})

server.bind('127.0.0.1:30043', grpc.ServerCredentials.createInsecure())
console.log('Server running on port 30043');
server.start()