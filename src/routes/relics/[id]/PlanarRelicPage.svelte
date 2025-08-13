<script lang="ts">
  import type { Relic } from '$types';
  import {slide, fly, fade} from 'svelte/transition';
  import charactersStore from '$data/characters';
  import CharacterCard from '../../characters/CharacterCard.svelte';
  import { get } from 'svelte/store';

  export let relic: Relic;

  let activePiece: string | null = null;
  let visible = true;
  let hoveredCharacterId: string | null = null;

  const slotLabels: Record<string, string> = {
    sphere: 'Quả Cầu Vị Diện',
    rope: 'Dây Liên Kết'
  }

  const characters = get(charactersStore);
  const getCharacter = (id: string) => characters.find(c => c.id === id);
  const isFewCharacters = relic.recommendedFor.filter(getCharacter).length <= 3;

</script>

<div class="prose text-white max-w-none">
  <div class="flex flex-row items-center gap-5 my-4">
    <img src={`/images/relics/${relic.id}.png`} alt={relic.name} class="w-24 h-24" />
      <div class="relative inline-block">
        <span
          class="absolute text-5xl font-bold mb-2 pointer-events-none select-none"
          style="
            left: -3px;
            top: 3px;
            color: transparent;
            background: linear-gradient(to right, #82b4ed, #cb9dfc, #994d3d);
            -webkit-background-clip: text;
            background-clip: text;
            z-index: 10;
          ">
          {relic.name}
        </span>
        <h1 class="relative text-5xl font-bold text-white mb-2 z-20">{relic.name}</h1>
      </div>
  </div>

  <h2 class="text-2xl font-semibold inline-block"
      style="
        background: linear-gradient(to right, #FDE7BB, #FFB4A2, #FFA38F);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      ">Hiệu ứng:</h2>
  <ul class="list-disc pl-5 text-lg">
    <li><strong style="
        background: linear-gradient(to right, #FFE569, #ECAC5D);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      ">2 món:</strong> {@html relic.setEffects?.['2'] || 'Chưa có dữ liệu'}</li>
  </ul>

  <div class="hidden md:grid md:grid-cols-2 gap-4 mt-8 select-none">
    {#each relic.pieces as piece}
      <div class="flex items-center p-2 border rounded-xl gap-2">
        <img src={`/images/relics/${relic.id}/${piece.slot}.png`} alt={piece.name} class="w-16 h-16" />
        <span class="text-xl font-bold font-roboto">{piece.name}</span>
        <img
          src={`/images/icons-vestige/${piece.slot}.png`}
          alt={piece.slot}
          class="ml-auto w-10 h-10 opacity-80 p-1 border bg-zinc-800 rounded-lg"
        />
      </div>
    {/each}
  </div>

  <div class="md:hidden flex justify-center gap-2 mt-4 select-none">
    {#each relic.pieces as piece}
      <button
        on:click={() => activePiece = activePiece === piece.slot ? null : piece.slot}
        class={`relative flex items-center px-3 h-14 border rounded-lg transition
          ${activePiece === piece.slot
            ? 'opacity-100 border-zinc-300 bg-zinc-900'
            : 'opacity-50 border-zinc-600 bg-zinc-800'}`}
      >
        <img
          src={`/images/icons-vestige/${piece.slot}.png`}
          alt={piece.slot}
          class="w-8 h-8"
        />
        {#if activePiece === piece.slot}
          <span class="text-md text-white font-semibold leading-none ml-1">
            {slotLabels[piece.slot]}
          </span>
        {/if}
      </button>
    {/each}
  </div>
  {#if activePiece}
    {#each relic.pieces.filter(p => p.slot === activePiece) as piece}
    
      <div class="md:hidden mt-4 p-3 border border-zinc-500 rounded-xl bg-dark/50 flex items-center justify-center gap-3" in:slide>
        
        <img src={`/images/relics/${relic.id}/${piece.slot}.png`} alt={piece.name} class="w-16 h-16" />
        <span class="text-lg font-bold">{piece.name}</span>
      </div>
    {/each}
  {/if}

  {#if relic.recommendedFor && relic.recommendedFor.length}
    <h2 class="text-xl font-semibold mt-8 inline-block text-center md:text-start"
        style="
            background: linear-gradient(to right, #994d3d, #ECAC5D, #FFF7D1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          ">Nhân vật đề xuất:</h2>
  
  
  <div class="flex gap-2">
    <div
      class="
        mt-2 p-3 md:p2 bg-dark/50 rounded-xl md:border border-white/20
        w-full md:w-1/2
        overflow-x-auto md:overflow-visible
        flex md:grid
        flex-nowrap md:flex-wrap
        gap-x-3 md:gap-x-2 gap-y-4 self-start
      "
      style="
        grid-template-columns: repeat(auto-fit, minmax(7rem, max-content));
        justify-content: {isFewCharacters ? 'center' : 'space-between'};
      "
    >
      {#each relic.recommendedFor as id}
        {#if getCharacter(id)}
          <div
            class="w-[7rem] h-[11rem] shrink-0 flex justify-center"
            on:mouseenter={() => hoveredCharacterId = id}
            on:mouseleave={() => hoveredCharacterId = null}
          >
            <CharacterCard character={getCharacter(id)} />
          </div>
        {/if}
      {/each}
    </div>


    <div class="hidden md:flex w-1/2 relative h-[512px] items-center justify-center overflow-hidden">
      {#key hoveredCharacterId}
        {#if hoveredCharacterId}
          <img
            src={`/images/characters-full/${hoveredCharacterId}.png`}
            alt={getCharacter(hoveredCharacterId).name}
            class="absolute h-full object-contain pointer-events-none" 
            in:fly={{ x: -50, duration: 200}}
            
          />
        {/if}
      {/key}
    </div>
  </div>
  {/if}
</div>

