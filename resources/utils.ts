/**
 * 解决浮点数相加问题
 */
export function accAdd(arg1: number, arg2: number) {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
