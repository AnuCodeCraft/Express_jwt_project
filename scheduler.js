const cron = require("node-cron");
const mongoose = require("mongoose");
const User = require('./models/User');

cron.schedule("*/5 * * * * ",() => {
    console.log("Running every minute");
    const user = User.deleteOne({},function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");

        
    
});
})