import Product from "./models/productModel.js";
import AdditionalFeeSettings from "./models/finantiar/addinitionalFeeSettings.js";
import User from "./models/userModel.js";
import CustomerCompany from "./models/finantiar/customerCompany.js";
import Customer from "./models/admin/customer.js";
import Employes from "./models/admin/employes.js";
import Ledger from "./models/finantiar/customerAccountSettlement/ledger.js";
import Transaction from "./models/finantiar/customerAccountSettlement/transaction.js";
import CancelingTicket from "./models/finantiar/cancelingTicket.js";
import CategoryType from "./models/finantiar/categoryType.js";
import ForeignCompany from "./models/finantiar/foreignCompany.js";

import foreignCompanys from "./data/financiar/foreignCompany.js";
import categoryTypes from "./data/financiar/categoryType.js";
import cancelingTickets from "./data/financiar/cancelingTicket.js";
import transactions from "./data/financiar/customerAccountSettlement/transaction.js";
import ledgers from "./data/financiar/customerAccountSettlement/ledger.js";
import customers from "./data/admin/customer.js";
import employes from "./data/admin/employes.js";
import users from "./data/users.js";
import products from "./data/products.js";
import additionalFeeSettings from "./data/financiar/addinitionalFeeSettings.js";
import customerCompany from "./data/financiar/customerCompany.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

async function importData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await AdditionalFeeSettings.deleteMany();
    await CustomerCompany.deleteMany();
    await Customer.deleteMany();
    await Employes.deleteMany();
    await Ledger.deleteMany();
    await Transaction.deleteMany();
    await CancelingTicket.deleteMany();
    await CategoryType.deleteMany();
    await ForeignCompany.deleteMany();

    const insertedUsers = await User.insertMany(users);
    const adminUser = insertedUsers.find((user) => user.role_name === "admin").id;
    const financiarUser = insertedUsers.find((user) => user.role_name === "financiar").id;

    const sampleProducts = products.map((product) => ({ ...product, user: adminUser }));
    const sampleAdditionalFeeSettings = additionalFeeSettings.map((feeSetting) => ({ ...feeSetting, user: financiarUser }));
    const sampleCustomerCompany = customerCompany.map((company) => ({ ...company, user: financiarUser }));
    const sampleCustomers = customers.map((customer) => ({ ...customer, user: adminUser }));
    const sampleEmployes = employes.map((employe) => ({ ...employe, user: adminUser }));
    const sampleLedgers = ledgers.map((ledger) => ({ ...ledger, user: financiarUser }));
    const sampleTransactions = transactions.map((transaction) => ({ ...transaction, user: financiarUser }));
    const sampleCancelingTickets = cancelingTickets.map((ticket) => ({ ...ticket, user: financiarUser }));
    const sampleCategoryTypes = categoryTypes.map((categoryType) => ({ ...categoryType, user: financiarUser }));
    const sampleForeignCompanys = foreignCompanys.map((foreignCompany) => ({ ...foreignCompany, user: financiarUser }));
    const sampleUsers = users.map((user) => ({ ...user, user: adminUser }));


    // Insert all data concurrently
    await Promise.all([
      CustomerCompany.insertMany(sampleCustomerCompany),
      AdditionalFeeSettings.insertMany(sampleAdditionalFeeSettings),
      Product.insertMany(sampleProducts),
      Customer.insertMany(sampleCustomers),
      Employes.insertMany(sampleEmployes),
      Ledger.insertMany(sampleLedgers),
      Transaction.insertMany(sampleTransactions),
      CancelingTicket.insertMany(sampleCancelingTickets),
      CategoryType.insertMany(sampleCategoryTypes),
      ForeignCompany.insertMany(sampleForeignCompanys),
     
    ]);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Promise.all([
      User.deleteMany(),
      Product.deleteMany(),
      AdditionalFeeSettings.deleteMany(),
      CustomerCompany.deleteMany(),
      Customer.deleteMany(),
      Employes.deleteMany(),
      Ledger.deleteMany(),
      Transaction.deleteMany(),
      CancelingTicket.deleteMany(),
      CategoryType.deleteMany(),
      ForeignCompany.deleteMany()
    ]);

    console.log("Data deleted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
