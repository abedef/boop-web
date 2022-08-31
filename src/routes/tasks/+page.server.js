// TODO: Use the __SVELTEKIT_APP_VERSION_FILE__.js file like in todos/

/** @type {import('../../../.svelte-kit/types/src/routes/$types').PageServerLoad} */
export async function load() {
    const res = await fetch('http://localhost:22022/tasks?From=%2B14164521467');
    const items = await res.json()

    if (items) {
        return { items };
    }

    return {
        items: []
    };
}