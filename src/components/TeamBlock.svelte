<script lang="ts">
  import charactersStore from '$data/characters';
  import CharacterCard from '../routes/characters/CharacterCard.svelte';
  import { get } from 'svelte/store';

  export let team = {
    dps: [] as string[],
    supportDps: [] as string[],
    amplifier: [] as string[],
    sustain: [] as string[]
  };

  export let tooltips: Record<string, string> = {};
  export let notes: Record<string, string> = {};


  const characters = get(charactersStore);
  const getCharacter = (id: string) => characters.find(c => c.id === id);

  const roleStyles: Record<string, string> = {
    dps: 'text-red-500',
    supportDps: 'text-purple-400',
    amplifier: 'text-amber-300',
    sustain: 'text-green-400'
  };
</script>

<div class="grid grid-cols-4 divide-x divide-white/20 bg-black/20 border border-white/80 rounded-lg">
  {#each [
    { label: 'DPS', key: 'dps' },
    { label: 'SUPPORT DPS', key: 'supportDps' },
    { label: 'AMPLIFIER', key: 'amplifier' },
    { label: 'SUSTAIN', key: 'sustain' }
  ] as role}
    <div class="p-4 flex flex-col">
      <div class={`font-bold text-xl mb-3 border-b border-white/30 w-full text-center pb-1 ${roleStyles[role.key]}`}>
        {role.label}
      </div>
      <div class="flex flex-wrap justify-start ml-1 gap-x-5 gap-y-2 w-full">
        {#each team[role.key] as id}
          {#if getCharacter(id)}
            <div class="relative group">
              <CharacterCard character={getCharacter(id)} class="scale-[0.6]" />
              {#if tooltips[id]}
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-black/90 text-white/80 text-sm p-2 rounded border border-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none text-center">
                  {@html tooltips[id]}
                </div>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
      {#if notes[role.key]}
        <p class="mt-3 text-sm text-white/70 text-center mt-6">
          {@html notes[role.key]}
        </p>
      {/if}
    </div>
  {/each}
</div>

<style>
  /* CharacterCard scale */
  .scale-\[0\.6\] {
    transform: scale(0.6);
    transform-origin: top center;
  }
</style>
