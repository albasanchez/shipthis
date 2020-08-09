export class LocationMock {
  get() {
    return jest.fn().mockImplementation((url: string) => {
      if (url.includes('search')) {
        return Promise.resolve({
          data: [{ lat: -77.862, lon: 105.463, display_name: 'Name' }],
        });
      } else if (url.includes('reverse')) {
        return Promise.resolve({
          data: { address: { country_code: 'us' } },
        });
      } else if (url.includes('directions')) {
        return Promise.resolve({
          data: {
            routes: [
              {
                distance: 10,
                legs: [
                  {
                    steps: [
                      {
                        name: 'Point1',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point2',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point3',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point4',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point5',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point6',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point7',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point8',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point9',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point10',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        name: 'Point11',
                        maneuver: { location: [-10.86, 105.33] },
                      },
                      {
                        maneuver: { location: [-10.86, 105.33] },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        });
      }
    });
  }
  getNoMiddlePoints() {
    return jest.fn().mockImplementation((url: string) => {
      if (url.includes('search')) {
        return Promise.resolve({
          data: [{ lat: -77.862, lon: 105.463, display_name: 'Name' }],
        });
      } else if (url.includes('reverse')) {
        return Promise.resolve({
          data: { address: { country_code: 'us' } },
        });
      } else if (url.includes('directions')) {
        return Promise.resolve({
          data: {
            routes: [
              {
                distance: 10,
                legs: [
                  {
                    steps: [],
                  },
                ],
              },
            ],
          },
        });
      }
    });
  }
}
