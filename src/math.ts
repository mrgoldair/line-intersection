/**
 * 
 * @param dp 
 * @param n 
 * @returns 
 */
export function roundTo(dp,n){
  let d = 1 * (Math.pow(10,dp))
  return Math.round((n + Number.EPSILON) * d) / d;
}

/**
 * 
 * @param low the lower bound -> when t = 0
 * @param high the upper bound -> when t = 1
 * @param t should be in the range 0 < t < 1
 * @returns value between low <= value <= high
 */
 export default (low:number,high:number,t:number) => {
  return low * (1 - t) + high * t;
}