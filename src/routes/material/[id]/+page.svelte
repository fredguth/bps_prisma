<script lang="ts">
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

  export let data: PageData;

  $: material = data?.material;
  $: materials = [material]


</script>

<Card.Root class="w-full mb-10">
  <Card.Header>
    <Card.Title tag="h4">Material selecionado:</Card.Title>
  </Card.Header>
	<Card.Content>
		<div class="flex flex-col max-h-[600px]">
      <div class="flex-grow overflow-y-auto">
        <MaterialTable
          table={materials}
          totalRows = 1
        />
      </div>
      </div>
      <Button class="w-full mt-10" href= {`/material/`}>
        Alterar Material
      </Button>
	</Card.Content>
</Card.Root>