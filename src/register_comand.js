/*const { REST } = require("discord.js")

//require('dotenv').config();
const{REST, Routes} = require('discord. js');
const commands = [
{name: 'todo_list',
description: 'Make a To-do list in notion',
}
];

const rest = new REST({version: '10'}).setToken('MTIzMDk0NTU1OTg5NjkxNjAwOQ.Gnugqp.6R-grWX_KBruICU6f1muXyS0zWDkyoTIAhZMgc');


(async() => {
    console.log('Registering slash command...');

    try {
        await rest.put(
            Routes.applicationGuildCommands('1230945559896916009','1230935537326755960'),
            {body: commands}
        )

        console.log('Slash commands were registered successfully');
    } catch (error) {
        console.log('There was an error: ${error}');
        
    }
})();

*/