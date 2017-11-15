// API for meta data
let CRYPTOCOMPARE_API_URI = "https://www.cryptocompare.com";

// API for price
let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

// Update interval time
let UPDATE_INTERVAL = 60 * 1000;

let app = new Vue({
  el: "#app",
  data: {
    coins: [],
    coinData: {}
  },
  methods: {

    /**
     * Load up all cryptocurrency data.
     */
    getCoinData: function() {
      let self = this;

      axios.get(CRYPTOCOMPARE_API_URI + "/api/data/coinlist")
        .then((resp) => {
          this.coinData = resp.data.Data;
          this.getCoins();
        })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },

    /**
     * Get the top 10 cryptocurrencies by value
     */
    getCoins: function() {
      let self = this;

      axios.get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=10")
        .then((resp) => {
          this.coins = resp.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /**
     * Currency logo
     */
    getCoinImage: function(symbol) {

      symbol = (symbol === "MIOTA" ? "IOT" : symbol);
      symbol = (symbol === "VERI" ? "VRM" : symbol);

      return CRYPTOCOMPARE_API_URI + this.coinData[symbol].ImageUrl;
    },

    /**
     * Return css color
     */
    getColor: (num) => {
      return num > 0 ? "color:green;" : "color:red;";
    },
  },

  /**
   * Load coindata
   */
  created: function () {
    this.getCoinData();
  }
});

/**
 * Update interval: 1 minute
 */
setInterval(() => {
  app.getCoins();
}, UPDATE_INTERVAL);