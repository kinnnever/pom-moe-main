<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let board: {
    id: number;
    type: string;
    title: string;
    content: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  };

  let showMenu = false;
  let editing = false;
  let tempTitle = board.title;
  let tempContent = board.content;

  function deleteThisBoard() {
    dispatch("delete", { id: board.id });
    showMenu = false;
  }

  function updateBoard(changes) {
    dispatch("update", { id: board.id, ...changes });
    showMenu = false;
  }

  function saveEdit() {
    updateBoard({ title: tempTitle, content: tempContent });
    editing = false;
  }
</script>

<div
  class="relative shadow-md rounded-xl flex flex-col cursor-grab group p-2"
  style="
    background-color: {board.bgColor};
    border: 2px solid {board.borderColor};
    color: {board.textColor};
  "
>
  <!-- Header (title + menu) -->
  <div class="flex justify-between items-center mb-2">
    {#if editing}
      <input
        bind:value={tempTitle}
        class="border rounded px-2 py-1 text-sm w-full"
      />
    {:else}
      <h2 class="font-bold text-sm">{board.title}</h2>
    {/if}

    <!-- Nút 3 chấm -->
    <button
      class="ml-2 opacity-0 group-hover:opacity-100 transition bg-white rounded-full p-1 shadow text-black"
      on:click={() => (showMenu = !showMenu)}
    >
      ⋮
    </button>
  </div>

  <!-- Content -->
  {#if editing}
    <textarea
      bind:value={tempContent}
      rows="4"
      class="border rounded px-2 py-1 text-sm w-full"
    />
    <div class="flex justify-end gap-2 mt-2">
      <button
        class="bg-gray-200 px-2 py-1 rounded text-xs"
        on:click={() => (editing = false)}
      >
        Hủy
      </button>
      <button
        class="bg-blue-500 text-white px-2 py-1 rounded text-xs"
        on:click={saveEdit}
      >
        Lưu
      </button>
    </div>
  {:else}
    <p class="text-sm whitespace-pre-wrap">{board.content}</p>
  {/if}

  <!-- Menu -->
  {#if showMenu}
    <div
      class="absolute top-8 right-2 bg-white rounded-lg shadow-md p-2 w-40 flex flex-col gap-1 z-50 text-black"
    >
      <button
        class="hover:bg-gray-100 rounded p-1 text-left"
        on:click={() => (editing = true)}
      >
        ✏️ Chỉnh sửa
      </button>
      <button
        class="hover:bg-gray-100 rounded p-1 text-left"
        on:click={() => updateBoard({ bgColor: prompt('Màu nền?', board.bgColor) || board.bgColor })}
      >
        🎨 Đổi màu nền
      </button>
      <button
        class="hover:bg-gray-100 rounded p-1 text-left"
        on:click={() => updateBoard({ borderColor: prompt('Màu viền?', board.borderColor) || board.borderColor })}
      >
        ⬛ Đổi màu viền
      </button>
      <button
        class="hover:bg-gray-100 rounded p-1 text-left"
        on:click={() => updateBoard({ textColor: prompt('Màu chữ?', board.textColor) || board.textColor })}
      >
        📝 Đổi màu chữ
      </button>
      <button
        class="hover:bg-gray-100 rounded p-1 text-left text-red-600"
        on:click={deleteThisBoard}
      >
        🗑️ Xóa bảng
      </button>
    </div>
  {/if}
</div>
