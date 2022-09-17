const editJsonFile = require("edit-json-file");

// If the file doesn't exist, the content will be an empty object by default.
let file = editJsonFile(`${__dirname}/ngsw-config.json`);

// Set a couple of fields
file.set("appData.version", Date.now().toString());

// Save the data to the disk
file.save();
