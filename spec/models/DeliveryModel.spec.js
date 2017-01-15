var delivery = require('../../app/scripts/models/Deliverymodel');

describe("A delivery", function() {
  it('should be a thing', function() {
    var standard = delivery.deliveryModel('7');
    var bonus = delivery.deliveryModel('5*');

    expect(standard.classification).not.toBeUndefined();
    expect(standard.isPowerPlay).not.toBeUndefined();
    expect(standard.runs).not.toBeUndefined();

    // "*" shouldn't effect outcome
    expect(bonus.classification).not.toBeUndefined();
    expect(bonus.isPowerPlay).not.toBeUndefined();
    expect(bonus.runs).not.toBeUndefined();
  });

  it('should support the sundries', function() {
    var legSide = delivery.deliveryModel('ls');
    var wide = delivery.deliveryModel('wd');
    var noBall = delivery.deliveryModel('nb*');

    expect(legSide.classification).toBe('extra');
    expect(legSide.runs).toBe(2);

    expect(wide.classification).toBe('extra');
    expect(wide.runs).toBe(2);

    expect(noBall.classification).toBe('extra');
    expect(noBall.runs).toBe(2);
  });

  it('should support the dismissals', function() {
    var bowled = delivery.deliveryModel('b');
    var caught = delivery.deliveryModel('c*');
    var runOut = delivery.deliveryModel('ro');
    var stumped = delivery.deliveryModel('st');
    var mankad = delivery.deliveryModel('mk');

    expect(bowled.classification).toBe('wicket');
    expect(bowled.runs).toBe(-5);

    expect(caught.classification).toBe('wicket');
    expect(caught.runs).toBe(-5);

    expect(runOut.classification).toBe('wicket');
    expect(runOut.isContributeToDismissal).toBeFalsy();
    expect(runOut.runs).toBe(-5);

    expect(stumped.classification).toBe('wicket');
    expect(stumped.runs).toBe(-5);

    expect(mankad.classification).toBe('wicket');
    expect(mankad.runs).toBe(-5);
  });

  it('should support an off-strike batsmen', function() {
    var offStrike = delivery.deliveryModel('-');

    expect(offStrike.classification).toBe('offStrike');
    expect(offStrike.runs).toBe(null);
  });

  // it goes by runs...
  it('should support other standard scoring types', function() {
    var maximum = delivery.deliveryModel('7');
    var jackpot = delivery.deliveryModel('3*');
    var dot = delivery.deliveryModel('0');

    expect(maximum.classification).toBe('standard');
    expect(maximum.runs).toBe(7);

    expect(jackpot.classification).toBe('standard');
    expect(jackpot.runs).toBe(3);
    expect(jackpot.bonusRuns).toBe(6);

    expect(dot.classification).toBe('standard');
    expect(dot.runs).toBe(0);
  });

  // support mixed types, eg front foot no ball + runs scored
});
