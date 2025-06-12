<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import { tick } from 'svelte';

  let id = '';
  let Component = null;
  let error = '';
  let loading = false;
  let currentLoadId = 0;

  const unsubscribe = page.subscribe(async ($page) => {
    const newId = $page.params.id;
    if (!newId || newId === id) return;

    id = newId;
    error = '';
    Component = null;
    loading = true;
    const loadId = ++currentLoadId;

    await tick(); // force unmount
    try {
      const module = await import(`../${id}.svelte`);
      if (loadId === currentLoadId) {
        Component = module.default;
        loading = false;
      }
    } catch (e) {
      if (loadId === currentLoadId) {
        error = 'Pom không tìm thấy nhân vật cho bạn rồi...';
        loading = false;
      }
    }
  });

  onDestroy(unsubscribe);
</script>

{#if loading}
  <img src="/images/pommoe0.png" alt="" class="h-48 w-48 object-contain mx-auto mt-8" />
  <p class="text-white text-center mt-10">Chờ xíu, Pom đang tìm cho bạn...</p>
{:else if error}
  <img src="/images/pommoe1.png" alt="" class="h-40 w-40 object-contain mx-auto mt-8" />
  <h1 class="text-white text-center mt-10">{error}</h1>
{:else if Component}
  <svelte:component this={Component} key={id} />
{/if}
