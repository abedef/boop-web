// TODO: Use the __SVELTEKIT_APP_VERSION_FILE__.js file like in todos/
import { API_BASE_URL } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const res = await fetch(API_BASE_URL + '?From=%2B14164521467');
    const items = await res.json()

    if (items) {
        return { items };
    }

    return { items: [] };
}

/** @type {import('./$types').Action} */
export async function POST({ request, setHeaders, url }) {
    let body = await request.json();

    const res = await fetch(API_BASE_URL + `?From=${encodeURIComponent(body.From)}`, {
        body: body.Body,
        method: "POST"
    });

    return { status: res.status };
}

/** @type {import('./$types').Action} */
export async function DELETE({ request, setHeaders, url }) {
    let body = await request.json();

    const res = await fetch(API_BASE_URL + `?From=${encodeURIComponent(body.From)}&Id=${body.Id}`, {
        method: "DELETE"
    });

    return { status: res.status };
}

/** @type {import('./$types').Action} */
export async function PATCH({ request, setHeaders, url }) {
    let body = await request.json();

    const res = await fetch(API_BASE_URL + `?From=${encodeURIComponent(body.From)}&Id=${body.Id}`, {
        method: "PATCH",
        body: body.Body,
    });

    return { status: res.status };
}