export const sessionCookieName = "pratsia_session";
export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.PRATSIA_ORIGIN?.startsWith("https://") || false,
    sameSite: "lax",
    path: "/",
  };
}
