<script lang="ts">
	import MaterialTable from './material-table.svelte'
	import * as Card from '$lib/components/ui/card'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import * as Table from '$lib/components/ui/table'
	import Filter from '$lib/components/filter.svelte'
	import type { MaterialState } from './types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { debounce } from '$lib/utils'

	export let data: MaterialState
	let codigobr = data?.filters?.codigobr || ''
	let descricao = data?.filters?.descricao || ''

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
	$: query = data?.filters?.query || ''
	$: skip = data?.filters?.skip || 0

	const handleClick = () => {
		if (codigobr || descricao) {
			descricao = ''
			codigobr = ''
			handleChange({ detail: { descricao: '' } })
			handleChange({ detail: { codigobr: '' } })
		}
	}
	const handleCodigo = () => {
		// takes string codigo and turn into numbers only
		codigobr = codigobr.replace(/\D/g, '')
		if (codigobr) {
			codigobr = codigobr.slice(0, 7)
		}

		debounce(() => {
			const url = $page.url
			url.searchParams.delete('codigobr')
			if (codigobr.length > 0 && parseInt(codigobr)) {
				// format codigobr to a 7 digit string with padding left zeros
				const formated = 'BR' + codigobr.padStart(7, '0')
				console.log(formated)
				url.searchParams.set('codigobr', formated)
			}
			goto(url, { replaceState: true, invalidateAll: true })
		}, 1000)()
	}
	type withDetail = {
		detail: Object
	}
	const handleChange = (event: withDetail) => {
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
			if (value) url.searchParams.set(key, String(value))
		} else url.searchParams.set(key, String(value))

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
				bind:value={codigobr}
				placeholder={codigobr ? codigobr : 'Código Material'}
				on:input={handleCodigo}
				on:click={handleClick}
			/>
			<Input
				class="w-full h-8"
				value={descricao}
				placeholder={descricao ? descricao : 'Descrição'}
				on:click={() => {
					descricao = ''
					codigobr = ''
					handleChange({ detail: { descricao: '' } })
					handleChange({ detail: { codigobr: '' } })
				}}
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

<div class="flex flex-col max-h-[600px]">
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
{#if selected}
<Button class="w-full mt-10" href= {`/material/${material.id}`}>
	Consultar Preços
</Button>
{/if}



<!-- <Card.Root class="w-full mt-10">
  <Card.Header>
    <Card.Title tag="h4">Material selecionado:</Card.Title>
  </Card.Header> -->