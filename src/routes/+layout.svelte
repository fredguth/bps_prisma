<script lang="ts">
  import "../app.postcss";
  // import { readable} from "svelte/store";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  // export let data;

  $: classesActive = (href: string) =>
   href === $page.url.pathname ? "!bg-primary-500" : "";
  onMount(async () => {
    // eslint-disable-next-line no-use-before-define
    await import("@govbr-ds/webcomponents/dist/webcomponents.umd.min.js");
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/fonts/rawline/css/rawline.css"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900&amp;display=swap"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
</svelte:head>
<div class="flex flex-col h-screen justify-between">
  <br-header title="Banco de Preços em Saúde"  signature="DESID | Ministério da Saúde">
    <br-header-action slot="headerAction" has-login label-login="Entrar" />
  </br-header>
  <main class="mb-auto mx-auto container-lg">
    <slot />
  </main>
  <footer class="flex flex-col h-20 bg-white border-t-2">
    <div class="relative container-lg mx-auto">

      <img
        class="w-80 absolute right-0"
        src="img-logo-MS.png"
        alt="Logos SUS e  Ministério da saúde" />
    </div>
  </footer>
</div>
