const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('\nWelcome to the CRM!\n\nPlease select from the following options:\n\n1.Create Customer\n2.View All Customers\n3.Update Customer\n4.Delete Customer\n5.Quit Application\n')

    let selection = parseInt(prompt('Input selection # and press Enter: '));
    
    if (selection === 1) {
      await createCustomer();
    }
    else if (selection === 2) {
      await allCustomers();
    }
    else if (selection === 3) {
      await updateCustomer();
    }
    else if (selection === 4) {
      await deleteCustomer();
    }
    else if (selection === 5) {
      await mongoose.connection.close();
      console.log('\n***Exit Complete***');
    }
    else if (selection <1 || selection > 5) {
    console.log('\n**** Only Numbers 1-5 Allowed ****\n**** Please Try Again! ****')
    await connect();
    }

    await mongoose.disconnect();
    console.log('\nThank you for using the CRM!\nHave a great day!\n');
    process.exit();
};

connect();

//~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~
const createCustomer = async () => {
    let namePrompt = prompt("New customer's name: ");
    let agePrompt = prompt("New customer's age: ")
    await Customer.create({name: namePrompt, age: agePrompt});
    console.log(`\nNew Customer Added Successfully:\nName: ${namePrompt}\nAge: ${agePrompt}`);
};

const allCustomers = async () => {
    const customers = await Customer.find({}, 'name age -_id');
    console.log('\nCustomer List:\n', customers);
  };

const updateCustomer = async () => {
  const customers = await Customer.find({}, 'name age');
  console.log('\nCustomer List:\n', customers);
  let id = prompt('Copy & paste customer ID to update: ');
  let namePrompt = prompt("Customer's new name: ");
  let agePrompt = prompt("Customer's new age: ");
  let updatedCustomer = await Customer.findByIdAndUpdate(id, {name: namePrompt, age: agePrompt}, {new: true});
  console.log(`\nCustomer Updated Successfully:\nName: ${updatedCustomer.name}\nAge: ${updatedCustomer.age}\nID: ${updatedCustomer._id}`);
};

const deleteCustomer = async () => {
  const customers = await Customer.find({}, 'name age');
  console.log('\nCustomer List:\n', customers);
  let id = prompt('Copy & paste customer ID to delete: ');
  let deletedCustomer = await Customer.findByIdAndDelete(id);
  console.log(`\nCustomer Deleted Successfully:\nName: ${deletedCustomer.name}\nAge: ${deletedCustomer.age}\nID: ${deletedCustomer._id}`);
};