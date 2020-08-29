const hive = require('@hiveio/hive-js')
const colors = require('colors')
const config = require('./config.json')
const fs = require("fs")
const memo = fs.readFileSync("./memo.md", "utf-8")
hive.api.setOptions({
    url: 'https://anyx.io'
})
const rawUsers = fs.readFileSync("./rawFiles/" + config.raw_file_name, "utf-8")

function airdropTokens(users, callback) {
    var JSONsPerBlock = 25
    var total_batches = Math.ceil(users.length / JSONsPerBlock)
    console.log("DISTRIBUTION IS SEPRATED IN [".green, total_batches, "] BATCHE(S)".green)
    console.log("")
    var jsonARR = []
    for (var i = 0; i <= total_batches - 1; i++) {
        jsonARR[i] = []
    }
    var batch = 0
    for (var x = 0; x <= users.length - 1; x++) {
        if (x % JSONsPerBlock == 0 && x > 1) {
            batch++
        }
        var json = 	{
            "contractName":"tokens",
            "contractAction":"transfer",
            "contractPayload":{
                "symbol": config.token.symbol,
                "to": users[x].username,
                "quantity": users[x].reward                
            }
        }
        if (config.airdrop_type == "stake") {
            json.contractAction = "stake"
        }
        else if (config.airdrop_type == "liquid" || config.airdrop_type == "")
            json.contractPayload["memo"] = memo
        
        jsonARR[batch].push(json)
    }
    function doCustomJSON(batch_no) {
        hive.broadcast.customJson(config.keys.active, [config.username], [], "ssc-mainnet-hive", JSON.stringify(jsonARR[batch_no - 1]), function(err, result) {
            if (!err) {
                console.log("TRANSACTIONS COMPLETED FOR BATCH NO [".green, batch_no, "]".green)                
            }
            else {
                console.log("ERR".bgRed, "WHILE SENDING AIRDROP TO BATCH [".yellow, batch_no ,"]".yellow)
            }
            
            if (batch_no < jsonARR.length) {
                doCustomJSON(++batch_no)
            }
            else {
                console.log("")
                console.log("DISTRIBUTION COMPLETED, SENT REWARD TO [".yellow, users.length, "] USERS".yellow)
            }
        })
    }
    doCustomJSON(1)
}

function createUsersArray(raw, callback) {
    var finalARR = []
    var usersARR = raw.split('\n')
    if (!usersARR[0] == "") {
        for (index in usersARR) {
            if (!usersARR[index] == "") {
                var this_user = usersARR[index].split(',')
                var jsonOBJ = {
                    "username" : this_user[0],
                    "reward" : this_user[1].replace("\r", "")
                }
                finalARR.push(jsonOBJ)
            }
        }
        callback(finalARR)
    }
    else
        callback (false)
}

console.log('\033[2J')
console.log("#---------------------------------#".green)
console.log("#           Airdrop-Tool          #".green)
console.log("#---------------------------------#".green)
console.log("")

createUsersArray(rawUsers, function (res) {
    if (res == false) {
        console.log("ERR".bgRed, "CANNOT CREATE OR SPLIT THE USERS FILE".yellow)
    }
    else
        airdropTokens(res)
})
