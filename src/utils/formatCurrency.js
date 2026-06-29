import { CURRENCY_CODE } from './constants';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: CURRENCY_CODE,
  }).format(amount);
};
