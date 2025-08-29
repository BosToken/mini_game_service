const fetch = require("node-fetch");

module.exports = {
  async random() {
    const request = await fetch(
      `${process.env.WAIFU_SERVICE_BASE_URL}character/random`
    );
    return await request.json(); 
  },
  async getById(id) {
    const request = await fetch(
      `${process.env.WAIFU_SERVICE_BASE_URL}character/id/${id}`
    );
    return await request.json();
  }
};
