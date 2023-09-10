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

export const getUserplace = async (lat, long) => {
  let place = '';
  let code = '';
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,
    );
    const data = await response.json();
    place = `${data.city}, ${data.countryName}`;
    code = `${data.countryCode}`;
  } catch (error) {
    console.log(error);
  }
  const returnObj = {
    place,
    code,
  };
  return returnObj;
};

export default getJobPlace;
