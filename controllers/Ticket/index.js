// const createPayroll = require('./SetSalary/create');
const createTicket =require('./Ticket/create');
const getallticket = require('./Ticket/getallticket');
const deleteticket = require('./Ticket/deleteticket');
const getsingleticket=require('./Ticket/getsingleticket');
const updateticket=require('./Ticket/updateticket');
const createticketreply=require('./TicketReply/create');
const getticketreply=require('./TicketReply/getticket')

module.exports = {
   createTicket,
   getallticket, 
   deleteticket,
   getsingleticket,
   updateticket,
   createticketreply,
   getticketreply

};

