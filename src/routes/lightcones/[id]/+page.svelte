<script lang="ts">
  import charactersStore from '$data/characters';
  import CharacterCard from '../../characters/CharacterCard.svelte';
  import { get } from 'svelte/store';
  export let data;

  const lightcone = data.relic;
  const characters = get(charactersStore);
  const getCharacter = (id: string) => characters.find(c => c.id === id);

  let level = 0;
  

  const currentStat = (index: number) =>
  lightcone.stat?.[index] && lightcone.stat[index][level] ? lightcone.stat[index][level] : '-';


  // Biến reactive: mỗi khi level thay đổi, biến này cập nhật
  $: renderedEffect = lightcone.effect.replace(/{(\d+)}/g, (_, i) => currentStat(+i));

  const gradientMap = {
    5: 'linear-gradient(to right, #fbcd74, #b78d61)',
    4: 'linear-gradient(to right, #b087ff, #8b65c5)',
    3: 'linear-gradient(to right, #659eff, #537bbb)'
  };

  const thumbColorMap = {
    5: '#fbcd74',
    4: '#b087ff',
    3: '#659eff'
  };

  const textColorClass = {
    5: 'text-[#fbcd74]',
    4: 'text-[#b087ff]',
    3: 'text-[#659eff]'
  }[lightcone.rarity] || '';

  $: gradient = gradientMap[lightcone.rarity] || 'linear-gradient(to right, #888, #444)';
  $: thumbColor = thumbColorMap[lightcone.rarity] || '#888';


  const pathLabels: Record<string, string> = {
    destruction: 'Hủy Diệt',
    'the-hunt': 'Săn Bắn',
    erudition: 'Tri Thức',
    harmony: 'Hòa Hợp',
    nihility: 'Hư Vô',
    preservation: 'Bảo Hộ',
    abundance: 'Trù Phú',
    remembrance: 'Ký Ức'
  }

  let container: HTMLElement;

	const handleMouseMove = (e: MouseEvent) => {
		const rect = container.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		container.style.setProperty('--x', `${x}px`);
		container.style.setProperty('--y', `${y}px`);
	};
  const handleMouseLeave = () => {
		container.style.setProperty('--x', `50%`);
		container.style.setProperty('--y', `50%`);
	};
</script>

<section class="text-white">
  <div class="flex flex-row items-center gap-5 my-4">
    <img src={`/images/lightcones/${lightcone.id}.png`} alt={lightcone.name} class="w-24 h-24" />
      <div class="relative inline-block">
        <span
          class="absolute text-3xl md:text-5xl font-bold mb-2 pointer-events-none select-none mr-[3px]"
          style="
            left: -3px;
            top: 3px;
            color: transparent;
            background: linear-gradient(to right, #82b4ed, #cb9dfc, #994d3d);
            -webkit-background-clip: text;
            background-clip: text;
            z-index: 10;
          ">
          {lightcone.name}
        </span>
        <h1 class="relative text-3xl md:text-5xl font-bold text-white mb-2 z-20">{lightcone.name}</h1>
      </div>
  </div>

  <div class="flex flex-wrap items-center text-xl gap-1 select-none">
    <img src={`/images/paths/${lightcone.path}-mini.png`} alt={lightcone.name} class="w-8 h-8 md:mr-1" />
    <span>{pathLabels[lightcone.path]}</span> 
    <span class={`${textColorClass} font-bold ml-4`}>{lightcone.rarity}</span> 
    <img src={`/images/rarity${lightcone.rarity}.png`} alt={lightcone.name} class="w-6 h-6 mr-2" />

    
      <div class="flex justify-center md:justify-start">
        <div class="inline-block border border-white/20 md:border-white/0 rounded-lg overflow-hidden text-sm text-white/90">
          <!-- Hàng tiêu đề -->
          <div class="grid grid-cols-4 font-bold text-center divide-x divide-white/30">
            <div class="px-3 py-1">LV</div>
            <div class="px-3 py-1">HP</div>
            <div class="px-3 py-1">ATK</div>
            <div class="px-3 py-1">DEF</div>
          </div>

          <!-- Hàng dữ liệu -->
          <div class="grid grid-cols-4 text-center divide-x divide-y divide-white/30">
            <div class="px-3 py-1 font-bold">80</div>
            <div class="px-3 py-1">{lightcone.lv[0]}</div>
            <div class="px-3 py-1">{lightcone.lv[1]}</div>
            <div class="px-3 py-1">{lightcone.lv[2]}</div>
          </div>
        </div>
      </div>
  </div>

  {#if lightcone.effect}
    <div class="mt-3">
      <h2 class="sm:flex">
        <span 
          class="text-xl mb-2 font-semibold"
          style="
            background: linear-gradient(to right, #FDE7BB, #FFB4A2, #FFA38F);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
          ">{@html lightcone.effname}</span>
        {#if lightcone.stat?.length}
          <div class="flex items-center gap-4 sm:ml-4 w-full max-w-xs">
            <div class="flex items-center mb-2 whitespace-nowrap select-none">
              Tích Tầng bậc: 
              <span class={`${textColorClass} text-lg font-bold ml-1`}>{level + 1}</span>
            </div>
            <div class="relative w-full max-w-[200px]">
              <input
                type="range"
                min="0"
                max="4"
                bind:value={level}
                class="w-full h-2 appearance-none relative bottom-1.5 range-gradient"
                style={`--slider-track: ${gradient}; --thumb-color: ${thumbColor};`}
              />
            </div>
          </div>
        {/if}
      </h2>
    </div>
  {/if}

  <div class="md:flex w-full gap-4">
    <div class=" md:w-1/2">
      {#key level}
        <p class="text-white/90 mt-2">
          {@html lightcone.effect.replace(/{(\d+)}/g, (_, i) => lightcone.stat?.[+i]?.[level] ?? '-')}
        </p>
      {/key}

      {#if lightcone.recommendedFor && lightcone.recommendedFor.length}
        <div class="text-center md:text-start">
          <h2 class="not-prose text-xl font-semibold mt-6 inline-block mx-auto md:mx-0"
              style="
                  background: linear-gradient(to right, #994d3d, #ECAC5D, #FFF7D1);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  color: transparent;
                ">Nhân vật đề xuất:</h2>
        </div>
        <div class="flex gap-2">
          <div
            class="
              mt-2 p-3 md:p2 bg-dark/50 rounded-xl border-gradient
              overflow-x-auto md:overflow-visible
              w-full
              flex md:grid
              flex-nowrap md:flex-wrap
              gap-x-3 md:gap-x-2 gap-y-4 self-start
            "
            style="
            grid-template-columns: repeat(auto-fit, minmax(7rem, max-content));
            justify-content: center;
          "
          bind:this={container}
          on:mousemove={handleMouseMove}
          on:mouseleave={handleMouseLeave}
          >
            {#each lightcone.recommendedFor as id}
              {#if getCharacter(id)}
                <div
                  class="w-[7rem] h-[11rem] shrink-0 flex justify-center"
                >
                  <CharacterCard character={getCharacter(id)} />
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <div class="flex justify-center md:w-1/2">
      <div class="aspect-[4/3] w-full mt-8 md:mt-0">
        <img
          src={`/images/lightcones-full/${lightcone.id}.png`}
          alt={lightcone.name}
          class="w-full h-full object-contain pointer-events-none"
        />
      </div>
    </div>
  </div>

  
</section>

<style>
  input[type="range"] {
  background: transparent;
}

input[type="range"].range-gradient::-webkit-slider-runnable-track {
  height: 6px;
  background: var(--slider-track);
  border-radius: 9999px;
}

input[type="range"].range-gradient::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: var(--thumb-color);
  border-radius: 50%;
  margin-top: -5px;
  cursor: pointer;
}

input[type="range"].range-gradient::-moz-range-track {
  height: 6px;
  background: var(--slider-track);
  border-radius: 9999px;
}

input[type="range"].range-gradient::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background-color: var(--thumb-color);
  border-radius: 50%;
  cursor: pointer;
}

  .border-gradient {
		--x: 50%;
		--y: 50%;

		border: 3px solid transparent;
		border-radius: 12px;
		padding: 1rem;
		background:
			linear-gradient(#000, #000) padding-box,
			radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box;
		transition: background-position .15s;
	}

</style>
