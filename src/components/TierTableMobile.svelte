<script lang="ts">
  import CharacterCard from '../routes/characters/CharacterCard.svelte';
  import charactersStore from '$data/characters';
  import { get } from 'svelte/store';
  import { createEventDispatcher, onMount } from 'svelte';

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
  const BorderTierColors = {
    T0: 'border-red-600',
    T0_5: 'border-red-500',
    T1: 'border-orange-400',
    T1_5: 'border-orange-300',
    T2: 'border-orange-200',
    T3: 'border-green-400',
    T4: 'border-green-300',
    T5: 'border-blue-200'
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
</script>

<div class="block md:hidden space-y-6 px-4" id="tierlist-mobile">
  {#each Object.entries(data) as [tier, rolesMap]}
    <div class={`bg-dark border ${BorderTierColors[tier]} rounded-lg`}>
      <!-- Tier title -->
      <h2 class="text-black text-2xl font-bold text-center mb-2 rounded-t-lg bg-{tierColors[tier] ?? 'bg-white'}">{formatTier(tier)}</h2>

      {#each roles as role, i (role)}
        <div class="mb-1">
          <!-- Role name -->
          <div class="text-xl font-semibold text-center mb-2 {roleColors[role]}">{role}</div>

          <!-- Characters -->
          <div
            class="flex flex-wrap gap-3 justify-start px-3 border-b {BorderTierColors[tier]} {i === roles.length - 1 ? 'border-b-0' : ''}"
            on:dragover|preventDefault
            on:drop={() => editMode && onDrop(tier, role)}
          >
            {#each rolesMap[role]?.filter(id => isVisible(id)) ?? [] as id}
              <div
                class="items-center w-22 h-40"
                draggable={editMode}
                on:dragstart={() => editMode && onDragStart(id)}
              >
                <CharacterCard character={getCharacter(id)} {editMode} />
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>
