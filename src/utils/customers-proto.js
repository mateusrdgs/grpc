const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = './customers.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})

const customersProto = grpc.loadPackageDefinition(packageDefinition)

module.exports = customersProto