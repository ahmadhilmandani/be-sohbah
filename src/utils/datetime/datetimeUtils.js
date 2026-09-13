// npm install luxon
const { DateTime } = require('luxon');

exports.timestampNowSQL = () => {

  const localtimestamp = DateTime
    .now()
    .setZone('Asia/Jakarta')
    .toFormat('yyyy-MM-dd HH:mm:ss');

  return localtimestamp

}

