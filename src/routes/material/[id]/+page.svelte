<script lang="ts">
	import ItensTable from './itens-table.svelte'
	import MaterialTable from '../material-table.svelte'
	import {
		ArrowDownToLine as MinPrice,
		ArrowUpToLine as MaxPrice,
		AlignHorizontalSpaceAround as MdnPrice,
		AlignVerticalJustifyCenter as AvgPrice,
	} from 'lucide-svelte'

	import * as Card from '$lib/components/ui/card'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import * as Table from '$lib/components/ui/table'
	import Filter from '$lib/components/filter.svelte'
	import type { MaterialState } from './types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { debounce } from '$lib/utils'
	import Histogram from './histogram.svelte'

	export let data: PageData

	$: material = data?.material
	$: materials = [material]
	$: rows = data?.itens
	$: totalRows = data?.totalRows || 0
	$: console.log({ precos: data?.precos })
	$: take = data?.take
	$: console.log('ROWS ROWS:', { rows })

	const handleChange = (event: CustomEvent) => {
		let { skip } = event?.detail
		const url = $page.url
		url.searchParams.set('skip', skip)
		goto(url, { replaceState: true, invalidateAll: true })
	}
</script>

<Card.Root class="w-full mb-10">
	<Card.Header>
		<Card.Title tag="h4">Material selecionado:</Card.Title>
	</Card.Header>
	<Card.Content>
		<MaterialTable table={materials} totalRows="1" />

		<Button class="w-full mt-10" href={`/material/`}>Alterar Material</Button>
	</Card.Content>
</Card.Root>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pb-2"
		>
			<Card.Title class="text-sm font-medium">Preço Mínimo</Card.Title>
			<MinPrice class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">R$ 0,0234</div>
			<!-- <p class="text-xs text-muted-foreground">+19% from last month</p> -->
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pb-2"
		>
			<Card.Title class="text-sm font-medium">Preço Mediano</Card.Title>
			<MdnPrice class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">R$ 0,1144</div>
			<!-- <p class="text-xs text-muted-foreground">+201 since last hour</p> -->
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pb-2"
		>
			<Card.Title class="text-sm font-medium">Preço Médio *</Card.Title>
			<AvgPrice class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">R$ 0,1534</div>
			<p class="text-xs text-muted-foreground">* Média ponderada</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pb-2"
		>
			<Card.Title class="text-sm font-medium">Preço Máximo</Card.Title>
			<MaxPrice class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">R$ 0,3210</div>
			<!-- <p class="text-xs text-muted-foreground">+201 since last hour</p> -->
		</Card.Content>
	</Card.Root>
</div>
<Histogram data={data?.precos} />
{#if totalRows}
	<div class="flex flex-col max-h-[600px] mt-8">
		<div class="flex-grow overflow-y-auto">
			<ItensTable
				bind:table={rows}
				{totalRows}
				skip={0}
				{take}
				on:change={handleChange}
			></ItensTable>
		</div>
	</div>
{/if}
