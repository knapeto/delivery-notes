import { getDistanceOfTwoPoints } from './location';

describe('location', () => {
  it('#getDistanceOfTwoPoints for 8 meters', () => {
    const homeLat = 47.32039687743602;
    const homeLon = 8.708140501505587;

    const vehicleLat = 47.320412;
    const vehicleLon = 8.708037;

    const distance = getDistanceOfTwoPoints(
      homeLat,
      homeLon,
      vehicleLat,
      vehicleLon,
    );

    expect(distance).toEqual(8);
  });
});
