const osu = require('node-os-utils');
const os = require('os');
const axios = require('axios');
const rimraf = require('rimraf');
const nodeDiskInfo = require('node-disk-info');
require('dotenv').config()

const cpu = osu.cpu
const date = new Date()
const username = os.userInfo().username
const temp = `C:\\Windows\\Temp`
const temp2 = `C:\\Users\\${username}\\AppData\\Local\\Temp`
const prefetch = `C:\\Windows\\Prefetch`



try {
  let percentage = 0
  cpu.usage()
  .then(cpuPercentage => {
      nodeDiskInfo.getDiskInfo()
      .then(disks => {
        percentage == cpuPercentage
        rimraf(temp, function () {});
        rimraf(temp2, function () {});
        rimraf(prefetch, function () {});
        if ((100 * disks[0].used) / disks[0].blocks >= 70){
          axios.post("https://discord.com/api/webhooks/918565980131704872/4lKAwUKRneSso2f5GARsy-V55KuQy8GgN8Yp78LAoMduvf67EiACW75Q9N-YpxM5O4oq", {
            "username": "Monitor de recursos",
            "avatar_url": "",
            "content": "",
            "embeds": [
              {
                "title": "Limpeza de ficheiros temporarios e dados do computador:",
                "color": 16711680,
                "description": `Sistema operativo: ${os.type()}\nHostname: ${os.hostname()}\nNumero de cores: ${os.cpus().length}\nMemória Livre: ${Math.floor(os.freemem().toFixed(2))} Mb\nMemoria total: ${Math.floor(os.totalmem().toFixed(2))} Mb\nUptime: ${os.uptime()} Segundos\nPercentagem de CPU usada: ${cpuPercentage}%\nUso total do disco C: ${disks[0].capacity} **Considerar limpar o disco** \n\n**Ficheiros temporarios limpos!**`,
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
        }else{
          axios.post("https://discord.com/api/webhooks/918566044451356722/rtwy3ushmbPId6BODasqCVeEPpDXclBNoE-c2NdRRex_WnfkaPL4OuntyvFQ2N8dkxb_", {
            "username": "Monitor de recursos",
            "avatar_url": "",
            "content": "",
            "embeds": [
              {
                "title": "Limpeza de ficheiros temporarios e dados do computador:",
                "color": 16711680,
                "description": `Sistema operativo: ${os.type()}\nHostname: ${os.hostname()}\nNumero de cores: ${os.cpus().length}\nMemória Livre: ${Math.floor(os.freemem())} Mb\nMemoria total: ${Math.floor(os.totalmem())} Mb\nUptime: ${os.uptime()} Segundos\nPercentagem de CPU usada: ${cpuPercentage}%\nUso total do disco C: ${disks[0].capacity} \n\n**Ficheiros temporarios limpos!**`,
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
        }
      })
  })
} catch (e) {
  axios.post("https://discord.com/api/webhooks/918570224754765844/AOQAK3K52UwsuF9of7rYxM_t9W3RWOrttdIL78bgrMZ-H8LeFYWzT7uDzuIKlr9vGMsa", {
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
