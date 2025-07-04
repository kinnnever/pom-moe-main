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

  const character = {
    id: 'phainon',
    name: 'Phainon',
    element: 'physical',
    path: 'destruction',
	elementColor: '#CFCFCF'
  };

  let lightconeNames: string[] = [];
  let revealed = false;

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%'],
	['125%','150%','175%','200%','225%','250%','275%','300%','325%','350%'],
	['37.5%','45%','52.5%','60%','67.5%','75%','82.5%','90%','97.5%','105%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['150%','165%','180%','195%','210%','225%','243.75%','262.5%','281.25%','300%','315%','330%','345%','360%','375%'],
	['60%','66%','72%','78%','84%','90%','97.5%','105%','112.5%','120%','126%','132%','138%','144%','150%'],
  	['20%','22%','24%','26%','28%','30%','32,5%','35%','37,5%','40%','42%','44%','46%','48%','50%'],
	['15%','16.5%','18%','19.5%','21%','22.5%','24.38%','26.25%','28.13%','30%','31.5%','33%','34.5%','36%','37.5%'],
	['585%','643.5%','702%','760.5%','819%','877.5%','950.63%','1023.75%','1096.88%','1170%','1228.5%','1287%','1345.5%','1404%','1462.5%'],
	['22.5%','24.75%','27%','29.25%','31.5%','33.75%','36.56%','39.38%','42.19%','45%','47.25%','49.5%','51.75%','54%','56.25%'],
	['225%','247.5%','270%','292.5%','315%','337.5%','365.63%','393.75%','421.88%','450%','472.5%','495%','517.5%','540%','562.5%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['480%','528%','576%','624%','672%','720%','780%','840%','900%','960%','1008%','1056%','1104%','1152%','1200%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['15%','16,5%','18%','19,5%','21%','22,5%','24.38%','26.25%','28.13%','30%','31,5%','33%','34,5%','36%','37,5%'],
	['40%','44%','48%','52%','56%','60%','65%','70%','75%','80%','84%','88%','92%','96%','100%'],
	['135%','148,5%','162%','175,5%','189%','202,5%','219.38%','236.25%','253.13%','270%','283,5%','297%','310,5%','324%','337,5%']
  ]
  let TalentLevel = 1;

	const SPD = 94;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 125;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [195, 380], atk: [79, 154], def: [95, 186] },
		{ dp: 1, levels: [20, 30], hp: [459, 556], atk: [186, 225], def: [224, 272] },
		{ dp: 2, levels: [30, 40], hp: [634, 732], atk: [257, 297], def: [311, 358] },
		{ dp: 3, levels: [40, 50], hp: [810, 908], atk: [328, 368], def: [397, 445] },
		{ dp: 4, levels: [50, 60], hp: [986, 1084], atk: [399, 439], def: [483, 531] },
		{ dp: 5, levels: [60, 70], hp: [1162, 1260], atk: [471, 510], def: [569, 617] },
		{ dp: 6, levels: [70, 80], hp: [1338, 1435], atk: [542, 582], def: [655, 703] }
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
			Aedes Elysiae, ngôi làng biên cương tách biệt với thế giới, giờ chỉ còn là những truyền thuyết mơ hồ. Người anh hùng vô danh █████, Hậu Duệ Chrysos mang trong mình Ngọn Lửa "Phụ Thế", khắc ghi lý tưởng của toàn nhân loại, gánh trên vai vận mệnh của muôn người, mang đến tia sáng bình minh đầu tiên cho thế giới mới ..."Nhưng nếu bình minh chưa từng tồn tại, vậy hãy để ngọn lửa giận dữ thiêu đốt thân xác này, hóa thành mặt trời rực rỡ của ngày mai!"
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Aedes Elysiae, ngôi làng biên cương tách biệt với thế giới, giờ chỉ còn là những truyền thuyết mơ hồ. Người anh hùng vô danh █████, Hậu Duệ Chrysos mang trong mình Ngọn Lửa "Phụ Thế", khắc ghi lý tưởng của toàn nhân loại, gánh trên vai vận mệnh của muôn người, mang đến tia sáng bình minh đầu tiên cho thế giới mới ..."Nhưng nếu bình minh chưa từng tồn tại, vậy hãy để ngọn lửa giận dữ thiêu đốt thân xác này, hóa thành mặt trời rực rỡ của ngày mai!"</p>
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
  		<h3 class="text-lg font-bold mb-1">Săn Đuổi Lửa Cứu Thế, Cứ Đi Sẽ Đến</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền </span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">0</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p>Gây Sát Thương 
		<span style="color: {character.elementColor}">Vật Lý</span> bằng 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Phainon cho 1 kẻ địch chỉ định.
		</p>

		<h3 class="text-lg font-bold mb-1">「Sáng Thế - Gai Máu Độ Vong」</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">90</span><span class="text-amber-400 italic"> sức bền/hit </span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">0</span>
		</p>
		<p>Nhận <span class="text-yellow-400 font-semibold">2</span> điểm
			<span class="underline">Phá Hủy</span>, gây Sát Thương <span style="color: {character.elementColor}">Vật Lý</span> bằng 
			<span class="text-yellow-400 font-semibold">{normalAttack[1][NormalLevel - 1]}</span> Tấn Công của Khaslana cho 1 kẻ địch chỉ định, gây Sát Thương 
			<span style="color: {character.elementColor}">Vật Lý</span> bằng 
			<span class="text-yellow-400 font-semibold">{normalAttack[2][NormalLevel - 1]}</span> Tấn Công của Khaslana cho mục tiêu lân cận.
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
  		<h3 class="text-lg font-bold mb-1">Bình Minh Sáng Thế, Đất Trời Mở Lối</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch tán </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền/hit</span>
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">2</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Nhận <span class="text-yellow-400 font-semibold">2</span> điểm "Ngọn Lửa", gây Sát Thương
			<span style="color: {character.elementColor}">Vật Lý</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Tấn Công của Phainon cho 1 kẻ địch chỉ định, gây Sát Thương 
			<span style="color: {character.elementColor}">Vật Lý</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> Tấn Công của Phainon cho mục tiêu lân cận.
 		</p>

		<h3 class="text-lg font-bold mb-1 mt-4">「Tai Ương - Chiếu Chỉ Thiêu Đốt Linh Hồn」</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Cường Hóa</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span>
			<span class="text-amber-400 italic">sức bền</span>
  		</p>
  		<p>Nhận <span class="underline">Phá Hủy</span> bằng với số lượng toàn bộ phe địch và 1 tầng Ngọn Lửa Diệt Hồn, sau đó khiến toàn bộ phe địch lập tức hành động.</p>
		<p>Ở trạng thái "Ngọn Lửa Diệt Hồn", sát thương Khaslana phải chịu giảm	<span class="text-yellow-400 font-semibold">75%</span>, sau khi mục tiêu phe địch tấn công hoặc hành động sẽ cộng dồn 1 tầng "Ngọn Lửa Diệt Hồn". Sau khi mục tiêu phe địch nêu trên hành động xong sẽ lập tức phát động Phản Kích, gây Sát Thương
			<span style="color: {character.elementColor}">Vật Lý</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[2][SkillLevel - 1]}</span> Tấn Công của Khaslana cho toàn bộ phe địch, đồng thời gây thêm
			<span class="text-yellow-400 font-semibold">4</span> lần sát thương, mỗi lần gây Sát Thương <span style="color: {character.elementColor}">Vật Lý</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[3][SkillLevel - 1]}</span> Tấn Công của Khaslana cho 1 kẻ địch ngẫu nhiên, sau đó giải trừ "Ngọn Lửa Diệt Hồn". Mỗi tầng "Ngọn Lửa Diệt Hồn" khiến Bội Số Sát Thương của lần
			<span class="underline">Phản Kích</span> này tăng 20% của bội số gốc.</p>
		<p>Khi gây sát thương thông qua kỹ năng này, sẽ được xem là gây sát thương Chiến Kỹ. Nếu khi <span class="underline">hiệp tăng thêm của Khaslana</span> bắt đầu mà vẫn còn "Ngọn Lửa Diệt Hồn", sẽ lập tức phát động <span class="underline">Phản Kích</span>.</p>
			
		<h3 class="text-lg font-bold mb-1 mt-4">「Trụ Cột - Phán Quyết Tử Tinh」</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Nảy Bật</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">10</span>
			<span class="text-amber-400 italic">sức bền/hit</span>
  		</p>
		<p>Giải trừ tất cả <span class="underline">Hiệu Ứng Xấu</span> của bản thân, sau đó gây Sát Thương
			<span style="color: {character.elementColor}">Vật Lý</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[4][SkillLevel - 1]}</span> Tấn Công của Khaslana.
		</p>
		<p>Trong đó, mỗi khi tiêu hao 1 điểm <span class="underline">Phá Hủy</span> sẽ gây <span class="text-yellow-400 font-semibold">4</span> lần sát thương, mỗi lần gây Sát Thương 
			<span style="color: {character.elementColor}">Vật Lý</span> bằng <span class="text-yellow-400 font-semibold">{skillAttack[5][SkillLevel - 1]}</span> Tấn Công của Khaslana cho 1 kẻ địch ngẫu nhiên. Khi tiêu hao
			<span class="text-yellow-400 font-semibold">4</span> điểm <span class="underline">Phá Hủy</span>, sẽ gây thêm Sát Thương 
			<span style="color: {character.elementColor}">Vật Lý</span> bằng <span class="text-yellow-400 font-semibold">{skillAttack[6][SkillLevel - 1]}</span> Tấn Công của Khaslana, chia đều cho toàn bộ phe địch.
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
  			<h3 class="text-lg font-bold mb-1">Vĩnh Kiếp Thiêu Thế, Một Mình Gánh Mang</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh lan </span> | 
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span> 
				<span class="text-amber-400 italic">sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">12</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">12</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">0</span>
  			</p>
  			<p>Biến thân thành Khaslana, triển khai 
				<span class=" underline">Vùng Lãnh Thổ</span> "Irontomb Tàn Phá" trong thời gian biến thân. Đồng đội khác trong
				<span class=" underline">Vùng Lãnh Thổ</span> <span class=" underline">Rời Trận</span> và không thể hành động, toàn bộ phe địch từ đầu đến cuối sẽ luôn mang Điểm Yếu
				<span style="color: {character.elementColor}">Vật Lý</span>.
 			</p>
			<p>Khaslana sẽ không vào hiệp của bản thân, nhưng có 
				<span class="text-yellow-400 font-semibold">8</span> <span class=" underline">Hiệp Tăng Thêm Của Khaslana</span>, Tốc Độ cố định là
				<span class="text-yellow-400 font-semibold">60%</span> Tốc Độ cơ bản của Khaslana. Khi <span class=" underline">hiệp tăng thêm cuối cùng của Khaslana</span>
				bắt đầu, sẽ lập tức phát động Đòn Đánh Cuối Cùng, gây Sát Thương Tuyệt Kỹ <span style="color: {character.elementColor}">Vật Lý</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> Tấn Công của Khaslana, chia đều cho toàn bộ phe địch.
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
  			<h3 class="text-lg font-bold mb-1">Thân Này Là Đuốc</h3>
  			<p class="text-sm mb-1"><span class="text-amber-400 italic">Cường hóa</span></p>
  			<p>Thiên phú của Phainon. Khi Ngọn Lửa đạt <span class="text-yellow-400 font-semibold">12</span> điểm có thể kích hoạt Tuyệt Kỹ, sau khi đạt giới hạn còn có thể vượt mức tối đa
				<span class="text-yellow-400 font-semibold">3</span> điểm, khi kết thúc biến thân sẽ nhận Ngọn Lửa dựa trên số điểm vượt mức.
 			</p>
			<p>Khi Phainon trở thành mục tiêu kỹ năng của bất kỳ mục tiêu nào khác, sẽ nhận 1 điểm Ngọn Lửa. Nếu người thi triển là đồng đội của Phainon, sẽ có thể khiến sát thương bạo kích của Phainon tăng 
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>, duy trì <span class="text-yellow-400 font-semibold">3</span> hiệp.
			</p>

			<h3 class="text-lg font-bold mb-1 mt-4">「Vận Mệnh - Thân Này Là Thần」</h3>
  			<p class="text-sm mb-1"><span class="text-amber-400 italic">Cường hóa</span></p>
			<p>Thiên Phú của Khaslana. Khi biến thân sẽ nhận
				<span class="text-yellow-400 font-semibold">4</span> điểm <span class="underline">Phá Hủy</span>. Nếu lúc này ở hiệp của mục tiêu phe ta, sẽ khiến tất cả
				<span class="underline">hiệu ứng buff</span> của mục tiêu này kéo dài 1 hiệp và kết thúc hiệp này.
			</p>
			<p>Khaslana miễn dịch <span class="underline">Hiệu Ứng Xấu loại khống chế</span>, có 1 Tấn Công Thường Cường Hóa và 2 Chiến Kỹ Cường Hóa, không thể thi triển Tuyệt Kỹ. Trong thời gian biến thân, Tấn Công tăng
				<span class="text-yellow-400 font-semibold">{talent[1][TalentLevel - 1]}</span>, Giới Hạn HP tăng <span class="text-yellow-400 font-semibold">{talent[2][TalentLevel - 1]}</span>, sau khi tấn công sẽ hồi HP bằng
				<span class="text-yellow-400 font-semibold">20%</span> Giới Hạn HP của bản thân. Khaslana khi chịu tấn công chí tử sẽ không rơi vào <span class="underline">trạng thái không thể chiến đấu</span>,
				mà sẽ hồi HP bằng <span class="text-yellow-400 font-semibold">25%</span> Giới Hạn HP của bản thân và lập tức phát động Đòn Đánh Cuối Cùng. Mỗi 1 <span class="underline">hiệp tăng thêm còn lại của Khaslana</span>,
				Bội Số Sát Thương của Đòn Đánh Cuối Cùng sẽ giảm <span class="text-yellow-400 font-semibold">12.5%</span> so với bội số gốc.
			</p>
			<p>Khi kết thúc biến thân, sẽ khiến Tốc Độ toàn bộ phe ta tăng <span class="text-yellow-400 font-semibold">15%</span>, duy trì 1 hiệp.</p>
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
  			<h3 class="text-lg font-bold mb-1">Khởi Đầu Của Kết Thúc</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phá vỡ</span>
				<span style="color: {character.elementColor}">60</span>
  			</p>
			<p>Khi có Phainon trong đội, giới hạn Điểm Bí Kỹ sẽ tăng 3 điểm.</p>
  			<p>Chủ động thi triển Bí Kỹ tiêu hao 2 điểm Bí Kỹ, lập tức tấn công tất cả kẻ địch trong phạm vi nhất định. Sau khi vào chiến đấu, hồi
				<span class="text-yellow-400 font-semibold">25</span> điểm Năng Lượng cho đồng đội, nhận 
				<span class="text-yellow-400 font-semibold">2</span> điểm <span class="underline">Phá Hủy</span> và 1 Điểm Chiến Kỹ, đồng thời khi bắt đầu mỗi đợt sẽ gây Sát Thương 
				<span style="color: {character.elementColor}">Vật Lý</span> bằng <span class="text-yellow-400 font-semibold">200%</span> Tấn Công của Phainon cho toàn bộ phe địch.
			</p>
			<p>Nếu tấn công kẻ địch bình thường sẽ lập tức tiêu diệt kẻ đó, không vào chiến đấu. Khi chưa đánh trúng địch sẽ không tiêu hao Điểm Bí Kỹ.
			</p>
		</div>
	</div>

	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ &gt Tuyệt Kỹ = Thiên Phú = Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Lối chơi của Phainon xoay quanh Chiến Kỹ Khaslana nên hãy nâng cấp max kỹ năng này đầu tiên.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Mở khóa lối chơi chính nhưng nâng vì hỗ trợ tí DMG khi rời trạng thái.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Bổ trợ cho trạng thái Khaslana nên cũng hãy nâng đi.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn công thường</p>
    		<p class="text-white/80 text-sm">Nên nâng để cho dạng Khaslana dùng, còn Phainon thì cook.</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Đi Đến Điểm Tận Cùng"
		description="Khi bắt đầu chiến đấu, nhận
					<span class='text-yellow-400 font-semibold'>1</span> điểm Ngọn Lửa. Khi kết thúc Biến Thân, nhận
					<span class='text-yellow-400 font-semibold'>3</span> điểm Ngọn Lửa."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+2.7%",
      		  	label: "Tỷ Lệ Bạo Kích",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/CD.png",
    		  	value: "+5.3%",
    		  	label: "Sát Thương Bạo Kích",
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
		title="Thân Mang Nghìn Ngọn Lửa"
		description='<p>Khi nhận Khiên hoặc hiệu ứng trị liệu từ đồng đội, Sát Thương gây ra tăng <span class="text-yellow-400 font-semibold">45%</span>,
		duy trì <span class="text-yellow-400 font-semibold">4</span> hiệp. Hiệu ứng này không thể kích hoạt trùng lặp trong 1 hiệp.</p>
		<p>Khi nhận hiệu ứng kỹ năng hồi Năng Lượng từ đồng đội, sẽ nhận <span class="text-yellow-400 font-semibold">1</span> điểm "Ngọn Lửa".</p>'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+8%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+4%",
      		  	label: "Tỷ Lệ Bạo Kích",
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
		title="Sáng Soi Bản Sắc Anh Hùng"
		description='Khi vào chiến đấu hoặc kết thúc biến thân, Tấn Công tăng		
		<span class="text-yellow-400 font-semibold">50%</span>. Hiệu ứng này tối đa cộng dồn 
		<span class="text-yellow-400 font-semibold">2</span> tầng.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+5.3%",
      		  	label: "Tỷ Lệ Bạo Kích",
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
  				name="Lửa Và Ánh Sáng, Hóa Thân Của Thiện Và Ác"
  				elementColor={character.elementColor}
  				description='<p>Tỷ lệ kế thừa Tốc Độ cơ bản của <span class="underline">Hiệp Tăng Thêm Của Khaslana</span> tăng đến
				<span class="text-yellow-400 font-semibold">66%</span>. Trong một trận đấu cứ có 1 mục tiêu phe địch bị tiêu diệt thì sẽ tăng thêm
				<span class="text-yellow-400 font-semibold">1.5%</span>, tối đa tăng đến <span class="text-yellow-400 font-semibold">84%</span>.</p>
				<p>Khi thi triển Tuyệt Kỹ, Sát Thương Bạo Kích tăng <span class="text-yellow-400 font-semibold">50%</span>,duy trì <span class="text-yellow-400 font-semibold">3</span> hiệp.</p>'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Trời Và Đất, Bọt Bóng Của Thế Gian"
  				elementColor={character.elementColor}
  				description='<span class="underline">Xuyên Kháng</span> <span style="color: {character.elementColor}">Vật Lý</span> của Khaslana tăng
				<span class="text-yellow-400 font-semibold">20%</span>. Thi triển 1 lần "Trụ Cột - Phán Quyết Tử Tinh" tiêu hao điểm <span class="underline">Phá Hủy</span> đạt
				<span class="text-yellow-400 font-semibold">4</span> điểm sẽ nhận 1 <span class="underline">hiệp tăng thêm</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Mấy Tầng Tĩnh Mịch, Chôn Sâu Vào Phế Tích"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ <span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15; 
				cấp Tấn Công Thường <span class="text-yellow-400 font-semibold">+1</span>, tối đa không quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Bao Nhiêu Titan, Mờ Nhạt Theo Thời Gian"
  				elementColor={character.elementColor}
  				description='Khi thi triển Tai Ương - Chiếu Chỉ Thiêu Đốt Linh Hồn, sẽ nhận thêm
				<span class="text-yellow-400 font-semibold">4</span> tầng Ngọn Lửa Diệt Hồn.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Kim Đồng Hồ Vĩnh Kiếp, Quay Ba Mươi Triệu Vòng"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ <span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15; 
				cấp Thiên Phú <span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Trỗi Dậy Từ Xa Xưa, Lửa Nuốt Chửng Mặt Trời"
  				elementColor={character.elementColor}
  				description='<p>Điểm có thể vượt mức của Ngọn Lửa sẽ không còn giới hạn nữa. Khi bắt đầu chiến đấu, nhận <span class="text-yellow-400 font-semibold">6</span> điểm Ngọn Lửa.</p>
				<p>Sau khi thi triển "Trụ Cột - Phán Quyết Tử Tinh" tấn công, sẽ gây thêm cho mục tiêu phe địch có HP cao nhất
				<span class="underline">Sát Thương Chuẩn</span> bằng <span class="text-yellow-400 font-semibold">36%</span> tổng sát thương của lần tấn công này.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E2 = E6 &gt E4 &gt E1</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Lửa Và Ánh Sáng, Hóa Thân Của Thiện Và Ác</p>
  			<p class="text-white/80 text-sm">Cải thiện chút vận hành và thêm chút Sát Thương Bạo nhưng vẫn lmao lắm.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Trời Và Đất, Bọt Bóng Của Thế Gian</p>
    		<p class="text-white/80 text-sm">Chênh lệch E2S1 và E0S1 là gần 150% thì chắc bạn đủ hiểu Tinh Hồn này bẩn đến mức nào.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Bao Nhiêu Titan, Mờ Nhạt Theo Thời Gian</p>
    		<p class="text-white/80 text-sm">Spam nguồn Sát Thương chính được nhiều hơn.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Trỗi Dậy Từ Xa Xưa, Lửa Nuốt Chửng Mặt Trời</p>
    		<p class="text-white/80 text-sm">"Thế Giới Này Sẽ Biết Đến Nỗi Đau" phiên bản siêu spam.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['thus-burns-the-dawn','on-the-fall-of-an-aeon','something-irreplaceable','brighter-than-the-sun','a-trail-of-bygone-blood']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Tốt.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: Nón F2P tốt, nhưng chỉ dùng tạm thôi, không có gì thì mới dùng.
			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: Giải pháp phù hợp trong nhiều tình huống, cụ thể là trong Tuyệt Kỹ anh chàng.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>: Crit Rate tốt.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>: Nón BattelPass, ngon khi S5.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
  			relicIds={['wavestrider_captain', 'scholar_lost_in_erudition']}
			mixSets={[[],[]]}
  			planarIds={['item_arcadia_of_woven_dreams', 'item_rutilant_arena']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Thuyền Trưởng Đuổi Sóng Biển Sâu</span>: 
			Bộ Kỹ Năng của Phainon tập trung vào "hiệu ứng được nhắm đến", khiến kích hoạt hiệu ứng bộ này rất dễ. Và trong trạng thái Tuyệt Kỹ được tính là 1 lượt duy nhất, nghĩa là Phainon luôn được Buff 48% ATK trong lúc đó.</p>
			<p><span class="text-amber-300 font-semibold">Học Giả Lạc Lối Trong Biển Tri Thức</span>: 
			Sử dụng tốt, có thể dùng tạm khi chưa có bộ trên đẹp.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Thiên Đường Yêu Tinh Dệt Mộng</span>: 
			Phainon được tính là "sói cô độc" trong suốt trạng thái Tuyệt Kỹ, nghĩa là Phainon sẽ được Buff tối đa 3 cộng dồn = 36% Sát Thương gây ra.</p>
			<p><span class="text-amber-300 font-semibold">Đấu Trường Ngôi Sao</span>: 
			Phần lớn Sát Thương của Phainon đến từ Chiến Kỹ và Đòn Đánh Thường (cả 2 đều cường hóa) ngoại trừ đòn cuối cùng của Tuyệt Kỹ, từ đó là hiểu Phainon rất hợp dùng bộ Cầu Dây này.</p>
			`}
			statDescriptions={[[
    		'[CR]Crit Rate &nbsp;&nbsp;&gt; &nbsp;[CD]Crit Dmg',
    		'[SPD]Tốc Độ &nbsp;&nbsp;> &nbsp;[ATK]Tấn Công ',
    		'[physical]<span style="color: #CFCFCF">Tăng ST Vật Lý</span> &nbsp;&nbsp;> &nbsp;[ATK]Tấn Công ',
    		'[ATK]Tấn Công'
			]]}
			priorityStats={
			'Tỉ Lệ Bạo &ge; Sát Thương Bạo &gt; Tấn Công = Tốc Độ'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">3300+</span> &nbsp;<span class="text-white/70">(Có thể dùng Giày <span class="text-yellow-400">ATK</span> trong một số trường hợp nhất định)</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">100%</span> &nbsp;<span class="text-white/70">(Hãy cân bằng để cố gắng đạt được chỉ số này trong chiến trận)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">200%</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">136</span> &nbsp;<span class="text-white/70">(Hiện tại Phainon ổn nhất với chiến thuật 2 sp đi theo đẩy lượt, nên 136 để kẹp cùng Sunday/Bronya 134/135 là ok nhất)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['phainon'],
    			supportDps: [],
    			amplifier: ['cerydra','sunday','bronya','sparkle','tingyun'],
    			sustain: ['huohuo','bailu']
  			}}
  			tooltips={{
				dps: {
					Phainon: 'DPS chủ lực, cần đi cùng đồng đội có khả năng chọn mục tiêu là đồng minh.',
				},
				supportDps: {
				},
				amplifier: {
					cerydra: 'Best in Slot cho đội hình Phainon.',
					sunday: 'Nên có trấn và đi cùng Bronya để tối ưu cho Phainon.',
					bronya: 'Giống Sunday.',
					sparkle: 'Dùng được là được. Chắc vậy..',
					tingyun: 'Giống Sparkle :v'
				},
				sustain: {
					huohuo: 'Có Heal khi đồng minh đến lượt, có buff ATK, Phainon dùng được. Nhưng nên chú ý điểm chiến kỹ.',	
					bailu: 'Cho vào cho có thôi, đừng để ý.'
				}
			}}
			notes={{
				amplifier: 'Cứ có kỹ năng chọn đồng minh là mục tiêu là chơi được.',
				sustain: 'Tương tự thằng bên cạnh.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Dễ chơi.
				Có thể chơi mà không cần bảo kê.
				Tận dụng tốt các buff có hiệu lực ngắn.
				Miễn khống chế và kim bài miễn tử trong Tuyệt Kỹ.
				Cosplay Boss trong Elden Ring.
				Có thể phát triển trong tương lai.
				Dọn quái nhỏ ngoài map cực nhanh mà không cần vào trận chiến.
				Vua Kể Chuyện Hư Cấu do cơ chế đặc biệt, hãy roll nếu bạn cần nhân vật đi Kể Chuyện.
				Hiệu ứng đẹp nổ máy.
			"
			cons="
				Phụ thuộc quá nhiều vào kỹ năng của đồng minh.
				Cần đầu tư nhiều vào di vật chỉ số đẹp.
				Không có Tinh Hồn thì nhót.
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Tư Bản Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">E2</span> &nbsp &gt &nbsp
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt &nbsp 
				<span class="text-white/70 text-2xl">(skip)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3 p-4">
			<p class="text-lg ">Nói thật nhé, nếu bạn không đủ khả năng roll E2 thì bạn nên skip luôn cho lành.</p>
			<p class="text-lg ">Còn nếu bạn simp thì tôi không cản.</p>
		</div>

		<div class="mt-8 w-full flex justify-center">
			<p class="text-white/10 font-bold">
				Nguồn Guide:
				<a
				href="https://discord.gg/W8g3nqu2p9" 
				class="hover:text-white/60 transition-colors "
				target="_blank"
				rel="noopener noreferrer"
				>
				Bệnh viện Lê Bách
				</a>
			</p>
		</div>
	</section>
</div>
