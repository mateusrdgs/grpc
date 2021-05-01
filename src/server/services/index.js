const { v4: uuid } = require('uuid')

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

const getAll = (_, callback) => {
  callback(null, { customers })
}

const get = (call, callback) => {
  const customer = customers.find(customer => customer.id === call.request.id)

  if (customer) {
    callback(null, customer)
  } else {
    callback({ code: grpc.status.NOT_FOUND, details: 'Not found' })
  }
}

const insert = (call, callback) => {
  const customer = call.request;
  customer.id = uuid();
  customers.push(customer);

  callback(null, customer);
}

const update = (call, callback) => {
  const customer = customers.find(customer => customer.id === call.request.id)

  if (customer) {
    customer.name = call.request.name
    customer.age = call.request.age
    customer.address = call.request.address

    callback(null, customer)
  } else {
    callback({ code: grpc.status.NOT_FOUND, details: 'Not found' })
  }
}

const remove = (call, callback) => {
  const index = customers.findIndex(customer => customer.id === call.request.id)

  if (index >= 0) {
    customers.splice(index, 1)
    callback(null, {})
  } else {
    callback({ code: grpc. status.NOT_FOUND, details: 'Not found' })
  }
}

module.exports = {
  getAll,
  get,
  insert,
  update,
  remove
}