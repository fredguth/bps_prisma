<script lang="ts">
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

  $: pageNumber = (skip - (skip % take)) / take +1|| 0
  $: pageCount = (totalRows - (totalRows % take)) / take +1  || 0
  $: pagesShowing = getPagesShowing(pageNumber, pageCount)
  function getPagesShowing(pageNumber:number, pageCount:number) {

    let min = Math.max(1, pageNumber - 4)
    let max = Math.min(pageCount, pageNumber + 4)
    let r = Array.from({ length: max-min+1 }, (_, i) => min + i)
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
  <article bind:this={element} style="height:calc(100% - {height}px)">
    <slot />
  </article>

  <footer class:container={true}>
    <aside>
      {#if totalRows > 0}
        Mostrando <span class="font-family:system-ui px-1 font-medium">{skip.toLocaleString()}</span>
        a
        <span class="font-family:system-ui px-1 font-medium">{(skip + take).toLocaleString()}</span> de
        <span class="font-family:system-ui px-1 font-medium">{totalRows.toLocaleString()}</span>
      {:else}
        Não há registros.
      {/if}
    </aside>

    <Pagination {pageNumber} {pageCount} {pagesShowing} on:click />
  </footer>
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

  header,
  footer {
    min-height: 8px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header.container,
  footer.container {
    height: 48px;
  }
  footer {
    border-top: 1px solid #e0e0e0;
  }

  article {
    position: relative;
    /* height:calc(100% - 96px); */
    overflow: auto;
    scrollbar-width: thin;
  }

  article::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  article::-webkit-scrollbar-track {
    background: #f5f5f5;
  }
  article::-webkit-scrollbar-thumb {
    background: #c2c2c2;
  }
  article::-webkit-scrollbar-thumb:hover {
    background: #9e9e9e;
  }
</style>
