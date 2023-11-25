<script lang="ts">
	import ItensTable from '$lib/components/itens-table.svelte'
	import MaterialTable from '$lib/components/material-table.svelte'
	import Histogram from '$lib/components/histogram.svelte'
	import { median, min, max, mean } from 'd3'
	import { formatLocale } from 'd3-format'
	import {
		ArrowDownToLine as MinPrice,
		ArrowUpToLine as MaxPrice,
		AlignHorizontalSpaceAround as MdnPrice,
		AlignVerticalJustifyCenter as AvgPrice,
	} from 'lucide-svelte'

	import * as Card from '$lib/components/ui/card'
	import { Button } from '$lib/components/ui/button'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	export let data: PageData

	$: material = data?.material
	$: materials = [material]
	$: rows = data?.itens
	$: totalRows = data?.precos?.length || 0
	$: console.log({ precos: data?.precos })
	$: take = data?.take

	const handleChange = (event: CustomEvent) => {
		let { skip } = event?.detail
		const url = $page.url
		url.searchParams.set('skip', skip)
		goto(url, { replaceState: true, invalidateAll: true })
	}

	const ptBRFormat = formatLocale({
		decimal: ',',
		thousands: '.',
		grouping: [3],
		currency: ['R$', ''],
	})
	const formatPrice = ptBRFormat.format('$,.4f')
</script>

<Card.Root class="w-full mb-10">
	<Card.Header>
		<Card.Title tag="h4"
			>Há {totalRows} registros de preço do material selecionado:</Card.Title
		>
	</Card.Header>
	<Card.Content>
		<MaterialTable table={materials} totalRows="1" />

		<Button class="w-full mt-10" href={`/material/`}>Alterar Material</Button>
	</Card.Content>
</Card.Root>
{#if totalRows}
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
		<Card.Root>
			<Card.Header
				class="flex flex-row items-center justify-between space-y-0 pb-2"
			>
				<Card.Title class="text-sm font-medium">Preço Mínimo</Card.Title>
				<MinPrice class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{formatPrice(min(data?.precos))}</div>
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
				<div class="text-2xl font-bold">
					{formatPrice(median(data?.precos))}
				</div>
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
				<div class="text-2xl font-bold">{formatPrice(mean(data?.precos))}</div>
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
				<div class="text-2xl font-bold">{formatPrice(max(data?.precos))}</div>
				<!-- <p class="text-xs text-muted-foreground">+201 since last hour</p> -->
			</Card.Content>
		</Card.Root>
	</div>
	<Histogram data={data?.precos} />

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
