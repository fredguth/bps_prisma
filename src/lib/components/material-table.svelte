<script lang="ts">
	import { DataHandler } from '@vincjo/datatables'
	import Datatable from '$lib/components/Datatable.svelte'
	import { toTitleCase } from '$lib/utils'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	import type { Material } from '@prisma/client'
	import { goto } from '$app/navigation'

	export let table: Material[]
	export let totalRows: number = 0
	export let skip: number = 0
	export let take: number = 0

	const handler = new DataHandler(table, { rowsPerPage: take })
	$: handler.setRows(table)
	$: rows = handler.getRows()
	$: selected = totalRows < 2
	$: pageNumber = (skip - (skip % take)) / take + 1 || 0
	$: pageCount = (totalRows - (totalRows % take)) / take + 1 || 0


	const handleChange = (event: CustomEvent) => {
		let { page } = event?.detail
		skip = (page - 1) * take
		dispatch('change', { skip })
	}

	const ThStyle =
		'h-10 border-top-1 px-2 text-left align-middle font-medium bg-slate-100'
	const TfStyle =
		'h-10 px-2 text-left align-middle font-medium bg-slate-100 z-20'
	const TdStyle = 'text-xs p-2 align-middle tabular-nums font-mono'
</script>

<Datatable {handler} {take} {skip} {totalRows} on:click={handleChange}>
	<table class="w-full caption-bottom text-sm border-separate relative">
		<thead class="sticky top-0 h-10 bg-slate-50 z-50">
			<tr>
				<th class="${ThStyle} ">Classe</th>
				<th class="${ThStyle} ">Padrão</th>
				<th class="${ThStyle} ">Material</th>
				<th class="${ThStyle} w-1/2">Descricao</th>
				<th class="${ThStyle} ">Unidade</th>
			</tr>
		</thead>
		<tbody class="overflow-y-auto">
			{#each $rows as row}
				<tr
					class="px-2 text-left align-middle font-medium text-muted-foreground even:bg-blue-50 odd:bg-white cursor-pointer hover:bg-blue-100"
					on:click={() => {
						goto(`/material/${row.id}`)
					}}
				>
					<td class={TdStyle}>{toTitleCase(row.classe)}</td>
					<td class={TdStyle}>{toTitleCase(row.pdm)}</td>
					<td class={TdStyle}>{row.codigobr}</td>
					<td class={TdStyle}>{toTitleCase(row.descricao)}</td>
					<td class={TdStyle}>{toTitleCase(row.unidade)}</td>
				</tr>
			{/each}
		</tbody>
		{#if !selected}
			<tfoot class="sticky bottom-12 h-8 bg-slate-50 z-50">
				<tr>
					<th class={TfStyle}>Classe</th>
					<th class={TfStyle}>Padrão</th>
					<th class={TfStyle}>Material</th>
					<th class={TfStyle}>Descricao</th>
					<th class={TfStyle}>Unidade</th>
				</tr>
			</tfoot>
		{/if}
	</table>
</Datatable>
