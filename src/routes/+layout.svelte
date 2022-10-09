<script>
    import { page } from "$app/stores";

    // TODO: Unused?
    export let data;
</script>

<div
    class="unselectable"
    style="cursor: default; display: flex; align-items: center; width: 100%; justify-content: space-between;"
>
    <h1 style="line-height: 1.2rem; letter-spacing: -0.15rem;">
        <a href="/">
            bo<br />op
        </a>
    </h1>
    <div style="display: flex; flex-direction: column;">
        <p style="margin: 0;">
            Text Gerty at <a href="tel:+16476977599">+1 (647) 697-7599</a>
        </p>
        <div style="display: flex; justify-content: space-between;">
            <a class:bold={$page.url.pathname === "/"} href="/">home</a>
            <a class:bold={$page.url.pathname === "/tasks"} href="/tasks"
                >tasks</a
            >
            <a class:bold={$page.url.pathname === "/events"} href="/events"
                >events</a
            >
            <a class:bold={$page.url.pathname === "/beans"} href="/beans"
                >beans</a
            >
        </div>
    </div>
</div>

{#if $page.url.pathname !== "/" && $page.url.pathname !== "/tasks" && $page.url.pathname !== "/events" && $page.url.pathname !== "/beans" && !$page.url.pathname.startsWith("/@")}
    <h2>
        <a href="/">
            {$page.url.pathname}
        </a>
    </h2>
{/if}

<slot />

<style>
    a {
        text-decoration: none;
        color: currentColor;
    }

    .bold {
        font-weight: bold;
    }

    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
