<script lang="ts">
  export let data;
  export let id = data.id;

  let Component;
  let error = '';

  $: {
    Component = null;
    error = '';
    import(`../${id}.svelte`)
      .then((mod) => {
        Component = mod.default;
      })
      .catch(() => {
        error = 'Không tìm thấy nhân vật';
      });
  }
</script>
{#if Component}
  <svelte:component this={Component} />
{:else if error}
  <h1 class="text-white text-center mt-10">{error}</h1>
{:else}
  <img src={`/images/pommoe0.png`} alt="" class="h-40 w-40 object-contain mx-auto" />
  <p class="text-white text-center mt-10">Chờ xíu, Pom đang tìm cho bạn...</p>
{/if}
