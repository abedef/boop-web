<script>
    export let item;
    let newText = item?.text ?? "";
    export let excludePrefix = "";
    let highlight = false;

    let editMode = false;

    let theTextArea;

    import { invalidate } from "$app/navigation";

    let htmlItem = escapedItem(item.text);
    // TODO: This line is necessary to make sure the escapedItem function is run
    // on every render of a <Boop> element. As it currently stands, it does not
    // run every time.
    $: if (excludePrefix) htmlItem = escapedItem(item.text);

    /**
     * @param {string} boop
     */
    function escapedItem(boop) {
        // May not be necessary -- fixed a bug that might remove the need for this
        if (!boop) return boop;

        let parts = boop.match(/^(\d+)\s([\s\S]+)/);
        let unix_timestamp = null;
        if (parts) {
            unix_timestamp = new Date(parseInt(parts[1]) * 1000);
            boop = parts[2];
        }

        boop = boop.replace(new RegExp(`^(${excludePrefix})`, "i"), "");

        // Why doesn't  	/^([\/\w+]+)/      work below for the path replacement?
        boop = boop
            .replace(/\n/g, "<br>")
            .replace(
                /\B(\!\w+)/g,
                '<span style="color: purple; font-weight: bold;">$1</span>'
            )
            .replace(
                /\B(\+(\$|\w+))(:(\d+(\.\d+)?))?/g,
                '<span style="color: green; font-weight: bold;">$1$3</span>'
            )
            .replace(
                // https://stackoverflow.com/questions/56391413/extract-url-with-and-without-custom-url-schemes-from-text-using-regex
                // XXX: Susceptible to script injection
                /([a-zA-Z]{2,20}):\/\/([\w_-]+(?:(?:\.[\w_-]+)?))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
                '<a href="$1://$2$3" style="color: gray; font-weight: bold;">$1://$2$3</a>'
            )
            .replace(
                /\B(\-(\$|\w+))(:(\d+(\.\d+)?))?/g,
                '<span style="color: red; font-weight: bold;">$1$3</span>'
            )
            .replace(
                /(todo|doing|done)/i,
                '<span style="color: #FFB000; font-weight: bold;">$1</span>'
            )
            .replace(
                /^(\/\w+[\/\w+]*)/,
                `<a href="${excludePrefix}$1" style="color: #4488CC; font-weight: bold; text-decoration: none;">$1</a>`
            );

        if (unix_timestamp) {
            return `<abbr title="${unix_timestamp}">${boop}</abbr>`;
        } else {
            return boop;
        }
    }
</script>

<div
    id="container"
    on:focus={() => {}}
    on:blur={() => {}}
    on:mouseleave={() => {
        highlight = false;
    }}
    on:mouseover={() => {
        highlight = true;
    }}
>
    {#if highlight}
        <div class="actions">
            <button
                id="delete-btn"
                on:click={async () => {
                    const response = await fetch("/", {
                        method: "DELETE",
                        body: JSON.stringify({
                            From: "+14164521467",
                            Id: item.id,
                        }),
                    });
                    if (response.status == 200) {
                        invalidate("/");
                    }
                }}>delete</button
            >
            {#if editMode}
                <button
                    id="edit-btn"
                    on:click={async () => {
                        const response = await fetch("/", {
                            method: "PATCH",
                            body: JSON.stringify({
                                From: "+14164521467",
                                Id: item.id,
                                Body: newText,
                            }),
                        });
                        if (response.status == 200) {
                            invalidate("/");
                        }
                    }}>save</button
                >
            {/if}
            <button
                id="edit-btn"
                on:click={() => {
                    editMode = !editMode;
                    setTimeout(() => {
                        if (editMode) {
                            theTextArea?.focus();
                        } else {
                            theTextArea?.blur();
                        }
                    }, 100);
                    return;
                    const response = fetch("/", {
                        method: "PATCH",
                        body: JSON.stringify({
                            From: "+14164521467",
                            Id: item.id,
                            Body: newText,
                        }),
                    });
                    // if (response.status == 200) {
                    // invalidate("/");
                    // }
                }}>{editMode ? "cancel" : "edit"}</button
            >
        </div>
    {/if}
    {#if editMode}
        <textarea
            bind:this={theTextArea}
            name="boop"
            id="boop"
            rows="3"
            placeholder="Editing an existing boop..."
            on:keydown={async (e) => {
                if (
                    e.key == "Enter" &&
                    !(e.shiftKey || e.metaKey || e.altKey || e.ctrlKey)
                ) {
                    theTextArea?.blur();
                    const response = await fetch("/", {
                        method: "PATCH",
                        body: JSON.stringify({
                            From: "+14164521467",
                            Id: item.id,
                            Body: newText,
                        }),
                    });
                    if (response.status == 200) {
                        editMode = false;
                        invalidate("/");
                    }
                } else if (e.key == "Escape") {
                    newText = item.text;
                    theTextArea?.blur();
                    editMode = false;
                }
            }}
            bind:value={newText}
        />
    {:else}
        <p id="theElement">{@html htmlItem}</p>
    {/if}
</div>

<style>
    #theElement {
        display: block;
    }
    #container {
        position: relative;
    }

    #delete-btn {
        color: red;
        font-weight: bold;
    }
    .actions {
        position: absolute;
        bottom: 0;
        right: 0;

        overflow: visible;
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
</style>
