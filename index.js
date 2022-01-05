const { VK } = require('vk-io');
const request = require("request-promise");
const fs = require('fs');
const https = require('https');
require('dotenv').config();
const vk = new VK({
  token: process.env.TOKEN_BOT,
  pollingGroupId: 209655789
});
const user = new VK({
	token: process.env.TOKEN_USER
});

const utils = {
	sp: (int) => {
		int = int.toString();
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}

const commands = [];



let users = require('./users.json');

async function savebaze()
{
  require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}
setInterval(async () => {
	await savebaze();
}, 3000)


const { updates } = vk;

updates.startPolling();


updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club209655789\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club209655789\|(.*)\]/ig, '').trim();

  if(!users.find(x=> x.id === message.senderId))
  {
    users.push({
      id: message.senderId
    })
  }

  message.user = users.find(x=> x.id === message.senderId)

  const command = commands.find(x=> x[0].test(message.text));
  if(!command) return;

  randomId = utils.random(1, 100)

  message.args = message.text.match(command[0]);
  await command[1](message);
})

const cmd = {
  on: (p, f) => {
    commands.push([p, f]);
  }
}

cmd.on(/^(?:Аниме список)$/i, async(message) => {
  message.send(`Проверка доступа сервера!\n Пожалуйста, подождите!`);

  setTimeout(() => {
    message.send(`если бот не отправил сообщение напишите @id499337186 (Разработчику)`)
  }, 40000)
})
//ok
cmd.on(/^(?:аниме поиск)\s([^]+)$/i, async(message) => {
  setTimeout(() => {
    message.send(`Проверка доступа сервера!\n Пожалуйста, подождите!`);
  }, 1000)
  setTimeout(() => {
    message.send(`если бот не отправил сообщение напишите @id499337186 (Разработчику)`)
  }, 40000)
})
