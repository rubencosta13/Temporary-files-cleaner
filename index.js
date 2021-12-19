import osu from 'node-os-utils'
import os from 'os'
import axios from 'axios'
import rimraf from 'rimraf'
import nodeDiskInfo from 'node-disk-info'
import fs from 'fs'
import ini from 'ini'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const location = __dirname + "\\config.ini"


const cpu = osu.cpu
const date = new Date()
const username = os.userInfo().username
const temp = `C:\\Windows\\Temp`
const temp2 = `C:\\Users\\${username}\\AppData\\Local\\Temp`
const prefetch = `C:\\Windows\\Prefetch`
const config = ini.parse(fs.readFileSync(location, 'utf-8'));



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
          axios.post(config.Variables.discord_logger, {
            "username": config.PlaceHolders.discordUsername,
            "avatar_url": "",
            "content": "",
            "embeds": [
              {
                "title": config.PlaceHolders.embedTitle,
                "color": config.PlaceHolders.embedColor,
                "description": config.PlaceHolders.os_placeholder +`${os.type()}\n`+config.PlaceHolders.os_hostname+`${os.hostname()}\n`+config.PlaceHolders.cpu_core+`${os.cpus().length}\n`+config.PlaceHolders.free_ram+`${Math.floor(os.freemem().toFixed(2))} Mb\n`+config.PlaceHolders.available_ram+`${Math.floor(os.totalmem().toFixed(2))} Mb\n`+config.PlaceHolders.uptime+`${os.uptime()} seconds\n`+config.PlaceHolders.cpu_percentage+`${cpuPercentage}%\n`+config.PlaceHolders.c_drive_usage+`${disks[0].capacity}\n\n`+config.PlaceHolders.temporary_files_cleaned,
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
            "username": config.PlaceHolders.discordUsername,
            "avatar_url": "",
            "content": "",
            "embeds": [
              {
                "title": config.PlaceHolders.embedTitle,
                "color": config.PlaceHolders.embedColor,
                "description": config.PlaceHolders.os_placeholder +`${os.type()}\n`+config.PlaceHolders.os_hostname+`${os.hostname()}\n`+config.PlaceHolders.cpu_core+`${os.cpus().length}\n`+config.PlaceHolders.free_ram+`${Math.floor(os.freemem().toFixed(2))} Mb\n`+config.PlaceHolders.available_ram+`${Math.floor(os.totalmem().toFixed(2))} Mb\n`+config.PlaceHolders.uptime+`${os.uptime()} seconds\n`+config.PlaceHolders.cpu_percentage+`${cpuPercentage}%\n`+config.PlaceHolders.c_drive_usage+`${disks[0].capacity}\n\n`+config.PlaceHolders.temporary_files_cleaned+"\n\n"+config.PlaceHolders.disk_cleanup,
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
  axios.post(config.Variables.discord_error , {
      "username": config.PlaceHolders.discordUsername,
      "avatar_url": "",
      "content": "",
      "embeds": [
        {
          "title": config.PlaceHolders.embedTitle,
          "color": config.PlaceHolders.embedColor,
          "description": config.PlaceHolders.error+` ${e.message}\n`+ config.PlaceHolders.computer +`${os.hostname()}`,
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
