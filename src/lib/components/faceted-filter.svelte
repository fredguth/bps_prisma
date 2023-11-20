<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import { Input } from "$lib/components/ui/input";
  import * as Popover from "$lib/components/ui/popover";
  import { PlusCircled, Check } from "radix-icons-svelte";
  import { Button } from "$lib/components/ui/button";
  import { filterByQuery, runCommand, toTitleCase, cn } from "$lib/utils";
  import { tick } from "svelte";
  export let items: string[] = [];
  export let title: string = "Title";
  export let slice: number = 10;
  export let query: string = "";
  export let value: string = "";
  export let placeholder: string = "Query...";

  let className: string | undefined | null = undefined;
  export { className as class };

  let open = false;

  $: filtered = items ? filterByQuery(items, query)?.slice(0, slice) : [];

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>


<Popover.Root bind:open let:ids>
  <Popover.Trigger>
    <Button variant="outline" size="sm" class="h-8">
      <PlusCircled class="mr-2 h-4 w-4" />
     {title}
    </Button>
  </Popover.Trigger>
  <Popover.Content class={cn("w-80", className)}>
    <Command.Root>
      <Input bind:value={query} placeholder={placeholder} class={cn("w-72", className)} />

      <Command.List
      class={cn("z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none w-72", className)}
    >
      <Command.Empty>Nenhum resultado encontrado.</Command.Empty>
      <Command.Group>Limpar</Command.Group>
      {#each filtered as item}
        <Command.Item
          value={item}
          onSelect={() =>
            runCommand(() => {
              value = item;
              open = false;
              query = "";
              closeAndFocusTrigger(ids.trigger);
            })}
        >
          {toTitleCase(item)}
        </Command.Item>
      {/each}
    </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
