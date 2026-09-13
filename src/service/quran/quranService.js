exports.getSurahService = async () => {
  try {

    const response = await fetch(
      'https://api.alquran.cloud/v1/surah/1?offset=4&limit=1'
    );

    const surah = await response.json();

    return surah

  } catch (error) {

    throw error

  }
  // finally {

  // }
}