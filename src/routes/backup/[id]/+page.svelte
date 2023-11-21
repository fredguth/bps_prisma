<script lang="ts">
  import { onMount } from "svelte";
  import pdms from "$lib/assets/pdm.json";
  import unidades from "$lib/assets/unidade.json";
  import classes from "$lib/assets/classe.json";
  import TypeAhead from "$lib/components/type-ahead.svelte";
  import FacetedFilter from "$lib/components/faceted-filter.svelte";
  import { Input } from "$lib/components/ui/input";
  import * as Table from "$lib/components/ui/table";
  import * as Card from "$lib/components/ui/card";
  import { page } from "$app/stores";
  import { throttle } from "$lib/utils";
  import type { PageData } from "../$types";
  import { goto } from "$app/navigation";

  // Simple Data Table - https://vincjo.fr/datatables/remote/home
  // import {
  //   DataHandler,
  //   type State,
  //   Datatable,
  //   Th,
  //   ThFilter,
  // } from "@vincjo/datatables/remote";
  // import { myLoadFunction } from "./my-api-helper";

  // const handler = new DataHandler([], { rowsPerPage: 10 });
  // const rows = handler.getRows();

  // handler.onChange((state: State) => myLoadFunction(state));

  // handler.invalidate();
  //
  export let data: PageData;

  $: material = data?.material;
</script>

<Card.Root class="w-full mt-10">
  <Card.Header>
    <Card.Title tag="h4">Material selecionado:</Card.Title>
  </Card.Header>
  <Card.Content>
    <Table.Root>
      <Table.Body>
        <!-- First row for headers -->
        <Table.Row>
          <Table.Cell>Classe</Table.Cell>
          <Table.Cell>Padrão</Table.Cell>
          <Table.Cell>Código</Table.Cell>
          <Table.Cell>Descrição</Table.Cell>
          <Table.Cell>Unidade</Table.Cell>


        </Table.Row>
        <!-- Second row for values -->
        <Table.Row>
          <Table.Cell>{material?.classe}</Table.Cell>
          <Table.Cell>{material?.pdm}</Table.Cell>
          <Table.Cell>{material?.codigobr}</Table.Cell>
          <Table.Cell>{material?.descricao}</Table.Cell>
          <Table.Cell>{material?.unidade}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>


<!-- <Datatable {handler}>
  <table>
    <thead>
      <tr>
        <Th {handler} orderBy="first_name">First Name</Th>
        <Th {handler} orderBy="last_name">Last Name</Th>
        <Th {handler} orderBy="email">Email</Th>
      </tr>
      <tr>
        <ThFilter {handler} filterBy="first_name" />
        <ThFilter {handler} filterBy="last_name" />
        <ThFilter {handler} filterBy="email" />
      </tr>
    </thead>
    <tbody>
      {#each $rows as row}
        <tr>
          <td>{row.first_name}</td>
          <td>{row.last_name}</td>
          <td>{row.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</Datatable> -->
