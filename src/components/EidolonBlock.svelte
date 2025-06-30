<script lang="ts">
  export let icon = '';
  export let name = '';
  export let number = 1;
  export let elementColor = '#fff';
  export let description = '';
</script>

<div class="eidolon-block relative flex flex-col gap-2 p-4 border rounded-lg bg-black/20">
  <div class="flex items-start gap-4">
    <!-- Hình ảnh tinh hồn -->
    <div class="flex-none">
      <img src={icon} alt={name} class="w-32 h-32 rounded drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
    </div>

    <!-- Tên + số thứ tự -->
    <div class="flex-1">
      <div class="text-lg font-semibold flex items-center gap-2 mt-3">
        <span class="font-extrabold text-xl" style="color: {elementColor}; font-family: 'Courier New Bold', monospace">
          {number}
        </span>
        <span class="text-white font-semibold text-xl">
          {name}
        </span>
      </div>
      <div class="text-base text-white/90 leading-relaxed mt-3">
          {@html description}
      </div>
    </div>
  </div>
</div>
