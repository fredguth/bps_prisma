<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import Filter from '$lib/components/filter.svelte';
	import type { PageData} from "../$types";
  import type { Material } from "@prisma/client";
  import { DataHandler, Th } from '@vincjo/datatables/remote'
  import Datatable from '$lib/components/Datatable.svelte'
  import type { State } from "@vincjo/datatables/remote";
  import { toTitleCase } from "$lib/utils";
  import { changeUrl } from "./changeUrl";
  import { onMount } from "svelte";
  export let data: PageData;

  let unidades: string[] = data.unidades;
  let pdms: string[] = data.pdms;
  let classes: string[] = data.classes;
  // let descricoes: string[] = data.descricoes;
  let totalRows: number = parseInt(data.totalRows)  || 0;
  let completed: boolean = (totalRows < 2);
  let codigobr: string = "";
  let descricao: string = "";
  let classe: string = "";
  let unidade: string = "";
  let pdm: string = "";
  let query: string = "";
  let mounted:boolen = false;
  onMount(() => {
    mounted = true;
  });

  const  reload = async(state:State)=>{
    console.log('RELOADING...', state)
    // const url = new URL($page.url);
    // url.searchParams.set('skip', state.offset.toString());
    // url.searchParams.set('limit', state.rowsPerPage.toString());
    // if (state.search) url.searchParams.set('query', state.search);
    // state.filters?.forEach( (filter) => {
    //   console.log('never here')
    //   if ((filter.filterBy != "codigobr") || (String(filter.value).length >6 ))
    //   { url.searchParams.set(String(filter.filterBy), String(filter.value));}
    // })
    // await goto(url);
    //
    changeUrl(codigobr, unidade, classe, pdm, query, descricao, mounted, completed)
    return data.materials;
  }
  // Remover
  const handler = new DataHandler(data.materials, {
    rowsPerPage: 30,
    totalRows: data.totalRows,
    i18n: {
            search: 'Buscar...',
            show: 'Mostrar',
            entries: 'registros',
            filter: 'Filtrar',
            rowCount: 'Mostrando {start} a {end} de {total} registros.',
            noRows: 'Sem resultado',
            previous: 'Anterior',
            next: 'Próximo'
        }
      })
  handler.onChange( (state: State) => reload(state) )
  $: totalRows = data.totalRows;
  $: totalRows? handler.setTotalRows(totalRows): null;
  const  rows = handler?.getRows();
  const ThStyle = "sticky top-0 h-10 border-top-1 px-2 text-left align-middle font-medium bg-slate-100"
  const TfStyle = "sticky bottom-0 h-10 px-2 text-left align-middle font-medium bg-slate-100 z-20"
  const TdStyle = "text-xs p-2 align-middle tabular-nums font-mono"
</script>

<div class= "flex items-start h-14 space-x-4 p-4">
  <Filter bind:value={classe} title="Classe" filterBy="classe" options={classes}/>
  <Filter {handler} title="Padrão" filterBy="pdm" options = {pdms}/>
  <Input class="w-32 h-8  font-mono slashed-zero placeholder:font-sans" bind:value={codigobr} placeholder={codigobr? codigobr: 'Código Material'} />
  <Input class="w-full h-8" bind:value={descricao} placeholder={descricao? descricao: 'Descrição'}/>
  <Filter {handler} title="Unidade" filterBy="unidade" options = {unidades}/>
</div>
<div class="flex flex-col h-[600px]">
  <div class="flex-grow overflow-y-auto">
<Datatable {handler} search={false}>
  <table class="w-full caption-bottom text-sm border-separate relative">
    <thead class="start-0">
      <tr>
        <th class={ThStyle}>Classe</th>
        <th class={ThStyle}>Padrão</th>
        <th class={ThStyle}>Material</th>
        <th class={ThStyle}>Descricao</th>
        <th class={ThStyle}>Unidade</th>
      </tr>
      <!-- <tr>
        <ThFilter {handler} filterBy="classe" />
        <ThFilter {handler} filterBy="pdm" />
        <ThFilter {handler} filterBy="codigobr" />
        <ThFilter {handler} filterBy="descricao" />
        <ThFilter {handler} filterBy="unidade" />
      </tr> -->
    </thead>
    <!-- <tbody class='tabular-nums  text-sm font-mono slashed-zero'> -->
    <tbody>
      {#each $rows as row}
        <tr
          class="px-2 text-left align-middle font-medium text-muted-foreground  even:bg-blue-50 odd:bg-white"
        >
          <td class={TdStyle}>{toTitleCase(row.classe)}</td>
          <td class={TdStyle}>{toTitleCase(row.pdm)}</td>
          <td class={TdStyle}>{row.codigobr}</td>
          <td class={TdStyle}>{toTitleCase(row.descricao)}</td>
          <td class={TdStyle}>{toTitleCase(row.unidade)}</td>
        </tr>
      {/each}
    </tbody>
    <tfoot class="end-0 h-10 bg-slate-50">
      <tr>
        <th class={TfStyle}>Classe</th>
        <th class={TfStyle}>Padrão</th>
        <th class={TfStyle}>Material</th>
        <th class={TfStyle}>Descricao</th>
        <th class={TfStyle}>Unidade</th>
      </tr>
    </tfoot>
  </table>
</Datatable>
</div>
</div>
<style>
</style>
