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

    export let data: PageData;

    $: material = data?.material
    </script>
    <Card.Root class="w-full mt-10">
        <Card.Header>
          <Card.Title tag="h4">Material selecionado:</Card.Title>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Body>
            <Table.Row>
              <Table.Cell>CodigoBR</Table.Cell>
              <Table.Cell>{material?.codigobr}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Descrição</Table.Cell>
              <Table.Cell>{material?.descricao}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Unidade</Table.Cell>
              <Table.Cell>{material?.unidade}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>PDM</Table.Cell>
              <Table.Cell>{material?.pdm}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Classe</Table.Cell>
              <Table.Cell>{material?.classe}</Table.Cell>
            </Table.Row>
          </Table.Body>
          </Table.Root>
          </Card.Content>
          </Card.Root>