<script lang="ts">
  import "../app.postcss";
  // import { readable} from "svelte/store";
  import { page } from "$app/stores";
  import img from '$lib/assets/img-logo-MS.png';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // export let data;

  $: classesActive = (href: string) =>
   href === $page.url.pathname ? "!bg-primary-500" : "";

</script>
<div class="flex flex-col min-h-screen">
  <Header/>
<!-- <header></header> -->
  <!-- <main class="mb-auto mx-auto container-lg"> -->
    <main class="flex-grow mx-auto p-8 container">
    <slot />
  </main>
  <Footer class=""/>
</div>

<!-- </div> -->
