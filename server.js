// dependencies
const express = require("express");

// add port and default
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware



// default to handle any other request (Not Found) Catch all
app.use((req, res) => {
   res.status(404).end();
});


// listen for any activity on our port
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});