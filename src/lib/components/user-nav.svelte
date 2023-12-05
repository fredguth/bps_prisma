<script>
    import * as Avatar from "$lib/components/ui/avatar"
    export let user;
</script>

{#if user}
<ul class="flex items-center space-x-10 h-12 justify-end text-blue-800 tabular-nums pr-2">
    <li>
        <a
    href="/instituicao"
    class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
    data-te-toggle="tooltip"
    title="89.848.949/0002-30"
    >PREFEITURA MUNICIPAL DE FARROUPILHA</a
  >

    </li>
    <li>

        <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>
          </Avatar.Root>
    </li>
</ul>
{/if}