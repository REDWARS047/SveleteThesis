<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
    Button,
    Dropdown,
    DropdownItem,
    Checkbox,
    ButtonGroup,
  } from 'flowbite-svelte';
  import { Section } from 'flowbite-svelte-blocks';
  import { PlusOutline, ChevronDownOutline, FilterSolid, ChevronRightOutline, ChevronLeftOutline } from 'flowbite-svelte-icons';
  import paginationData from '/src/utils/advancedTable.json';
  
  // Define an interface for your new data structure
  interface Person {
    id: number;
    last_name: string;
    first_name: string;
    gender: string;
    contact: string;
    course: string;
    face: string;
    plate_number: string;
  }

  // Type the imported data
  const data: Person[] = paginationData;

  // CSS class strings
  let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
  let innerDivClass = 'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
  let searchClass = 'w-full md:w-1/2 relative';
  let svgDivClass = 'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
  let classInput = 'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10';

  // Pagination and filtering variables
  let searchTerm: string = '';
  let currentPosition: number = 0;
  const itemsPerPage: number = 10;
  const showPage: number = 5;
  let totalPages: number = 0;
  let pagesToShow: number[] = [];
  let totalItems: number = data.length;
  let startPage: number = 1;
  let endPage: number = 1;

  // Functions for pagination and filtering
  const updateDataAndPagination = () => {
    const currentPageItems = data.slice(currentPosition, currentPosition + itemsPerPage);
    renderPagination(currentPageItems.length);
  };

  const loadNextPage = () => {
    if (currentPosition + itemsPerPage < data.length) {
      currentPosition += itemsPerPage;
      updateDataAndPagination();
    }
  };

  const loadPreviousPage = () => {
    if (currentPosition - itemsPerPage >= 0) {
      currentPosition -= itemsPerPage;
      updateDataAndPagination();
    }
  };

  const renderPagination = (totalItems: number) => {
    totalPages = Math.ceil(data.length / itemsPerPage);
    const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);

    startPage = currentPage - Math.floor(showPage / 2);
    startPage = Math.max(1, startPage);
    endPage = Math.min(startPage + showPage - 1, totalPages);

    pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const goToPage = (pageNumber: number) => {
    currentPosition = (pageNumber - 1) * itemsPerPage;
    updateDataAndPagination();
  };

  // Svelte reactive statements
  $: startRange = currentPosition + 1;
  $: endRange = Math.min(currentPosition + itemsPerPage, totalItems);

  onMount(() => {
    // Call renderPagination when the component initially mounts
    renderPagination(data.length);
  });

  $: currentPageItems = data.slice(currentPosition, currentPosition + itemsPerPage);
  $: filteredItems = data.filter((item: Person) =>
    item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.plate_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<Section name="advancedTable" classSection="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
  <TableSearch
    placeholder="Search"
    hoverable={true}
    bind:inputValue={searchTerm}
    {divClass}
    {innerDivClass}
    {searchClass}
    {classInput}
  >
    <div
      slot="header"
      class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
    >
      <Button>
        <PlusOutline class="h-3.5 w-3.5 mr-2" /> Add Person
      </Button>
      <Button color="alternative">
        Actions<ChevronDownOutline class="w-3 h-3 ml-2 " />
      </Button>
      <Dropdown class="w-44 divide-y divide-gray-100">
        <DropdownItem>Mass Edit</DropdownItem>
        <DropdownItem>Delete all</DropdownItem>
      </Dropdown>
      <Button color="alternative">
        Filter<FilterSolid class="w-3 h-3 ml-2 " />
      </Button>
      <Dropdown class="w-48 p-3 space-y-2 text-sm">
        <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose Gender</h6>
        <li>
          <Checkbox>Male</Checkbox>
        </li>
        <li>
          <Checkbox>Female</Checkbox>
        </li>
        <li>
          <Checkbox>Other</Checkbox>
        </li>
      </Dropdown>
    </div>
    <TableHead>
      <TableHeadCell padding="px-4 py-3" scope="col">Last Name</TableHeadCell>
      <TableHeadCell padding="px-4 py-3" scope="col">First Name</TableHeadCell>
      <TableHeadCell padding="px-4 py-3" scope="col">Gender</TableHeadCell>
      <TableHeadCell padding="px-4 py-3" scope="col">Contact</TableHeadCell>
      <TableHeadCell padding="px-4 py-3" scope="col">Course</TableHeadCell>
      <TableHeadCell padding="px-4 py-3" scope="col">Face</TableHeadCell>
      <TableHeadCell padding="px-4 py-3" scope="col">Plate Number</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#if searchTerm !== ''}
        {#each filteredItems as item (item.id)}
          <TableBodyRow>
            <TableBodyCell tdClass="px-4 py-3">{item.last_name}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.first_name}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.gender}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.contact}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.course}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.face}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.plate_number}</TableBodyCell>
          </TableBodyRow>
        {/each}
      {:else}
        {#each currentPageItems as item (item.id)}
          <TableBodyRow>
            <TableBodyCell tdClass="px-4 py-3">{item.last_name}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.first_name}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.gender}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.contact}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.course}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.face}</TableBodyCell>
            <TableBodyCell tdClass="px-4 py-3">{item.plate_number}</TableBodyCell>
          </TableBodyRow>
        {/each}
      {/if}
    </TableBody>
    <div
      slot="footer"
      class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
      </span>
      <ButtonGroup>
        <Button on:click={loadPreviousPage} disabled={currentPosition === 0}>
          <ChevronLeftOutline size="xs" class="m-1.5" />
        </Button>
        {#each pagesToShow as pageNumber}
          <Button on:click={() => goToPage(pageNumber)}>{pageNumber}</Button>
        {/each}
        <Button on:click={loadNextPage} disabled={totalPages === endPage}>
          <ChevronRightOutline size="xs" class="m-1.5" />
        </Button>
      </ButtonGroup>
    </div>
  </TableSearch>
</Section>
