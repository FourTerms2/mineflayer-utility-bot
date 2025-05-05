const fs = require('fs');

// Food class to handle automatic eating functionality
class Food {
  constructor(bot) {
    this.bot = bot;
    this.foodList = ['minecraft:cooked_beef', 'minecraft:cooked_chicken', 'minecraft:bread']; // Default food list

    this.bot.once('spawn', () => {
      console.log('Food module initialized. Loaded food list:', this.foodList);
      this.startAutoEat();
    });
  }

  normalizeFoodName(foodName) {
    return foodName.startsWith('minecraft:') ? foodName : `minecraft:${foodName}`;
  }

  startAutoEat() {
    setInterval(() => {
      const hunger = this.bot.food;
      if (hunger === undefined || hunger >= 20) return;
      this.tryToEat();
    }, 2000);
  }

  async tryToEat() {
    const foodItem = this.findFoodInInventory();
    if (foodItem) {
      try {
        await this.bot.equip(foodItem, 'hand');
        await this.bot.consume();
      } catch (error) {
        console.error('Error consuming food:', error);
      }
    }
  }

  findFoodInInventory() {
    for (let i = 0; i < 40; i++) {
      const item = this.bot.inventory.slots[i];
      if (item && this.foodList.includes(this.normalizeFoodName(item.name))) {
        return item;
      }
    }
    return null;
  }
}

// AutoTotem class to handle totem management
class AutoTotem {
  constructor(bot) {
    this.bot = bot;
    this.lowHealthThreshold = 10;
    this.offhandSlot = 45;
    this.totemType = 1163;
  }

  start() {
    this.bot.on('health', () => this.handleAutoTotem());
    setInterval(() => this.handleAutoTotem(), 100);
  }

  handleAutoTotem() {
    if (this.bot.health < this.lowHealthThreshold) {
      this.equipTotem();
    }
  }

  equipTotem() {
    const totemSlot = this.findTotemInInventory();
    if (totemSlot !== -1) {
      const item = this.bot.inventory.slots[totemSlot];
      this.bot.equip(item, 'off-hand', (err) => {
        if (err) console.error('Error equipping totem:', err);
      });
    }
  }

  findTotemInInventory() {
    for (let i = 0; i < this.bot.inventory.slots.length; i++) {
      const item = this.bot.inventory.slots[i];
      if (item && item.type === this.totemType) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = { Food, AutoTotem };
