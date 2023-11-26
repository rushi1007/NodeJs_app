const Handlebars = require('handlebars');


Handlebars.registerHelper('space_fn', function(object, propertyName) {
    return object[propertyName];
});

module.exports = Handlebars;