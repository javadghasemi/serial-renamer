export const sanitizeNumber = number => {
  if (number.length === 1) {
    return 0 + number;
  }

  return number;
}