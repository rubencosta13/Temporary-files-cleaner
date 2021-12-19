const osu = require('node-os-utils')
const os = require('os')
const axios = require('axios')
const rimraf = require('rimraf')
const nodeDiskInfo = require('node-disk-info')
const fs = require('fs')
const ini = require('ini')

const location = __dirname + "\\config.ini"
console.log(location)


const cpu = osu.cpu
const date = new Date()
const username = os.userInfo().username
const temp = `C:\\Windows\\Temp`
const temp2 = `C:\\Users\\${username}\\AppData\\Local\\Temp`
const prefetch = `C:\\Windows\\Prefetch`
const config = ini.parse(fs.readFileSync(location, 'utf-8'));


function checkVersion(){
  const currentVersion = fs.readFileSync(__dirname+'\\version.js', 'utf-8')
  const githubVersion = axios.get('https://raw.githubusercontent.com/rubencosta13/Temporary-files-cleaner/master/version.js')
  .then(response => {
    if (currentVersion !== githubVersion){
      console.log(`New version available!`)
      newUpdate()
      return
    }
  })
 
}

function newUpdate(){
  axios.post(`https://discord.com/api/webhooks/922133046973571113/OR6hb-hilbl_2ThqrjOsJZd4IGIiq9ws4-qTvcAzI4u16r1YdqMKKuTAJm4RN1O_NdAX` , {
      "username": config.PlaceHolders.discordUsername,
      "avatar_url": "",
      "content": "",
      "embeds": [
        {
          "title": config.PlaceHolders.embedTitle,
          "color": config.PlaceHolders.embedColor,
          "description": config.PlaceHolders.not_updated,
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

try {
  checkVersion()

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
          axios.post(`https://discord.com/api/webhooks/922133046973571113/OR6hb-hilbl_2ThqrjOsJZd4IGIiq9ws4-qTvcAzI4u16r1YdqMKKuTAJm4RN1O_NdAX`, {
            "username": `config.PlaceHolders.discordUsername`,
            "avatar_url": "",
            "content": "",
            "embeds": [
              {
                "title": `config.PlaceHolders.embedTitle`,
                "color": config.PlaceHolders.embedColor, // config.PlaceHolders.os_placeholder +`${os.type()}\n`+config.PlaceHolders.os_hostname+`${os.hostname()}\n`+config.PlaceHolders.cpu_core+`${os.cpus().length}\n`+config.PlaceHolders.free_ram+`${Math.floor(os.freemem().toFixed(2))} Mb\n`+config.PlaceHolders.available_ram+`${Math.floor(os.totalmem().toFixed(2))} Mb\n`+config.PlaceHolders.uptime+`${os.uptime()} seconds\n`+config.PlaceHolders.cpu_percentage+`${cpuPercentage}%\n`+config.PlaceHolders.c_drive_usage+`${disks[0].capacity}\n\n`+config.PlaceHolders.temporary_files_cleaned
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
            "username": `config.PlaceHolders.discordUsername`,
            "avatar_url": "",
            "content": "",
            "embeds": [
              {
                "title": `config.PlaceHolders.embedTitle`,
                "color": config.PlaceHolders.embedColor, //config.PlaceHolders.os_placeholder +`${os.type()}\n`+config.PlaceHolders.os_hostname+`${os.hostname()}\n`+config.PlaceHolders.cpu_core+`${os.cpus().length}\n`+config.PlaceHolders.free_ram+`${Math.floor(os.freemem().toFixed(2))} Mb\n`+config.PlaceHolders.available_ram+`${Math.floor(os.totalmem().toFixed(2))} Mb\n`+config.PlaceHolders.uptime+`${os.uptime()} seconds\n`+config.PlaceHolders.cpu_percentage+`${cpuPercentage}%\n`+config.PlaceHolders.c_drive_usage+`${disks[0].capacity}\n\n`+config.PlaceHolders.temporary_files_cleaned+"\n\n"+config.PlaceHolders.disk_cleanup
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
