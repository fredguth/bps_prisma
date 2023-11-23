<script lang="ts">
  import MaterialTable from './material-table.svelte'
  // import { browser } from '$app/environment'
  import Filter from '$lib/components/filter.svelte'
  import type { PageData } from '../$types'
  import type { Material } from '@prisma/client'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  // import { onMount } from 'svelte'
  interface MaterialState {
    materials: Material[]
    unidades: string[]
    classes: string[]
    pdms: string[]
    totalRows: number
    filters: {
      codigobr: string
      descricao: string
      classe: string
      unidade: string
      pdm: string
      query: string
      skip: number
      take: number
    }
  }
  export let data: MaterialState

  $: console.log({ urlParams })
  $: console.log({materials})
  $: materials = data?.materials
  $: unidades = data?.unidades
  $: classes = data?.classes
  $: pdms = data?.pdms
  $: totalRows = data?.totalRows || 0
  $: selected = totalRows === 1

  $: codigobr = data?.filters?.codigobr
  $: descricao = data?.filters?.descricao
  $: classe = data?.filters?.classe
  $: unidade = data?.filters?.unidade
  $: pdm = data?.filters?.pdm
  $: query = data?.filters?.query
  $: skip = data?.filters?.skip || 0
  $: take = data?.filters?.take || 30

  $: urlParams = Object.fromEntries(Array.from($page.url.searchParams))
  // filters without undefined key, values
  $: filters = Object.fromEntries(
    Object.entries(data?.filters || { skip, take }).filter(
      ([key, value]) => !!value,
    ),
  )

  function areParamsEqual(params1: Object, params2: Object) {
    return (
      Object.keys(params1).length === Object.keys(params2).length &&
      Object.keys(params1).every(
        (key) => String(params1[key]) === String(params2[key]),
      )
    )
  }
  $: console.log({ filters })
  $: loaded = browser && materials?.length > 0
  // $: if (loaded) {
  //   // Update state by changing url
  //   console.log('lets update url')
  //   const url = $page.url
  //   console.log('URL:', url.searchParams.toString().trim())
  //   console.log({ materials, filters })
  //   console.log('FILTERS:', filters)
  //   //check the change with the last state to see if needs to update url
  //   if (url.searchParams.get('descricao'.trim()) != descricao.trim()) {
  //     url.searchParams.set('descricao', descricao.trim())
  //     goto(url)
  //   }
  //   if (
  //     codigobr &&
  //     url.searchParams.get('codigobr').trim() != codigobr.trim()
  //   ) {
  //     url.searchParams.set('codigobr', codigobr.trim())
  //     goto(url)
  //   }
  //   let changed = false
  //   const otherFilters = { classe, unidade, pdm, query, skip }
  //   Object.entries(otherFilters).forEach(([param, value]) => {
  //     if (value && url.searchParams.get(param)?.trim() != value) {
  //       url.searchParams.set(param, value.toString().trim())
  //       changed = true
  //       console.log('changed!', { param, value })
  //     }
  //   })
  //   if (changed) goto(url)
  // }

  const handleTableChange = async(event: CustomEvent) => {
    let { skip } = event?.detail
    const url = $page.url
    url.searchParams.set('skip', skip)
    await goto(url)
  }
  // const handleTableChange = async (state: TableState) => {
  //   skip = state.offset;
  //   take = state.rowsPerPage;
  // };
</script>

<!-- <Card.Root class="w-full mb-10">
  <Card.Header>
    <Card.Title tag="h4">Selecionar Material e Unidade</Card.Title>
    <Card.Description
      >Escolha o material que quer comprar e a unidade de fornecimento desejada
      para fazer pesquisa de preços.</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <div class="flex items-start h-14 space-x-4 p-4">
      <Filter bind:value={classe} title="Classe" options={classes} />
      <Filter bind:value={pdm} title="Padrão" options={pdms} />
      <Input
        class="w-32 h-8  font-mono slashed-zero placeholder:font-sans"
        bind:value={codigobr}
        placeholder={codigobr ? codigobr : 'Código Material'}
      />
      <Input
        class="w-full h-8"
        bind:value={descricao}
        placeholder={descricao ? descricao : 'Descrição'}
      />
      <Filter bind:value={unidade} title="Unidade" options={unidades} />
    </div>
  </Card.Content>
</Card.Root> -->
{#if filters}
  <div class="flex flex-col h-[600px]">
    <div class="flex-grow overflow-y-auto">
      <MaterialTable
        bind:table={materials}
        {totalRows}
        bind:skip
        take={30}
        on:click={handleTableChange}
      />
    </div>
  </div>
{/if}
