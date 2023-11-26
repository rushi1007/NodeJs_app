var express = require('express');
var mongoose = require('mongoose');
var app = express();
var database = require('./config/database');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect(database.url);
var Invoice = require('./models/invoices');


// Route to get all invoices
app.get('/api/invoices', function(req, res) {
    Invoice.find()
        .then(invoices => {
            res.json(invoices);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Route to get a specific invoice by ID
app.get('/api/invoices/:invoice_id', function(req, res) {
    let id = req.params.invoice_id;
    Invoice.findOne({ "Invoice ID": id })
        .then(invoice => {
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.json(invoice);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Route to insert a new invoice
app.post('/api/invoices', function(req, res) {
    const newInvoice = {
        "Invoice ID": req.body["Invoice ID"],
        Branch: req.body.Branch,
        City: req.body.City,
        "Customer type": req.body["Customer type"],
        "Product line": req.body["Product line"],
        name: req.body.name,
        image: req.body.image,
        "Unit price": req.body["Unit price"],
        Quantity: req.body.Quantity,
        "Tax 5%": req.body["Tax 5%"],
        Total: req.body.Total,
        Date: req.body.Date,
        Time: req.body.Time,
        Payment: req.body.Payment,
        cogs: req.body.cogs,
        "gross income": req.body["gross income"],
        Rating: req.body.Rating
    };

    console.log('Created new invoice');
    
    Invoice.create(newInvoice)
    .then(() => Invoice.find())
    .then(invoices => {
        console.log('Data added to the database:');
        res.json(newInvoice); // Showing the invoice data which is just inserted
    })   
    .catch(err => {
        console.error('Error adding data to the database:', err);
        res.status(500).send(err);
    });
});


// Route to delete an existing invoice by ID
app.delete('/api/invoices/:invoice_id', function(req, res) {
    let id = req.params.invoice_id;
    
    // Use findOneAndDelete to find and delete the invoice by ID
    Invoice.findOneAndDelete({ "Invoice ID": id })
        .then(invoice => {
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.send('Successfully! Invoice has been Deleted.');
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


// Route to update "Customer type" & "unit price" of an existing invoice by ID
// Route to update "Customer type" & "unit price" of an existing invoice by ID
app.put('/api/invoices/:invoice_id', async function(req, res) {
    try {
        let id = req.params.invoice_id;

        // Check if the required properties are present in the request body
        if (!req.body["Customer type"] || !req.body["Unit price"]) {
            return res.status(400).json({ error: 'Customer type and Unit price are required fields.' });
        }

        var data = {
            "Customer type": req.body["Customer type"],
            "Unit price": req.body["Unit price"]
        };

        // Use async/await to handle the promise returned by findOneAndUpdate
        const invoice = await Invoice.findOneAndUpdate({ "Invoice ID": id }, data, { new: true });

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.send('Successfully! Invoice updated - ' + invoice["Invoice ID"]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




// ... (Other routes such as creating, updating, and deleting invoices can be added similar to the Employee example)
app.listen(port, () => {
    console.log("App listening on port: " + port);
});