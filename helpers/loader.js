let loadCommand = (command, func) => {
    command.forEach((pCommand) => {
        func(pCommand)
    })
}

let commandReceived = (fileToExport, func) => {
    fileToExport.forEach((pluginPart) => {
        try {
            let command = require(`../${pluginPart}`);
            console.log(`[] Loading '${pluginPart}' plugin with ${command.length} command(s)`)
            loadCommand(command, func);

        } catch (e) {
            console.log(`[] Error occurred while loading '${pluginPart}' plugin. ${e.name}: ${e.message}`);
            return;
        }
    })
}


module.exports = {
    commandReceived
};