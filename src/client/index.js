const express = require('express')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = './customers.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService
const client = new CustomerService('localhost:30043', grpc.credentials.createInsecure())

const app = express()

app.use(express.json());

const getCustomers = (_, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      res.send(data).status(200)
    }
  })
}

const createCustomer = (req, res) => {
  const { name, age, address } = req.body
  const customer = { name, age, address }

  client.insert(customer, (err, data) => {
    if (err) {
      res.send(err).status(500)
    } else {
      res.send(data).status(200)
    }
  })
}

const getCustomer = (req, res) => {
  const { id } = req.params;

  client.get({ id }, (err, data) => {
    if (err) {
      res.send(err).status(500)
    } else {
      res.send(data).status(200)
    }
  })
}

const updateCustomer = (req, res) => {
  const { id } = req.params;
  const { name, age, address } = req.body

  const customer = { id, name, age, address }

  client.update(customer, (err, data) => {
    if (err) {
      res.send(err).status(500)
    } else {
      res.send(data).status(200)
    }
  })
}

const removeCustomer = (req, res) => {
  const { id } = req.params;

  client.remove({ id }, (err, data) => {
    if (err) {
      res.send(err).status(500)
    } else {
      res.send(data).status(200)
    }
  })
}

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