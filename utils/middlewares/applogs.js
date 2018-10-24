const winston = require('winston');
const logger = winston.createLogger({

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.metadata(),
    winston.format.logstash()
),
  //format: winston.format.json(),
  transports: [

    new winston.transports.File({ filename: 'app.log' ,level: 'debug'})
  ]
});
module.exports = logger;
