/*
Autores del codigo:
Adahir y Ale 
*/
//require('dotenv').config();

const{Client,IntentsBitField} = require('discord.js');
const {Client:NotionClient} = require('@notionhq/client');
const fs = require ('fs');

const notion = new NotionClient({
    auth: "secret_1BV3mDZG3jcrAEiH6V3VSJJICvDLl9S6Jwwpgs1ytph",

})

const client = new Client({
intents:[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
]
})

client.on('ready', (c) => {
    console.log('The bot is ready UwU');
    
});

const prefix = '!';
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore messages from other bots
  if (!message.content.startsWith(prefix)) return; // Ignore messages without the prefix

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log(args)
  if (command === 'mensaje') {
    sendMessage({mensaje:args.join(' ')});
  }else if(command=='pendiente'){
    sendToDo({mensaje:args.join(' ')});
  }else if(command=='agendar'){
    const fechas = args.pop();
    sendAgenda({tarea:args.join(' '),fecha:fechas})
  }else if(command=='cita'){
    sendCita({cita:args.join(' ')})
  }
});

client.login(''); //Here is the token of the bot

//Funcion manda un bloque de texto en notion
function sendMessage({mensaje}){
    notion.blocks.children.append({
        block_id: '9d8f0064fd264617ac1689b779e752b1',
        children:[{
            object:'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: mensaje,
                  },
                  annotations:{
                    bold:true,
                    color:"red"
                  }
                },
              ],
            },
        }],
    })
}

//
function sendToDo({mensaje}){
    
    notion.blocks.children.append({
        block_id: '9363ed5f782341a4bdacff80d506c121',
        children:[{
            object:'block',
            type: 'to_do',
            to_do: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: mensaje,
                  },
                }
              ],
              checked:false,
              color:"blue"
            },
        }]
    })
}

function sendAgenda({tarea,fecha}){
  notion.pages.create({
      parent:{
          database_id: '8431ca9119f7473bb7f62662904daba9'
      },
      properties:{
          ["title"]:{
              title:[
                  {
                      type:'text',
                      text:{
                          content: tarea
                      }
                  }
              ]
          },
          ["%5DEU%3B"]:{
            date:{
                start:fecha
            }
          }
      }
  })
}

function sendCita({cita}){
  notion.blocks.children.append({
    block_id: '9f2a0b51dfc246129362b5648dad3adf',
    children:[{
        object:'block',
        type: 'quote',
        quote: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: cita,
              },
              
            },
          ],
        },
    }],
})

}
