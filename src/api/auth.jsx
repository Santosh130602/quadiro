// api/auth.js
export const login = async ({ username, password }) => {
  // Mock login function
  if (username === 'admin' && password === 'password') {
    return { token: 'admin-token', role: 'admin' };
  } else if (username === 'user' && password === 'password') {
    return { token: 'user-token', role: 'user' };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const signup = async ({ username, password, role }) => {
  // Mock signup function
  return { token: `${role}-token`, role };
};
