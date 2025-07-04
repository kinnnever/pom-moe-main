<script lang="ts">
	import type { Timeline } from '$types';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import localized from 'dayjs/plugin/localizedFormat';
	import { onMount } from 'svelte';
	import 'dayjs/locale/vi';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(localized);
	dayjs.locale('vi');

	
	export let event: Timeline;
	const TIMEZONE = 'Asia/Ho_Chi_Minh';

	export let start = dayjs.tz(event.start, TIMEZONE);
	export let end = dayjs.tz(event.end, TIMEZONE);
	
	console.log('start raw:', event.start);
	console.log('start parsed:', start.format());

	let now = dayjs();
	let duration = 'Ending in';

	
	function updateDuration() {
		const diff = started ? end.diff(now) : start.diff(now);
		const dur = dayjs.duration(diff);

		if (diff < 86400000) {
			duration = dur.format('HH:mm:ss');
		} else {
			duration = `${Math.trunc(dur.asDays())} Ngày ${dur.format('HH:mm:ss')}`;
		}
	}

	onMount(() => {
		updateDuration();

		const interval = setInterval(() => {
			now = dayjs();

			const diff = started ? end.diff(now) : start.diff(now);
			const dur = dayjs.duration(diff);

			if (diff < 86400000) {
				duration = dur.format('HH:mm:ss');
			} else {
				duration = `${Math.trunc(dur.asDays())} Ngày ${dur.format('HH:mm:ss')}`;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: started = now.isAfter(start);
	$: ended = now.isAfter(end);
</script>

<div>
	{#if event.image !== 'no-image.png'}
		<img class="mb-4 w-full rounded-md" src="/images/events/{event.image}" alt={event.name} />
	{/if}
	<h1 class="text-lg font-bold">{event.name}</h1>
	<p>{start.format('LLLL')} - {end.format('LLLL')}</p>
	<a href={event.url} target="_blank" class="text-blue-500 duration-150 hover:text-blue-300"
		>{event.url}</a
	>
	<p class="mt-4 w-fit rounded-md border border-white/10 bg-purple-300/5 px-2 py-1 text-white/90">
		{#if ended}
			Sự Kiện Đã Kết Thúc
		{:else if !started}
			Sự Kiện Bắt Đầu Sau {duration}
		{:else}
			Sự Kiện Kết Thúc Sau {duration}
		{/if}
	</p>
</div>
