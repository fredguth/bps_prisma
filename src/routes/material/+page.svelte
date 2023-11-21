<script lang="ts">
  import type { PageData } from "../$types";
  import { writable } from "svelte/store";
  import type { Material } from "@prisma/client";
  import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables/remote'
  import type { State, Row } from "@vincjo/datatables/remote";
  import { toTitleCase } from "$lib/utils";
  import { page } from "$app/stores";
  import { goto, invalidateAll } from "$app/navigation";
  export let data: PageData;

  $: console.log(data);
  $: materials = data.materials;
  const  reload = async(state:State)=>{
    console.log('RELOADING...', state)
    const url = new URL($page.url);
    url.searchParams.set('skip', state.offset.toString());
    url.searchParams.set('limit', state.rowsPerPage.toString());
    if (state.search) url.searchParams.set('query', state.search);
    state.filters?.forEach( (filter) => {
      if ((filter.filterBy != "codigobr") || (String(filter.value).length >6 ))
      { url.searchParams.set(String(filter.filterBy), String(filter.value));}
    })
    await goto(url, {replaceState: true, invalidateAll:true});
    return data.materials;
  }
  const handler = new DataHandler(data.materials, { rowsPerPage: 30 })
  handler.onChange( (state: State) => reload(state) )
  const rows = handler.getRows();
  const ThStyle = "sticky top-0 h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] bg-white"
  const TdStyle = "text-xs p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] tabular-nums font-mono"
</script>
<div class="flex flex-col h-[800px]">
  <div class="flex-grow overflow-y-auto">
<Datatable {handler}>
  <table class="w-full caption-bottom text-sm border-separate relative">
    <thead class="[&_tr]:border-b start-0 bg-white">
      <tr>
        <Th {handler} orderBy="classe" class={ThStyle}>Classe</Th>
        <Th {handler} orderBy="pdm" class={ThStyle}>Padrão</Th>
        <Th {handler} orderBy="codigobr" class={ThStyle}>Material</Th>
        <Th {handler} orderBy="descricao" class={ThStyle}>Descricao</Th>
        <Th {handler} orderBy="unidade" class={ThStyle}>Unidade</Th>
      </tr>
      <tr>
        <ThFilter {handler} filterBy="classe" />
        <ThFilter {handler} filterBy="pdm" />
        <ThFilter {handler} filterBy="codigobr" />
        <ThFilter {handler} filterBy="descricao" />
        <ThFilter {handler} filterBy="unidade" />
      </tr>
    </thead>
    <!-- <tbody class='tabular-nums  text-sm font-mono slashed-zero'> -->
    <tbody>
      {#each $rows as row}
        <tr
          class="px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] even:bg-blue-50 odd:bg-white"
        >
          <td class={TdStyle}>{toTitleCase(row.classe)}</td>
          <td class={TdStyle}>{toTitleCase(row.pdm)}</td>
          <td class={TdStyle}>{row.codigobr}</td>
          <td class={TdStyle}>{toTitleCase(row.descricao)}</td>
          <td class={TdStyle}>{toTitleCase(row.unidade)}</td>
        </tr>
      {/each}
    </tbody>
    <tfoot class="end-0 sticky h-10">
      <Th {handler} orderBy="classe" class={ThStyle}>Classe</Th>
      <Th {handler} orderBy="pdm" class={ThStyle}>Padrão</Th>
      <Th {handler} orderBy="codigobr" class={ThStyle}>Material</Th>
      <Th {handler} orderBy="descricao" class={ThStyle}>Descricao</Th>
      <Th {handler} orderBy="unidade" class={ThStyle}>Unidade</Th>
    </tfoot>
  </table>
</Datatable>
</div>
</div>
<style>
</style>
