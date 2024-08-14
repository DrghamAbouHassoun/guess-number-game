
function randomNumberGenerator() {
  const min = 3;
  const max = 10;
  const randomNum = Math.random() * (max - min) + min;
  return parseFloat(randomNum.toFixed(1));
}

export default randomNumberGenerator;