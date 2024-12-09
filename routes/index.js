// routes/index.js
// const express = require("express");
const signup = require("../controllers/User/signup");
const login = require("../controllers/User/login");

const dashboardRoutes = require("./dashboard");
const meetingRoutes = require("./meeting");
const attendanceRoutes = require("./attendance");
const announcementRoutes = require("./announcement");
const calendarRoutes = require("./calendar");
const incomeExpenseChartRoutes = require("./incomeExpenseChart");

const branchRoutes = require("./branch");
const departmentRoutes = require("./department");

const employeeRoutes = require("./employee");
const setSalaryRoutes  = require("./setSalary");
const payslipRoutes    = require("./payslip");

const manageLeaveRoutes = require("./manageLeave");
const timeSheetRoutes = require("./timeSheet");
const MarkedAttendance = require("./markedAttendance");

const accountListRoutes=require("./accountList");
const accountBalanceRoutes=require("./accountBalance");
const payeeRoutes=require("./Payee");
const payerRoutes=require("./Payer");
const depositeRoutes=require("./Deposit");
const expenseRoutes=require("./Expense");
const transferBalanceRoutes=require("./TransferBalance");

const ticketRoutes=require("./Ticket")
const ticketReplyRoutes=require("./TicketReply")

const meetingsRoutes=require("./Meetings")

const zoommeeting=require("./zoommeeting")


module.exports = (app) => {
  app.post("/api/signup", signup);
  app.post("/api/login", login);

  app.use("/api", dashboardRoutes); // This mounts the dashboard routes

  app.use("/api", meetingRoutes); // This mounts the meeting routes

  app.use("/api", attendanceRoutes); // This mounts the attendanceRoutes routes

  app.use("/api", announcementRoutes); // This mounts the announcementRoutes routes

  app.use("/api", calendarRoutes); // This mounts the calendarRoutes routes

  app.use("/api", incomeExpenseChartRoutes); // This mounts the incomeExpenseChartRoutes routes

  app.use("/api", branchRoutes); // This mounts the branchRoutes routes

  app.use("/api", departmentRoutes); // This mounts the departmentRoutes routes

  app.use("/api", employeeRoutes); // This mounts the employeeRoutes routes

  app.use("/api", setSalaryRoutes); // This mounts the SetSalaryRoutes routes

  app.use("/api", payslipRoutes); // This mounts the SetSalaryRoutes routes

  app.use("/api", manageLeaveRoutes); // This mounts the manageLeaveRoutes routes

  app.use("/api", timeSheetRoutes); // This mounts the timeSheetRoutes routes

  app.use("/api", MarkedAttendance); // This mounts the MarkedAttendance routes

  app.use("/api", accountListRoutes); // This mounts the AccountList routes

  app.use("/api", accountBalanceRoutes); // This mounts the AccountBalance routes

  app.use("/api", payeeRoutes); // This mounts the Payee routes

  app.use("/api", payerRoutes); // This mounts the Payer routes

  app.use("/api", depositeRoutes); // This mounts the Deposit routes

  app.use("/api", expenseRoutes); // This mounts the Expense routes

  app.use("/api", transferBalanceRoutes); // This mounts the TransferBalance routes

  app.use("/api", ticketRoutes); // This mounts the Ticket routes

  app.use("/api", ticketReplyRoutes); // This mounts the TicketReply routes

  app.use("/api", meetingsRoutes); // This mounts the Meetings routes

  app.use("/api", zoommeeting); // This mounts the Zoom Meetings routes
};
