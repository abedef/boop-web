// TODO: Use the __SVELTEKIT_APP_VERSION_FILE__.js file like in todos/
import { API_BASE_URL } from '$env/static/private';

/** @type {import('../$types').PageServerLoad} */
export async function load({ params }) {
    let res;
    if (params.folder?.startsWith("@")) {
        res = await fetch(API_BASE_URL + '?From=%2B14164521467&folder=%40' + params.folder.substring(1));
    } else {
        res = await fetch(API_BASE_URL + '?From=%2B14164521467&folder=%2F' + params.folder);
    }
    const items = await res.json()

    if (items) {
        return { items };
    }

    return {
        items: []
    };
}