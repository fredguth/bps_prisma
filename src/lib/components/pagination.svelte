<script lang="ts">
  export let pageNumber: number
  export let pageCount: number
  export let pagesShowing: any[]
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  function onPageClicked(page:number){
    dispatch('click', {page})
  }

</script>

<section>
  {#if pagesShowing === undefined}
    <button
      type="button"
      class="small"
      class:disabled={pageNumber === 1}
      on:click={() =>onPageClicked(pageNumber-1)}
    >
      &#10094;
    </button>
    <button class="page font-family:system-ui">page <b>{pageNumber}</b></button>
    <button type="button" class="small" on:click={() => onPageClicked(pageNumber + 1)}>
      &#10095;
    </button>
  {:else}
    <button
      type="button"
      class:disabled={pageNumber === 1}
      on:click={() => onPageClicked(pageNumber -1)}
    >
      Anterior
    </button>
    {#each pagesShowing as page}
      <button
        type="button"
        class=" font-family:system-ui"
        class:active={pageNumber === page}
        class:disabled={page === -1}
        on:click={() => onPageClicked(page)}
      >
      {#if page === -1}
      {@html "&hellip;"}
    {:else}
      {page}
    {/if}
      </button>
    {/each}
    <button
      type="button"

      class:disabled={pageNumber === pageCount}
      on:click={() => onPageClicked(pageNumber +1)}
    >
      Próximo
    </button>
  {/if}
</section>

<style>
    section {
        display: flex;
    }
    button {
        background: inherit;
        height: 32px;
        width: 32px;
        color: #616161;
        cursor: pointer;
        font-size: 13px;
        margin: 0;
        padding: 0;
        transition: all, 0.2s;
        line-height: 32px;
        border: 1px solid #e0e0e0;
        border-right: none;
        border-radius: 0;
        outline: none;
    }
    button:first-child {
        border-radius: 4px 0 0 4px;
    }
    button:last-child {
        border-right: 1px solid #e0e0e0;
        border-radius: 0 4px 4px 0;
    }

    button:first-child:not(.small),
    button:last-child:not(.small) {
        min-width: 72px;
    }

    button:not(.active):hover {
        background: #eee;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
    button.page {
        width: 72px;
        background: #fafafa;
    }
    button.page:hover {
        background: #fafafa;
        cursor: default;
    }
    button.ellipse:hover {
        background: inherit;
        cursor: default;
    }
    button.active {
        background: #eee;
        font-weight: bold;
        cursor: default;
    }
    button.disabled {
        color: #bdbdbd;
    }
    button.disabled:hover {
        background: inherit;
        cursor: default;
    }
</style>
