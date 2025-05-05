This a noob friendly package for new commers for mineflayer. So people that have been around mineflayer should not take this package serious
```
```
Having problems
```
open a ticket in pull requiests
```
how to install:
```
npm install mineflayer-utility-bot
```

example code:
```
const mineflayer = require('mineflayer');
const { Food, AutoTotem } = require('mineflayer-utility-bot'); // Ensure this module is correctly installed

// Create a bot instance with a valid username
const bot = mineflayer.createBot({
  host: 'localhost', // Replace with your server's address if necessary
  port: 25565,       // Replace with your server's port if necessary
  username: 'util_bot' // Ensure this is a valid username without spaces
});

// Event listener when the bot spawns successfully
bot.once('spawn', () => {
  console.log('Bot has spawned successfully!');
  
  // Initialize Food module
  const food = new Food(bot);
  console.log('Food module initialized.');

  // Initialize AutoTotem module and start it
  const autoTotem = new AutoTotem(bot);
  autoTotem.start();
  console.log('AutoTotem module initialized and started.');
});

// Handle connection errors or other issues
bot.on('error', (err) => {
  console.error('Bot encountered an error:', err);
});

bot.on('kicked', (reason) => {
  console.log('Bot was kicked from the server:', reason);
});

bot.on('end', () => {
  console.log('Bot has been disconnected from the server.');
});

```
Github
```
https://github.com/GamerMrAlros/mineflayer-utility-bot
```
