const path = require("path")
const configPath = path.join(__dirname,"..","config","dataGoKr.json")
// const config = require(__dirname + "/../" + config + "/" + dataGokr.json )
const config = require(configPath)

module.exports = config