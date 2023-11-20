<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import pdmjson from "$lib/assets/pdm.json";
  let open = false;
  let query = "";
  let selected = "";
  const allPDMs = pdmjson.map((item) => {
    return item.pdm;
  });
  function filterByQuery(list: string[], query: string): string[] {
    const lowerCaseQuery = query.toLowerCase();
    return list.filter((item) => item.toLowerCase().includes(lowerCaseQuery));
  }
  $: open = query.length > 0;
  $: console.log("PDMS:::", allPDMs);
  $: pdms = allPDMs.slice(0, 100) || [];
  $: filtered = filterByQuery(allPDMs, query);
  $: console.log("slice:", filtered);
</script>

<Command.Root>
  <Command.Input bind:value={query} placeholder="Query..." />
  {#if open}
    <Command.List>
      {#each pdms as pdm}
        <Command.Item
          value={pdm}
          on:click={() => {
            selected = pdm;
            query = "";
            open = false;
          }}
        >
          {pdm}
        </Command.Item>
      {/each}
    </Command.List>
  {/if}
</Command.Root>
