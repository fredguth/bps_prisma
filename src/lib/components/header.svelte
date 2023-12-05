<script>
  import SVGImg from "./SVGImg.svelte";
  import logo from '$lib/assets/bps.svg?raw';
</script>
<header
  class="text-zinc-800 text-sm relative px-10 shadow-lg shadow-slate-100 h-20 p-4 w-full bg-white"
>
  <a href="/" class="flex container">
    <SVGImg data={logo} size={40} class="mx-4"/>

    <div>
      <div class="text-[1.38rem] leading-7">Banco de Preços em Saúde</div>
      <div class="font-medium hidden lg:block">DESID | Ministério da Saúde</div>
    </div>
    <div
      class="relative lg:w-1/2 ml-auto hidden md:block items-center float-right text-sm justify-end"
    >
      <slot name="user-nav" />
    </div>
  </a>
</header>
