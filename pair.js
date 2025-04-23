const { malvinid } = require('./id'); 
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { Storage } = require("megajs");

const {
    default: Malvin_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

// Function to generate a random Mega ID
function randomMegaId(length = 6, numberLength = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const number = Math.floor(Math.random() * Math.pow(10, numberLength));
    return `${result}${number}`;
}

// Function to upload credentials to Mega
async function uploadCredsToMega(credsPath) {
    try {
        const storage = await new Storage({
            email: 'richvybs92@gmail.com', // Your Mega A/c Email Here
            password: 'Fuckyou2045$' // Your Mega A/c Password Here
        }).ready;
        console.log('Mega storage initialized.');

        if (!fs.existsSync(credsPath)) {
            throw new Error(`File not found: ${credsPath}`);
        }

        const fileSize = fs.statSync(credsPath).size;
        const uploadResult = await storage.upload({
            name: `${randomMegaId()}.json`,
            size: fileSize
        }, fs.createReadStream(credsPath)).complete;

        console.log('Session successfully uploaded to Mega.');
        const fileNode = storage.files[uploadResult.nodeId];
        const megaUrl = await fileNode.link();
        console.log(`Session Url: ${megaUrl}`);
        return megaUrl;
    } catch (error) {
        console.error('Error uploading to Mega:', error);
        throw error;
    }
}

// Function to remove a file
function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// Router to handle pairing code generation
router.get('/', async (req, res) => {
    const id = malvinid(); 
    let num = req.query.number;

    async function MALVIN_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let Malvin = Malvin_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari")
            });

            if (!Malvin.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Malvin.requestPairingCode(num);
                console.log(`Your Code: ${code}`);

                if (!res.headersSent) {
                    res.send({ code });
                }
            }

            Malvin.ev.on('creds.update', saveCreds);
            Malvin.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await delay(5000);
                    const filePath = __dirname + `/temp/${id}/creds.json`;

                    if (!fs.existsSync(filePath)) {
                        console.error("File not found:", filePath);
                        return;
                    }

                    const megaUrl = await uploadCredsToMega(filePath);
                    const sid = megaUrl.includes("https://mega.nz/file/14AHCSZJ#VaQGVESsnORZ5TBmTC26to7oI7aR6UUH1nCV9yx87vw")
                        ? 'CIPHER-MD*' + megaUrl.split("https://mega.nz/file/14AHCSZJ#VaQGVESsnORZ5TBmTC26to7oI7aR6UUH1nCV9yx87vw")[1]
                        : 'Error: Invalid URL';

                    console.log(`Session ID: ${sid}`);

                    const session = await Malvin.sendMessage(Malvin.user.id, { text: sid });

                    const MALVIN_TEXT =`*[ CIPHER MD CONNECTED ]*  ╔╦═╦╦═╦╗╔═╦══╦═╦═╦═╗
║║║║║╦╣║║╔╩║║╣║║║║╦╝
║║║║║╩╣╚╣╚╦║║╣║║║║╩╗
╚═╩═╩═╩═╩═╩══╩╩═╩╩═╝\n\n┏━━━━━━━━━━━━━━━━━━
┃ *CIPHER* -𝗠𝗗 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗
┃𝗦𝗨𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 💀😑
┃ 𝘁𝘆𝗽𝗲.𝗺𝗲𝗻𝘂 𝘁𝗼 𝘀𝗲𝗲 𝗮𝗹𝗹 
┃ 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 
┗━━━━━━━━━━━━━━━━━━
┏━━━━━━━━━━━━━━━━━━
┃𝐃𝐞𝐯 : HACKERPRO
┃𝐜𝐨𝐧𝐭𝐚𝐜𝐭 𝐨𝐰𝐧𝐞𝐫 : 
┃t.me/HACK_ERPRO
┗━━━━━━━━━━━━━━━━━━
> 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐜𝐡𝐚𝐧𝐧𝐞𝐥 : *https://whatsapp.com/channel/0029VbAUgm5Fi8xfcJspqi3f*\n> Type ${prefix}menu to see my commands list\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄɪᴘʜᴇʀᴛᴇᴄʜ`;

                    await Malvin.sendMessage(Malvin.user.id, { text: MALVIN_TEXT }, { quoted: session });

                    await delay(100);
                    await Malvin.ws.close();
                    return removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    MALVIN_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Service Has Been Restarted:", err);
            removeFile('./temp/' + id);

            if (!res.headersSent) {
                res.send({ code: "Service is Currently Unavailable" });
            }
        }
    }

    await MALVIN_PAIR_CODE();
});

module.exports = router;
                
