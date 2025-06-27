<script lang="ts">
  import CavernRelicPage from './CavernRelicPage.svelte';
  import PlanarRelicPage from './PlanarRelicPage.svelte';
  export let data;

  const Layout = data.relic.type === 'cavern' ? CavernRelicPage : PlanarRelicPage;
</script>

<svelte:head>
  <title>{data?.relic ? `${data.relic.name} - Pom.moe` : 'Di vật không tồn tại - Pom.moe'}</title>
</svelte:head>

{#if Layout}
  <svelte:component this={Layout} relic={data.relic} />
{:else}
  <div class="text-red-500 text-center mt-12 text-xl">
    Di vật không tồn tại hoặc đường dẫn không hợp lệ.
  </div>
{/if}