export namespace OpenApiSummary {
  export const login = '[PUBLIC] Get a valid token';
  export const register = '[PUBLIC] Create a new user';
  export const profile = '[*] Get your user profile';
  export const patchUser = '[*] Update your user profile data';
  export const deactivateUser = '[*] Deactivate your user profile';
  export const deactivateUserById = '[ADMIN] Deactivate a user profile by id';
  export const reactivateUser = '[ADMIN] Reactivate a user profile';
  export const getAllUsers = '[ADMIN] Get all user profiles';
}
