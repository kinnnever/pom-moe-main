<script lang="ts">
  export let icon = '';
  export let title = '';
  export let description = '';
  export let unlock = '';
  export let nodes: {
    icon: string;
    value: string;
    label: string;
    unlock: string;
  }[] = [];

  const firstRow = nodes.slice(0, 2);
  const secondRow = nodes.slice(2);
</script>

<div class="trace-block relative flex flex-col gap-2 p-4 border rounded-lg bg-black/20 mb-4">
  <!-- Vết tích chính -->
  <div class="flex items-start gap-4">
    {#if title && icon}
      <div class="flex flex-col items-center break-words w-28 text-center">
        <img src={icon} alt={title} class="w-20 h-20 mx-auto mb-1" />
        <div class="text-sm font-bold text-white text-center break-words">{title}</div>
        <div class="text-xs text-white/60">{unlock}</div>
      </div>
    {/if}
    <div class="flex-1">
      <p class="text-sm text-white/90 leading-relaxed">
        {@html description}
      </p>
    </div>
  </div>

  <!-- Mobile layout: chia hàng -->
  <div class="block sm:hidden">
    <div class="flex gap-2 mb-2 justify-center">
      {#each firstRow as node}
        <div class="w-1/2 flex flex-col items-center bg-white/5 p-2 rounded border border-white/10">
          <!-- svelte-ignore a11y-missing-attribute -->
          <img src={node.icon} class="w-6 h-6 mb-1" />
          <div class="text-xs text-white/80 text-center leading-tight font-bold">
            {@html node.label}
          </div>
          <div class="text-sm text-orange-400 font-bold">{node.value}</div>
          <div class="text-[10px] text-white/40">{node.unlock}</div>
        </div>
      {/each}
    </div>

    {#if secondRow.length > 0}
      <div class="flex gap-2 justify-center">
        {#each secondRow as node}
          <div class="w-1/2 flex flex-col items-center bg-white/5 p-2 rounded border border-white/10">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src={node.icon} class="w-6 h-6 mb-1" />
            <div class="text-xs text-white/80 text-center leading-tight font-bold">
              {@html node.label}
            </div>
            <div class="text-sm text-orange-400 font-bold">{node.value}</div>
            <div class="text-[10px] text-white/40">{node.unlock}</div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Desktop layout: cùng 1 hàng -->
  <div class="hidden sm:grid gap-3 mb-2" style="grid-template-columns: repeat({nodes.length}, minmax(0, 1fr));">
    {#each nodes as node}
      <div class="flex flex-col items-center bg-white/5 p-2 rounded border border-white/10">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={node.icon} class="w-6 h-6 mb-1" />
        <div class="text-xs text-white/80 text-center leading-tight font-bold">
          {@html node.label}
        </div>
        <div class="text-sm text-orange-400 font-bold">{node.value}</div>
        <div class="text-[10px] text-white/40">{node.unlock}</div>
      </div>
    {/each}
  </div>
</div>
