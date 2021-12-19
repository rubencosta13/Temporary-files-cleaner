import osu from 'node-os-utils'
import os from 'os'
import axios from 'axios'
import rimraf from 'rimraf'
import nodeDiskInfo from 'node-disk-info'
import {} from 'dotenv/config'
import config from './config.json'
  

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
          axios.post(config.dc_log, {
            "username": config.discord_webhook_username,
            "avatar_url": "",
            "content": "",
            "embeds": [
              {
                "title": config.embed_title,
                "color": config.embed_color,
                "description": config.operating_sistem_placeholder +`${os.type()}\n`+config.operating_sistem_hostname+`${os.hostname()}\n`+config.cpu_core_number+`${os.cpus().length}\n`+config.free_ram+`${Math.floor(os.freemem().toFixed(2))} Mb\n`+config.available_ram+`${Math.floor(os.totalmem().toFixed(2))} Mb\n`+config.uptime+`${os.uptime()} seconds\n`+config.cpu_percentage+`${cpuPercentage}%\n`+config.c_drive_usage+`${disks[0].capacity}\n\n`+config.temporary_files_cleaned,
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
          axios.post(process.env.DISCORD_LOGGER, {
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
  axios.post(config.dc_error , {
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
