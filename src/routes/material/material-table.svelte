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
</script>

<Datatable {handler} {take} {skip} {totalRows} on:click={handleChange}>
	<table class="w-full caption-bottom text-sm border-separate relative">
		<thead class="sticky start-0">
			<tr>
				<th class="${ThStyle} lg:w-62">Classe</th>
				<th class="${ThStyle} lg:w-28">Padrão</th>
				<th class="${ThStyle} lg:w-12">Material</th>
				<th class="${ThStyle} lg:w-fit">Descricao</th>
				<th class="${ThStyle} lg:w-32">Unidade</th>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr
					class="px-2 text-left align-middle font-medium text-muted-foreground even:bg-blue-50 odd:bg-white"
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
			<tfoot class="sticky end-0 h-10 bg-slate-50">
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
<!-- table {
    border-collapse: separate;
    border-spacing: 0;
}

thead {
    position: sticky;
    inset-block-start: 0; -->
}