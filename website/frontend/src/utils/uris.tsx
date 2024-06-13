export const signUpEndpoint = 'https://savemytime-production-server.vercel.app/auth/signup';
export const authEndpoint = 'https://savemytime-production-server.vercel.app/auth';
export const getUserEndpoint = (id) => `https://savemytime-production-server.vercel.app/profile/${id}`;
export const baseUrl = 'https://savemytime-production-server.vercel.app';
export const stripeCheckoutSessionEndpoint = `${baseUrl}/create-checkout-session`;