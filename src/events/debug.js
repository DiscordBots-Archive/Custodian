module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(info) {
    global.logger.debug(info);
  }
};