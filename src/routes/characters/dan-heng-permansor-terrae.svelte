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
    id: 'dan-heng-permansor-terrae',
    name: 'Dan Heng - Permansor Terrae',
    element: 'physical',
    path: 'preservation',
	elementColor: '#CFCFCF'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['14%','14.75%','15.5%','16.25%','17%','17.6%','18.2%','18.8%','19.4%','20%','20.6%','21.2%','21.8%','22.4%','23%'],
	['100','160','205','250','280','310','333','355','378','400','423','445','468','490','513']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['150%','165%','180%','195%','210%','225%','243.75%','262.5%','281.25%','300%','315%','330%','345%','360%','375%'],
	['14%','14.75%','15.5%','16.25%','17%','17.6%','18.2%','18.8%','19.4%','20%','20.6%','21.2%','21.8%','22.4%','23%'],
	['100','160','205','250','280','310','333','355','378','400','423','445','468','490','513'],
	['40%','44%','48%','52%','56%','60%','65%','70%','75%','80%','84%','88%','92%','96%','100%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['7%','7.38%','7.75%','8.13%','8.5%','8.8%','9.1%','9.66%','9.4%','9.7%','10%','10.3%','10.6%','10.9%','11.2%'],
	['50','80','103','125','140','155','166','178','189','200','211','223','234','245','256']
  ]
  let TalentLevel = 1;

	const SPD = 97;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 150;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [142, 278], atk: [79, 154], def: [105, 205] },
		{ dp: 1, levels: [20, 30], hp: [335, 406], atk: [186, 225], def: [248, 300] },
		{ dp: 2, levels: [30, 40], hp: [463, 534], atk: [257, 297], def: [343, 396] },
		{ dp: 3, levels: [40, 50], hp: [591, 662], atk: [328, 368], def: [438, 491] },
		{ dp: 4, levels: [50, 60], hp: [719, 791], atk: [399, 439], def: [533, 586] },
		{ dp: 5, levels: [60, 70], hp: [848, 919], atk: [471, 510], def: [628, 681] },
		{ dp: 6, levels: [70, 80], hp: [976, 1047], atk: [542, 582], def: [723, 776] }
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
			Lồng ngực của Georios, thân thể của Phục Long đang nâng đỡ mặt đất vỡ nát, chịu đựng nỗi thống khổ ngàn năm. Khách Vô Danh Dan Heng, Hậu Duệ Chrysos bảo vệ Ngọn Lửa "Mặt Đất", chống đỡ bát hoang sắp sụp đổ, đưa sinh linh trên mặt đất đến những vùng đất xa xôi. - Trăm sông đổ về biển, núi non đồng vọng tiếng vang, con đường bất diệt sẽ trải dài vạn dặm.
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Lồng ngực của Georios, thân thể của Phục Long đang nâng đỡ mặt đất vỡ nát, chịu đựng nỗi thống khổ ngàn năm. Khách Vô Danh Dan Heng, Hậu Duệ Chrysos bảo vệ Ngọn Lửa "Mặt Đất", chống đỡ bát hoang sắp sụp đổ, đưa sinh linh trên mặt đất đến những vùng đất xa xôi. - Trăm sông đổ về biển, núi non đồng vọng tiếng vang, con đường bất diệt sẽ trải dài vạn dặm.</p>
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
  		<h3 class="text-lg font-bold mb-1">Trấn Áp Cái Ác, Bảo Vệ Sinh Linh</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Vật Lý</span> cho 1 kẻ địch chỉ định tương đương
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Dan Heng - Permansor Terrae.
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
  		<h3 class="text-lg font-bold mb-1">Tĩnh Lặng Thâm Trầm, Chở Che Bát Hoang</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Phòng Thủ</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p class="text-base">Khiến 1 nhân vật chỉ định phe ta trở thành "Đồng Bào", cung cấp cho toàn bộ phe ta Khiên có thể triệt tiêu sát thương bằng
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Tấn Công của Dan Heng - Permansor Terrae
			+<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span>, duy trì <span class="text-yellow-400 font-semibold">3</span> hiệp.
			Khi nhận trùng Khiên của Dan Heng - Permansor Terrae, lượng Khiên có thể cộng dồn, tối đa không vượt quá
			<span class="text-yellow-400 font-semibold">300%</span> lượng Khiên do Chiến Kỹ hiện tại cung cấp.
		</p>
		<p class="text-base">"Đồng Bào" chỉ có hiệu lực với mục tiêu thi triển Chiến Kỹ mới nhất của Dan Heng - Permansor Terrae.</p>
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
  			<h3 class="text-lg font-bold mb-1">Kháng Long Vô Hối, Di Sơn Tịch Thế</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Lan</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">135</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">135</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Gây Sát Thương <span style="color: {character.elementColor}" class="font-bold">Vật Lý</span> bằng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> 
				Tấn Công của Dan Heng - Permansor Terrae cho toàn bộ phe địch, cung cấp cho toàn bộ phe ta Khiên có thể triệt tiêu sát thương bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span> Tấn Công của Dan Heng - Permansor Terrae 
				+<span class="text-yellow-400 font-semibold">{ultimateAttack[2][UltimateLevel - 1]}</span>, duy trì 
				<span class="text-yellow-400 font-semibold">3</span> hiệp. Khi nhận trùng Khiên của Dan Heng - Permansor Terrae, 
				lượng Khiên có thể cộng dồn, tối đa không vượt quá <span class="text-yellow-400 font-semibold">300%</span> lượng Khiên do Chiến Kỹ hiện tại cung cấp.
			</p>
			<p class="text-base">Khiến Hồn Rồng được cường hóa, khi Hồn Rồng hành động, sẽ phát động <u>Đòn Đánh Theo Sau</u>,
				gây Sát Thương <span style="color: {character.elementColor}" class="font-bold">Vật Lý</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[3][UltimateLevel - 1]}</span> 
				Tấn Công của Dan Heng - Permansor Terrae và <u>Sát Thương Kèm Theo</u> thuộc tính tương ứng bằng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[3][UltimateLevel - 1]}</span> 
				Tấn Công của "Đồng Bào" cho toàn bộ phe địch. 
				Cường hóa duy trì trong <span class="text-yellow-400 font-semibold">2</span> lần hành động của Hồn Rồng.
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
  			<h3 class="text-lg font-bold mb-1">Sinh Khí Vô Tận, Vạn Vật Thành Hình</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phòng Thủ</span> 
  			</p>
  			<p class="text-base">Khi nhân vật phe ta trở thành "Đồng Bào", Dan Heng - Permansor Terrae sẽ triệu hồi "Hồn Rồng" cho nhân vật đó, "Hồn Rồng" ban đầu có
				<span class="text-yellow-400 font-semibold">165</span> điểm Tốc Độ.
			</p>
			<p class="text-base">Khi "Hồn Rồng" hành động, sẽ giải trừ
				<span class="text-yellow-400 font-semibold">1</span> <u>Hiệu Ứng Xấu</u>
				cho toàn bộ phe ta, đồng thời cung cấp Khiên có thể triệt tiêu Sát Thương bằng
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span> Tấn Công của Dan Heng - Permansor Terrae 
				+<span class="text-yellow-400 font-semibold">{talent[1][TalentLevel - 1]}</span>, duy trì
				<span class="text-yellow-400 font-semibold">3</span> hiệp. Lượng Khiên của Dan Heng - Permansor Terrae và "Hồn Rồng" cung cấp có thể cộng dồn, tối đa không vượt quá
				<span class="text-yellow-400 font-semibold">300%</span> lượng Khiên do Chiến Kỹ của Dan Heng - Permansor Terrae cung cấp.
			</p>
			<p class="text-base">Khi Dan Heng - Permansor Terrae hoặc "Đồng Bào" rơi vào
				<u>trạng thái không thể chiến đấu</u>, "Hồn Rồng" sẽ biến mất.
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
  			<h3 class="text-lg font-bold mb-1">Xé Đất</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span>
  			</p>
  			<p class="text-base">Sau khi sử dụng Bí Kỹ, khi bắt đầu lần chiến đấu tiếp theo, Tấn Công của Dan Heng - Permansor Terrae tăng
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
  			<p class="text-white/80 text-sm">Nguồn Sát Thương chính của Dan Heng - Permansor Terrae gây ra.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Bổ trợ trực tiếp cho Sát Thương của Chiến Kỹ.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Có Sát Thương lớn, sắp xếp lại Thiên Phú, mở khóa nguồn Sát Thương Chính cho Dan Heng - Permansor Terrae.</p>
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
		title="Hùng Vĩ"
		description='Khi "Hồn Rồng" hành động, sẽ cung cấp thêm cho mục tiêu phe ta có lượng Khiên 
					thấp nhất hiện tại một lượng Khiên có thể triệt tiêu Sát Thương bằng <b class="text-yellow-400 ">5%</b> 
					Tấn Công của Dan Heng - Permansor Terrae +<b class="text-yellow-400 ">100</b>. 
					Khi nhận trùng Khiên từ Dan Heng - Permansor Terrae, lượng Khiên có thể cộng dồn, nhưng tối đa không vượt quá
					<b class="text-yellow-400 ">300%</b> ượng Khiên do Chiến Kỹ hiện tại cung cấp. 
					Khi "Hồn Rồng" được cường hóa hành động, sẽ gây thêm 1 lần <u>Sát Thương Kèm Theo</u>
					thuộc tính tương ứng bằng <b class="text-yellow-400 ">40%</b> Tấn Công của "Đồng Bào" lên 1 kẻ địch có HP cao nhất hiện tại.'
		unlock="A6"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A6"
    		},
    		{
    		  	icon: "/images/icons-vestige/DEF.png",
    		  	value: "+10%",
    		  	label: "Phòng Thủ",
    		  	unlock: "LV75"
    		},
			{
    		  	icon: "/images/icons-vestige/ATK.png",
    		  	value: "+8%",
    		  	label: "Tấn Công",
    		  	unlock: "LV80"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Thần Tú"
		description='Khi thi triển Chiến Kỹ, sẽ tăng Tấn Công của mục tiêu trở thành "Đồng Bào", mức tăng bằng
		<span class="text-yellow-400 font-semibold">15%</span> Tấn Công của Dan Heng - Permansor Terrae.'
		unlock="A2"

		nodes={[
			{
				icon: "/images/icons-vestige/DEF.png",
    		  	value: "+5%",
    		  	label: "Phòng Thủ",
      		  	unlock: "A2"
			},
			{
				icon: "/images/icons-vestige/ATK.png",
    		  	value: "+4%",
    		  	label: "Tấn Công",
      		  	unlock: "A3"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Sum Sê"
		description='Khi bắt đầu chiến đấu, Dan Heng - Permansor Terrae
		<u>Ưu Tiên Hành Động</u> <span class="text-yellow-400 font-semibold">40%</span>. 
		Khi "Đồng Bào" thi triển tấn công, Dan Heng - Permansor Terrae sẽ hồi
		<span class="text-yellow-400 font-semibold">6</span> điểm Năng Lượng, khiến "Hồn Rồng"
		<u>Ưu Tiên Hành Động</u> <span class="text-yellow-400 font-semibold">15%</span>.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+6%",
      		  	label: "Tấn Công",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/DEF.png",
    		  	value: "+7.5%",
    		  	label: "Phòng Thủ",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/ATK.png",
    		  	value: "+4%",
    		  	label: "Tấn Công",
      		  	unlock: "LV1"
			},
			{
				icon: "/images/icons-vestige/SPD.png",
    		  	value: "+2",
    		  	label: "Tốc Độ",
      		  	unlock: "A3"
			},
			{
				icon: "/images/icons-vestige/ATK.png",
			  	value: "+6%",
			  	label: "Tấn Công",
	  		  	unlock: "A5"
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
  				name="Rồng Hoang Lột Vảy Xưa"
  				elementColor={character.elementColor}
  				description='Khi Dan Heng - Permansor Terrae thi triển Tuyệt Kỹ, sẽ hồi
				<b class="text-yellow-400">1</b> Điểm Chiến Kỹ, khiến 
				<u>Xuyên Kháng</u> Toàn Thuộc Tính của "Đồng Bào" tăng
				<b class="text-yellow-400">18%</b>, duy trì <b class="text-yellow-400">3</b> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Xích Tử Bảo Vệ Khai Phá"
  				elementColor={character.elementColor}
  				description='Hiệu ứng hành động Hồn Rồng được cường hóa từ Tuyệt Kỹ tăng thêm 
				<b class="text-yellow-400">2</b> lần, sau khi Dan Heng - Permansor Terrae thi triển Tuyệt Kỹ, "Hồn Rồng" 
				<u>Ưu Tiên Hành Động</u> 100%. Khi "Hồn Rồng" được cường hóa hành động, 
				<u>Sát Thương Kèm Theo</u> mà "Đồng Bào" gây ra bằng <b class="text-yellow-400">200%</b> 
				sát thương gốc, và lượng khiên lần này cung cấp bằng <b class="text-yellow-400">200%</b> lượng khiên gốc.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Phó Thác Của Nhật Nguyệt Sơn Hà"
  				elementColor={character.elementColor}
  				description='Cấp 
				<b>Tuyệt Kỹ</b> 
				<b class="text-yellow-400">+2</b>, tối đa không quá cấp 15, cấp 
				<b>Tấn Công Thường</b> 
				<b class="text-yellow-400">+1</b>, tối đa không quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Thề Nguyện Trên Đá, Thân Này Là Thuyền"
  				elementColor={character.elementColor}
  				description='Sát thương "Đồng Bào" phải chịu giảm
				<b class="text-yellow-400">20%</b>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Con Đường Bất Diệt Trải Dài Vạn Dặm"
  				elementColor={character.elementColor}
  				description='Cấp 
				<b>Chiến Kỹ</b> 
				<b class="text-yellow-400">+2</b>, tối đa không quá cấp 15, cấp 
				<b>Thiên Phú</b> 
				<b class="text-yellow-400">+2</b>, tối đa không quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Cỏ Cây Bụi Trần Đều Chìm Vào Giấc Mộng"
  				elementColor={character.elementColor}
  				description='Khi trong trận tồn tại "Đồng Bào" sẽ khiến sát thương toàn bộ phe địch phải chịu tăng 
				<b class="text-yellow-400">20%</b>, khi "Đồng Bào" gây sát thương sẽ bỏ qua
				<b class="text-yellow-400">12%</b> Phòng Thủ của mục tiêu phe địch. 
				Khi Dan Heng - Permansor Terrae thi triển Tuyệt Kỹ, "Đồng Bào" sẽ gây
				<u>Sát Thương Kèm Theo</u> thuộc tính tương ứng bằng <b class="text-yellow-400">330%</b> 
				Tấn Công của "Đồng Bào" cho toàn bộ phe địch.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E6 &ge; E2 &gt; E1 &gt; E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Rồng Hoang Lột Vảy Xưa</p>
  			<p class="text-white/80 text-sm">Về cơ bản thì đây là một Tinh Hồn khá ổn khi có thể hoàn trả 1 điểm chiến kỹ và tăng xuyên kháng cho đồng đội. Tuy nhiên hiệu ứng tăng có thể nhanh chóng mất tác dụng khi mục tiêu liên tục nhận được "ưu tiên hành động".</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Xích Tử Bảo Vệ Khai Phá</p>
    		<p class="text-white/80 text-sm">Tăng cường sức mạnh cho "Hồn Rồng" về cả phòng thủ lẫn tấn công, và tăng số cộng dồn "Hồn Rồng" cường hóa từ 2 lên 4 lần. Tinh hồn này là điểm đột phá đầu tư lớn nhất của Dan Heng PT.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Thề Nguyện Trên Đá, Thân Này Là Thuyền</p>
    		<p class="text-white/80 text-sm">Giảm sát thương nhận vào của Đồng Bào duy nhất, điều này hầu như không có ý nghĩa gì. Chỉ nên lấy cái này nếu muốn đạt Tinh hồn 6.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Cỏ Cây Bụi Trần Đều Chìm Vào Giấc Mộng</p>
    		<p class="text-white/80 text-sm">Cung cấp các hiệu ứng tăng sức tấn công mạnh mẽ, áp dụng 20% ​​hiệu ứng suy yếu cho tất cả kẻ địch, tăng 12% khả năng bỏ qua phòng thủ cho Đồng đội, và khiến chiêu cuối gây thêm sát thương dựa trên chỉ số của Đồng đội. Hiệu ứng khuếch đại sát thương tổng thể rất mạnh nhưng bạn sẽ cần phải vượt qua một số Eidolon yếu hơn để đạt được cấp độ này.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['though-worlds-apart','journey-forever-peaceful','thus-burns-the-dawn','day-one-of-my-new-life','trend-of-the-universal-market']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Tăng đáng kể chỉ số ATK để củng cố Lá chắn của DHPT và tăng cường hiệu ứng tăng ATK của anh ta. 
			Khi sử dụng Tuyệt Kỹ, nó cũng cung cấp khả năng Hồi máu trong những giai đoạn khó khăn và tăng sát thương cho tất cả đồng minh, mạnh hơn nếu họ có vật triệu hồi, điều này cũng có thể thông qua Hồn Rồng của anh ta. 
			Ngoại trừ hiệu ứng hồi máu độc đáo của Nón Ánh Sáng này, nó không vượt trội hơn hẳn so với S5 Mong Hành Trình Mãi Mãi Bình An (mặc dù vẫn tốt hơn).
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>:
			Dù chỉ số tấn công cơ bản thấp, nó cung cấp thêm hiệu ứng khiên và tăng sát thương cho toàn đội để bù đắp cho cả khiên cơ bản yếu hơn và hiệu ứng tăng tấn công yếu hơn. Nhưng tôi không khuyến khích sử dụng vì nó không thân thiện với F2P.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Base ATK cao là quất.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>:
			Nếu không có Nón Ánh Sáng có chỉ số ATK cao hơn, thì đây là một lựa chọn cuối cùng, với khả năng kháng tất cả các loại sát thương cho toàn đội giúp giảm bớt áp lực phòng thủ do chỉ số ATK thấp.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>:
			Dùng trong một vài trường hợp nhất định, cụ thể là khi đi cùng Acheron hoặc team DoT. Tuy nhiên, vì chỉ số ATK thấp nên không khuyến khích sử dụng.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['self_enshrouded_recluse']}
			mixSets={[['self_enshrouded_recluse','musketeer_of_wild_wheat'],['self_enshrouded_recluse','messenger_traversing_hackerspace']]}
  			planarIds={['item_lushaka_the_sunken_seas','item_penacony_land_of_the_dreams','item_broken_keel']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Ẩn Sĩ Ẩn Mình Dưới Ánh Sao</span>: 
			Bộ trang bị chuyên dụng cho người chơi hệ Khiên, cung cấp khiên chắn mạnh mẽ hơn và hiệu ứng tăng 15% Crit DMG dễ duy trì cho toàn đội.</p>
			<p><span class="text-amber-300 font-semibold">Mix 2-2 Khiên+ATK</span>:
			Nếu bạn không thể kiếm được bộ 4 được đề xuất với các chỉ số chính/phụ đẹp, hãy lắp tạm 2 bộ <b>(Ẩn Sĩ và +12% ATK)</b>.</p>
			<p><span class="text-amber-300 font-semibold">Mix 2-2 Khiên+Tốc</span>:
			Về cơ bản là chơi DHPT như một bảo kê tiêu chuẩn tạo điểm chiến kỹ.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>:
			Dan Heng PT sẽ ưu tiên Lushaka hơn các lựa chọn khác nhờ vào khả năng tăng sức mạnh đồng đội và nhu cầu Năng lượng của vị tướng này.</p>
			<span class="text-amber-300 font-semibold">Penacony, Vùng Đất Của Những Giấc Mơ</span>:
			DHPT cũng có thể sử dụng Penacony khi hỗ trợ các tướng gây sát thương vật lý như Phainon</p>
			<span class="text-amber-300 font-semibold">Bộ Khung Bị Gãy</span>:
			Bộ tiêu chuẩn dành cho các nhân vật có nhiệm vụ bảo kê đồng đội.</p>
			`}
			statDescriptions={[[
    		'[ATK]Tấn Công',
    		'[SPD]Tốc Độ &nbsp;&nbsp;&ge;&nbsp; [ATK]Tấn Công',
    		'[ATK]Tấn Công',
    		'[ERR]Hiệu Suất Hồi Năng Lượng',
			]]}
			priorityStats={
			'Tốc Độ (cho đến khi đạt ngưỡng mong muốn) &gt; Tấn Công &gt; Kháng Hiệu Ứng'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">4000+</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">?</span> &nbsp;<span class="text-white/70">(Dan Heng PT nên có tốc cao, hãy build tùy thuộc vào đội hình)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['phainon','anaxa','hysilens','archer'],
    			supportDps: [],
    			amplifier: ['sunday','robin','cyrene'],
    			sustain: ['dan-heng-permansor-terrae']
  			}}
  			tooltips={{
				dps: {
					phainon: 'Một khi Hồn Rồng được gắn vào Phainon, nó sẽ không bị rời khỏi trận chiến của Tuyệt Kỹ của Phainon và do đó có thể tiếp tục cung cấp Lá chắn và tung ra các đòn tấn công tiếp theo được tăng cường dựa trên chỉ số của Phainon trong suốt thời gian đó. Mặc dù khả năng khuếch đại sát thương có thể yếu hơn so với các tướng khuếch đại chuyên dụng khác, nhưng khả năng khuếch đại của Dan Heng khá tương đồng nếu được kết hợp với Sunday và khi xét đến mức tăng 45% sát thương từ Dấu vết của Phainon. Anh ta cũng có thể giữ an toàn cho đội trong thời gian Phainon không hoạt động, khiến anh ta trở thành đồng đội lý tưởng cho Phainon trong các trận chiến kéo dài/áp lực cao.',
					anaxa: 'Hồn Rồng có thể được kéo trên thanh hành động liên tục khi Anaxa sử dụng Chiến Kỹ và anh còn có thể hành động liên tục khi được đồng đội kéo turn.',
					hysilens: 'DHPT có thể sử dụng nón Xu Hướng để hỗ trợ gắn DoT và gián tiếp tăng lượng sát thương Hysilens gây ra.',
					archer: 'Về cơ bản DHPT là một nhân vật dương chiến kỹ nên anh chàng có thể đi bảo kê tốt cho các nhân vật tiêu hao nhiều điểm chiến kỹ.',
				},
				supportDps: {	
				},
				amplifier: {
					sunday: 'Tương tác tốt với Hồn Rồng nhờ khả năng kéo vật triệu hồi.',
					robin: 'Khả năng buff ATK của Robin cũng tương tác tốt với độ bền của khiên mà Dan Heng cung cấp.',
					cyrene: 'Bạn buff cho char "Âm Phủ" thì mình xin.'
				},
				sustain: {
					'dan-heng-permansor-terrae': 'Là một nhân vật bảo kê đa dụng nên anh chàng có thể đi được với rất nhiều đội hình khác nhau.'
				}
			}}
			notes={{
				dps: 'Dan Heng - Permansor Terrae phối hợp tốt với gần như tất cả các DPS hiện tại.',
				supportDps: 'cứ nhân vật nào hỗ trợ cho DPS là dùng được tất.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros='
				Khả năng duy trì Khiên tốt.
				Tự động duy trì và tăng độ dày Khiên.
				Cung cấp các hiệu ứng tăng sức mạnh mạnh mẽ cho các đồng đội có chỉ số Tấn Công cao.
				Cung cấp khả năng tăng hệ số sát thương hiếm hoi cho "Đồng Bào".
				Có thể tạo ra sự phối hợp đồng minh với các hiệu ứng triệu hồi nhờ "Đồng Bào".
				Khả năng hồi năng lượng và Điểm chiến kỹ tốt.
				Tặng free khi mới ra mắt.
			'
			cons='
				Ít nón ánh sáng có thể sử dụng hiệu quả.
				Không mang lại nhiều giá trị cho các nhân vật gây sát thương không dựa trên ATK.
			'
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>

		<div class="grid p-2 bg-black/20 border border-white/50 rounded-lg">
			<p>- Thật luôn? Bạn muốn đầu tư cho Dan Heng - Permansor Terrae hả? Nó hoàn hảo ở mức E0S0 rồi. 
			<p>- Bạn nên tiếp kiệm những vé roll quý giá của bạn và dành chúng cho waifu hoặc husbando của bạn đi. 
			<p>- Nếu bạn muốn đầu tư thì cứ thoải mái, tôi không dạy người giàu cách tiêu tiền.				
		</div>

	</section>
</div>
