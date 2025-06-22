<script lang="ts">
  import CavernRelicPage from './CavernRelicPage.svelte';
  import PlanarRelicPage from './PlanarRelicPage.svelte';
  export let data;

  const Layout = data.relic.type === 'cavern' ? CavernRelicPage : PlanarRelicPage;
</script>

<svelte:head>
  <title>{data.relic.name} - Pom.moe</title>
</svelte:head>

<svelte:component this={Layout} relic={data.relic} />
