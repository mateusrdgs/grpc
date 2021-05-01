const controllers = client => {
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

  return {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    removeCustomer
  }
}

module.exports = controllers