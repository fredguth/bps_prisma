<!-- <script>
    import { Input } from "$lib/components/ui/input";
    export let filterValue: text;
  </script>

  <Input id="filter-input" type="text" bind:value={$filterValue} placeholder="Filtrar..." /> -->

  <script>
    export let filterValue //: Writable<string>;
    export let values //: Readable<string[]>;
  </script>

  <input
    type="text"
    bind:value={$filterValue}
    on:click|stopPropagation
    placeholder="Search {$values.length} records..."
  />