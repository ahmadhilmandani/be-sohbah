const { getSurahService } = require("../../service/quran/quranService")

exports.getAllSurah = async (req, res, next) => {
  try {
    const surah = await getSurahService()
    res.status(200).json({
      'data': surah
    })
  } catch (error) {
    next(error)
  }
}