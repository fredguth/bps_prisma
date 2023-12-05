<script lang="ts">
	import ItensTable from '$lib/components/itens-table.svelte'
	import { Check, CaretSort } from "radix-icons-svelte";
	import MaterialTable from '$lib/components/material-table.svelte'
	import Histogram from '$lib/components/histogram.svelte'
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Command from '$lib/components/ui/command'
	import * as Popover from "$lib/components/ui/popover";
	import { cn } from "$lib/utils";
	import { tick } from "svelte";

	import { runCommand } from '$lib/utils'
	import { median, min, max, mean } from 'd3'
	import { formatLocale } from 'd3-format'
	import {
		ArrowDownToLine as MinPrice,
		ArrowUpToLine as MaxPrice,
		AlignHorizontalSpaceAround as MdnPrice,
		AlignVerticalJustifyCenter as AvgPrice,
	} from 'lucide-svelte'

	import * as Card from '$lib/components/ui/card'
	import * as Select from '$lib/components/ui/select'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'

	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'

	const UFs = [
		'AC', // Acre
		'AL', // Alagoas
		'AP', // Amapá
		'AM', // Amazonas
		'BA', // Bahia
		'CE', // Ceará
		'DF', // Distrito Federal
		'ES', // Espírito Santo
		'GO', // Goiás
		'MA', // Maranhão
		'MT', // Mato Grosso
		'MS', // Mato Grosso do Sul
		'MG', // Minas Gerais
		'PA', // Pará
		'PB', // Paraíba
		'PR', // Paraná
		'PE', // Pernambuco
		'PI', // Piauí
		'RJ', // Rio de Janeiro
		'RN', // Rio Grande do Norte
		'RS', // Rio Grande do Sul
		'RO', // Rondônia
		'RR', // Roraima
		'SC', // Santa Catarina
		'SP', // São Paulo
		'SE', // Sergipe
		'TO', // Tocantins
	]

	export let data: PageData
	let openUF = false
	let valueUF = ""; // Brasil

	$: material = data?.material
	$: materials = [material]
	$: rows = data?.itens
	$: totalRows = data?.precos?.length || 0
	// $: console.log({ precos: data?.precos })
	$: take = data?.take
	// $: console.log({valueUF, openUF})

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
	function closeAndFocusTrigger(triggerId: string) {
	  openUF = false;
	  tick().then(() => {
		document.getElementById(triggerId)?.focus();
	  });
	}
</script>

<Card.Root class="w-full mb-5">
	<Card.Header>
		<Card.Title tag="h4"
			>Há {totalRows} registros de preço do material selecionado:</Card.Title
		>
	</Card.Header>
	<Card.Content>
		<MaterialTable table={materials} totalRows="1" />

		<Button class="w-full mt-5" href={`/material/`}>Alterar Material</Button>
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

	<Card.Root class="mt-5">
		<!-- <Card.Header></Card.Header> -->
		<Card.Content class="pt-5">
			<div class="grid grid-cols-6 gap-4">
				<div class="col-start-1 col-end-2">
					<span class="text-md font-semibold">Região:</span>
					<Popover.Root bind:open={openUF} let:ids>
						<Popover.Trigger asChild let:builder>
						  <Button
							builders={[builder]}
							variant="outline"
							role="combobox"
							aria-expanded={openUF}
							class="w-[200px] justify-between"
						  >
							{valueUF?valueUF:"Brasil"}
							<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						  </Button>
						</Popover.Trigger>
						<Popover.Content class="w-[200px] p-0">
						  <Command.Root>
							<Command.Input placeholder="Brasil" class="h-9" />
							<Command.Empty>Brasil</Command.Empty>
							<Command.Group class="z-50 rounded-md border h-52 overflow-y-auto shadow-md">
							  {#each UFs as item}
								<Command.Item
								  value={item}
								  onSelect={(currentValue) => {
									valueUF = currentValue;
									openUF = false;
									// closeAndFocusTrigger(ids.trigger);
								  }}
								>
								  {item}
								</Command.Item>
							  {/each}
							</Command.Group>
						  </Command.Root>
						</Popover.Content>
					  </Popover.Root>
					<!-- <Command.Root >
						<Input
							bind:value={uf}
							placeholder={uf ? uf : 'Brasil'}
							class="w-72"
						/>

						<Command.List
							class="z-50 rounded-md border h-52 overflow-y-auto shadow-md"
						>
							<Command.Empty>Brasil</Command.Empty>
							{#if uf}
								<Command.Item
									onSelect={() =>
										runCommand(() => {
											openUF = false
											uf = ''
										})}
									><Button class="w-full px-2">Brasil</Button></Command.Item
								>
							{/if}
							{#each UFs as item}
								<Command.Item
									value={item}
									onSelect={() =>
										runCommand(() => {
											uf = item
										})}
								>
									{item}
								</Command.Item>
							{/each}
						</Command.List>
					</Command.Root> -->
				</div>
				<div class="col-start-2 col-end-3">
					<span class="text-md font-semibold">Data Início:</span>
					<Input type="date" class="w-[180px]" />
				</div>
				<div class="col-start-4 col-end-7">
					<span class="text-md font-semibold">Buscar:</span>
					<Input type="text" class="w-full" />
				</div>
			</div></Card.Content
		>
	</Card.Root>
	<div class="flex flex-col max-h-[600px] mt-2">
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



<!--
<script lang="ts">


	const frameworks = [
	  {
		value: "sveltekit",
		label: "SvelteKit"
	  },
	  {
		value: "next.js",
		label: "Next.js"
	  },
	  {
		value: "nuxt.js",
		label: "Nuxt.js"
	  },
	  {
		value: "remix",
		label: "Remix"
	  },
	  {
		value: "astro",
		label: "Astro"
	  }
	];

	let open = false;
	let value = "";

	$: selectedValue =
	  frameworks.find((f) => f.value === value)?.label ?? "Select a framework...";
	-->
