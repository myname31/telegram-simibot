const { Telegraf } = require('telegraf')
const Token = "Your Bot Token"
const bot = new Telegraf(Token, {polling: true})
const axios = require('axios')
const lang = "id"

const fetchJson = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

bot.on('text', async (ctx) => {
//if (bot.simi === false) return 
if (ctx.update.message.chat.type === 'supergroup') return //Only Private Chats!
let sim = await fetchJson("https://api.simsimi.net/v2/?text="+ctx.update.message.text+"&lc="+lang)
ctx.telegram.sendMessage(ctx.message.chat.id, sim.success, {reply_to_message_id: ctx.message.message_id})
})

bot.launch({ allowedUpdates: false })
.then(() => {
bot.telegram.getMe().then(x => {
console.log('Logged', 'in', x.username)
})
})
