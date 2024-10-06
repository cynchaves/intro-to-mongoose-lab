const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('\nWelcome to CRM!\n\nSelect from the following options:\n\n1.Create Customer\n2.View All Customers\n3.Update Customer\n4.Delete Customer\n5.Quit Application\n')

    let selection = prompt('Input selection # and press Enter twice: ');
    
    await prompt(selection);

    if (Number(selection) === 1) {
      await createCustomer();
    }
    else if (Number(selection) === 2) {
      await allCustomers();
    }
    else if (Number(selection) === 3) {
      await allCustomers();
      await updateCustomer();
    }
    else if (Number(selection) === 4) {
      await allCustomers();
      await deleteCustomer();
    }
    else if (Number(selection) === 5) {
      await mongoose.connection.close();
    }
    else if (Number(selection) <1 || Number(selection) > 5) {
    console.log('\n**** Only Numbers 1-5 Allowed ****\n**** Please Try Again! ****')
    await connect();
    }

    await mongoose.disconnect();
    console.log('\nThank you for using CRM!\n');
    process.exit();
};

connect();

//~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~
const createCustomer = async () => {
    let name = prompt("New customer's name: ");
    let age = prompt("New customer's age: ")
    await prompt(name);
    await prompt(age);
    await Customer.create({ name, age });
    console.log('New Customer:\nName:',name,'\nAge:',age);
};

const allCustomers = async () => {
    const customers = await Customer.find({}).select('name age');
    console.log('\nCustomer List:\n\n', customers);
  };

const updateCustomer = async () => {
  let id = prompt('Copy & paste customer ID to update: ');
  let name = prompt("Customer's new name: ");
  let age = prompt("Customer's new age: ");
  let updatedCustomer = await Customer.findByIdAndUpdate(id, { name: `${name}`, age: `${age}` }, { new: true });
  console.log('\nUpdated Customer:\n\n', updatedCustomer);
};

const deleteCustomer = async () => {
  let id = prompt('Copy & paste customer ID to delete: ');
  let deletedCustomer = await Customer.findByIdAndDelete(id);
  console.log('\nDeleted Customer:\n\n', deletedCustomer);
};