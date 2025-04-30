const { cookies } = require("next/headers");

const TOKEN_AGE = 3600
const TOKEN_NAME = "auth-token"
const TOKEN_REFRESH_NAME = "auth-refresh-token"

export async function getToken() {
  //api request
  const cookieStore = await cookies();
  const myAuthToken = cookieStore.get(TOKEN_NAME);
  return myAuthToken?.value;
}

export async function getRefreshToken() {
  //api request
  const cookieStore = await cookies();
  const myAuthToken = cookieStore.get(TOKEN_REFRESH_NAME);
  return myAuthToken?.value;
}

export async function setToken(authToken) {
  //login
  const cookieStore = await cookies();
  return cookieStore.set({
    name: TOKEN_NAME,
    value: authToken,
    httpOnly: true, // limit client-side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
})
}

export async function setRefreshToken(authRefreshToken) {
  //login
  const cookieStore = await cookies();
  return cookieStore.set({
    name: TOKEN_REFRESH_NAME,
    value: authRefreshToken,
    httpOnly: true, // limit client-side js
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
})
}

export async function deleteToken() {
  //logout
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_REFRESH_NAME);
  return cookieStore.delete(TOKEN_NAME);
}
