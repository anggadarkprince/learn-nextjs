import {NextResponse} from "next/server";

export function middleware(request: Request, response: Response) {
    // log user activity
    // check session
    // do feature flagging
    // redirect page / old route
    console.log('Log', request.url)
    return NextResponse.next();
}

export const config = {
    matcher: ['/news/:slug*']
}
