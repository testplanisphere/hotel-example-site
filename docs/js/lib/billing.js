/**
 * @param {number} roomBill
 * @param {Date} date 
 * @param {number} term 
 * @param {number} headCount 
 * @param {boolean} breakfast 
 * @param {boolean} earlyCheckIn 
 * @param {boolean} sightseeing
 * @returns {number}
 */
export function calcTotalBill(roomBill, date, term, headCount, breakfast, earlyCheckIn, sightseeing) {
  let totalBill = roomBill * headCount * term;
  for (let i = 0; i < term; i++) {
    const restDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    restDate.setDate(restDate.getDate() + i);
    if (restDate.getDay() == 0 || restDate.getDay() == 6) {
      totalBill += roomBill * 0.25 * headCount;
    }
  }
  
  if (breakfast) {
    totalBill += 1000 * headCount * term;
  }
  if (earlyCheckIn) {
    totalBill += 1000 * headCount;
  }
  if (sightseeing) {
    totalBill += 1000 * headCount;
  }
  return totalBill;
}