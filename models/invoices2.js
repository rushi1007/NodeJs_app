// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmpSchema = new Schema({
    "Invoice ID": String,
    Branch: String,
    City: String,
    "Customer type": String,
    "Product line": String,
    name: String,
    image: String,
    "Unit price": Number,
    Quantity: Number,
    "Tax 5%": Number,
    Total: Number,
    Date: String,
    Time: String,
    Payment: String,
    cogs: String,
    "gross income": Number,
    Rating: Number
});
module.exports = mongoose.model('invoices',EmpSchema);



// app.post('/api/invoices', function(req, res) {
//     const newInvoice = {
//         invoice_id: req.body["Invoice ID"],
//         branch: req.body.Branch,
//         city: req.body.City,
//         customer_type: req.body["Customer type"],
//         product_line: req.body["Product line"],
//         product_name: req.body["Product Name"],
//         image: req.body.image,
//         unit_price: req.body["Unit price"],
//         quantity: req.body.Quantity,
//         tax: req.body["Tax 5%"],
//         total: req.body.Total,
//         date: req.body.Date,
//         time: req.body.Time,
//         payment: req.body.Payment,
//         cogs: req.body.cogs,
//         gross_income: req.body["gross income"],
//         rating: req.body.Rating
//     };