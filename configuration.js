/**
 * Массив содержащий публичные пути не требующие аутентификации.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
];

/**
 * Массив содержащий пути для аутентификации.
 * Если пользователь аутентифицирован, то он автоматически отправляется на DEFAULT_USER_AUTHENTICATED_REDIRECT
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
]

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/auth/api";

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_USER_AUTHENTICATED_REDIRECT = "/dashboard";
