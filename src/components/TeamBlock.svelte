<script lang="ts">
  import charactersStore from '$data/characters';
  import CharacterCard from '../routes/characters/CharacterCard.svelte';
  import { get } from 'svelte/store';

  export let team = {
    dps: [] as string[],
    supportDps: [] as string[],
    amplifier: [] as string[],
    sustain: [] as string[]
  };

  export let tooltips: Record<string, Record<string, string>> = {};
  export let notes: Record<string, string> = {};

  const characters = get(charactersStore);
  const getCharacter = (id: string) => characters.find(c => c.id === id);

  const roleStyles: Record<string, string> = {
    dps: 'text-red-500',
    supportDps: 'text-purple-400',
    amplifier: 'text-amber-300',
    sustain: 'text-green-400'
  };

  function adjustTooltipDirection(event: Event, roleKey: string, index: number) {
    const el = event.currentTarget as HTMLElement;
    const screenW = window.innerWidth;

    // Chỉ xử lý khi màn hình nhỏ hơn xl và lớn hơn md
    const xl = 1280;
    const md = 768;
    if (screenW >= xl || screenW <= md) {
      el.style.left = '50%';
      el.style.transform = 'translateX(-50%)';
      return;
    }
    // Reset về căn giữa
    el.style.left = '50%';
    el.style.transform = 'translateX(-50%)';

    // DPS bên trái => né phải nếu ở vị trí lẻ
    if (roleKey === 'dps' && index % 2 === 0) {
      el.style.left = '0%';
      el.style.transform = 'translateX(0%)';
    }

    // SUSTAIN bên phải => né trái nếu ở vị trí chẵn
    if (roleKey === 'sustain' && index % 2 === 1) {
      el.style.left = '100%';
      el.style.transform = 'translateX(-100%)';
    }
  }

</script>

<div class="flex flex-col md:grid md:grid-cols-4 md:divide-x divide-white/20 bg-black/20 border border-white/80 rounded-lg">
  {#each [
    { label: 'DPS', key: 'dps' },
    { label: 'SUPPORT DPS', key: 'supportDps' },
    { label: 'AMPLIFIER', key: 'amplifier' },
    { label: 'SUSTAIN', key: 'sustain' }
  ] as role}
    <div class="p-4 flex flex-col break-words">
      <div class={`font-bold text-xl mb-3 border-b border-white/30 w-full text-center pb-1 ${roleStyles[role.key]}`}>
        {role.label}
      </div>
      <div class="w-full overflow-x-auto md:overflow-visible">
        <div class="flex md:grid md:grid-cols-2 gap-3 md:justify-items-center min-w-max md:min-w-0">
          {#each team[role.key] as id, index}
            {#if getCharacter(id)}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="relative group shrink-0 w-24 md:w-full flex justify-center">
                
                <CharacterCard character={getCharacter(id)} class="scale-75 md:scale-100" />
                {#if tooltips[role.key]?.[id]}
                  <div 
                    class="
                      fixed md:absolute bottom-16 md:bottom-full mb-2
                      left-1/2 -translate-x-1/2
                      w-[calc(100%-3.5rem)] max-w-screen-xl md:w-60 
                      text-white md:text-white/80 text-xs md:text-sm text-center
                      bg-gradient-to-b from-zinc-800 to-zinc-900 
                      md:bg-none md:bg-black/90
                      rounded border border-white/80
                      p-2 sm:px-4 sm:py-3                       
                      opacity-0 transition-opacity duration-200 z-50
                      group-hover:opacity-100
                      peer-hover:opacity-100 peer-focus-visible:opacity-100
                      pointer-events-none
                    "
                    on:transitionend={(e) => adjustTooltipDirection(e, role.key, index)}
                  >
                    {@html tooltips[role.key][id]}
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      </div>

      {#if notes[role.key]}
        <p class="mt-3 text-sm text-white/70 text-center mt-6">
          {@html notes[role.key]}
        </p>
      {/if}
    </div>
  {/each}
</div>

