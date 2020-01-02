let loadCommand = (command, func) => {
    command.forEach((pCommand) => {
        func(pCommand)
    })
}


module.exports = {
    loadCommand
};