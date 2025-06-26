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
	import TielePet from '$components/titlePet.svelte';

  const character = {
    id: 'therta',
    name: 'Đại Herta',
    element: 'ice',
    path: 'erudition',
	elementColor: '#5CD6FF'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['35%','38.5%','42%','45.5%','49%','52.5%','56.88%','61.25%','65.63%','70%','73.5%','77%','80.5%','84%','87.5%'],
	['40%','44%','48%','52%','56%','60%','65%','70%','75%','80%','84%','88%','92%','96%','100%'],
	['20%','22%','24%','26%','28%','30%','32.5%','35%','37.5%','40%','42%','44%','46%','48%','50%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['100%','110%','120%','130%','140%','150%','162.5%','175%','187.5%','200%','210%','220%','230%','240%','250%'],
  	['40%','44%','48%','52%','56%','60%','65%','70%','75%','80%','84%','88%','92%','96%','100%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['4%','4.4%','4.8%','5.2%','5.6%','6%','6.5%','7%','7.5%','8%','8.4%','8.8%','9.2%','9.6%','10%'],
	['2%','2,2%','2,4%','2,6%','2,8%','3%','3,25%','3,5%','3,75%','4%','4,2%','4,4%','4,6%','4,8%','5%']
  ]
  let TalentLevel = 1;

	const SPD = 99;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 75;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [158, 308], atk: [92, 180], def: [66, 128] },
		{ dp: 1, levels: [20, 30], hp: [372, 451], atk: [217, 263], def: [155, 188] },
		{ dp: 2, levels: [30, 40], hp: [514, 594], atk: [300, 346], def: [214, 247] },
		{ dp: 3, levels: [40, 50], hp: [657, 736], atk: [384, 429], def: [273, 306] },
		{ dp: 4, levels: [50, 60], hp: [799, 879], atk: [466, 512], def: [333, 366] },
		{ dp: 5, levels: [60, 70], hp: [942, 1021], atk: [549, 595], def: [392, 425] },
		{ dp: 6, levels: [70, 80], hp: [1085, 1164], atk: [632, 679], def: [452, 485] }
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
			Thành viên tôn quý #83 của Câu Lạc Bộ Thiên Tài, loài người, giới tính nữ, trẻ tuổi, xinh đẹp, dễ thương. Người ta nói rằng cô ấy ẩn cư ở rìa vũ trụ, hầu như không bao giờ bước ra khỏi đó, lần xuất hiện này... Chắc chắn là vì một vấn đề nào đó buộc phải đích thân ra tay nhỉ?
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Thành viên tôn quý #83 của Câu Lạc Bộ Thiên Tài, loài người, giới tính nữ, trẻ tuổi, xinh đẹp, dễ thương. Người ta nói rằng cô ấy ẩn cư ở rìa vũ trụ, hầu như không bao giờ bước ra khỏi đó, lần xuất hiện này... Chắc chắn là vì một vấn đề nào đó buộc phải đích thân ra tay nhỉ?</p>
  		</div>
	</div>

	<!-- Thông tin nhân vật -->
	<div class="lg:w-2/4 space-y-6">
		<div class="flex justify-center lg:justify-start gap-4 mb-4">
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
  		<h3 class="text-lg font-bold mb-1">Thông Suốt Chưa</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Băng</span> cho 1 kẻ địch chỉ định tương đương 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Đại Herta.
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
  		<h3 class="text-lg font-bold mb-1">Mở Rộng Tâm Trí</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">45</span>
			<span class="text-amber-400 italic">sức bền mục tiêu chính,</span> 
			<span style="color: {character.elementColor}">30</span> 
			<span class="text-amber-400 italic">sức bền mục tiêu lân cận</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p class="text-base">Gây Sát Thương 
			<span style="color: {character.elementColor}" class="font-bold">Băng</span> cho 1 kẻ địch chỉ định tương đương
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Tấn Công của Đại Herta và thi triển
			<span class="text-yellow-400 font-semibold">1</span> tầng Diễn Giải. Gây sát thương
			<span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Tấn Công của Đại Herta cho mục tiêu mà Chiến Kỹ đánh trúng lần này và các mục tiêu lân cận, hiệu ứng này có thể lặp lại 2 lần.
		</p>
		<h3 class="text-lg font-bold mb-1 mt-2">「Tôi Có Một Suy Nghĩ Táo Bạo」</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Đánh Lan</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">45</span>
			<span class="text-amber-400 italic">sức bền mục tiêu chính,</span> 
			<span style="color: {character.elementColor}">45</span> 
			<span class="text-amber-400 italic">sức bền mục tiêu lân cận</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
		<p class="text-base">Tiêu hao 1 tầng
			<span class="font-bold">Cảm Hứng</span>, gây Sát Thương
			<span style="color: {character.elementColor}" class="font-bold">Băng</span> cho 1 kẻ địch chỉ định tương đương
			<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> Tấn Công của Đại Herta và thi triển
			<span class="text-yellow-400 font-semibold">1</span> tầng Diễn Giải. Gây sát thương
			<span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng
			<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> 
			Tấn Công của Đại Herta cho mục tiêu mà lần Chiến Kỹ này đánh trúng và các mục tiêu lân cận, lặp lại 2 lần. Cuối cùng, gây Sát Thương
			<span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng
			<span class="text-yellow-400 font-semibold">{skillAttack[2][SkillLevel - 1]}</span> Tấn Công của Đại Herta cho tất cả mục tiêu phe địch.
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
  			<h3 class="text-lg font-bold mb-1">Đã Nói Là Phép Thuật Mà</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Lan</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">220</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">220</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Sắp xếp lại số tầng Diễn Giải của toàn bộ phe địch, Diễn Giải có số tầng tương đối cao sẽ ưu tiên chuyển đến mục tiêu cấp Tinh Anh trở lên, đồng thời gây Sát Thương
				<span style="color: {character.elementColor}" class="font-bold">Băng</span> bằng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span>
				Tấn Công của Đại Herta cho toàn bộ phe địch. Khi thi triển Tuyệt Kỹ, khiến Tấn Công của Đại Herta tăng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span>, duy trì
				<span class="text-yellow-400 font-semibold">3</span> hiệp. Sau khi thi triển Tuyệt Kỹ, khiến Đại Herta lập tức hành động, và nhận 1 tầng Cảm Hứng. Cảm Hứng tối đa có
				<span class="text-yellow-400 font-semibold">4</span> tầng, khi có Cảm Hứng, cường hóa Chiến Kỹ thành "Tôi Có Một Suy Nghĩ Táo Bạo".
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
  			<h3 class="text-lg font-bold mb-1">Đưa Đây Đi Nào</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span> | 
				<span class="text-amber-400 italic">Hồi năng lượng</span> 
				<span style="color: {character.elementColor}">30</span>
  			</p>
  			<p class="text-base">Khi mục tiêu phe địch vào chiến đấu, Đại Herta sẽ thi triển 1 tầng Diễn Giải lên kẻ đó. Khi bắt đầu mỗi đợt sẽ thi triển
				<span class="text-yellow-400 font-semibold">25</span> tầng Diễn Giải lên 1 mục tiêu phe địch ngẫu nhiên, ưu tiên thi triển cho mục tiêu cấp Tinh Anh trở lên. 
				Khi mục tiêu chính của Chiến Kỹ Cường Hóa có Diễn Giải, thì Bội Số Sát Thương gây ra sẽ tăng, mỗi tầng tăng
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>/<span class="text-yellow-400 font-semibold">{talent[1][TalentLevel - 1]}</span>
				cho mục tiêu chính/mục tiêu khác. Nếu nhân vật vận mệnh Tri Thức trong đội từ 2 người trở lên, mỗi tầng tăng thêm
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>/<span class="text-yellow-400 font-semibold">{talent[1][TalentLevel - 1]}</span>
				cho mục tiêu chính/mục tiêu khác. Diễn Giải tối đa có thể cộng dồn
				<span class="text-yellow-400 font-semibold">42</span> tầng. Khi sử dụng Chiến Kỹ Cường Hóa, sẽ thiết lập lại Diễn Giải của mục tiêu chính thành 1 tầng.
				Sau khi mục tiêu phe địch rời trận hoặc bị đơn vị bất kỳ tiêu diệt, Diễn Giải sẽ bị chuyển dời, ưu tiên chuyển sang mục tiêu cấp Tinh Anh trở lên.
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
  			<h3 class="text-lg font-bold mb-1">Ngôi Sao Vụn Vỡ</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span>
  			</p>
  			<p class="text-base">Sau khi sử dụng Bí Kỹ, khi bắt đầu lần chiến đấu tiếp theo, Tấn Công của Đại Herta tăng
				<span class="text-yellow-400 font-semibold">60%</span> duy trì <span class="text-yellow-400 font-semibold">2</span> hiệp.
			</p>
			<p class="text-base">
				Nếu bản đồ hiện tại có Chiến Lợi Phẩm Thường, sau khi sử dụng Bí Kỹ sẽ đánh dấu tối đa vị trí của 
				<span class="text-yellow-400 font-semibold">3</span> Chiến Lợi Phẩm Thường.
			</p>
			<p class="text-base">
				Trong Vũ Trụ Mô Phỏng, Vũ Trụ Sai Phân, sau khi sử dụng Bí Kỹ để vào chiến đấu, khi bắt đầu mỗi đợt sẽ gây cho mục tiêu phe địch dưới cấp Tinh Anh
				<span class="underline">Sát Thương Chuẩn</span> bằng
				<span class="text-yellow-400 font-semibold">99%</span> Giới Hạn HP của mục tiêu, gây cho mục tiêu phe địch cấp Tinh Anh trở lên 
				<span class="underline">Sát Thương Chuẩn</span> bằng
				<span class="text-yellow-400 font-semibold">30%</span> Giới Hạn HP của mục tiêu.
			</p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ = Thiên Phú &gt; Tuyệt Kỹ &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Nguồn Sát Thương chính của Đại Herta gây ra.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Bổ trợ trực tiếp cho Sát Thương của Chiến Kỹ.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Có Sát Thương lớn, sắp xếp lại Thiên Phú, mở khóa nguồn Sát Thương Chính cho Đại Herta.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Không cần nâng cũng được.</p>
  		</div>		
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Sự Thành Thật Lạnh Nhạt"
		description="Khi mục tiêu phe ta tấn công, sẽ thi triển 1 tầng Diễn Giải cho mục tiêu phe địch bị đánh trúng. 
					Sau khi tấn công, cứ mỗi đánh trúng 1 mục tiêu trong lần tấn công này thì sẽ hồi cố định cho Đại Herta
					<span class='text-yellow-400 font-semibold'>3</span> 
					điểm Năng Lượng, tính tối đa đến 5 mục tiêu. Khi thi triển Chiến Kỹ Cường Hóa, 
					nếu số tầng Diễn Giải của mục tiêu chính đạt 42, sẽ khiến sát thương Đại Herta gây ra tăng
					<span class='text-yellow-400 font-semibold'>50%</span>, duy trì đến khi kết thúc lần tấn công này."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+4%",
      		  	label: "Tấn Công",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/ice.png",
    		  	value: "+3.2%",
    		  	label: "Tăng Sát Thương <span style='color:#5CD6FF'>Băng</span>",
    		  	unlock: "A3"
    		},
			{
    		  	icon: "/images/icons-vestige/SPD.png",
    		  	value: "+2",
    		  	label: "Tốc Độ",
    		  	unlock: "A3"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Thông Điệp Bên Ngoài Tầm Nhìn"
		description='Khi vào chiến đấu, nếu trong đội có từ 2 nhân vật vận mệnh Tri Thức trở lên, sẽ khiến sát thương bạo kích của toàn phe ta tăng
		<span class="text-yellow-400 font-semibold">80%</span>. Khi tính số lượng mục tiêu trúng đòn của Vết Tích "Sự Thành Thật Lạnh Nhạt", tối thiểu tính
		<span class="text-yellow-400 font-semibold">3</span> mục tiêu, sau khi tấn công sẽ thi triển 1 tầng Diễn Giải lên mục tiêu có số tầng 
		Diễn Giải cao nhất đối với các mục tiêu phe địch bị trúng đòn, nếu người tấn công là nhân vật vận mệnh Tri Thức, sẽ thi triển thêm 
		<span class="text-yellow-400 font-semibold">2</span> tầng Diễn Giải.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/ATK.png",
    		  	value: "+8%",
    		  	label: "Tấn Công",
      		  	unlock: "LV75"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Địa Cảnh Đói Khát"
		description='Mỗi khi mục tiêu phe địch bị thi triển 1 tầng Diễn Giải, Đại Herta sẽ nhận 1 tầng Đáp Án, tối đa cộng dồn
		<span class="text-yellow-400 font-semibold">99</span> tầng. 
		Khi thi triển Tuyệt Kỹ, cứ mỗi 1 tầng Đáp Án đang có sẽ khiến Bội Số Sát Thương của lần Tuyệt Kỹ này tăng
		<span class="text-yellow-400 font-semibold">1%</span>.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+8%",
      		  	label: "Tấn Công",
      		  	unlock: "LV75"
			}
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/ice.png",
    		  	value: "+3.2%",
    		  	label: "Tăng Sát Thương <span style='color:#5CD6FF'>Băng</span>",
      		  	unlock: "LV1"
			},
			{
				icon: "/images/icons-vestige/ice.png",
    		  	value: "+6.4%",
    		  	label: "Tăng Sát Thương <span style='color:#5CD6FF'>Băng</span>",
      		  	unlock: "LV80"
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
  				name="Đêm Sao Rơi"
  				elementColor={character.elementColor}
  				description='Khi Chiến Kỹ Cường Hóa tính số tầng Diễn Giải, sẽ tính thêm
				<span class="text-yellow-400 font-semibold">50%</span>
				số tầng Diễn Giải hiện tại của 1 mục tiêu có số tầng cao nhất trong số mục tiêu chính và mục tiêu lân cận. 
				Khi thi triển Chiến Kỹ Cường Hóa để tái lập Diễn Giải, thì số tầng Diễn Giải sẽ đặt lại thành 
				<span class="text-yellow-400 font-semibold">15</span> Tầng.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Gió Xuyên Qua Lỗ Khóa"
  				elementColor={character.elementColor}
  				description='Sau khi Đại Herta vào chiến đấu và thi triển Tuyệt Kỹ sẽ nhận thêm 1 tầng "Cảm Hứng". 
				Sau khi thi triển Chiến Kỹ Cường Hóa, sẽ khiến Đại Herta ở lần kế tiếp
				<span class="underline">Ưu Tiên Hành Động</span> <span class="text-yellow-400 font-semibold">35%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Cánh Cổng Bước Vào Mùa Hè"
  				elementColor={character.elementColor}
  				description='Cấp 
				<span class="font-semibold">Chiến Kỹ</span> 
				<span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15, cấp 
				<span class="font-semibold">Thiên Phú</span> 
				<span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Chìa Khóa Thứ 16"
  				elementColor={character.elementColor}
  				description='Tốc độ của nhân vật vận mệnh Tri Thức trong đội tăng
				<span class="text-yellow-400 font-semibold">12%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Chân Lý Như Thuốc Đắng"
  				elementColor={character.elementColor}
  				description='Cấp 
				<span class="font-semibold">Tuyệt Kỹ</span> 
				<span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15, cấp 
				<span class="font-semibold">Tấn Công Thường</span> 
				<span class="text-yellow-400 font-semibold">+1</span>, tối đa không quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Câu Trả Lời Quyến Rũ Ngọt Ngào"
  				elementColor={character.elementColor}
  				description='Xuyên Kháng Băng của Đại Herta tăng 
				<span class="text-yellow-400 font-semibold">20%</span>.
				Khi số lượng mục tiêu phe địch trong trận từ 3 (hoặc trở lên)/2/1, thì Bội Số Sát Thương của Tuyệt Kỹ sẽ tăng
				<span class="text-yellow-400 font-semibold">140%</span>/<span class="text-yellow-400 font-semibold">250%</span>/<span class="text-yellow-400 font-semibold">400%</span>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 = E2 = E6 &gt; E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Đêm Sao Rơi</p>
  			<p class="text-white/80 text-sm">Đại Herta chỉ cần 32 stacks để nhận được toàn bộ ST Băng Bonus từ các Diễn Giải trên kẻ thù. Khi sử dụng Chiến Kỹ Cường Hóa, số Diễn Giải sẽ được đặt lại thành 15, giúp dễ dàng tích lũy lại.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Gió Xuyên Qua Lỗ Khóa</p>
    		<p class="text-white/80 text-sm">Điểm dừng tốt nhất cho người chơi chi tiêu. Đại Herta có thể sử dụng hai Chiến Kỹ Cường Hóa và tự mình tiến lên trước trong thứ tự hành động sau khi sử dụng Tuyệt Kỹ.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Chìa Khóa Thứ 16</p>
    		<p class="text-white/80 text-sm">Những nhân vật thuộc hệ Tri Thức trong đội với Đại Herta sẽ nhận thêm SPD.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Câu Trả Lời Quyến Rũ Ngọt Ngào</p>
    		<p class="text-white/80 text-sm">Đại Herta tăng khả năng Xuyên Kháng Băng, và Tuyệt Kỹ của cô trở nên mạnh mẽ hơn nếu có ít kẻ thù hơn trên chiến trường.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['into-the-unreachable-veil','today-is-another-peaceful-day','night-on-the-milky-way','before-dawn']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Lựa chọn tốt nhất cho The Herta về cả Sát Thương và độ tiện dụng. Điểm Chiến Kỹ được cấp bởi Nón Ánh Sáng này vô cùng có giá trị đối với The Herta. 
			Đầu tiên, vì cô ấy hầu như luôn chơi trong các đội có sát thương gấp đôi đang cần Điểm Chiến Kỹ, và thứ hai là vì nó mở ra các tùy chọn xây dựng đội hình hỗ trợ và duy trì của cô ấy một cách đáng kể.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: <span class="font-bold">Trấn 4 Sao</span> -
			The Herta có thể dễ dàng đạt đến mức năng lượng tối đa của Nón Ánh Sáng này, khiến nó trở thành lựa chọn mạnh mẽ cho cô ấy trong hầu hết các tình huống. Tuy nhiên nên có tích tầng cao, cụ thể là S5.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Nón 5 Sao lệch tốt nhất nếu luôn có nhiều quá, cụ thể là trong Kể Chuyện Hư Cấu.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>:
			5 Sao chỉ số tốt.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['Scholar_Lost_in_Erudition','Hunter_of_Glacial_Forest']}
			mixSets={[['Scholar_Lost_in_Erudition','Hunter_of_Glacial_Forest']]}
  			planarIds={['Item_Izumo_Gensei_and_Takama_Divine_Realm','Item_Rutilant_Arena','Item_Sigonia_the_Unclaimed_Desolation']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Học Giả Lạc Lối Trong Biển Tri Thức</span>: 
			Bộ di vật tốt nhất cho Đại Herta nhờ cung cấp Tỷ Lệ Bạo Kích (chỉ số tốt nhất của cô) và lượng % Sát Thương cực lớn cho các kỹ năng gây Sát Thương chính của cô ấy.</p>
			<p><span class="text-amber-300 font-semibold">Thợ Săn Tuyết Phủ</span>: 
			Mặc dù không phải là một bộ kỹ năng nổi bật, nhưng Đạt Herta có thể tận dụng nó tốt hơn hầu hết các bộ kỹ năng khác vì phần lớn sát thương của cô đến từ Tuyệt Kỹ và Chiến Kỹ Cường Hóa theo sau nó.</p>
			<p><span class="text-amber-300 font-semibold">Mix 2-2</span>:
			Nếu bạn không thể kiếm được bộ 4 được đề xuất với các chỉ số chính/phụ đẹp, hãy lắp tạm 2 bộ: 
			<span class="font-bold">(Học Giả và Thợ Săn)</span> hoặc <span class="font-bold">(Học Giả và +12% ATK)</span>.
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Izumo Hiện Thế Và Thần Quốc Cõi Trời</span>:
			The Herta luôn phải đi cùng với một nhân vật khác thuộc hệ Tri Thức, vì vậy bộ set này không có bất kỳ nhược điểm nào. Ngoài ra, nó cung cấp một lượng lớn Tỷ Lệ Bạo Kích, chỉ số tốt nhất của cô.</p>
			<span class="text-amber-300 font-semibold">Đấu Trường Ngôi Sao</span>:
			Một bộ Phụ Kiện Vị Diện tổng quát và vững chắc dành cho các nhân vật gây sát thương dựa trên CRIT, tập trung vào Tấn Công Thường và damage Chiến Kỹ (hoặc cả hai).</p>
			<span class="text-amber-300 font-semibold">Hành Tinh Vô Chủ Sigonia</span>:
			Là một lựa chọn thay thế cho Izumo, nhưng có thời gian tích lũy hiệu ứng. Để tận dụng tối đa, bạn cần tiêu diệt 10 kẻ thù, điều này dễ dàng thực hiện trong chế độ Kể Chuyện Hư Cấu nhưng khó khăn hơn ở các chế độ khác, khiến bộ này kém đa dụng hơn so với Izumo. Các tính toán giả định rằng bộ set này được tích lũy đầy đủ hiệu ứng.</p>
			`}
			statDescriptions={[[
    		'[CR]Crit Rate &nbsp;&nbsp;&ge;&nbsp; [CD]Crit Dmg',
    		'[ATK]Tấn Công',
    		'[ice]<span style="color: #5CD6FF">Tăng ST Băng</span> &nbsp;&nbsp;&gt;&nbsp; [ATK]Tấn Công',
    		'[ATK]Tấn Công'
			]]}
			priorityStats={
			'Tỉ Lệ Bạo &ge; Sát Thương Bạo &gt; Tấn Công'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">3300+</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">90%+</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">150%+</span> &nbsp;<span class="text-white/70">(Đại Herta có Buff 80% CritDMG trong trận vì vậy hãy cố gắng đạt mốc CritRate trước)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">BASE</span> &nbsp;<span class="text-white/70">(Stack Thiên Phú và năng lượng Tuyệt Kỹ của Đại Herta tốt nhất nên được sạc nhờ Sub-DPS và SP, chính vì vậy lối build giày ATK sẽ hợp lý hơn)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['therta'],
    			supportDps: ['anaxa','jade','tribbie'],
    			amplifier: ['herta','serval','argenti','female-remembrance','robin'],
    			sustain: ['lingsha','aventurine','hyacine','gallagher']
  			}}
  			tooltips={{
				dps: {
					therta: 'Lệnh sứ Tri Thức, kẻ cứu rỗi Tri Thức thật sự, vị vua không ngai với cái mũ to của mình 🐧',
				},
				supportDps: {	
					anaxa: 'Anaxa là nhân vật tốt nhất cho vai trò slave cho Đại Herta. Kỹ năng của anh ta có thể đánh trúng tất cả kẻ thù và tung ra hai lần mỗi lượt, kết hợp với Tuyệt Kỹ diện rộng của anh ta, giúp hồi một lượng lớn Năng Lượng và tích stack Thiên Phú cho Herta đồng thời cũng đáp ứng yêu cầu đồng đội Tri Thức của cô ấy, cung cấp 50% tăng DMG toàn đội, mang lại lượng sát thương đáng kể và tuyệt vời nhất là gắn tất cả 7 điểm yếu vào tất cả kẻ thù.',
					jade: 'Cung cấp cho Đại Herta một số stack và hồi Năng Lượng nhất định và thường xuyên nhất trong tất cả các tùy chọn Tri Thức của cô ấy; ngoài ra còn cấp cho cô ấy 30 Tốc nhờ Kỹ năng của cô ấy (nếu có Lingsha hoặc Tribbie trong đội thì nên dùng cho họ). Jade cũng có thể gây ra lượng sát thương rất đáng kể, đặc biệt là trong Kể Chuyện Hư Cấu.',
					tribbie: 'Herta tự buff rất mạnh, khiến buff khác kém hiệu quả, nhưng xuyên kháng và % "sát thương phải chịu" của Tribbie vẫn hữu dụng. Tribbie còn giúp Herta hồi Năng Lượng tốt và tăng sát thương AoE qua “Lãnh Địa”, rất hợp lối đánh của Herta.',
				},
				amplifier: {
					herta: '"Mini Herta" là một lựa chọn thay thế hợp lý cho Jade trong các chế độ có kẻ thù yếu hoặc có thể hồi sinh để cô ấy kích hoạt Thiên Phú <span class="underline">Đòn Đánh Theo Sau</span> của mình như trong Kể Chuyện Hư Cấu. Thật không may, các đòn tiếp theo của Mini Herta chỉ được tính một lần cho mục đích tích stack và hồi Năng Lượng của Herta bất kể cô ấy quay bao nhiêu lần liên tiếp, khiến cô ấy chủ yếu phù hợp với Kể Chuyện Hư Cấu hoặc cho những người không còn sự lựa chọn nhân vật nào khác.',
					serval: 'Chơi như một noledaden chuyên dùng để tích stack và hồi Năng Lượng cho Đại Herta. Dùng nón <span class="font-bold">Chìa Khóa Linh Hồn S5</span> và di vật bộ 4 <span class="font-bold">Chim Ưng Ranh Giới Ngày Đêm</span> + dây Hiệu Suất Hồi Năng Lượng.',
					argenti: 'Tương tự Serval.',
					'female-remembrance': '<span class="underline">Sát Thương Chuẩn</span> + <span class="underline">Kéo Lượt</span> + 10% Crit Rate + khả năng Sạc Năng Lượng cho Đại Herta.',
					robin: 'Lựa chọn tuyệt vời cho Đại Herta và đồng đội của cô ấy. Robin là một nhân vật buff cho toàn đội, nghĩa là cả Đại Herta và cộng sự Tri Thức nole của cô ấy đều được buff và có khả năng gây nhiều sát thương hơn. Trên thực tế là các Sát Thương Kèm Theo từ Tuyệt Kỹ Robin cũng có thể cấp cho Đại Herta Năng Lượng và stack.',
				},
				sustain: {	
					lingsha: 'Mọi kỹ năng của cô nàng đều gây sát thương cho kẻ địch, bạn hiểu điều đó là gì mà, Năng Lượng + stack bú đẫm.',
					aventurine: 'Tương tự Lingsha ngoại trừ Chiến Kỹ, nhưng bù lại có Debuff tăng Crit DMG phải chịu, rất phù hợp với một DPS chơi Crit thuần như Đại Herta.',
					hyacine: 'Một bảo kê lý tưởng có thể dùng nếu bạn chưa sở hữu Lingsha.',
					gallagher: 'Rẻ, khỏe, bảo kê tốt, dương Điểm Chiến Kỹ, mỗi tội tích stack và nạp cho Đại Herta không nhanh bằng Lingsha.',
				}
			}}
			notes={{
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Vua mọi Content Endgame.
				Lượng sát thương đầu ra lớn.
				Có tự <span class='underline'>Ưu Tiên Hành Động</span> khi dùng Tuyệt Kỹ.
				Hồi Năng Lượng nhanh dù tận 220 Điểm Năng Lượng tối đa.
				Dễ chơi.
				Có thể sử dụng đội hình F2P siêu rẻ mà vẫn đạt hiệu quả cao (Đại Herta, Serval, Main Ký Ức, Gallaher).
				Có tự Buff bản thân lớn.
				Vẫn có thể tăng tiến sức mạnh trong tương lai mặc dù hiện tại đã rất mạnh.
				Mũ lớn.
			"
			cons='
				Hơi bó trong chiến trận cần nhiều kẻ địch, yêu cầu chung của các nhân vật vận mệnh Tri Thức (trừ "Ngài")
				Đặt tên hơi bị BrainRot.
			'
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: #1FE7A5">Anaxa</span> &nbsp &ge; &nbsp 
				<span class="text-orange-300">Tri Thức</span> &nbsp &gt &nbsp 
				<span class="text-orange-300">Hòa Hợp</span>/<span class="text-orange-300">Hư Vô</span> &nbsp &gt; &nbsp  
				<span style="color: {character.elementColor}">S1</span> &nbsp = &nbsp 
				<span style="color: {character.elementColor}">E2</span> &nbsp &gt; &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400">Anaxa</span>: Nô lệ đúng nghĩa đen, bị Đại Herta bóc lột hết mọi thứ.
			</p>
			<p>
				<span class="font-semibold text-amber-400">Tri Thức</span>: Nếu không có Anaxa thì dùng các nhân vật Tri Thức khác thay vào cũng được.
			</p>
			<p>
				<span class="font-semibold text-amber-400">Hòa Hợp</span>/<span class="font-semibold text-amber-400">Hư Vô</span>:
				Dùng để khuếch đại Sát Thương của Đại Herta và các nô lệ của cô ấy.
			</p>
			<p>
				<span class="font-semibold text-amber-400">S1</span>: Tăng mạnh Sát Thương gây ra từ 2 Kỹ năng chủ đạo của Đại Herta, hồi 1 Điểm Chiến Kỹ giúp Đại Herta vận hành trong chiến trận dễ hơn.
			</p>
			<p>
				<span class="font-semibold text-amber-400">E2</span>: Một con quái vật được sinh ra với 2 lần Chiến Kỹ Cường Hóa mà chỉ cần dùng 1 lần Tuyệt Kỹ.
			</p>			
		</div>

	</section>
</div>
