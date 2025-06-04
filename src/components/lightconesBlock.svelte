<script lang="ts">
  import lightconesData from '$data/lightcones/vi.json';
  import LightconeCard from '../routes/lightcones/LightconeCard.svelte';
  import { onMount } from 'svelte';

  export let ids: string[] = [];
  export let characterName = '';
  export let exposeNames: (names: string[]) => void = () => {};

  const lightcones = ids
    .map((id) => ({
      id,
      data: lightconesData[id]
    }))
    .filter((item) => item.data);

  
  onMount(() => {
    exposeNames(lightcones.map((l) => l.data.name));
  });

</script>

<div class="lightcone-block mb-8">
  <h2 class="text-lg font-bold text-white mb-2">
    Nón Ánh Sáng mà {characterName} có thể dùng
  </h2>

  <div class="flex flex-wrap gap-4 mb-4">
    {#each lightcones as lc}
      <LightconeCard lightcone={lc.data} />
    {/each}
  </div>
</div>
