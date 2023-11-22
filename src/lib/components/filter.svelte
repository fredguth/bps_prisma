<script lang="ts">

  import { Input } from "$lib/components/ui/input";
  import * as Command from "$lib/components/ui/command";
  import * as Popover from "$lib/components/ui/popover";
  import { PlusCircled, Check } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import { filterByQuery, toTitleCase, runCommand } from "$lib/utils";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import type { DataHandler, Row } from '@vincjo/datatables/remote'
  import { check } from '@vincjo/datatables'

type T = $$Generic<Row>

export let handler: DataHandler<T>
export let filterBy: string = ''
  export let options: string[] = [];
  export let title: string = "Title";
  export let value: string = "";
  export let query: string = "";
  let open = false;


  $: filtered = options ? filterByQuery(options, query) : [];
  $: if (value) {async()=>{
    const url = new URL($page.url);
    url.searchParams.set(filterBy, value);
    await goto(url);
    handler.invalidate()
  }}

</script>

<Popover.Root bind:open>
  <Popover.Trigger>
    <Button variant="outline" size="sm" class="h-8 justify-left truncate">
    {#if value}
    <Check class="mr-2 h-4 w-4" />
    {value}
    {:else}
    <PlusCircled class="mr-2 h-4 w-4" />
    {title}
    {/if}

    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-80">
    <Command.Root bind:value>
      <Input bind:value={query} placeholder={value? value: title} class="w-72" />

      <Command.List
        class="z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none w-72"
      >
        <Command.Empty>Nenhum resultado encontrado.</Command.Empty>
        {#if value}
        <Command.Item onSelect={() =>
            runCommand(() => {
              value = "";
              query = "";

            })}><Button class="w-72">Limpar</Button></Command.Item>
            {/if}
        {#each filtered as item}
          <Command.Item
            value={item}
            onSelect={() =>
              runCommand(() => {
                value = item;

                open = false;
                query = "";
              })}
          >
            {toTitleCase(item)}
          </Command.Item>
        {/each}
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
