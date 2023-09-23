const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys');
const pino = require('pino');
const colors = require('colors');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

let commands = [];

async function Connect() {
    let store = makeInMemoryStore({
       logger: pino().child({ level: 'silent', stream: 'store' })
    })
    let { version, isLatest } = await fetchLatestBaileysVersion();
    let { state, saveCreds } = await useMultiFileAuthState('./session')
    let sock = makeWASocket({ logger: pino({ level: 'silent' }), printQRInTerminal: true, markOnlineOnConnect: false, browser: ['Darky','Chrome','1.0.0'], auth: state, version: version })
    store.bind(sock.ev)

    fs.readdirSync('./commands').forEach(file => {
     if (file.endsWith('.js')) {
      let command = require('./commands/' + file);
      commands.push({ command: command.command, info: command.info, func: command.func });
     }
    });
    
    sock.ev.on('connection.update', async (update) => {
        const { connection } = update
        if (connection === 'close') {
           console.log(colors.red('Connection Closed: Reconnecting...'));
           return await Connect();
        }
        else if (connection == 'open') {
          console.log(colors.green('Connected!'));
        }
    })
  
    sock.ev.on('messages.upsert', async (msg) => {
       msg = msg.messages[0]
       if (!msg.message) return;
       if (msg.key && msg.key.remoteJid === 'status@broadcast') return;
       await require('./message')(msg, sock);

       if (msg.text.startsWith('>') && msg.key.fromMe) {
        var evaluate = false
        try {
         evaluate = await eval(msg.text.replace('> ', '').toString());
         try { evaluate = JSON.stringify(evaluate, null, 2) } catch {}
        } catch (e) {
         evaluate = e.stack.toString()
        }
        await msg.reply(evaluate);
       }
     
       commands.forEach(async (command) => {
        if (msg.text.startsWith('/'+command.command) && msg.key.fromMe) return command.func(sock, msg);
       });
    })

    sock.ev.on('creds.update', saveCreds)
}
Connect();

module.exports = { Connect, commands };
