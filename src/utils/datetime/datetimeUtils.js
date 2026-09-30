// npm install luxon
const { DateTime } = require('luxon');

exports.nowIndonesia = () => {
  return DateTime.now().setZone('Asia/Jakarta');
};

exports.timestampNowSQL = () => {

  const localtimestamp = DateTime
    .now()
    .setZone('Asia/Jakarta')
    .toFormat('yyyy-MM-dd HH:mm:ss');

  return localtimestamp

}

