export const signUpEndpoint = 'http://localhost:3001/auth/signup';
export const authEndpoint = 'http://localhost:3001/auth';
export const getUserEndpoint = (id) => `http://localhost:3001/profile/${id}`;
export const baseUrl = 'http://localhost:3001';
export const stripeCheckoutSessionEndpoint = `${baseUrl}/create-checkout-session`;