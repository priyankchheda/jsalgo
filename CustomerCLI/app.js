const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/customercli', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection;

// import models
const Customer = require('./models/customer');

function addCustomer(customer) {
  const newCustomer = new Customer(customer);
  newCustomer.save(function (err) {
    if (err) return console.err(err);
    console.log('new customer added');
    db.close();
  });
}

function findCustomer(name) {
  const search = new RegExp(name, 'i');
  Customer.find({ $or: [{ firstName: search }, { lastName: search }] })
    .then(customer => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      db.close();
    })
    .catch(err => console.error(err));
}

function updateCustomer(_id, customer) {
  Customer.updateOne({ _id }, customer)
    .then(customer => {
      console.info('customer updated');
      db.close();
    });
}

function removeCustomer(_id) {
  Customer.deleteOne({ _id })
    .then(customer => {
      console.info('customer removed');
      db.close();
    });
}

function listCustomers() {
  Customer.find().then(customers => {
    console.info(customers);
    console.info(`${customers.length} customers`);
    db.close();
  })
}

module.exports = { addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomers };