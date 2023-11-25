<script lang="ts">
	import MaterialTable from '$lib/components/material-table.svelte'
	import * as Card from '$lib/components/ui/card'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import Filter from '$lib/components/filter.svelte'
	import type { MaterialState } from './types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { normalizeQuery } from '$lib/utils'
	import { debounce } from '$lib/utils'
	export let data: MaterialState
	let codigobr = data?.filters?.codigobr || ''
	let descricao = data?.filters?.descricao || ''
	let query = data?.filters?.query

	$: materials = data?.materials
	$: material = data?.materials[0]
	$: unidades = data?.unidades
	$: classes = data?.classes
	$: pdms = data?.pdms
	$: totalRows = data?.totalRows || 0

	$: selected = totalRows < 2 && materials[0]
	$: if (selected) {
		descricao = material.descricao
	}
	$: classe = data?.filters?.classe || ''
	$: unidade = data?.filters?.unidade || ''
	$: pdm = data?.filters?.pdm || ''
	$: skip = data?.filters?.skip || 0
	$: take = data?.filters?.take || 0

	const handleClick = () => {
		if (codigobr || descricao) {
			query = ''
			descricao = ''
			codigobr = ''
			handleChange({ detail: { query: '' } })
			handleChange({ detail: { descricao: '' } })
			handleChange({ detail: { codigobr: '' } })
		}
	}

	const handleQuery = () => {
		const url = $page.url
		const q = url.searchParams.get('q') || ''
		debounce(async () => {
			if (query.length > 3 || query.length < q.length) {
				const url = $page.url
				url.searchParams.delete('skip')
				url.searchParams.delete('take')
				url.searchParams.delete('query')
				// url.searchParams.set('query', normalizeQuery(query))
				url.searchParams.set('q', query)
				goto(url, { replaceState: true, invalidateAll: true })
				await goto(url, { replaceState: true, invalidateAll: true })
				document.getElementById('queryInput')?.focus()
			}
		}, 1500)()
	}
	const handleCodigo = () => {
		// takes string codigo and turn into numbers only
		codigobr = codigobr?.replace(/\D/g, '')
		codigobr = codigobr?.slice(0, 7)

		debounce(async () => {
			const url = $page.url
			url.searchParams.delete('codigobr')
			if (codigobr.length > 0 && parseInt(codigobr)) {
				// format codigobr to a 7 digit string with padding left zeros
				const formated = 'BR' + codigobr.padStart(7, '0')
				url.searchParams.set('codigobr', formated)
			}
			await goto(url, { replaceState: true, invalidateAll: true })
			document.getElementById('codigoInput')?.focus()
		}, 1500)()
	}
	type withDetail = {
		detail: Object
	}
	const handleChange = (event: withDetail) => {
		const [key, value] = Object.entries(event.detail)[0]
		const url = $page.url
			url.searchParams.delete('skip')
			url.searchParams.delete('take')
			url.searchParams.delete('q')
			url.searchParams.delete(key)
			if (value) url.searchParams.set(key, String(value))
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
				id="codigoInput"
				class="w-32 h-8  font-mono slashed-zero placeholder:font-sans"
				bind:value={codigobr}
				placeholder={codigobr ? codigobr : 'Código Material'}
				on:input={handleCodigo}
				on:click={handleClick}
				autofocus
			/>
			<Input
				id="queryInput"
				class="w-full h-8"
				bind:value={query}
				placeholder={descricao ? descricao : 'Descrição'}
				on:input={handleQuery}
				on:click={handleClick}
				autofocus
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

{#if totalRows}
	<div class="max-h-[50vh] overflow-y-auto">
		<MaterialTable
			table={materials}
			{totalRows}
			{skip}
			{take}
			on:change={handleChange}
		/>
	</div>
{/if}
{#if selected}
	<Button class="w-full mt-10" href={`/material/${material.id}`}>
		Consultar Preços
	</Button>
{/if}
