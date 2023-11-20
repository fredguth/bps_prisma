<script lang="ts">
    import { DataHandler, Th, ThFilter, type State } from '@vincjo/datatables/remote'
    import Datatable from './Datatable.svelte'
    import { reload } from './api'
    export let data: any[]

    const handler = new DataHandler(data?.dataset, { rowsPerPage: 100 })
    const rows = handler.getRows()

    handler.onChange((state: State) => reload(state))

    $: dataset = data?.dataset;
    $: console.log(dataset, handler, rows)
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="id">ID</Th>
                <Th {handler} orderBy="title">Title</Th>
                <Th {handler} orderBy="completed">Completed</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="id"/>
                <ThFilter {handler} filterBy="title"/>
                <ThFilter {handler} filterBy="completed"/>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.id}</td>
                    <td><b>{row.title}</b></td>
                    <td><span>{row.completed  ? '✅' : '❌'}</span></td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 2px 16px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #fafafa;
    }
    b {
        color: var(--r-primary);
        font-weight: normal;
        line-height: 16px;
        white-space:break-spaces;
    }
    span {
        padding-left: 8px;
    }
</style>
