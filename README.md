# Airdrop-Tool
An Airdrop tool for Hive-Engine tokens.

It can be used to do airdrops of tokens in liquid and also stake form. It uses a Simple Distribution method and 25 transactions per Custom JSON.

***

## Configuration
To run Airdrop it has to be configured first, it is easy and simple:

```javascript
{
    "username" : "", // username of the account which holds tokens.
    "keys" : {
        "active" : "" // private active key
    },
    "token" : {
        "symbol" : "" // symbol of the token to airdrop from
    },
    "airdrop_type" : "", // airdrop type it can be liquid or stake
    "raw_file_name" : "" // file name which contains the name of users with rewards.
}
```

## Raw File
Raw file is the main file which will be used to airdrop tokens. File must be created in the `rawFiles` folders. set the name of the file in the `config.json`. file should create name of account to airdrop and amount of tokens after a space. users must be seprated by enters.

### Example:
```
ali-h 300
surpassinggoogle 7
aggroed 27.5
```

## Memo
`Memo.md` file should be edited, it will be the memo sent to all users.

## Finalizing
Now install Dependencies and Run it
```javascript
$ npm install
$ node airdrop.js
```
every run of this file will do a airdrop based on the configuration you did.

***

## Development
Encounter any issue or Bugs, Please report them [Here](https://github.com/ali-h/airdrop-tool/issues).

Bot Developed by @ali-h on hive, @Ali H#7057 on Discord.
