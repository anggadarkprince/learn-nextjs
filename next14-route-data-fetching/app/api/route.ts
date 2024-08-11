export function GET(request: Request) {
    console.log(request);

    //return Response.json();
    return new Response('Hello');
}

//export function POST(request: Request) {}
