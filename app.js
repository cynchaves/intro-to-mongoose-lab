const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    //console.log('Connected');

    console.log('Welcome to CRM!\n\nPlease select from the following options:\n\n1.Create Customer\n2.View All Customers\n3.Update Customer\n4.Delete Customer\n5.Quit Application\n')

    let selection = prompt('Enter option number here and press "Enter" twice: ');
    
    await prompt(selection);
    if (Number(selection) === 1) {
      await createCustomer();
      await mongoose.connection.close();
    };
    if (Number(selection) === 2) {
      await findCustomer();
      await mongoose.connection.close();
    };
    if (Number(selection) === 5) {
      await mongoose.connection.close();
    };

    await mongoose.disconnect();
    console.log('Thank you for using CRM!');
    process.exit();
};

connect();
//~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~
const createCustomer = async () => {
    let name = prompt("Please enter customer's name: ");
    let age = prompt("Please enter customer's age: ")
    await prompt(name);
    await prompt(age);
    await Customer.create({name, age});
    console.log('New Customer:\nName:',name,'\nAge:',age);
};

const findCustomer = async () => {
    const customers = await Customer.find({}).select('name age -_id');
    console.log('All Current Customers: ', customers);
  };

const deleteCustomer = async () => {
    const customers = await Customer.deleteMany({});
};

const listCustomer = async () => {
  const customers = Customer.find({}).select('name, age');
  console.log(customers);
}



