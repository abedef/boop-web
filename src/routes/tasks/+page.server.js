// TODO: Use the __SVELTEKIT_APP_VERSION_FILE__.js file like in todos/
import { API_BASE_URL } from '$env/static/private';

/** @type {import('../../../.svelte-kit/types/src/routes/$types').PageServerLoad} */
export async function load() {
    const res = await fetch(API_BASE_URL + '/tasks?From=%2B14164521467');
    const items = await res.json()

    if (items) {
        return { items };
    }

    return {
        items: []
    };
}