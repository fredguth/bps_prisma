<script lang="ts">
	import MaterialTable from './material-table.svelte'
	// import Filter from '$lib/components/filter.svelte'
	import type { MaterialState } from './types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	export let data: MaterialState

	$: materials = data?.materials
	$: unidades = data?.unidades
	$: classes = data?.classes
	$: pdms = data?.pdms
	$: totalRows = data?.totalRows || 0
	$: selected = totalRows < 2

	$: codigobr = data?.filters?.codigobr
	$: descricao = data?.filters?.descricao
	$: classe = data?.filters?.classe
	$: unidade = data?.filters?.unidade
	$: pdm = data?.filters?.pdm
	$: query = data?.filters?.query
	$: skip = data?.filters?.skip || 0
	$: take = data?.filters?.take
	$: console.log({ skip, take, totalRows, materials })

	// //effect (Update)
	// $: {
	// 	const url = $page.url
	// 	console.log(skip)
	// 	url.searchParams.set('skip', skip.toString())
	// }

	const handleTableChange = async (event: CustomEvent) => {
		let { skip } = event?.detail
		const url = $page.url
		url.searchParams.set('skip', skip)
		console.log('go to:', url.searchParams.toString())
		goto(url, { replaceState: true, invalidateAll: true })
	}
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
{#if !selected}
	<div class="flex flex-col h-[600px]">
		<div class="flex-grow overflow-y-auto">
			<MaterialTable
				table={materials}
				{totalRows}
				skip = {skip || 0}
				take={30}
				on:click={handleTableChange}
			/>
		</div>
	</div>
{/if}
