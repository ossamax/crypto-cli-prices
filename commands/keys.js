const KeyManager = require("../lib/KeyManager.js");
const colors = require("colors");
const inquirer = require("inquirer");
const isRequired = require("../utils/validation.js");

const key = {
  async set() {
    const Manager = new KeyManager();
    const input = await inquirer.prompt([
      {
        type: "input",
        name: "key",
        message: "Enter API Key".green + " https://nomics.com",
        validate: isRequired,
      },
    ]);

    const key = Manager.setKey(input.key);

    if (key) {
      console.log("API Key Set".blue);
    }
  },
  show() {
    try {
      const Manager = new KeyManager();
      const key = Manager.getKey();
      console.log("Current API key:", key.green);
      return key;
    } catch (error) {
      console.log("Key not found !! add one !");
    }
  },
  remove() {
    try {
      const Manager = new KeyManager();
      Manager.deleteKey();
      console.log("Current API key removed ".blue);
      return key;
    } catch (error) {
      console.log("Key not found !! add one !");
    }
  },
};

module.exports = key;
