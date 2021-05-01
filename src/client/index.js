const express = require('express')
const grpc = require('grpc')

const customersProto = require('../utils/customers-proto')
const controllers = require('./controllers')

const CustomerService = customersProto.CustomerService
const client = new CustomerService('localhost:30043', grpc.credentials.createInsecure())

const {
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  removeCustomer
} = controllers(client)

const app = express()

app.use(express.json());

app.route('/api/customers')
  .get(getCustomers)
  .post(createCustomer)

app.route('/api/customers/:id')
  .get(getCustomer)
  .put(updateCustomer)
  .delete(removeCustomer)

app.listen(3000, () => {
  console.log('listening on port 3000');
});