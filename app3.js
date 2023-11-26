const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser'); // Import body-parser
const Handlebars = require('handlebars');

const database = require('./config/database');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

const customHelpers = require('./custom_helper');

const exphbs = require('express-handlebars');

app.engine(
  'hbs',
  exphbs.engine({
  
    extname: '.hbs',
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    handlebars: customHelpers
  })
);


app.set('view engine', 'hbs');
// Connect to MongoDB using the database URL
mongoose.connect(database.url);
const Invoice = require('./models/invoices2');

// Route to fetch all invoices and render the Handlebars template
app.get('/alldata', async (req, res) => {
    try {
        // Fetch all invoices from the database
        const invoices = await Invoice.find();
        // Render the 'invoices' template and pass the invoices data to it
        res.render('alldata', { invoices });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Add this route to your app.js or app3.js file
app.get('/newInvoice', (req, res) => {
    res.render('newInvoice');
});
// Add this route to your app.js or app3.js file
app.post('/addInvoice', async (req, res) => {
    try {
        console.log(req.body); // Log the form data to the console

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
        await Invoice.create(newInvoice);
        console.log('New Invoice:', newInvoice);

        res.redirect('/alldata'); // Redirect to the page displaying all invoices
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Adding new functionalites
// Route to show the form for entering the date
app.get('/report', (req, res) => {
    res.render('reportForm');
});

// Route to handle the form submission and display the report
app.post('/report', async (req, res) => {
    try {
        const requestedInvoice = req.body["Invoice ID"]; // input field has the name attribute Id
        const invoices = await Invoice.find({ "Invoice ID": requestedInvoice });

        res.render('report', { invoices, requestedInvoice });
} catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route for the landing page
app.get('/', (req, res) => {
    res.render('landingPage');
});

  
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});