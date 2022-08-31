// TODO: Use the __SVELTEKIT_APP_VERSION_FILE__.js file like in todos/

/** @type {import('../$types').PageServerLoad} */
export async function load({ params }) {
    const res = await fetch('http://localhost:22022?From=%2B14164521467&folder=%2F' + params.folder);
    const items = await res.json()

    if (items) {
        return { items };
    }

    return {
        items: []
    };
}