<script lang="ts">
	import Title from '$components/Title.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { backgroundUrl, setBackground, resetBackground } from '$utils/background';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';


	let webImageUrl = "";
	let currentBg = '';
	let isFocused = false;
	$: currentBg = $backgroundUrl;
	$: isValid = /^https?:\/\/.+\..+/.test(webImageUrl);

	// Object URL tạm để cache browser
	let objectUrl: string | null = null;

	// Upload ảnh
	async function handleImageUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		// Đọc file thành base64
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result as string;

			// Lưu vào localStorage
			localStorage.setItem("customBackground", base64);

			// Update store global
			setBackground(base64);

			// nếu có objectUrl tạm thì bỏ đi
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl);
				objectUrl = null;
			}
		};
		reader.readAsDataURL(file);
	}

	// Dùng URL từ web
	function useWebImage() {
		if (!webImageUrl.trim()) return;

		if (webImageUrl.trim().toLowerCase() === 'iloveyou') {
			goto('/dont_read_me');
			return;
		}

		if (!isValid) {
			isFocused = false;
			return;
		}


		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			objectUrl = null;
		}

		localStorage.setItem("customBackground", webImageUrl.trim());
		setBackground(webImageUrl.trim());
		webImageUrl = "";
	}

	// Reset background
	function handleReset() {
		if (objectUrl) {
			URL.revokeObjectURL(objectUrl);
			objectUrl = null;
		}
		localStorage.removeItem("customBackground");
		resetBackground();
	}

	let searchInput: HTMLInputElement;
	let searchContainer: HTMLDivElement;
	let searchIcon: SVGSVGElement;

	onMount(() => {
		if (!browser) return;

		const savedBg = localStorage.getItem("customBackground");
		if (savedBg) {
			setBackground(savedBg);
		}

	});
</script>

<svelte:head>
	<title>Pom.moe - Setting</title>
</svelte:head>

<div class="text-white">
	<Title>Setting</Title>

<div class="flex flex-wrap gap-x-8 gap-y-4 justify-start mb-5">
	<div class="flex flex-wrap justify-start gap-6">
		<label for="imageUpload" class="group relative cursor-pointer flex justify-center items-center w-36 h-12">
			<span class="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-3 transition-colors duration-300 group-hover:bg-4"></span>
			<span class="fold-bold text-center relative inline-flex items-center justify-center h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition-colors duration-300 hover:bg-space hover:text-gray-900">
				Tải ảnh lên
			</span>
		</label>
		<input
			id="imageUpload"
			type="file"
			accept="image/*"
			class="hidden"
			on:change={handleImageUpload}
		/>
	</div>

	<!-- Link từ web -->
	<div class="wrapper">
		<div class="email {(!isValid && !isFocused && webImageUrl) ? 'invalid' : ''} {isFocused ? 'focused' : ''}">
			<input
				type="url"
				placeholder="Ảnh Web"
				bind:value={webImageUrl}
				on:focus={() => (isFocused = true)}
				on:blur={() => (isFocused = false)}
				on:keydown={(e) => {
					if (e.key === 'Enter' && isValid) {
						useWebImage();
					}
				}}
				class="email--input"
			/>
			<button
				class="email--button"
				on:click={() => useWebImage()}
			>
				Dùng
			</button>
		</div>
		<p class="error">{(!isValid && !isFocused && webImageUrl) ? 'URL không hợp lệ!' : ''}</p>
	</div>
</div>

	<!-- Reset -->
	<button
		class="px-4 py-2 text-white rounded text-base cursor-pointer bg-red-500 hover:bg-red-700"
		on:click={resetBackground}
	>
		Reset
	</button>

	<!-- Xem trước -->
	{#if backgroundUrl}
		<div class="mt-4">
			<p class="mb-2">Xem trước:</p>
			<div
				class="max-w-xl w-full bg-cover bg-center rounded relative"
				style="background-image: url({currentBg}); background-size: contain; background-repeat: no-repeat; aspect-ratio: 16 / 9;"
			>
			</div>
		</div>
	{/if}
</div>


<style>
.email {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #222222;
  border-radius: 5px;
  transition: background-color 0.2s cubic-bezier(0.33,1,0.68,1);
  padding: 2px;
}

.email:hover {
	background-color: #fbcd74;
}

/* Input */
.email--input {
  height: 50px;
  width: 200px;
  padding: 0 20px;
  margin-left: 1px;
  border: 2px solid #222222;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  font-family: system-ui;
  color: black;
  transition: transform 0.1s cubic-bezier(0.33,1,0.68,1),
              border-color 0.1s cubic-bezier(0.33,1,0.68,1);
}

.email--input:focus {
  outline: none;
  transform: translateY(-3px) translateX(-3px);
}

/* Button */
.email--button {
  height: 50px;
  width: auto;
  padding: 0 1rem;
  margin-left: 5px;
  background-color: black;
  color: white;
  font-weight: bold;
  border: 2px solid #222222;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.1s cubic-bezier(0.33,1,0.68,1),
              border-color 0.1s cubic-bezier(0.33,1,0.68,1),
              background-color 0.1s;
}

.email--button:hover {
  background-color: #333333;
}

.email.focused .email--input,
.email.focused .email--button {
  outline: none;
  transform: translateY(-3px) translateX(-3px);
}

/* Invalid */
.email:has(.email--input:invalid:not(:focus)) {
  background-color: #f25f5c;
}

.email--input:invalid:not(:focus) {
  border: 2px solid #f25f5c;
}

.email:has(.email--input:invalid:not(:focus)) .email--button {
  border: 2px solid #f25f5c;
}

/* Placeholder */
.email--input::placeholder {
  color: #646464;
  font-weight: bold;
  font-family: system-ui;
}

</style>