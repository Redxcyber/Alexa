const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys');
const pino = require('pino');
const colors = require('colors');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

async function Connect() {
    try {
        let store = makeInMemoryStore({
            logger: pino().child({ level: 'silent', stream: 'store' })
        });

        if (process.env.SESSION !== '') {
         try {
          fs.writeFileSync(__dirname + '/session/creds.json', process.env.SESSION);
          console.log('Creating session file...');
         } catch (e) {
          console.error(e);
         }
        }

        let { version, isLatest } = await fetchLatestBaileysVersion();
        let { state, saveCreds } = await useMultiFileAuthState('./session');
        let sock = makeWASocket({
            logger: pino({ level: 'silent' }),
            printQRInTerminal: true,
            markOnlineOnConnect: false,
            browser: ['Darky', 'Chrome', '1.0.0'],
            auth: state,
            version: version
        });
        store.bind(sock.ev);

        sock.ev.on('connection.update', async (update) => {
            const { connection } = update;
            if (connection === 'close') {
                console.log(colors.red('Connection Closed: Reconnecting...'));
                await Connect();
            } else if (connection === 'open') {
                console.log(colors.green('Connected!'));
            }
        });

        sock.ev.on('messages.upsert', async (msg) => {
            msg = msg.messages[0];
            if (!msg.message) return;
            if (msg.key && msg.key.remoteJid === 'status@broadcast') return;
            console.log(msg);
            msg = await require('./message')(msg, sock);

            if (msg.text.startsWith('>') && msg.key.fromMe) {
                var evaluate = false;
                try {
                    evaluate = await eval(msg.text.replace('> ', '').toString());
                    try { evaluate = JSON.stringify(evaluate, null, 2); } catch {}
                } catch (e) {
                    evaluate = e.stack.toString();
                }
                await msg.reply(evaluate);
            }

            allCommands().forEach(async (command) => {
                if (msg.key.fromMe) {
                    let text = (msg.text.split(command.command)[1])?.trim();
                    if (msg.text.startsWith('/' + command.command)) return command.func(sock, msg, text);
                }
            });
        });

        sock.ev.on('creds.update', saveCreds);
    } catch (e) {
        console.log(e);
    }
}

function allCommands() {
 let commands = [];
 fs.readdirSync('./commands').forEach(file => {
  if (file.endsWith('.js')) {
   let command = require('./commands/' + file);
   commands.push({ command: command.command, info: command.info, func: command.func });
  }
 });
 return commands;
}

let server = require('http')
  .createServer(async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Darky is active!</h1>');
    res.end();
  }).listen(process.env.PORT || 8080, () => true);

Connect();

module.exports = { Connect, allCommands };
