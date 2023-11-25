<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import * as Command from "$lib/components/ui/command";
  import * as Popover from "$lib/components/ui/popover";
  import { PlusCircled, Check } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import { filterByQuery, toTitleCase, runCommand, throttle } from "$lib/utils";
  import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

  export let options: string[] = [];
  export let title: string = "Title";
  export let filterBy: string = '';
  export let value: string = "";
  export let query: string = "";
  let open = false;

  $: variant = value ? "outline" : "";
  $: {//effect
    dispatch('change', { [filterBy]: value })
  }
  $: filtered = options ? filterByQuery(options, query) : [];
</script>

<Popover.Root bind:open>
  <Popover.Trigger>
    <!-- <Button {variant} size="sm" class="h-8 justify-left truncate"> -->
      <Button {variant} class="h-8">
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
    <Command.Root>
      <Input
        bind:value={query}
        placeholder={value ? value : title}
        class="w-72"
      />

      <Command.List
        class="z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none w-72"
      >
        <Command.Empty>Nenhum resultado encontrado.</Command.Empty>
        {#if value}
          <Command.Item
            onSelect={() =>
              runCommand(() => {
                value = "";
                query = "";
              })}><Button class="w-72">Limpar</Button></Command.Item
          >
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
