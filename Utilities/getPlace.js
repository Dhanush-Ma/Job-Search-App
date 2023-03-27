const getJobPlace = async (lat, long) => {
  let place = '';

  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
    );
    const data = await response.json();
    place = `${data.city}, ${data.countryName}`;
  } catch (error) {
    console.log(error);
  }

  return place;
};

export default getJobPlace;
