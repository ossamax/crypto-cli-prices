const axios = require("axios");

const check = {
  async price(cmd) {
    const coins = cmd.coin.split(",");
    let currency = cmd.cur.toUpperCase();

    // Mapping some common currencies to Binance pairs
    const currencyMapping = {
      USD: "USDT",
      EUR: "EUR",
      // Add more mappings as needed
    };

    // Default to USDT if currency is not mapped
    currency = currencyMapping[currency] || currency;

    try {
      console.log(`Checking prices for ${coins.join(", ")} in ${currency}...`);

      for (const coin of coins) {
        const symbol = `${coin.toUpperCase()}${currency}`;
        console.log(`Fetching price for symbol: ${symbol}`);

        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        const price = response.data.price;
        console.log(`${coin.toUpperCase()}: ${price} ${currency}`);
      }
    } catch (error) {
      console.error(
        `Error fetching price: ${error.response?.data?.msg || error.message}`
      );
    }
  },
};

module.exports = check;
