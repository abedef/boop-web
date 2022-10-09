<script>
    import Boop from "$lib/boop.svelte";
    import { itemMapper } from "$lib/parser";

    /**
     * @type {{ items: [string]; }}
     */
    export let data;
    export let errors;

    $: mappedItems = data.items.map(itemMapper);
</script>

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
