<script lang="ts">
  export let data;
  const { id } = data;

  let Component = null;
  let error = '';

  // Tự động import file theo id
  import(`../${id}.svelte`)
    .then((module) => {
      Component = module.default;
    })
    .catch(() => {
      error = 'Không tìm thấy nhân vật';
    });
</script>

{#if Component}
  <svelte:component this={Component} />
{:else if error}
  <h1 class="text-white text-center mt-10">{error}</h1>
{:else}
  <p class="text-white text-center mt-10">Đợi xíu, Pom đang tìm...</p>
{/if}
