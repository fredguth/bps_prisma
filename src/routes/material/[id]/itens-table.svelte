<script lang="ts">
	import { DataHandler } from '@vincjo/datatables'
	import Datatable from '$lib/components/Datatable.svelte'
	import { toTitleCase } from '$lib/utils'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	import type { Material } from '@prisma/client'

	export let table: Material[]
	export let totalRows: number = 0
	export let skip: number = 0
	export let take: number = 0

	const handler = new DataHandler(table, { rowsPerPage: take })
	$: handler.setRows(table)
	$: rows = handler.getRows()
	$: selected = totalRows < 2

	const handleChange = (event: CustomEvent) => {
		let { page } = event?.detail
		skip = (page - 1) * take
		dispatch('change', { skip })
	}

	const ThStyle =
		'sticky top-0 h-10 border-top-1 px-2 text-left align-middle font-medium bg-slate-100'
	const TfStyle =
		'sticky bottom-0 h-10 px-2 text-left align-middle font-medium bg-slate-100 z-20'
	const TdStyle = 'text-xs p-2 align-middle tabular-nums font-mono'
	const TdRightStyle = '${TdStryle} text-right pr-2 font-mono'
</script>

<Datatable {handler} {take} {skip} {totalRows} on:click={handleChange}>
	<table class="w-full caption-bottom text-sm border-separate relative">
		<thead class="sticky top-0 h-10 bg-slate-50 z-50">
			<tr>
				<th class="${ThStyle}">Data</th>
				<th class="${ThStyle}">Anvisa</th>
				<th class="${ThStyle} w-72">Fornecedor</th>
				<th class="${ThStyle} w-72">Fabricante</th>
				<th class="${ThStyle} text-right">Unidades</th>
				<th class="${ThStyle} text-right">Valor Unitário</th>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr
					class="px-2 text-left align-middle font-medium text-muted-foreground even:bg-blue-50 odd:bg-white"
				>
					<td class={TdStyle}
						>{row.data.toLocaleString('pt-BR', {
							dateStyle: 'short',
						})}</td
					>
					<td class={TdStyle}>{row.anvisa || ''}</td>
					<td class={TdStyle}>{row.fornecedor || ''}</td>
					<td class={TdStyle}>{row.fabricante || ''}</td>
					<td class={TdRightStyle}>{row.qtde.toLocaleString('pt-BR') || '0'}</td>
					<td class={TdRightStyle}
						>{row.valor_unitario?.toLocaleString('pt-BR', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}) || ''}</td
					>
				</tr>
			{/each}
		</tbody>

		<tfoot class="sticky bottom-12 h-8 bg-slate-50 z-50">
			<tr>
				<th class="${ThStyle} ">Data</th>
				<th class="${ThStyle} ">Anvisa</th>
				<th class="${ThStyle} w-72">Fornecedor</th>
				<th class="${ThStyle} w-72t">Fabricante</th>
				<th class="${ThStyle} text-right">Unidades</th>
				<th class="${ThStyle} text-right">Valor Unitário</th>
			</tr>
		</tfoot>
	</table>
</Datatable>