<script lang="ts">
  export let data: Record<string, Record<string, string[]>>;

  import { onMount } from 'svelte';

  const roles = ['DPS', 'Support DPS', 'Amplifier', 'Sustain'];
  const roleColors = {
    DPS: 'text-red-400',
    'Support DPS': 'text-purple-400',
    Amplifier: 'text-yellow-400',
    Sustain: 'text-green-400',
  };

  let stickyTop = 0;

  onMount(() => {
    const headerEl = document.getElementById('layout-header');
    if (headerEl) {
      stickyTop = headerEl.getBoundingClientRect().height;
    }
  });

  const tierColors = {
    T0: 'bg-red-600',
    T0_5: 'bg-red-500',
    T1: 'bg-orange-400',
    T1_5: 'bg-orange-300',
    T2: 'bg-orange-200',
    T3: 'bg-green-400',
    T4: 'bg-green-300',
    T5: 'bg-blue-200'
  };
  const formatTier = (tier: string) => 
    tier === 'T0_5' ? 'T0.5' : 
    tier === 'T1_5' ? 'T1.5' :
    tier;
</script>

<div class="relative overflow-x-auto px-2 pb-16">
  <!-- HEADER: vai trò -->
  <div class="z-20 " style="position: sticky; top: {stickyTop}px;">
    <div class="grid grid-cols-[80px_repeat(4,1fr)]">
      <div class="w-20"></div>
      {#each roles as role}
        <div class="py-2 text-base font-bold text-center uppercase border-l border-white/10 first:border-l-0 {roleColors[role]} bg-white/10">
          {role}
        </div>
      {/each}
    </div>
  </div>

  <!-- DANH SÁCH -->
  <div>
    {#each Object.entries(data) as [tier, rolesMap]}
      <div class="grid grid-cols-[80px_repeat(4,1fr)] items-stretch border-t border-white/10 mt-3">
        <!-- Cột T -->
        <div class="flex items-center justify-center font-bold text-black text-sm h-full min-h-[80px] px-2 py-2 whitespace-nowrap
          {tierColors[tier] ?? 'bg-white'}">
          {formatTier(tier)}
        </div>

        <!-- Các cột vai trò -->
        {#each roles as role}
          <div class="border-l border-white/10 px-2 py-2 grid grid-cols-2 gap-2">
            {#each rolesMap[role]?.slice(0, 6) ?? [] as char}
              <div class="text-white/90 text-xs text-center bg-white/10 py-1">
                {char}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
