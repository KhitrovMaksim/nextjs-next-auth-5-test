import { auth } from 'auth';
import { apiAuthPrefix, publicRoutes, authRoutes, DEFAULT_USER_AUTHENTICATED_REDIRECT } from 'configuration';

export default auth((req) => {
  const { nextUrl } = req;
  const isSignedIn = !!req.auth;
  const session = req.auth
  // console.log('Middleware, isSignedIn: ', isSignedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // console.log('isApiAuthRoute')
    return null;
  }

  if (isAuthRoute) {
    // console.log('isAuthRoute')
    if (isSignedIn) {
      // console.log('isAuthRoute and isSignedIn')
      return Response.redirect(new URL(DEFAULT_USER_AUTHENTICATED_REDIRECT, nextUrl))
    }
    return null;
  }

  if (isSignedIn) {
    // console.log('isSignedIn')
    if (session?.user.roles.find((role) => role.role === nextUrl.pathname)) {
      return null;
    } else {
      // console.log('isSignedIn and do not have permission to route: ', nextUrl.pathname)
      return Response.redirect(new URL(DEFAULT_USER_AUTHENTICATED_REDIRECT, nextUrl))
    }
  }

  if (!isSignedIn && !isPublicRoute) {
    // let callbackUrl = nextUrl.pathname;
    // if (nextUrl.search) {
    //   callbackUrl += nextUrl.search;
    // }
    // const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(
      `/auth/sign-in`,
      nextUrl
    ));
  }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
