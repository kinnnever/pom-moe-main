<script lang="ts">
  import CharacterCard from '../routes/characters/CharacterCard.svelte';
  import charactersStore from '$data/characters';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from 'svelte/store';

  export let data: Record<string, Record<string, string[]>>;
  export let isVisible: (id: string) => boolean;
  export let editMode: boolean = false;

  const dispatch = createEventDispatcher();
  const characters = get(charactersStore);
  const getCharacter = (id: string) => characters.find(c => c.id === id);

  const roles = ['DPS', 'Support DPS', 'Amplifier', 'Sustain'];
  const roleColors = {
    DPS: 'text-red-500',
    'Support DPS': 'text-purple-500',
    Amplifier: 'text-yellow-500',
    Sustain: 'text-green-500',
  };

  let stickyTop = 0;
  onMount(() => {
    const headerEl = document.getElementById('layout-header');
    if (headerEl) {
      stickyTop = headerEl.getBoundingClientRect().height;
    }

    // Auto-scroll event listeners
    window.addEventListener('dragover', handleAutoScroll);
    window.addEventListener('drop', stopAutoScroll);
    window.addEventListener('dragend', stopAutoScroll);
  });

  const tierColors = {
    T0: 'red-600',
    T0_5: 'red-500',
    T1: 'orange-400',
    T1_5: 'orange-300',
    T2: 'orange-200',
    T3: 'green-400',
    T4: 'green-300',
    T5: 'blue-200'
  };

  const bgtierColors = {
    T0: 'bg-red-600',
    T0_5: 'bg-red-500',
    T1: 'bg-orange-400',
    T1_5: 'bg-orange-300',
    T2: 'bg-orange-200',
    T3: 'bg-green-400',
    T4: 'bg-green-300',
    T5: 'bg-blue-200'
  };

  const formatTier = (tier: string) =>
    tier === 'T0_5' ? 'T0.5' :
    tier === 'T1_5' ? 'T1.5' :
    tier;

  let draggedId: string | null = null;

  function onDragStart(id: string) {
    draggedId = id;
  }

  function onDrop(tier: string, role: string) {
    if (!draggedId) return;

    const newData = structuredClone(data);

    // Xoá draggedId khỏi vị trí cũ
    for (const t in newData) {
      for (const r in newData[t]) {
        newData[t][r] = newData[t][r].filter(c => c !== draggedId);
      }
    }

    // Đảm bảo role tồn tại trong tier
    if (!newData[tier]) newData[tier] = {};
    if (!newData[tier][role]) newData[tier][role] = [];

    // Thêm vào vị trí mới
    newData[tier][role].push(draggedId);

    dispatch('update', newData);
    draggedId = null;
  }

  // Auto-scroll logic
  let autoScrollInterval: number | null = null;

  function handleAutoScroll(e: DragEvent) {
    const edgeThreshold = 200;    
    const scrollSpeed = 10;
    const scrollDelay = 16;
    const y = e.clientY;
    const viewportHeight = window.innerHeight;

    if (y < edgeThreshold) {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = window.setInterval(() => {
        window.scrollBy(0, -scrollSpeed);
      }, scrollDelay);
    } else if (y > viewportHeight - edgeThreshold) {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = window.setInterval(() => {
        window.scrollBy(0, scrollSpeed);
      }, scrollDelay);
    } else {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }
</script>

<div class="hidden md:block relative overflow-x-auto px-2 pb-16" id="tierlist-desktop">
  <!-- HEADER: vai trò -->
  <div class="z-20" style="position: sticky; top: {stickyTop}px;">
    <div class="grid grid-cols-[60px_repeat(4,1fr)]">
      <div class="w-20"></div>
      {#each roles as role}
        <div class="py-2 text-base font-bold text-center uppercase border border-white/60 first:border-l-0 {roleColors[role]} bg-dark">
          {role}
        </div>
      {/each}
    </div>
  </div>

  <!-- DANH SÁCH -->
  <div>
    {#each Object.entries(data) as [tier, rolesMap]}
      <div class="grid grid-cols-[60px_repeat(4,1fr)] border-t border-white/10 mt-3">
        <!-- Cột T -->
        <div class={`flex items-center justify-center font-bold text-black text-xl h-full min-h-[80px] px-2 py-2 whitespace-nowrap ${bgtierColors[tier] ?? 'bg-white'}`}>
          {formatTier(tier)}
        </div>

        <!-- Các cột vai trò -->
        {#each roles as role}
          <div
            class="border-t border-r border-b border-white/60 bg-dark p-3 grid grid-cols-2 gap-3 content-start min-h-[80px] overflow-visible"
            on:dragover|preventDefault
            on:drop={() => editMode && onDrop(tier, role)}
          >
            {#each rolesMap[role]?.filter(id => isVisible(id)) ?? [] as id}
              <div
                draggable={editMode}
                on:dragstart={() => editMode && onDragStart(id)}
              >
                <CharacterCard
                  character={getCharacter(id)}
                  {editMode}
                />
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
