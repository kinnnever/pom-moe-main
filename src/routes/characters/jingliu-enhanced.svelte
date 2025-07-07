<script lang="ts">
  	import Title from '$components/Title.svelte';
  	import {onMount} from 'svelte';
	import { element } from 'svelte/internal';
	import TraceBlock from '$components/TraceBlock.svelte';
	import EidolonBlock from '$components/EidolonBlock.svelte';
	import LightconesBlock from '$components/LightconesBlock.svelte';
	import RelicsBlock from '$components/relicsBlock.svelte';
	import TeamBlock from '$components/TeamBlock.svelte';
	import ProsConsBlock from  '$components/ProsConsBlock.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

  const character = {
    id: 'jingliu',
    name: 'Jingliu',
    element: 'ice',
    path: 'destruction',
	elementColor: '#5CD6FF'
  };

  let isEnhanced = true;

  $: {
  		const id = $page.params.id;
  		isEnhanced = id === `${character.id}-enhanced`;
	}

  function toggleEnhanced() {
	const next = isEnhanced ? `${character.id}` : `${character.id}-enhanced`;
    goto(`/characters/${next}`);
  }

  let lightconeNames: string[] = [];
  let revealed = false;

  const normalAttack = [
    ['25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['75%','82.5%','90%','97.5%','105%','112.5%','121.89%','131.26%','140.64%','150%','157.5%','165%','172.5%','180%','187.5%'],
	['37.5%','41.25%','45%','48.75%','52.5%','56.25%','60.94%','65.63%','70.31%','75%','78.75%','82.5%','86.25%','90%','93.75%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['90%','99%','108%','117%','126%','135%','146.25%','157.5%','168.75%','180%','189%','198%','207%','216%','225%'],
	['45%','49.5%','54%','58.5%','63%','67.5%','73.3%','78.75%','84.38%','90%','94.5%','99%','103.5%','108%','112.5%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['40%','41%','42%','43%','44%','45%','46.25%','47.5%','48.75%','50%','51%','52%','53%','54%','55%'],
	['22%','24.2%','26.4%','28.6%','30.8%','33%','35.75%','38.5%','41.25%','44%','46.2%','48.4%','50.6%','52.8%','55%']
  ]
  let TalentLevel = 1;

	const SPD = 96;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 125;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [195, 380], atk: [92, 180], def: [66, 128] },
		{ dp: 1, levels: [20, 30], hp: [459, 556], atk: [217, 263], def: [155, 188] },
		{ dp: 2, levels: [30, 40], hp: [634, 732], atk: [300, 346], def: [214, 247] },
		{ dp: 3, levels: [40, 50], hp: [810, 908], atk: [383, 429], def: [273, 306] },
		{ dp: 4, levels: [50, 60], hp: [986, 1084], atk: [466, 512], def: [333, 366] },
		{ dp: 5, levels: [60, 70], hp: [1162, 1260], atk: [549, 595], def: [392, 425] },
		{ dp: 6, levels: [70, 80], hp: [1338, 1435], atk: [632, 679], def: [452, 485] }
	];
</script>

<svelte:head>
	<title>{character.name} - Pom.moe</title>
</svelte:head>

<div class="flex flex-col gap-8 lg:flex-row md:items-start">
	<!-- Hình ảnh -->
	<div class="lg:w-2/3 flex flex-col items-center justify-center relative">
		<img
			src="/images/characters-full/{character.id}.png"
			alt="{character.name}"
			class="max-h-[100vh] object-contain"
		/>
		<div class="text-white text-base mt-4 text-center px-4 lg:hidden italic" style="text-shadow: 1px 1px 1px black">
			Từng là kiếm thủ hàng đầu của Luofu, người sáng lập Vân Kỵ Quân nổi tiếng bất bại. Nhưng nay tên của cô đã bị xóa nhòa, trở thành phản đồ của Xianzhou đang đi trên ranh giới giữa sự tỉnh táo và Xác Nhập Ma.
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Từng là kiếm thủ hàng đầu của Luofu, người sáng lập Vân Kỵ Quân nổi tiếng bất bại. Nhưng nay tên của cô đã bị xóa nhòa, trở thành phản đồ của Xianzhou đang đi trên ranh giới giữa sự tỉnh táo và Xác Nhập Ma.</p>
  		</div>
	</div>

	<!-- Thông tin nhân vật -->
	<div class="lg:w-2/4">
		<div class="flex justify-center lg:justify-start gap-4 mb-3 flex-wrap lg:flex-nowrap">
			<Title>{character.name}</Title>
			<div class="flex gap-2 items-center">
				<img
					src={`/images/elements/${character.element}.png`}
					alt={character.element}
					class="h-10 w-10"
				/>
				<img
					src={`/images/paths/${character.path}.png`}
					alt={character.path}
					class="h-10 w-10"
				/>
			</div>
			<div class="w-full lg:w-auto flex justify-center lg:justify-end lg:ml-auto">
				<div class="flex flex-row items-center gap-1 md:gap-2">
					<!-- svelte-ignore a11y-interactive-supports-focus -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						role="switch"
						aria-checked={isEnhanced}
						class="relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer bg-emerald-500 transition-colors duration-200 ease-in-out"
						class:bg-emerald-600={isEnhanced}
						on:click={toggleEnhanced}
					>
					<span
						class="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out"
						class:translate-x-6={isEnhanced}
						class:translate-x-1={!isEnhanced}
					/>
					</div>
					<span class="text-white text-sm md:text-base">
						Enhanced
					</span>
				</div>
			</div>
		</div>
		<!-- Bảng chỉ số -->
		<table class="w-full text-white border-collapse text-sm table-fixed break-words">
			<thead>
				<tr class="bg-white/10">
					<th class="p-2 border border-white/40">ĐP</th>
					<th class="p-2 border border-white/40">LV</th>
					<th class="p-2 border border-white/40">HP</th>
					<th class="p-2 border border-white/40">ATK</th>
					<th class="p-2 border border-white/40">DEF</th>
					<th class="p-2 border border-white/40">SPD</th>
					<th class="p-2 border border-white/40">AGGRO</th>
				</tr>
			</thead>
			<tbody>
				{#each stats as row}
					<tr>
						<td class="p-2 border border-white/20 text-center" rowspan="2">{row.dp}</td>
						<td class="p-2 border border-white/20 text-center">{row.levels[0]}</td>
						<td class="p-2 border border-white/20 text-center">{row.hp[0]}</td>
						<td class="p-2 border border-white/20 text-center">{row.atk[0]}</td>
						<td class="p-2 border border-white/20 text-center">{row.def[0]}</td>
						<td class="p-2 border border-white/20 text-center">{SPD}</td>     <!-- ⚠ CỐ ĐỊNH -->
						<td class="p-2 border border-white/20 text-center">{AGGRO}</td>  <!-- ⚠ CỐ ĐỊNH -->
					</tr>
					<tr>
						<td class="p-2 border border-white/20 text-center">{row.levels[1]}</td>
						<td class="p-2 border border-white/20 text-center">{row.hp[1]}</td>
						<td class="p-2 border border-white/20 text-center">{row.atk[1]}</td>
						<td class="p-2 border border-white/20 text-center">{row.def[1]}</td>
						<td class="p-2 border border-white/20 text-center">{SPD}</td>     <!-- ⚠ CỐ ĐỊNH -->
						<td class="p-2 border border-white/20 text-center">{AGGRO}</td>  <!-- ⚠ CỐ ĐỊNH -->
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- THÔNG TIN KHÁC -->
<div class="mt-12 text-white space-y-8">
	<section>
		<Title>KỸ NĂNG</Title>
	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
		<div class="flex flex-col items-center break-words w-20 text-center">
			<img
    			src="/images/skills/{character.id}/attack.png"
   				alt="Tấn công thường"
    			class="h-20 w-20 object-cover"
  			/>
			<span class="text-sm text-white/80 mt-2">Tấn Công Thường</span>
		</div>
		<div class="flex-1">
  		<h3 class="text-lg font-bold mb-1">Ánh Trăng Soi Bóng</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền </span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p>Gây cho 1 kẻ địch chỉ định Sát Thương
		<span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Giới Hạn HP của Jingliu.
		</p>
		<div class="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 mt-2">
  			<!-- svelte-ignore a11y-label-has-associated-control -->
  			<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  			<input type="range" min="1" max="10" bind:value={NormalLevel} class="w-48 accent-white/10 opacity-80" />
  			<span class="text-sm text-white/40">Lv{NormalLevel}</span>
		</div>
		</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
		<div class="flex flex-col items-center break-words w-20 text-center">
			<img
    			src="/images/skills/{character.id}/skill.png"
   				alt="Chiến Kỹ"
    			class="h-20 w-20 object-cover"
  			/>
			<span class="text-sm text-white/80 mt-2">Chiến Kỹ</span>
		</div>
		<div class="flex-1">
  		<h3 class="text-lg font-bold mb-1">Vô Hạ Phi Quang</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Gây cho 1 kẻ địch chỉ định Sát Thương
			<span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Giới Hạn HP của Jingliu, và nhận
			<span class="text-yellow-400 font-semibold">1</span> tầng "Sóc Vọng".
		</p>

		<h3 class="text-lg font-bold mb-1 mt-4">「Ánh Trăng Sông Băng」</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span> 
			<span class="text-amber-400 italic">sức bền mục tiêu chính,</span> 
			<span style="color: {character.elementColor}">30</span> 
			<span class="text-amber-400 italic">sức bền mục tiêu lân cận</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">0</span>
  		</p>
  		<p>Gây cho 1 kẻ địch chỉ định Sát Thương <span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Giới Hạn HP của Jingliu, 
			đồng thời gây cho mục tiêu lân cận kẻ đó Sát Thương <span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng
			<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> Giới Hạn HP của Jingliu. Tiêu hao 
			<span class="text-yellow-400 font-semibold">1</span> tầng Sóc Vọng. Thi triển kỹ năng này không tiêu hao Điểm Chiến Kỹ.
		</p>
		
		<div class="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 mt-2">
  			<!-- svelte-ignore a11y-label-has-associated-control -->
  			<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  			<input type="range" min="1" max="15" bind:value={SkillLevel} class="w-48 accent-white/10 opacity-80" />
  			<span class="text-sm text-white/40">Lv{SkillLevel}</span>
		</div>
		</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
			<div class="flex flex-col items-center break-words w-20 text-center">
			<img
    			src="/images/skills/{character.id}/ultimate.png"
   				alt="Tuyệt Kỹ"
    			class="h-20 w-20 object-cover"
  			/>
			<span class="text-sm text-white/80 mt-2">Tuyệt Kỹ</span>
		</div>
			<div class="flex-1">
  			<h3 class="text-lg font-bold mb-1">Đàm Hoa Sinh Diệt, Thiên Hà Dệt Mộng</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Khuếch Tán</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span> 
				<span class="text-amber-400 italic">sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">140</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">140</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
  			<p>Gây cho 1 kẻ địch chỉ định Sát Thương <span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span>
				Giới Hạn HP của Jingliu, đồng thời gây cho các mục tiêu lân cận kẻ đó Sát Thương 
				<span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span>
				Giới Hạn HP của Jingliu. Sau khi tấn công kết thúc sẽ nhận 
				<span class="text-yellow-400 font-semibold">1</span> tầng Sóc Vọng.
			</p>
			<div class="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 mt-2">
  				<!-- svelte-ignore a11y-label-has-associated-control -->
  				<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  				<input type="range" min="1" max="15" bind:value={UltimateLevel} class="w-48 accent-white/10 opacity-80" />
  				<span class="text-sm text-white/40">Lv{UltimateLevel}</span>
			</div>
</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
		<div class="flex flex-col items-center break-words w-20 text-center">
			<img
    			src="/images/skills/{character.id}/talent.png"
   				alt="Thiên Phú"
    			class="h-20 w-20 object-cover"
  			/>
			<span class="text-sm text-white/80 mt-2">Thiên Phú</span>
		</div>
		<div class="flex-1">
  			<h3 class="text-lg font-bold mb-1">Lưỡi Trăng Chuyển Hồn</h3>
  			<p class="text-sm mb-1"><span class="text-amber-400 italic">Cường hóa</span></p>
  			<p>Khi có <span class="text-yellow-400 font-semibold">2</span> tầng Sóc Vọng, Jingliu sẽ vào trạng thái Chuyển Hồn, nhận thêm 1 tầng Sóc Vọng và ưu tiên hành động 
				<span class="text-yellow-400 font-semibold">100%</span>, Tỷ Lệ Bạo Kích tăng <span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>, 
				sau đó Chiến Kỹ Vô Hạ Phi Quang cường hóa thành Ánh Trăng Sông Băng, hơn nữa chỉ có thể dùng Chiến Kỹ này. Ở trạng thái Chuyển Hồn, khi tấn công, sẽ tiêu hao
				<span class="text-yellow-400 font-semibold">5%</span> Giới Hạn HP của đồng đội (Tối đa tiêu hao đến khi HP của mỗi đồng đội bằng 1). 
				Trong trạng thái Chuyển Hồn, khi mục tiêu phe ta chịu sát thương hoặc tiêu hao HP, Jingliu sẽ nhận 1 tầng Sắc Trăng, mỗi tầng Sắc Trăng khiến Sát Thương Bạo Kích Jingliu gây ra tăng
				<span class="text-yellow-400 font-semibold">{talent[1][TalentLevel - 1]}</span>, tối đa có <span class="text-yellow-400 font-semibold">5</span> tầng. Trước khi trạng thái Chuyển Hồn kết thúc sẽ không thể vào trạng thái Chuyển Hồn lần nữa. 
				Sóc Vọng tối đa có thể tích lũy 4 tầng, khi số tầng Sóc Vọng còn 0 sẽ thoát khỏi trạng thái Chuyển Hồn và xóa tất cả Sắc Trăng. Sau khi mục tiêu phe ta tích lũy chịu sát thương hoặc tiêu hao HP
				<span class="text-yellow-400 font-semibold">20</span> lần, Jingliu sẽ nhận 1 tầng Sóc Vọng, mỗi mục tiêu mỗi lần chịu tấn công tối đa tính 1 lần.
 			</p>
			<div class="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 mt-2">
  				<!-- svelte-ignore a11y-label-has-associated-control -->
  				<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  				<input type="range" min="1" max="15" bind:value={TalentLevel} class="w-48 accent-white/10 opacity-80" />
  				<span class="text-sm text-white/40">Lv{TalentLevel}</span>
			</div>
		</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
			<div class="flex flex-col items-center break-words w-20 text-center">
			<img
    			src="/images/skills/{character.id}/technique.png"
   				alt="Bí kỹ"
    			class="h-20 w-20 object-cover"
  			/>
			<span class="text-sm text-white/80 mt-2">Bí Kỹ</span>
		</div>
			<div class="flex-1">
  			<h3 class="text-lg font-bold mb-1">Thần Chiếu Cổ Kính</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Quấy Nhiễu</span>
  			</p>
			<p>Sau khi dùng Bí Kỹ, sẽ tạo một vùng đặc biệt xung quanh bản thân, duy trì trong <span class="text-yellow-400 font-semibold">20</span> giây,
				kẻ địch trong vùng đặc biệt này sẽ rơi vào trạng thái <span class="underline">Đóng Băng</span>.
				Sau khi vào chiến đấu với kẻ địch trong vùng đặc biệt, sẽ hồi ngay <span class="text-yellow-400 font-semibold">15</span> năng lượng cho bản thân và nhận
				<span class="text-yellow-400 font-semibold">1</span> tầng Sóc Vọng, đồng thời có <span class="text-yellow-400 font-semibold">100%</span> 
				<span class="underline">xác suất cơ bản</span> khiến kẻ địch bị <span class="underline">Đóng Băng</span>, duy trì 
				<span class="text-yellow-400 font-semibold">1</span> hiệp. Ở trạng thái <span class="underline">Đóng Băng</span>,
				kẻ địch không thể hành động, đồng thời khi bắt đầu mỗi hiệp sẽ chịu <span class="underline">Sát Thương kèm theo</span> thuộc tính 
				<span style="color: {character.elementColor}" class="font-bold">Băng</span>
				bằng <span class="text-yellow-400 font-semibold">80%</span> Giới Hạn HP của Jingliu. Tối đa chỉ tồn tại 1 hiệu ứng vùng do phe ta tạo ra.
			</p>
		</div>
	</div>

	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ = Thiên Phú &gt; Tuyệt Kỹ &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Nguồn Sát Thương chính của Jingliu.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Nguồn bổ sung tự Buff cho bản thân rất nhiều CV.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Hỗ trợ gây Sát Thương và giúp giữ Jingliu trong trạng thái Chuyển Hồn lâu nhất có thể.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn công thường</p>
    		<p class="text-white/80 text-sm">Bạn chơi kiểu gì mà để sư tổ phải đánh thường vậy??</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Không Lối Thoát"
		description="Ở trạng thái Chuyển Hồn, Kháng Hiệu Ứng tăng <span class='text-yellow-400 font-semibold'>35%</span>, 
					sát thương Tuyệt Kỹ gây ra tăng <span class='text-yellow-400 font-semibold'>20%</span>."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+2",
      		  	label: "Tốc Độ",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/CD.png",
    		  	value: "+5.3%",
    		  	label: "Sát Thương Bạo Kích",
    		  	unlock: "A3"
    		},
    		{
    		  	icon: "/images/icons-vestige/HP.png",
    		  	value: "+4%",
      		  	label: "HP",
      		  	unlock: "A3"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Kiếm Thủ Hàng Đầu"
		description='Sau khi thi triển Vô Hạ Phi Quang, sẽ hồi thêm <span class="text-yellow-400 font-semibold">15</span> Năng Lượng, 
					sau khi thi triển Ánh Trăng Sông Băng sẽ hồi thêm <span class="text-yellow-400 font-semibold">8</span> Năng Lượng.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+8%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A5"
			},
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+8%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Linh Hồn Sương Giá"
		description='Khi nhận Sóc Vọng nếu đã đạt giới hạn, lần tấn công kế tiếp của Jingliu sẽ bỏ qua
					<span class="text-yellow-400 font-semibold">25%</span> phòng thủ của mục tiêu.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/HP.png",
      	  	  	value: "+6%",
      		  	label: "HP",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+4",
      		  	label: "Tốc Độ",
      		  	unlock: "LV75"
			},
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+10.7%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "LV80"
			}
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+5.3%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "LV1"
			}
		]}
	/>
	</section>

	<section>
		<Title>TINH HỒN</Title>
		
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
			<EidolonBlock
  				icon="/images/eidolons/{character.id}/e1.png"
  				number={1}
  				name="Trăng Phạm Ngục Trời"
  				elementColor={character.elementColor}
  				description='Khi thi triển Tuyệt Kỹ hoặc Chiến Kỹ cường hóa, Sát Thương Bạo Kích của Jingliu tăng
				<span class="text-yellow-400 font-semibold">36%</span>, duy trì <span class="text-yellow-400 font-semibold">1</span> hiệp, 
				đồng thời gây thêm cho mục tiêu chính 1 lần Sát Thương Băng bằng <span class="text-yellow-400 font-semibold">80%</span> HP tối đa của Jingliu.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Trăng Non Quyện Thất Tinh"
  				elementColor={character.elementColor}
  				description='Sau khi thi triển Tuyệt Kỹ, Sát Thương Chiến Kỹ Cường Hóa ở lần kế tiếp tăng <span class="text-yellow-400 font-semibold">80%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Bán Bích Vọng"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ <span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15; 
				cấp Thiên Phú <span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Nguyệt Quang Thiên Chiếu"
  				elementColor={character.elementColor}
  				description='Ở trạng thái Chuyển Hồn, mỗi tầng Sắc Trăng tăng thêm
				<span class="text-yellow-400 font-semibold">20%</span> Sát Thương Bạo Kích.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="U Ám Phủ Tam Đài"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ <span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15; 
				cấp Tấn Công Thường <span class="text-yellow-400 font-semibold">+1</span>, tối đa không quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Nhật Thực Yếu Ớt"
  				elementColor={character.elementColor}
  				description='Khi Jingliu vào trạng thái Chuyển Hồn, số tầng giới hạn của Sóc Vọng tăng 1 tầng và nhận thêm 
				<span class="text-yellow-400 font-semibold">2</span> tầng Sóc Vọng. Ở trạng thái Chuyển Hồn, <span class="underline">Xuyên Kháng</span>
				<span style="color: {character.elementColor}" class="font-bold">Băng</span> tăng <span class="text-yellow-400 font-semibold">30%</span>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 &ge; E6 &gt; E4 &gt; E2</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Trăng Phạm Ngục Trời</p>
  			<p class="text-white/80 text-sm">Tăng rất nhiều Sát Thương gây ra trong 1 lần Chiến Kỹ Cường Hóa.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Trăng Non Quyện Thất Tinh</p>
    		<p class="text-white/80 text-sm">Phế.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Nguyệt Quang Thiên Chiếu</p>
    		<p class="text-white/80 text-sm">320% Sát Thương Bạo free là bạn đủ hiểu rồi đấy.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Nhật Thực Yếu Ớt</p>
    		<p class="text-white/80 text-sm">Sư tổ tái thế.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['flame-of-blood-blaze-my-path','i-shall-be-my-own-sword','the-unreachable-side','thus-burns-the-dawn','a-trail-of-bygone-blood','a-secret-vow']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: Đè stat, đánh không não, và không cần tính toán đội hình như Trấn. Hiệu quả trong đa số trường hợp.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: <span class="font-bold">Trấn</span> - 
			Tốt nhất nếu đội hình có khả năng duy trì tối đa stack của Jingliu, kết hợp với nguồn giảm DEF khác.
			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 5 sao stat tốt.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>: Mặc dù base HP thấp nhưng xuyên kháng với tốc thì vẫn ngon.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>: Dùng ngon khi tích tầng cao.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[5]}</strong>: 4 sao stat tốt.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
  			relicIds={['scholar_lost_in_erudition','genius_of_brilliant_stars']}
			mixSets={[[],[]]}
  			planarIds={['item_bone_collection_s_serene_demesne','item_rutilant_arena']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Học Giả Lạc Lối Trong Biển Tri Thức</span>: Tăng DMG Chiến Kỹ và Tuyệt Kỹ, và chút Tỉ Lệ Bạo nữa, ngon thế còn gì.</p>
			<p><span class="text-amber-300 font-semibold">Thiên Tài Xuất Chúng</span>: Chủ yếu lấy xuyên kháng và kẹp cùng Sói Đần.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Vùng Đất Nhặt Hài Cốt Tĩnh Lặng</span>: Tăng Giới Hạn HP và Sát Thương Bạo, Jingliu có thể gọi là dùng được.</p>
			<p><span class="text-amber-300 font-semibold">Đấu Trường Ngôi Sao</span>: Tăng DMG Chiến Kỹ, vậy là đủ để dùng.</p>
			`}
			statDescriptions={[[
    		'[HP]HP',
    		'[SPD]Tốc Độ &nbsp;&nbsp;> &nbsp; [HP]HP',
    		'[ice]<span style="color: #5CD6FF">Tăng ST Băng</span> &nbsp;&nbsp;> &nbsp;[HP]HP',
    		'[HP]HP'
			]]}
			priorityStats={
			'HP &ge; Tốc Độ &gt; Sát Thương Bạo &gt; Tỉ Lệ Bạo Kích'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">8000+</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">50%</span> &nbsp;<span class="text-white/70">(Giảm còn 40% nếu đi cùng Main Ký Ức, hoặc 30% nếu đi cùng Sunday)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">150%+</span> &nbsp;<span class="text-white/70">(Jingliu tự thân Buff rất nhiều Crit DMG rồi nên hãy ưu tiên HP và Tốc hơn)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">140+</span> &nbsp;<span class="text-white/70">(Jingliu sau khi được làm lại có thể duy trì DPS ổn định khi kẹp đội hình thích hợp, hãy lựa chọn giày Speed trong đa số trường hợp)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['jingliu'],
    			supportDps: ['tribbie','cipher','jade'],
    			amplifier: ['cerydra','sunday','female-remembrance','silver-wolf','bronya','ruan-mei','pela'],
    			sustain: ['hyacine']
  			}}
  			tooltips={{
				dps: {
					jingliu: 'Jingliu sau khi được làm lại là một DPS khá toàn diện khi có tốc cao, máu nhiều, không hao chiến kỹ, nhân vật này cực kỳ thân thiện với Newbie.',
				},
				supportDps: {
					tribbie: 'Xuyên kháng, tăng DMG phải chịu, Jingliu bú hết. Đã vậy còn hỗ trợ thêm Sát Thương từ "Sát Thương kèm theo" và "Đòn đánh theo sau".',
					cipher: 'Tương tự Tribbie và cũng ngon không kém.',
					jade: 'Jade có thể chọn đồng minh khác hành động nhiều để liên tục giảm HP đồng minh đó, để tích Stack cho Jingliu. Recommend nên dùng Lingsha làm "Cô Thơ Nụ".'
				},
				amplifier: {
					cerydra: 'Thêm 1 Chiến Kỹ free mà không tiêu hao điểm Sóc Vọng.',
					sunday: 'Hồi năng lượng và tăng rất nhiều CV, khi này Jingliu có thể mặc áo ATK để tránh bão hòa Sát Thương.',
					bronya: 'Giống Sunday nhưng phế hơn nhiều, và rất lãng phí Buff ATK.',
					'female-remembrance': '10% Crit Rate và Sát Thương Chuẩn.',
					'ruan-mei': 'Cũng gọi là đi cùng buff cho Jingliu được.',
					'silver-wolf': 'Sói Bạc remake cực mạnh, kết hợp với Jingliu bộ Lượng Tử thì có thể giảm DEF lên 100% dễ dàng.',
					pela: 'Giảm DEF diện rộng và có giảm kháng Băng khi có E4.'
				},
				sustain: {
					hyacine: 'Để tận dụng tối đa Hyacine thì cô nàng này nên có Trấn, nếu không thì dùng như bao Trù Phú khác thôi'
				}
			}}
			notes={{
				sustain: 'Nhân vật nào cũng được, miễn là không phải bọn "Tao Có Khiên!".'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Tự thân buff 50% Crit Rate và 100% ưu tiên hành động khi vào trạng thái.
				Gây lượng lớn Sát Thương liên tục.
				Không tiêu hao nhiều điểm chiến kỹ.
				Sát Thương scale theo HP dẫn đến Sát Thương cao và cực kỳ trâu bò.
				Độ ổn định cao nhờ khả năng hồi năng lượng nhiều.
			"
			cons="
				Rút HP đồng minh mặc dù không nhiều nhưng nhiều khi cũng khá bóp.
				Build chỉ số khó.
				Đồng đội tốt nhất là Hyacine + Trấn.
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Tư Bản Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: #1FE7A5">Hyacine + Trấn</span> &nbsp &gt &nbsp
				<span style="color: {character.elementColor}">E1</span> &nbsp &gt &nbsp
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3 p-4">
			<p class="text-lg mt-2 ">
				<span class="font-bold text-amber-400">Hyacine + Trấn: </span>Tăng khả năng vận hành và độ dễ chơi của Jingliu.
			</p>
			<p class="text-lg mt-2 ">
				<span class="font-bold text-amber-400">E1: </span>Tăng cực nhiều Sát Thương lên thủ lĩnh Tinh Anh hoặc Boss, giúp cải thiện khả năng clean các Content Endgame.
			</p>
		</div>

	</section>
</div>
