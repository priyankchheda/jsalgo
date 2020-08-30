#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const { addCustomer, findCustomer, updateCustomer, removeCustomer, listCustomers } = require('./app');

const questions = [
  { type: 'input', name: 'firstName', message: 'Customer First Name' },
  { type: 'input', name: 'lastName', message: 'Customer Last Name' },
  { type: 'input', name: 'phone', message: 'Customer Phone Number' },
  { type: 'input', name: 'email', message: 'Customer Email Address' },
];

program
  .version('1.0.0')
  .description('Client Management System')

// program
//   .command('add <firstName> <lastName> <phone> <email>')
//   .alias('a')
//   .description('add a customer')
//   .action((firstName, lastName, phone, email) => {
//     addCustomer({ firstName, lastName, phone, email })
//   })

program
  .command('add')
  .alias('a')
  .description('add a customer')
  .action(() => {
    prompt(questions).then(answers => addCustomer(answers));
  })

program
  .command('find <name>')
  .alias('f')
  .description('find a customer')
  .action((name) => findCustomer(name))

program
  .command('update <_id>')
  .alias('u')
  .description('update a customer')
  .action((_id) => {
    prompt(questions).then(answers => updateCustomer(_id, answers));
  })

program
  .command('remove <_id>')
  .alias('r')
  .description('remove a customer')
  .action((_id) => removeCustomer(_id));

program
  .command('list')
  .alias('l')
  .description('list all customer')
  .action(() => listCustomers());


program.parse(process.argv);