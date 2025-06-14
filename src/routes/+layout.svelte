<script lang="ts">
	import Header from '$components/Header/Header.svelte';
	import { page } from '$app/stores';
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { getLocalStorageItem } from '$utils/db';
	import { locale } from '$utils/translation';
	import Modal from 'svelte-simple-modal';
	import { modal } from '$utils/modal';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import GithubIcon from '@iconify-icons/mdi/github';
	import FacebookIcon from '@iconify-icons/mdi/facebook';
	import YoutubeIcon from '@iconify-icons/mdi/youtube';
	import DiscordIcon from '@iconify-icons/mdi/discord';

	onMount(() => {
		const lang = getLocalStorageItem('locale');
		if (lang !== null) {
			locale.set(lang);
		}
	});
</script>

<Header />
<div class="flex min-h-screen flex-col items-center">
	<div class="w-full pt-20 {$page.route.id !== '/timeline' ? 'max-w-screen-xl px-3' : ''}">
		<Modal
			show={$modal}
			unstyled
			closeButton={false}
			classBg="fixed top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center bg-black bg-opacity-30 z-50"
			classWindowWrap="relative max-h-full mx-2"
			classWindow="text-white relative w-full max-w-2xl max-h-full rounded-md p-4 shadow-md bg-dark/30 backdrop-blur-xl ring-1 ring-white/5"
			transitionWindow={fly}
			transitionWindowProps={{ y: 100, duration: 200 }}
		>
			<slot />
		</Modal>
	</div>
	<div class="flex-1" />
	<footer
		class="mt-4 flex w-full max-w-screen-xl items-center justify-between px-3 py-4 text-white/40"
	>
		<div>
			<p>Trạm Dữ Liệu Star Rail.</p>
			<p>Được hỗ trợ bởi các Bác sĩ trong Bệnh viện Lê Bách.</p>
		</div>
		<div class="flex items-center gap-4 text-sm text-white/40">
			<div class="flex flex-col items-start leading-tight">
				<span>Bệnh viện Lê Bách</span>
			</div>
			<a
				href="https://discord.gg/W8g3nqu2p9"
				class="duration-150 hover:text-white"
				target="_blank"
			>
				<Icon icon={DiscordIcon} height={36} />
			</a>
			<a
				href="https://www.facebook.com/groups/lebachfamily"
				class="duration-150 hover:text-white"
				target="_blank"
			>
				<Icon icon={FacebookIcon} height={40} />
			</a>
			<a
				href="https://www.youtube.com/@lebach1020"
				class="duration-150 hover:text-white"
				target="_blank"
			>
				<Icon icon={YoutubeIcon} height={40} />
			</a>

			<div class="h-7 w-px bg-white/40"></div>

			<a
				href="https://github.com/kinnnever/pom-moe-main"
				class="duration-150 hover:text-white"
				target="_blank"
			>
				<Icon icon={GithubIcon} height={40} />
			</a>
			<a
				href="https://facebook.com/kienluu.21.10"
				class="duration-150 hover:text-white"
				target="_blank"
			>
				<Icon icon={FacebookIcon} height={40} />
			</a>
			<a
				href="https://youtube.com/@kien_nghien"
				class="duration-150 hover:text-white"
				target="_blank"
			>
				<Icon icon={YoutubeIcon} height={40} />
			</a>
			<div class="flex flex-col items-start ml-2 leading-tight">
				<span>Email: kienluu.211004@gmail.com</span>
				<span>Điện thoại: 0354884521</span>
			</div>
		</div>
	</footer>
</div>
