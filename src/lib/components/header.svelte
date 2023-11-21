<header
  class="text-zinc-800 text-sm relative px-10 shadow-lg shadow-slate-100 h-20 p-4 w-full bg-white"
>
  <div class="flex container">
    <!-- <button style="text-wrap: nowrap;" class="text-blue-800 items-center cursor-pointer text-lg font-semibold justify-center relative text-center inline-flex w-8 h-8 rounded-full"><i class="font-black"></i></button> -->
    <img src="/bps.svg" alt="logo-bps" class="mr-4 h-12" />

    <div>
      <div class="text-[1.38rem] leading-7">Banco de Preços em Saúde</div>
      <div class="font-medium hidden lg:block">DESID | Ministério da Saúde</div>
    </div>
    <div
      class="relative lg:w-1/2 ml-auto hidden md:block items-center float-right text-sm justify-end"
    >
      <slot name="user-nav" />
    </div>
  </div>
</header>
