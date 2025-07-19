<script lang="ts">
  import Title from '$components/Title.svelte';
  import Icon from '@iconify/svelte';
  import TierTable from '$components/TierTable.svelte';
  import tierList from '$data/tierlist';

  type GameMode = 'Memory of Chaos' | 'Pure Fiction' | 'Apocalyptic Shadow';

  const gameModes: { id: GameMode; label: string; image: string }[] = [
    {
      id: 'Memory of Chaos',
      label: 'Hồi Ức Hỗ Độn',
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

</script>

<svelte:head>
  <title>Pom.moe - Tier List</title>
</svelte:head>

<!-- 3 ô chọn chế độ -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-6">
  {#each gameModes as mode}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class={`relative h-40 border rounded-lg shadow-lg cursor-pointer overflow-hidden group transition duration-300 ${
        selectedMode === mode.id ? 'border-white/70 brightness-100' : 'border-white/20 brightness-75 hover:brightness-90'
      }`}
      on:click={() => (selectedMode = mode.id)}
    >
      <img
        src={mode.image}
        alt={mode.label}
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-black/40" />
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-white text-2xl font-bold" style="text-shadow: 1.5px 1.5px 1.5px black">{mode.label}</span>
      </div>
    </div>
  {/each}
</div>

<!-- Tiêu đề -->
<h2 class="text-2xl font-bold text-white text-center mb-4">
  <Title>Tier List {selectedLabel}</Title>
</h2>

<!-- Bảng tier list -->
<TierTable data={tierList[selectedMode]} />
