const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};

/**
 *  Get distance for two points
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns calculated for meters
 */
export const getDistanceOfTwoPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371;
  const dLat1 = toRad(lat2 - lat1);
  const dLon1 = toRad(lon2 - lon1);
  const dLat2 = toRad(lat1);
  const dLon2 = toRad(lat2);

  const calculated =
    Math.sin(dLat1 / 2) * Math.sin(dLat1 / 2) +
    Math.sin(dLon1 / 2) *
      Math.sin(dLon1 / 2) *
      Math.cos(dLat2) *
      Math.cos(dLon2);
  const c = 2 * Math.atan2(Math.sqrt(calculated), Math.sqrt(1 - calculated));
  const d = R * c;
  return parseInt(Number(Math.round(d * 1000)).toFixed(3), 10);
};
