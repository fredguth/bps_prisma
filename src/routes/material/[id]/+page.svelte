<script lang="ts">
	import ItensTable from './itens-table.svelte'
	import MaterialTable from '../material-table.svelte'
	import * as Card from '$lib/components/ui/card'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import * as Table from '$lib/components/ui/table'
	import Filter from '$lib/components/filter.svelte'
	import type { MaterialState } from './types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { debounce } from '$lib/utils'

	export let data: PageData

	$: material = data?.material
	$: materials = [material]
	$: rows = data?.itens
	$: totalRows = data?.totalRows || 0
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
		<div class="flex flex-col">
			<div class="flex-grow overflow-y-auto">
				<MaterialTable table={materials} totalRows="1" />
			</div>
		</div>
		<Button class="w-full mt-10" href={`/material/`}>Alterar Material</Button>
	</Card.Content>
</Card.Root>

{#if totalRows}
	<div class="flex flex-col max-h-[1200px]">
		<div class="flex-grow overflow-y-auto">
			<ItensTable bind:table={rows} totalRows={totalRows} skip={0} take={take}
      on:change={handleChange}
			></ItensTable>
		</div>
	</div>
{/if}
