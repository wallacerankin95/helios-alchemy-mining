import { ethers } from "ethers";

export const TreasuryAddress = '0x3d5190d82a5155438D439822736A51DE6ca72434';
export const HeliosAddress = '0x94be7bD08E1f36eA1896769cfacB7922b977fa9c';
export const BuyandburnAddress = '0x23A91f96A3BA610f0b5268E9448080F4253f7D43';
export const TitanxAddress = '0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1';
export const WETHTitanPoolAddress = "0xc45A81BC23A64eA556ab4CdF08A86B61cdcEEA8b";
export const WETHUsdtPoolAddress = "0xC5aF84701f98Fa483eCe78aF83F11b6C38ACA71D";

export const calculatePrice = (amount, price) => {
  return (parseFloat(amount, 10) * parseFloat(price, 10)).toFixed(2);
}
export const stringToFloat = (data) => {
  return parseFloat(data).toFixed(2);
}
export const calculateTotalPrice = (titanX, eth) => {
  return (parseFloat(titanX) + parseFloat(eth)).toFixed(2);
}
export const etherToFixed = (data) => {
  try {
    return parseFloat(ethers.utils.formatEther(data));
  } catch (e) {
    return parseFloat(ethers.utils.formatEther(exponentialToDecimal(data.toString())));
  }
}
export const differenceDay = (startDay) => {
  const startDate = new Date(startDay);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - startDate;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.floor(differenceInDays).toFixed(0);

}
export const threeComma = (str) => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function exponentialToDecimal(exponentialString) {
  const parts = exponentialString.split('e+').map(part => parseInt(part, 10));
  if (parts.length === 2) {
    let [base, exponent] = parts;
    let decimalString = base.toString();
    let decimalPos = decimalString.indexOf('.');
    let correctionFactor = decimalPos === -1 ? 0 : decimalString.length - decimalPos - 1;
    let adjustedExponent = exponent - correctionFactor;

    if (adjustedExponent > 0) {
      return decimalString.replace('.', '') + '0'.repeat(adjustedExponent);
    } else {
      // Handling for cases where adjustedExponent might be negative is complex and depends on the context
      console.warn('ExponentialToDecimal conversion for negative or small exponents is not implemented.');
      return exponentialString;
    }
  } else {
    // It's not in exponential format, so just return the original string
    return exponentialString;
  }
}
