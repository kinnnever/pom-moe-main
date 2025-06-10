<script lang="ts">
  import relicsData from '$data/relics/relics.json';
  import { slide } from 'svelte/transition';

  export let relicIds: string[] = [];
  export let planarIds: string[] = [];
  export let mixSets: [string, string][] = []; 
  export let relicAnalysis = '';
  export let planarAnalysis = '';
  export let statDescriptions = ['', '', '', ''];
  export let priorityStats = '';
  export let endgameStats = '';

  let showRelicAnalysis = false;
  let showPlanarAnalysis = false;

  const relics = relicIds
    .map((id) => relicsData[id])
    .filter((item) => item?.type === 'cavern');

  const planars = planarIds
    .map((id) => relicsData[id])
    .filter((item) => item?.type === 'planar');
</script>

<div class="relics-block mb-8">
  <h2 class="text-lg font-bold text-white mb-2">Di Vật</h2>
  <div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/80">
    <div class="flex flex-wrap gap-4">
      {#each relics as relic}
        <div class="w-32 text-center text-white">
          <img
            src={`/images/relics/${relic.id}.png`}
            alt={relic.name}
            class="w-24 h-24 mx-auto mb-1 object-contain"
          />
          <div class="text-sm font-semibold leading-tight">
            {relic.name}
          </div>
        </div>
      {/each}
      {#each mixSets as pair}
        {#if relicsData[pair[0]] && relicsData[pair[1]]}
          <div class="w-32 text-center text-white relative border border-white/10 rounded p-2 bg-white/5">
            <div class="flex justify-center gap-1">
              <img
                src={`/images/relics/${pair[0]}.png`}
                alt={relicsData[pair[0]].name}
                class="w-10 h-10 object-contain rounded"
              />
              <img
                src={`/images/relics/${pair[1]}.png`}
                alt={relicsData[pair[1]].name}
                class="w-10 h-10 object-contain rounded"
              />
            </div>
            <div class="text-xs mt-1 leading-tight">
              {relicsData[pair[0]].name} +<br />{relicsData[pair[1]].name}
            </div>
          </div>
        {/if}
      {/each}
    </div>
    
     <button
       class="px-3 py-1 text-sm text-white border border-white/30 rounded hover:bg-white/10"
       on:click={() => (showRelicAnalysis = !showRelicAnalysis)}
     >
       {showRelicAnalysis ? 'Ẩn phân tích' : 'Hiện phân tích'}
     </button>
    {#if showRelicAnalysis}
      <div class="text-sm text-white/80 mt-3" transition:slide>
        {@html relicAnalysis}
      </div>
    {/if}
  </div>

  <h2 class="text-lg font-bold text-white mb-2 mt-6">Phụ Kiện Vị Diện</h2>
  <div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/80">
    <div class="flex flex-wrap gap-4 mb-6">
      {#each planars as planar}
        <div class="w-32 text-center text-white">
          <img
            src={`/images/relics/${planar.id}.png`}
            alt={planar.name}
            class="w-24 h-24 mx-auto mb-1 object-contain"
          />
          <div class="text-sm font-semibold leading-tight">
            {planar.name}
          </div>
        </div>
      {/each}
    </div>
     <button
       class="px-3 py-1 text-sm text-white border border-white/30 rounded hover:bg-white/10"
       on:click={() => (showPlanarAnalysis = !showPlanarAnalysis)}
     >
       {showPlanarAnalysis ? 'Ẩn phân tích' : 'Hiện phân tích'}
     </button>
    {#if showPlanarAnalysis}
      <div class="text-sm text-white/80 mt-3" transition:slide>
        {@html planarAnalysis}
      </div>
    {/if}
  </div>

  <div class="flex flex-col bg-black/20 p-4 rounded-lg border border-white/10 mt-8">
    <h2 class="text-lg font-bold text-white text-center mb-3">Chỉ Số Chính</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each [
        { icon: 'body.png', label: 'Thân', description: statDescriptions[0] },
        { icon: 'feet.png', label: 'Chân', description: statDescriptions[1] },
        { icon: 'sphere.png', label: 'Quả Cầu Vị Diện', description: statDescriptions[2] },
        { icon: 'rope.png', label: 'Dây Liên Kết', description: statDescriptions[3] }
      ] as stat}
        <div class="flex flex-col items-center p-3 bg-white/5 rounded border border-white/10 mb-4">
          <img src={`/images/icons-vestige/${stat.icon}`} alt={stat.label} class="w-10 h-10 mb-2" />
          <span class="text-white text-opacity-60 text-xs font-semibold mb-1">{stat.label}</span>
          <p class="text-sm text-white text-center font-bold leading-snug mt-1">
            {@html stat.description.replace(/\[(.*?)\]/g, (_, name) => 
            `<img src='/images/icons-vestige/${name}.png' alt='${name}' class='inline w-5 h-5 mt-1 align-text-bottom' />`)}</p>
        </div>
      {/each}
    </div>
    <h2 class="text-lg font-bold text-white text-center mt-8">Ưu Tiên Dòng Phụ</h2>
    <div class="flex flex-col w-fit mx-auto p-3 bg-white/5 rounded border border-white/10 items-center mt-2 mb-4">
      <div class="text-base text-white font-bold" transition:slide>
        {@html priorityStats}
      </div>
    </div>
    <h2 class="text-lg font-bold text-white text-center mt-8">Chỉ Số Tốt Nghiệp Hướng Đến</h2>
    <div class="flex flex-col p-3 bg-white/5 rounded border border-white/10 mt-2">
      <div class="text-base text-white mt-3" transition:slide>
        {@html endgameStats}
      </div>
    </div>
  </div>
</div>
