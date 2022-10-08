<script>
    import { invalidate } from "$app/navigation";
    import { itemMapper } from "$lib/parser";

    import Boop from "$lib/boop.svelte";
    /**
     * @type {{ items: [string]; }}
     */
    export let data;
    export let errors;
    let boop = "";

    $: mappedItems = data.items.map(itemMapper);
</script>

<textarea
    name="boop"
    id="boop"
    rows="3"
    placeholder="Write a new boop..."
    on:keydown={async (e) => {
        if (
            e.key == "Enter" &&
            !(e.shiftKey || e.metaKey || e.altKey || e.ctrlKey)
        ) {
            const response = await fetch("/", {
                method: "POST",
                body: JSON.stringify({
                    From: "+14164521467",
                    Body: boop,
                }),
            });
            if (response.status == 200) {
                invalidate("/");
                boop = "";
            }
        }
    }}
    bind:value={boop}
/>

<!-- TODO: Note here I key over the text because keying over the id is not
sufficient because when you make edits this won't be triggered to re render -->
{#each mappedItems as item, i (item.id + item.text)}
    {#if i == 0 || mappedItems[i - 1].date != item.date}
        <h2 class="unselectable">{item.date}</h2>
    {/if}
    {#if i == 0 || mappedItems[i - 1].hour != item.hour}
        <h3 class="unselectable">
            {item.hour % 12 == 0 ? "12" : item.hour % 12}{item.hour >= 12
                ? " PM"
                : " AM"}
        </h3>
    {/if}
    {#if item.text}
        <Boop {item} />
    {/if}
{/each}

<style>
    h2 {
        opacity: 0.4;
    }
    h3 {
        opacity: 0.2;
    }
    textarea {
        resize: vertical;
        font-family: monospace;
        width: 100%;
        border: none;
        font-size: 13px;
        padding: 0;
        margin: 0;
    }
    textarea:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.05);
    }
    @media (prefers-color-scheme: light) {
        textarea:focus {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
    .unselectable {
        cursor: default;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
