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
	import { tick } from 'svelte'
	import { debounce } from '$lib/utils'
	export let data: MaterialState
	let codigobr = data?.filters?.codigobr || ''
	let descricao = data?.filters?.descricao || ''
	let query = data?.filters?.query || ''
	let classe = data?.filters?.classe || ''
	let unidade = data?.filters?.unidade || ''
	let pdm = data?.filters?.pdm || ''
	let skip = data?.filters?.skip || 0
	let take = data?.filters?.take || 0

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
		url.searchParams.delete('q')
		url.searchParams.delete('skip')
		url.searchParams.delete('take')
		url.searchParams.delete('codigobr')
		debounce(async () => {
			url.searchParams.set('q', query)
			tick()
				.then(() => goto(url, { replaceState: true, invalidateAll: true }))
				.then(() => {
					const el: HTMLInputElement = document?.getElementById(
						'queryInput',
					) as HTMLInputElement
					if (el) {
						el.focus()
						el.setSelectionRange(query.length, query.length)
					}
				})
		}, 200)()
	}
	const handleCodigo = () => {
		// takes string codigo and turn into numbers only
		codigobr = codigobr?.replace(/\D/g, '')
		codigobr = codigobr?.slice(0, 7)
		if (codigobr.length > 0 && parseInt(codigobr)) {
			const url = $page.url
			url.searchParams.delete('codigobr')
			url.searchParams.delete('q')
			url.searchParams.delete('skip')
			url.searchParams.delete('take')
			debounce(async () => {
				// format codigobr to a 7 digit string with padding left zeros
				const formated = 'BR' + codigobr.padStart(7, '0')
				url.searchParams.set('codigobr', formated)
				tick()
					.then(() => goto(url, { replaceState: true, invalidateAll: true }))
					.then(() => {
						const el: HTMLInputElement = document?.getElementById(
							'codigoInput',
						) as HTMLInputElement
						if (el) {
							el.focus()
							el.setSelectionRange(codigobr.length, codigobr.length)
						}
					})
			}, 400)()
		}
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

	const resetFilters = async () => {
		console.log('resetFilters')
		const url = $page.url
		skip = take = 0;
		query = codigobr = descricao = classe = unidade = pdm = ''
		url.searchParams.delete('skip')
		url.searchParams.delete('take')
		url.searchParams.delete('q')
		url.searchParams.delete('codigobr')
		url.searchParams.delete('classe')
		url.searchParams.delete('unidade')
		url.searchParams.delete('pdm')
		await goto(url, { replaceState: true, invalidateAll: true })
	}
</script>

<Card.Root class="w-full mb-10">
	<Card.Header>
		<div class="grid grid-cols-6 gap-4">
			<div class="col-start-1 col-end-4">
				<Card.Title tag="h2" class="pb-6 text-xl">Selecionar Material e Unidade</Card.Title>
				<Card.Description class="text-md"
					>Escolha o material que quer comprar e a unidade de fornecimento desejada
					para fazer pesquisa de preços.</Card.Description
				>
			</div>
			<div class="col-start-6 col-end-7">
				<Button variant = "outline" class="w-full" on:click={resetFilters}>
					Limpar Filtros
					</Button>
			</div>


	</Card.Header>
	<Card.Content>
		<div class="flex items-start h-14 space-x-4 py-4">
			<Filter
				bind:value={classe}
				title="Classe"
				filterBy="classe"
				options={classes}
				on:change={handleChange}
			/>
			<Filter
				bind:value={pdm}
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
			/>
			<Input
				id="queryInput"
				class="w-full h-8"
				bind:value={query}
				placeholder={descricao ? descricao : 'Descrição'}
				on:input={handleQuery}
				on:click={handleClick}
			/>
			<Filter
				bind:value={unidade}
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
