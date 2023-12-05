<script lang="ts">
  import "../app.postcss";
  import { page } from "$app/stores";
  import img from '$lib/assets/img-logo-MS.png';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import UserNav from "$lib/components/user-nav.svelte";

  export let data;

  $: classesActive = (href: string) =>
   href === $page.url.pathname ? "!bg-primary-500" : "";
  // $: console.log('layout', {data})
  $: user = data?.user
</script>
<div class="flex flex-col min-h-screen">
  <Header>
    <UserNav slot="user-nav" {user} ></UserNav>
    </Header>
    <main class="flex-grow mx-auto p-8 container">
    <slot />
  </main>
  <Footer />
</div>
