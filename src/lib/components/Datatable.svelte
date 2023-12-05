<script lang="ts">
	import { min } from 'd3'

	import type { DataHandler } from '@vincjo/datatables'
	import Pagination from '$lib/components/pagination.svelte'
	import { Input } from '$lib/components/ui/input'
	import Filter from '$lib/components/filter.svelte'
	import { cn } from '$lib/utils'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	type T = $$Generic<Row>

	export let handler: DataHandler<T>

	const search = false
	const rowsPerPage = true
	const rowCount = true
	const pagination = true

	export let skip: number
	export let take: number
	export let totalRows: number

	$: selected = totalRows < 2
	$: pageNumber = (skip - (skip % take)) / take + 1 || 0
	$: pageCount = (totalRows - (totalRows % take)) / take + 1 || 0
	$: pagesShowing = getPagesShowing(pageNumber, pageCount)
	$: showing = Math.min((skip + take), totalRows)

	function getPagesShowing(pageNumber: number, pageCount: number) {
		let min = Math.max(1, pageNumber - 4)
		let max = Math.min(pageCount, pageNumber + 4)
		let r = Array.from({ length: max - min + 1 }, (_, i) => min + i)
		if (r[0] > 1) r[0] = -1
		if (r[r.length - 1] < pageCount) r[r.length - 1] = -1

		return r
	}

	let element: HTMLElement
	let clientWidth = 1000

	const height =
		(search || rowsPerPage ? 48 : 8) + (rowCount || pagination ? 48 : 8)

	handler.on('change', () => {
		if (element) element.scrollTop = 0
	})
	// const handleClick = (event:CustomEvent)=>{
	//   const { page } = event.detail?.page

	//   dispatch('click', {
	//     skip: (page -1) * take
	//   })
	// }
</script>

<section bind:clientWidth class={$$props.class ?? ''}>
	<!-- <article bind:this={element} style="height:calc(100% - {height}px)">

	</article> -->
	<slot />
	{#if !selected}
		<footer  class="h-12 z-100">
			<aside>
				{#if totalRows > 0}
					Mostrando <span class="font-family:system-ui px-1 font-medium"
						>{skip.toLocaleString()}</span
					>
					a
					<span class="font-family:system-ui px-1 font-medium"
						>{showing.toLocaleString()}</span
					>
					de
					<span class="font-family:system-ui px-1 font-medium"
						>{totalRows.toLocaleString()}</span
					>
				{:else}
					Não há registros.
				{/if}
			</aside>

			<Pagination {pageNumber} {pageCount} {pagesShowing} on:click />
		</footer>
	{/if}
</section>

<style>
	aside {
		color: #616161;
		line-height: 32px;
		font-size: 14px;
	}
	section {
		height: 100%;
	}

	section :global(table) {
		border-collapse: separate;
		border-spacing: 0;
		width: 100%;
	}

	section :global(thead) {
		position: sticky;
		inset-block-start: 0;
		z-index: 1;
	}


	footer {
		min-height: 8px;
		padding: 0 16px;
		position: sticky;
		background: white;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	footer {
		border-top: 1px solid #e0e0e0;
	}


</style>
