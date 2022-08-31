<script>
    import { page } from "$app/stores";
    import Boop from "$lib/boop.svelte";
    import { itemMapper } from "$lib/parser";

    let hideZero = true;

    /**
     * @type {{ items: [string]; }}
     */
    export let data;
    $: mappedItems = data.items.map(itemMapper);
</script>

<input
    bind:checked={hideZero}
    type="checkbox"
    name="hide-zero"
    id="hide-zero"
/>
<label for="hide-zero">Hide beans with net-zero sums</label>
<div
    style="display: flex; flex-flow: row wrap; gap: 0.5rem; max-width: 100%; justify-content: center;"
>
    {#each hideZero ? data.totals.filter((bean) => {
              return bean.Value != 0;
          }) : data.totals as total}
        <div style="min-width: 5rem; text-align: center;">
            <p>{total.Name}</p>
            <p>{total.Value}</p>
        </div>
    {/each}
</div>

{#each mappedItems as item}
    <Boop {item} />
{/each}
