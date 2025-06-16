<script lang="ts">
  export let pros = '';    // Ưu điểm - HTML hoặc plain text
  export let cons = '';    // Nhược điểm - HTML hoặc plain text
</script>

<div class="flex flex-col md:flex-row gap-6 justify-between">
  <!-- Bảng Ưu điểm -->
  <div class="flex-1 bg-white/5 border border-white/20 rounded-lg p-4">
    <h2 class="text-white text-lg font-bold mb-1">Ưu điểm</h2>
    <div class="h-[2px] w-full bg-white/20 mb-3"></div>
    <div class="text-green-500 text-sm leading-relaxed">
        {#each pros.trim().split('\n') as line}
            <div class="pl-4 text-justify relative mb-1">
                <span class="absolute left-0 top-0 text-green-300">•</span>
                    {@html line}
            </div>
        {/each}
    </div>
  </div>

  <!-- Bảng Nhược điểm -->
  <div class="flex-1 bg-white/5 border border-white/20 rounded-lg p-4">
    <h2 class="text-white text-lg font-bold mb-1">Nhược điểm</h2>
    <div class="h-[2px] w-full bg-white/20 mb-3"></div>
    <div class="text-red-500 text-sm leading-relaxed">
        {#each cons.trim().split('\n') as line}
            <div class="pl-4 text-justify relative mb-1">
                <span class="absolute left-0 top-0 text-red-300">•</span>
                    {@html line}
            </div>
        {/each}
    </div>
  </div>
</div>
