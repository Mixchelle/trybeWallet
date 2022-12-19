// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';

export function saveUserEmail(email) {
  return {
    type: USER_EMAIL,
    payload: email,
  };
}
