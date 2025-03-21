import { NextResponse } from 'next/server';

export async function middleware(request) {
    const loginPage = new URL('/login', request.nextUrl);
    const registerPage = new URL('/register', request.nextUrl);
    const homePage = new URL('/home', request.nextUrl);

    const sessionToken = request.cookies.get("laravel_session")?.value;
    const XSRFtoken = request.cookies.get("XSRF-TOKEN")?.value;


    if (!sessionToken && ![loginPage.pathname, registerPage.pathname].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(loginPage.href);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/images|favicon.ico|images).*)'],
};
