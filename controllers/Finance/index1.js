// 
const createAccountList =require('./AccountList/create.js');
const getAllAccountList = require('./AccountList/getall.js');
const updateAccountList =require('./AccountList/updateaccount.js');
const deleteAccount =require('./AccountList/deleteAccount.js');
const getaccountNameandBalance=require('./AccountBalance/getNameandBalance.js');
const createpayee=require('./Payee/create.js');
const deletepayee=require('./Payee/deletepayee.js')
const getallpayee=require('./Payee/getall.js');
const updatepayee=require('./Payee/updatepayee.js');
const createpayer=require('./Payer/create.js');
const deletepayer=require('./Payer/deletepayer.js');
const getallpayer=require('./Payer/getall.js');
const updatepayer=require('./Payer/updatepayer.js');
const createdeposite=require('./Deposit/create.js');
const getalldeposit=require('./Deposit/getalldeposite.js');
const deletedeposit=require('./Deposit/deletedeposit.js');
const updatedeposit=require('./Deposit/updatedeposit.js');
const createexpense = require('./Expense/create.js');
const getallexpense = require('./Expense/getallexpense.js');
const deleteexpense = require('./Expense/deleteexpense.js');
const updateexpense = require('./Expense/updateexpense.js');
const createTransferBalance = require('./TransferBalance/create.js');
const getAllTransferBalances = require('./TransferBalance/getalltransferbalance.js');
const deleteTransferBalance = require('./TransferBalance/deletetransferbalance.js');
const updateTransferBalance = require('./TransferBalance/updatetransferbalance.js');

// const updatestatusinactive=require('./Payslip/updatestatusinactive')
module.exports = {
    createAccountList, 
    updateAccountList, 
    getAllAccountList,
    deleteAccount,
    getaccountNameandBalance,
    createpayee,
    deletepayee,
    getallpayee,
    updatepayee,
    createpayer,
    deletepayer,
    getallpayer,
    updatepayer,
    createdeposite,
    getalldeposit,
    deletedeposit,
    updatedeposit,
    createexpense,
    getallexpense,
    deleteexpense,
    updateexpense,
    createTransferBalance,
    getAllTransferBalances,
    deleteTransferBalance,
    updateTransferBalance

//    getAllPayslip,
//    payslipupdatestatus,
//    updatestatusinactive

};