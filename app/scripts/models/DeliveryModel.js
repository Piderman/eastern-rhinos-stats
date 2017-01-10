/**
 * [deliveryModel description]
 * @param {string}  data      input from score sheet
 * @param {Boolean} isBowling TBD
 *
 * @return {obj}  delivery
 *   {Boolean}    isContributeToDismissal TBD
 *   {Boolean}    isPowerPlay             was ball jackpot or in a PP
 *   {int}        bonusRuns               TBD
 *   {int}        runs                    any score inc extras and (negative)
 *                                        wickets. null for off-strike
 */
exports.deliveryModel = function(data, isBowling) {
  'use strict';

  var powerPlayPattern  = /\*$/;
  var ball = data.toLowerCase().replace(powerPlayPattern, '');

  // how many runs were made. Extras count as 2
  var scored = null;

  // obj to be built and returned
  var delivery = {
    // bonus runs. how to ID a jackpot ball though??
    isPowerPlay : !!data.match(powerPlayPattern),
    runs: null,

    // separate incase we want to track PP runs
    // should this default to Runs so we can do a sum by bonus?
    bonusRuns: null
  };

  switch (ball) {
    case 'ls':
    case 'nb':
    case 'wd':
      delivery.classification = 'extra';
      scored = 2;
      break;

    case 'b':
    case 'c':
    case 'ro':
    case 'st':
      scored = -5;
      delivery.classification = 'wicket';

      // should a run-out count to dismissal?
      if (ball !=='ro') {
        delivery.isContributeToDismissal = true;
      }
      break;

    case '-':
      delivery.classification = 'offStrike';
      break;

    // means it was hit for runs
    default:
      // strip any PP formatting to convert the
      scored = parseInt(ball, 10);
      delivery.classification = 'standard';
      break;
  }

  // increase for PP
  if (scored && delivery.isPowerPlay) {
      delivery.bonusRuns = scored * 2;
  }

  delivery.runs =  scored;

  return delivery;
};
