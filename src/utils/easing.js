export function cubicBezier(x1, y1, x2, y2) {
  if (!(x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1))
    throw new Error(
      `CubicBezier x1 & x2 values must be { 0 < x < 1 }, got { x1 : ${x1}, x2: ${x2} }`
    )
  const ax = 1.0 - (x2 = 3.0 * (x2 - x1) - (x1 *= 3.0)) - x1
  const ay = 1.0 - (y2 = 3.0 * (y2 - y1) - (y1 *= 3.0)) - y1
  let i = 0
  let r = 0.0
  let s = 0.0
  let d = 0.0
  let x = 0.0
  return (t) => {
    for (r = t, i = 0; i < 32; i++)
      if (Math.abs((x = r * (r * (r * ax + x2) + x1) - t)) < 1e-5)
        return r * (r * (r * ay + y2) + y1)
      else if (Math.abs((d = r * (r * ax * 3.0 + x2 * 2.0) + x1)) < 1e-5) break
      else r -= x / d
    if ((s = 0.0) > (r = t)) return 0
    else if ((d = 1.0) < r) return 1
    while (d > s)
      if (Math.abs((x = r * (r * (r * ax + x2) + x1)) - t) < 1e-5) break
      else t > x ? (s = r) : (d = r), (r = 0.5 * (d - s) + s) // eslint-disable-line
    return r * (r * (r * ay + y2) + y1)
  }
}
export const fastOutSlowIn = cubicBezier(0.4, 0, 0.2, 1)
export const linearOutSlowIn = cubicBezier(0, 0, 0.2, 1)
export const fastOutLinearIn = cubicBezier(0.4, 0, 1, 1)
export const fastInFastOut = cubicBezier(0.25, 0.8, 0.25, 1)
