const DEFAULT_LOCALE = "en";

/**
 * To support more languages, just add the locale to the SUPPORT_LOCALES array.
 */
const SUPPORT_LOCALES = ["pt"];

/**
 * Get the user's locale from the accept-language header.
 *
 * It uses the first supported locale from the header.
 * If there's no accept-language header or none of the locales are supported, it returns the default locale.
 */
function getSupportedLocaleFromAcceptLanguage(request) {
  const acceptLanguage = request.headers.get("accept-language");

  // Finds the first supported locale.
  const locale = SUPPORT_LOCALES.find((locale) =>
    acceptLanguage?.startsWith(locale),
  );

  return locale ?? DEFAULT_LOCALE;
}

/**
 * Get a locale set by the user in a cookie.
 *
 * When the user changes the locale in the UI, we set a cookie with the new locale.
 * This function gets that locale to use their preferred language even when it diverges from the accept-language header.
 */
function getLocaleFromCookie(request) {
  const cookieHeader = request.headers.get("cookie");

  const cookies = cookieHeader
    ? Object.fromEntries(cookieHeader.split("; ").map((x) => x.split("=")))
    : {};

  return cookies.locale;
}

/**
 * Returns a user's preferred locale.
 *
 * It looks into their cookies first, then it checks the accept-language header.
 */
function getUserLocale(request) {
  return (
    getLocaleFromCookie(request) ||
    getSupportedLocaleFromAcceptLanguage(request)
  );
}

/**
 * Redirects to the user's preferred locale.
 */
export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  // If it's not the home page, then we don't need to redirect.
  // We just use the current locale.
  if (url.pathname !== "/") {
    return await context.next();
  }

  url.pathname = `/${getUserLocale(request)}`;
  return Response.redirect(url.toString());
}
