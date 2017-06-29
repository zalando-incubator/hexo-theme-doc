const build = require('./build');
const logger = require('./logger');

process.on('message', (message) => {
  const pages = message.pages ? Array.from(message.pages.data) : [];
  logger.debug(`child process got message`);
  const result = build({pages});
  process.send(result);
});
