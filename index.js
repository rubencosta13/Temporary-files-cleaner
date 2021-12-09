const osu = require('node-os-utils');
const os = require('os');
const axios = require('axios');
const rimraf = require('rimraf');
require('dotenv').config()

const cpu = osu.cpu
const count = cpu.count()
const memory = osu.mem
const date = new Date()
const username = os.userInfo().username
const temp = `C:\\Windows\\Temp`
const temp2 = `C:\\Users\\${username}\\AppData\\Local\\Temp`
const prefetch = `C:\\Windows\\Prefetch`



try {
  let percentage = 0
  console.log("STARTING FILE CLEANER! // Made by: Ruben Costa#4242")
  console.log(`[CLEANER] STARTING!`)


  cpu.usage()
  .then(cpuPercentage => {
  percentage == cpuPercentage
  console.log(`Sistema operativo: ${os.type()}`)
  console.log(`Hostname: ${os.hostname()}`)
  console.log(`Numero de cores: ${os.cpus().length}`)
  console.log(`Memória Livre: ${Math.floor(os.freemem())} Mb\nMemoria total: ${Math.floor(os.totalmem())} Mb`)
  console.log(`Uptime: ${os.uptime() / 3600}`)
  console.log(`Percentagem de CPU usada: ${cpuPercentage}%`)
  rimraf(temp, function () { console.log("done"); });
  rimraf(temp2, function () { console.log("done"); });
  rimraf(prefetch, function () { console.log("done"); });
  console.log(cpuPercentage)
  axios.post(process.env.DISCORD_LOGGER, {
    "username": "Monitor de recursos",
    "avatar_url": "",
    "content": "",
    "embeds": [
      {
        "title": "Limpeza de ficheiros temporarios e dados do computador:",
        "color": 16711680,
        "description": `Sistema operativo: ${os.type()}\nHostname: ${os.hostname()}\nNumero de cores: ${os.cpus().length}\nMemória Livre: ${Math.floor(os.freemem())} Mb\nMemoria total: ${Math.floor(os.totalmem())} Mb\nUptime: ${os.uptime()} Segundos\nPercentagem de CPU usada: ${cpuPercentage}% \n\n**Ficheiros temporarios limpos!**`,
        "timestamp": null,
        "author": {},
        "image": {},
        "thumbnail": {},
        "footer": {
          "text": `Made by: Ruben Costa#4242 | ${date.toISOString()}`
        },
        "fields": []
      }
    ],
    "components": []
    })
  })


    


} catch (e) {
  axios.post(process.env.DISCORD_ERRORS, {
      "username": "Monitor de recursos",
      "avatar_url": "",
      "content": "",
      "embeds": [
        {
          "title": "Dados:",
          "color": 16711680,
          "description": `Erro: ${e.message}\n Computador: ${os.hostname()}`,
          "timestamp": null,
          "author": {},
          "image": {},
          "thumbnail": {},
          "footer": {
            "text": `Made by: Ruben Costa#4242 | ${date.toISOString()} `
          },
          "fields": []
        }
      ],
      "components": []
    })
}
