<script lang="ts">
	import { get, readable } from "svelte/store";
	import {
		Render,
		Subscribe,
		createRender,
		createTable
	} from "svelte-headless-table";
	import * as Table from "$lib/components/ui/table";
	import {
		addColumnFilters,
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from "svelte-headless-table/plugins";
	import {
		DataTableCheckbox,
		DataTableTitleCell,
		DataTableStatusCell,
		DataTableRowActions,
		DataTablePriorityCell,
		DataTableColumnHeader,
		DataTableToolbar,
		DataTablePagination
	} from ".";



	export let tableModel;

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;
</script>

<div class="space-y-4">
	<DataTableToolbar {tableModel} />
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<Table.Head {...attrs}>
										{#if cell.id !== "select" && cell.id !== "actions"}
											<DataTableColumnHeader {props}
												><Render
													of={cell.render()}
												/></DataTableColumnHeader
											>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === "task"}
											<div class="w-[80px]">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<DataTablePagination {tableModel} />
</div>
