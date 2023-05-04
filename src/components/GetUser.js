import { Auth } from 'aws-amplify';

export async function getLoggedInUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user.username;
  } catch (e) {
    console.error('Error fetching logged-in user:', e);
  }
}
