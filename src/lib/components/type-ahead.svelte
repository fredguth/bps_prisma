<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { filterByQuery, runCommand, toTitleCase, cn, debounce, throttle } from "$lib/utils";
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import { tick } from "svelte";

  export let items: string[] = [];
  export let slice: number = 10;
  export let query: string = "";
  export let value: string = "";
  export let placeholder: string = "Query...";
  export let filtered: string[] = [];

  let className: string | undefined | null = undefined;
  export { className as class };

  let open = false;

  $: filtered = items ? filterByQuery(items, query)?.slice(0, slice) : [];
  $: open = query.length > 0;


  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class={cn("w-80 justify-between truncate", className)}
    >
      {value ? value : placeholder}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class={cn("border-0", className)}>
    <input
      bind:value = {query}
      on:input={()=>{debounce}}
      placeholder={value ? value : placeholder}
      class="bg-white border-0 h-6 p-4 rounded-sm w-full truncate"
    />
    {#if open}
      <Command.Root class="w-full">
        <Command.Group onSelect={() =>
          runCommand(() => {
            value = "";
            open = false;
            query = "";
            closeAndFocusTrigger(ids.trigger);
          })}>Limpar</Command.Group>
        <Command.List
          class="absolute z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none w-full"
        >
          <Command.Empty>Nenhum resultado encontrado.</Command.Empty>
          <Command.Item
            class="justify-center text-center pb-4 w-full"
            onSelect={() => {
              value = "";
            }}
          >
            Limpar
          </Command.Item>
          <Command.Separator class="m-4 w-full" />
          {#each filtered as item}
            <Command.Item
            class="w-full"
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
    {/if}
  </Popover.Content>
</Popover.Root>
