<script lang="ts">
    import type { PageData } from "./$types";
    import { invalidateAll } from "$app/navigation";
    import { browser } from "$app/environment";
    export let data: PageData;

    $: console.log('/', data)
    // const logout = async () => {
    //     const res = await fetch("/logout", { method: "POST" });

    //     if (res.ok) {
    //         await invalidateAll();
    //         return;
    //     }
    // };
    // import { goto } from "$app/navigation";
    // if (browser) goto("/login")
</script>

{#if !data.user}
    <div>Not logged in</div>
    <a href="/login">Login</a>
{:else}
    <div>Logged in as {data.user.name}</div>
    <button on:click={logout}>Logout</button>
{/if}