<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  const component = writable(null);
  const error = writable('');
  const loading = writable(true);

  // SvelteKit sẽ reactive với page.params.id
  $: id = $page.params.id;

  $: if (id) {
    component.set(null);
    error.set('');
    loading.set(true);

    import(`../${id}.svelte`)
      .then((mod) => {
        component.set(mod.default);
        loading.set(false);
      })
      .catch(() => {
        error.set('Không tìm thấy nhân vật');
        loading.set(false);
      });
  }
</script>

{#if $loading}
  <img src={`/images/pommoe0.png`} alt="" class="h-40 w-40 object-contain mx-auto"/>
  <p class="text-white text-center mt-10">Chờ xíu, Pom đang tìm cho bạn...</p>
{:else if $component}
  <svelte:component this={$component} />
{:else}
  <img src={`/images/pommoe1.png`} alt="" class="h-40 w-40 object-contain mx-auto"/>
  <h1 class="text-white text-center mt-10">{$error}</h1>
{/if}
