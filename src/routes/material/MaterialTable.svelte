<script lang="ts">
import { get, readable } from "svelte/store";
import {
  createRender,
  createTable
} from "svelte-headless-table";
import {
  addColumnFilters,
  addHiddenColumns,
  addPagination,
  addSelectedRows,
  addSortBy,
  addTableFilter
} from "svelte-headless-table/plugins";
import {
  DataTable,
  DataTableCheckbox,
  DataTableTitleCell,
  DataTableStatusCell,
  DataTableRowActions,
  DataTablePriorityCell,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTablePagination
} from "$lib/components/ui/datatable"
import data from "$lib/components/data/tasks.json";

export let rows;

const table = createTable(readable(data), {
  select: addSelectedRows(),
  sort: addSortBy({
    toggleOrder: ["asc", "desc"]
  }),
  page: addPagination(),
  filter: addTableFilter({
    fn: ({ filterValue, value }) => {
      return value.toLowerCase().includes(filterValue.toLowerCase());
    }
  }),
  colFilter: addColumnFilters(),
  hide: addHiddenColumns()
});

const columns = table.createColumns([
  table.display({
    id: "select",
    header: (_, { pluginStates }) => {
      const { allPageRowsSelected } = pluginStates.select;
      return createRender(DataTableCheckbox, {
        checked: allPageRowsSelected,
        "aria-label": "Select all"
      });
    },
    cell: ({ row }, { pluginStates }) => {
      const { getRowState } = pluginStates.select;
      const { isSelected } = getRowState(row);
      return createRender(DataTableCheckbox, {
        checked: isSelected,
        "aria-label": "Select row",
        class: "translate-y-[2px]"
      });
    },
    plugins: {
      sort: {
        disable: true
      }
    }
  }),
  table.column({
    accessor: "id",
    header: () => {
      return "Task";
    },
    id: "task",
    plugins: {
      sort: {
        disable: true
      }
    }
  }),
  table.column({
    accessor: "title",
    header: "Title",
    id: "title",
    cell: ({ value, row }) => {
      if (row.isData()) {
        return createRender(DataTableTitleCell, {
          value,
          labelValue: row.original.label
        });
      }
      return value;
    }
  }),
  table.column({
    accessor: "status",
    header: "Status",
    id: "status",
    cell: ({ value }) => {
      return createRender(DataTableStatusCell, {
        value
      });
    },
    plugins: {
      colFilter: {
        fn: ({ filterValue, value }) => {
          if (filterValue.length === 0) return true;
          if (
            !Array.isArray(filterValue) ||
            typeof value !== "string"
          )
            return true;
          return filterValue.some((filter) => {
            return value.includes(filter);
          });
        },
        initialFilterValue: [],
        render: ({ filterValue }) => {
          return get(filterValue);
        }
      }
    }
  }),
  table.column({
    accessor: "priority",
    id: "priority",
    header: "Priority",
    cell: ({ value }) => {
      return createRender(DataTablePriorityCell, {
        value
      });
    },
    plugins: {
      colFilter: {
        fn: ({ filterValue, value }) => {
          if (filterValue.length === 0) return true;
          if (
            !Array.isArray(filterValue) ||
            typeof value !== "string"
          )
            return true;

          return filterValue.some((filter) => {
            return value.includes(filter);
          });
        },
        initialFilterValue: [],
        render: ({ filterValue }) => {
          return get(filterValue);
        }
      }
    }
  }),
  table.display({
    id: "actions",
    header: () => {
      return "";
    },
    cell: ({ row }) => {
      if (row.isData() && row.original) {
        return createRender(DataTableRowActions, {
          row: row.original
        });
      }
      return "";
    }
  })
]);

const tableModel = table.createViewModel(columns);
</script>

<DataTable {tableModel} />