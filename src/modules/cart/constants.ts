export const orderDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  cardNumber: '',
  expirationDate: '',
  cvv: '',
};

export type OrderFormValues = typeof orderDefaultValues;
