<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import { tick } from 'svelte';
  import { derived } from 'svelte/store';

  let Component = null;
  let error = '';
  let unsubscribe: () => void;

  const idStore = derived(page, ($page) => $page.params.id);

  // Mỗi khi id thay đổi → load lại component
  unsubscribe = idStore.subscribe(async (id) => {
    Component = null;
    error = '';

    try {
      // wait next tick để đảm bảo update đúng
      await tick();
      const module = await import(`../${id}.svelte`);
      Component = module.default;
    } catch (e) {
      error = 'Không tìm thấy nhân vật';
    }
  });

  onDestroy(() => {
    unsubscribe?.();
  });
</script>

{#if Component}
  <svelte:component this={Component} />
{:else if error}
  <h1 class="text-white text-center mt-10">{error}</h1>
{:else}
  <img src={`/images/pommoe0.png`} alt="" class="h-40 w-40 object-contain mx-auto" />
  <p class="text-white text-center mt-10">Chờ xíu, Pom đang tìm cho bạn...</p>
{/if}
