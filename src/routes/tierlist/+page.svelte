<script lang="ts">
  import Title from '$components/Title.svelte';
  import Icon from '@iconify/svelte';
  import TierTableDesktop from '$components/TierTable.svelte';
  import TierTableMobile from '$components/TierTableMobile.svelte';
  import tierList from '$data/tierlist';
  import elements from '$data/elements';
  import paths from '$data/paths';
  import charactersStore from '$data/characters';
  import { writable, derived } from 'svelte/store';
  import { onDestroy, onMount } from 'svelte';
  import * as htmlToImage from 'dom-to-image-more';
  import { exportTierListImage } from '$utils/exportTierImage.ts';

  type GameMode = 'Memory of Chaos' | 'Pure Fiction' | 'Apocalyptic Shadow';

  const gameModes = [
    {
      id: 'Memory of Chaos',
      label: 'Hồi Ức Hỗn Độn',
      image: '/images/events/MOC.png',
    },
    {
      id: 'Pure Fiction',
      label: 'Kể Chuyện Hư Cấu',
      image: '/images/events/PF.png',
    },
    {
      id: 'Apocalyptic Shadow',
      label: 'Ảo Ảnh Tận Thế',
      image: '/images/events/AS.png',
    },
  ];

  let selectedMode: GameMode = 'Memory of Chaos';
  $: selectedLabel = gameModes.find((m) => m.id === selectedMode)?.label || selectedMode;

  const filter = writable({
    elements: Object.fromEntries($elements.map((e) => [e.id, true])),
    paths: Object.fromEntries($paths.map((p) => [p.id, true])),
    rarities: { 4: true, 5: true },
  });

  function toggleFilter(type: 'elements' | 'paths' | 'rarities', id: string | number) {
    filter.update((f) => {
      const current = Object.values(f[type]);
      const trueCount = current.filter((e) => e).length;
      f[type][id] = !f[type][id];

      if (trueCount === current.length) {
        for (const key in f[type]) f[type][key] = key == id;
      } else if (trueCount === 1 && !f[type][id]) {
        for (const key in f[type]) f[type][key] = true;
      }

      return { ...f };
    });
  }

  const isVisibleStore = derived(
    [charactersStore, filter],
    ([$characters, $filter]) =>
      (id: string) => {
        const c = $characters.find((c) => c.id === id);
        return (
          c &&
          !c.hidden &&
          $filter.rarities[c.rarity] &&
          $filter.elements[c.element] &&
          $filter.paths[c.path]
        );
      }
  );

  let isVisibleFn: (id: string) => boolean = () => true;
  const unsubscribe = isVisibleStore.subscribe((fn) => {
    isVisibleFn = fn;
  });
  onDestroy(unsubscribe);

  let isMobile = false;
  onMount(() => {
    isMobile = window.matchMedia('(max-width: 767px)').matches;
  });

  let editMode = false;
  let tableRef: HTMLDivElement;

  async function downloadImage() {
    if (!tableRef) return;
    await exportTierListImage(tableRef, `${selectedMode.replace(/\s+/g, '_')}-TierList.png`, selectedLabel);
  }
</script>

<svelte:head>
  <title>Pom.moe - Tier List</title>
</svelte:head>

<!-- Game Mode Selector -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-6">
  {#each gameModes as mode}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class={`relative h-20 md:h-40 border rounded-lg shadow-lg cursor-pointer overflow-hidden group transition duration-300 ${
        selectedMode === mode.id ? 'border-white/100 brightness-100' : 'border-white/20 brightness-75 hover:brightness-90'
      }`}
      on:click={() => (selectedMode = mode.id)}
    >
      <img
        src={mode.image}
        alt={mode.label}
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-black/40" />
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-white text-2xl font-bold" style="text-shadow: 1.5px 1.5px 1.5px black">{mode.label}</span>
      </div>
    </div>
  {/each}
</div>

<!-- Title -->
<h2 class="text-2xl font-bold text-center mb-2">
  <Title>Tier List {selectedLabel}</Title>
</h2>

<h2 class="text-white/80 text-base text-center mb-4">
  <p>Đây là Tier List được làm dựa trên 
    <a href="https://www.prydwen.gg/star-rail/tier-list" 
			 class="text-blue-500 hover:text-blue-400 transition-colors font-bold underline"
			 target="_blank"
			 rel="noopener noreferrer"
			 >Prydwen</a>
  <p>Bạn có thể sắp xếp tùy chỉnh khi ấn nút <u>"Chỉnh sửa"</u> bên dưới để bật chế độ Edit Mode
  <p>Sau đó bạn có thể tải ảnh Tier List của bạn xuống bằng nút Tải bên cạnh
  </p>
  <p class="italic text-sm mt-2">LƯU Ý: tải ảnh xuống chỉ có thể dùng khi Edit Mode đang bật</p>
</h2>

<!-- EDIT TOOLS -->
<div class="flex justify-center gap-4 mb-10">
  <button on:click={() => editMode = !editMode} class="border border-white/50 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
    {editMode ? 'Tắt chỉnh sửa' : 'Chỉnh sửa'}
  </button>
  <button on:click={downloadImage} class="border border-white/50 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
    Tải bảng Tier List
  </button>
</div>

<!-- Filters -->
<div class="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 px-2">
  <!-- Rarities -->
  <div class="flex gap-2 flex-wrap justify-center">
    {#each ['5', '4'] as rarity}
      <button
        class="duration-150 hover:opacity-80 border border-white/60 rounded-md p-1 {($filter.rarities[rarity]) ? '' : 'opacity-30'}"
        on:click={() => toggleFilter('rarities', rarity)}
      >
        <img class="h-8 w-8" src={`/images/rarity${rarity}.png`} alt="Rarity {rarity}" />
      </button>
    {/each}
  </div>

  <!-- Elements -->
  <div class="flex gap-2 flex-wrap justify-center">
    {#each $elements as element}
      <button
        class="duration-150 hover:opacity-80 border border-white/60 rounded-md p-1 {($filter.elements[element.id]) ? '' : 'opacity-30'}"
        on:click={() => toggleFilter('elements', element.id)}
      >
        <img class="h-8 w-8" src="/images/elements/{element.id}.png" alt={element.name} />
      </button>
    {/each}
  </div>

  <!-- Paths -->
  <div class="flex gap-2 flex-wrap justify-center">
    {#each $paths as path}
      <button
        class="duration-150 hover:opacity-80 border border-white/60 rounded-md p-1 {($filter.paths[path.id]) ? '' : 'opacity-30'}"
        on:click={() => toggleFilter('paths', path.id)}
      >
        <img class="h-8 w-8" src="/images/paths/{path.id}.png" alt={path.name} />
      </button>
    {/each}
  </div>
</div>

<!-- Tier Tables -->
<div bind:this={tableRef}>
  <TierTableDesktop data={tierList[selectedMode]} isVisible={isVisibleFn} {editMode}
    on:update={(e) => tierList[selectedMode] = e.detail} />
  <TierTableMobile data={tierList[selectedMode]} isVisible={isVisibleFn} {editMode} 
    on:update={(e) => tierList[selectedMode] = e.detail} />
</div>
