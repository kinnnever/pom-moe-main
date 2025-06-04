<script lang="ts">
  export let data;
  const { id } = data;

  import Acheron from '../acheron.svelte';
  import Maledestruction from '../male-destruction.svelte';

      const componentMap: Record<string, any> = {
      acheron: Acheron,
      'male-destruction': Maledestruction 
  };
   const Component = componentMap[id] ?? null;
</script>

{#if Component}
  <svelte:component this={Component} />
{:else}
  <h1>Không tìm thấy nhân vật</h1>
{/if}
