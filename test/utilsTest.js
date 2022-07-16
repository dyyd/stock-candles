const expect = require('chai').expect;
const proxyquire = require('proxyquire');

describe('Utils', () => {
  describe('Time', () => {
    const TimeUtils = proxyquire('../utils/time', {
      '../config': {
        intervalMilliseconds: 60 * 1000, // enforce 1 minute interval
      }
    });

    it('should return the current minute', () => {
      const expectedTime = new Date(2022, 0, 1, 0, 0, 0, 0).getTime();
      // create a timestamp for 2022-01-01T00:00:37.000Z
      const timestamp = new Date(2022, 0, 1, 0, 0, 37, 0).getTime();
      // verify the current minute is 2022-01-01T00:00:00.000Z
      const currentMinute = TimeUtils.currentIntervalStart(timestamp);
      expect(currentMinute).to.equal(expectedTime);
    });

    it('should return the next minute', () => {
      const expectedTime = new Date(2022, 0, 1, 0, 1, 0, 0).getTime();
      // create a timestamp for 2022-01-01T00:00:37.000Z
      const timestamp = new Date(2022, 0, 1, 0, 0, 37, 0).getTime();
      // verify the next minute is 2022-01-01T00:01:00.000Z
      const nextMinute = TimeUtils.nextIntervalStart(timestamp);
      expect(nextMinute).to.equal(expectedTime);
    });
  });
});
