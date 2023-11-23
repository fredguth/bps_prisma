<script lang="ts">
	import MaterialTable from './material-table.svelte'
	import * as Card from '$lib/components/ui/card'
	import { Input } from '$lib/components/ui/input'
	import Filter from '$lib/components/filter.svelte'
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

	$: codigobr = data?.filters?.codigobr || ''
	$: descricao = data?.filters?.descricao || ''
	$: classe = data?.filters?.classe || ''
	$: unidade = data?.filters?.unidade || ''
	$: pdm = data?.filters?.pdm || ''
	$: query = data?.filters?.query || ''
	$: skip = data?.filters?.skip || 0

	const handleChange = (event: CustomEvent) => {
		console.log('handleChange', event.detail)
		const [key, value] = Object.entries(event.detail)[0]
		const url = $page.url
		const isFilter = [
			'classe',
			'unidade',
			'pdm',
			'descricao',
			'codigobr',
		].includes(key)
		if (isFilter) {
			url.searchParams.delete('skip')
			url.searchParams.delete('take')
			url.searchParams.delete(key)
		}
		if (value) url.searchParams.set(key, String(value))
		console.log('go to:', url.searchParams.toString())
		goto(url, { replaceState: true, invalidateAll: true })
	}
</script>

<Card.Root class="w-full mb-10">
	<Card.Header>
		<Card.Title tag="h4">Selecionar Material e Unidade</Card.Title>
		<Card.Description
			>Escolha o material que quer comprar e a unidade de fornecimento desejada
			para fazer pesquisa de preços.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<div class="flex items-start h-14 space-x-4 p-4">
			<Filter
				value={classe}
				title="Classe"
				filterBy="classe"
				options={classes}
				on:change={handleChange}
			/>
			<Filter
				value={pdm}
				title="Padrão"
				filterBy="pdm"
				options={pdms}
				on:change={handleChange}
			/>
			<Input
				class="w-32 h-8  font-mono slashed-zero placeholder:font-sans"
				value={codigobr}
				placeholder={codigobr ? codigobr : 'Código Material'}
			/>
			<Input
				class="w-full h-8"
				value={descricao}
				placeholder={descricao ? descricao : 'Descrição'}
			/>
			<Filter
				value={unidade}
				title="Unidade"
				filterBy="unidade"
				options={unidades}
				on:change={handleChange}
			/>
		</div>
	</Card.Content>
</Card.Root>
{#if !selected}
	<div class="flex flex-col h-[600px]">
		<div class="flex-grow overflow-y-auto">
			<MaterialTable
				table={materials}
				{totalRows}
				skip={skip || 0}
				take={30}
				on:change={handleChange}
			/>
		</div>
	</div>
{/if}
