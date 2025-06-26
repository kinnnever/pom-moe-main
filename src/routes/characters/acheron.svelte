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
    id: 'acheron',
    name: 'Acheron',
    element: 'lightning',
    path: 'nihility',
	elementColor: '#E26CFF'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['80%','88%','96%','104%','112%','120%','130%','140%','150%','160%','168%','176%','184%','192%','200%'],
  	['30%','33%','36%','39%','42%','45%','48.75%','52.5%','56.25%','60%','63%','66%','69%','72%','75%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['223.2%','238.08%','252.96%','267.84%','282.72%','297.6%','316.2%','334.8%','353.4%','372%','386.88%','401.76%','416.64%','431.52%',"446.4%"],
  	['180%','192%','204%','216%','228%','240%','255%','270%','285%','300%','312%','324%','336%','348%','360%'],
	['14.4%','15.36%','16.32%','17.28%','18.24%','19.2%','20.4%','21.6%','22.8%','24%','24.96%','25.92%','26.88%','27.84%','28.8%'],
	['9%','9.6%','10.2%','10.8%','11.4%','12%','12.75%','13.5%','14.25%','15%','15.6%','16.2%','16.8%','17.4%','18%'],
	['36%','38.4%','40.8%','43.2%','45.6%','48%','51%','54%','57%','60%','62.4%','64.8%','67.2%','69.6%','72%'],
	['72%','76.8%','81.6%','86.4%','91.2%','96%','102%','108%','114%','120%','124.8%','129.6%','134.4%','139.2%','144%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['10%','11%','12%','13%','14%','15%','16.25%','17.5%','18.75%','20%','21%','22%','23%','24%','25%']
  ]
  let TalentLevel = 1;

	const SPD = 101;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [153, 298], atk: [95, 185], def: [59, 115] },
		{ dp: 1, levels: [20, 30], hp: [359, 436], atk: [223, 270], def: [139, 169] },
		{ dp: 2, levels: [30, 40], hp: [497, 574], atk: [308, 356], def: [193, 222] },
		{ dp: 3, levels: [40, 50], hp: [635, 712], atk: [394, 441], def: [246, 276] },
		{ dp: 4, levels: [50, 60], hp: [773, 849], atk: [479, 527], def: [299, 329] },
		{ dp: 5, levels: [60, 70], hp: [911, 987], atk: [565, 613], def: [353, 383] },
		{ dp: 6, levels: [70, 80], hp: [1048, 1125], atk: [651, 698], def: [406, 436] }
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
			<p>Lữ khách tự xưng là "Cảnh Binh Thiên Hà", tên thật không rõ. </p><p>Đeo thanh đao dài trên người, độc hành trong ngân hà.
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Lữ khách tự xưng là "Cảnh Binh Thiên Hà", tên thật không rõ. Đeo thanh đao dài trên người, độc hành trong ngân hà.</p>
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
  		<h3 class="text-lg font-bold mb-1">Ba Đường Thăng Trầm</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền </span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">0</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Acheron cho 1 kẻ địch chỉ định.
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
  		<h3 class="text-lg font-bold mb-1">Bát lôi phi bộ</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch tán </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền mục tiêu chính,</span> 
			<span style="color: {character.elementColor}">30</span> 
			<span class="text-amber-400 italic">sức bền mục tiêu lân cận</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">0</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p class="text-base">Nhận <span class="text-yellow-400 font-semibold">1</span> điểm 
			<span class="font-bold underline">Mộng tàn</span>. Gắn
			<span class="text-yellow-400 font-semibold">1</span> tầng 
			<span class="font-bold underline">Nút Thắt Đỏ</span> lên 1 kẻ địch chỉ định, gây sát thương 
			<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> lên kẻ địch này bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Tấn Công của Acheron, đồng thời gây sát thương 
			<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> cho mục tiêu lân cận kẻ đó bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> Tấn Công của Acheron.
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
  			<h3 class="text-lg font-bold mb-1">Giấc Mộng Tàn Khuyết, Một Chém Đoạn Tuyệt</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh lan </span> | 
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">15</span> 
				<span class="text-amber-400 italic">sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">9</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">9</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">0</span>
  			</p>
  			<p class="text-base">Lần lượt phát động 3 lần 
				<span class="font-bold underline">Lưỡi Chém Mưa</span> và 1 lần 
				<span class="font-bold underline">Hoàng Tuyền Vượt Kiếp</span>, tối đa gây cho 1 kẻ địch chỉ định Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> Tấn Công của Acheron, tối đa gây cho các mục tiêu khác Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span> Tấn Công của Acheron.
 			</p>
			<p class="text-base">
				<span class="font-bold underline">Lưỡi Chém Mưa:</span> Gây cho 1 kẻ địch chỉ định Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[2][UltimateLevel - 1]}</span> Tấn Công của Acheron đồng thời xóa tối đa 3 tầng
				<span class="font-bold underline">Nút Thắt Đỏ</span> của mục tiêu. Khi xóa
				<span class="font-bold underline">Nút Thắt Đỏ</span> sẽ lập tức gây cho toàn bộ phe địch Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[3][UltimateLevel - 1]}</span> Tấn Công của Acheron, mỗi 1 tầng
				<span class="font-bold underline">Nút Thắt Đỏ</span> bị xóa sẽ tăng thêm Bội Số Sát Thương lần này, tối đa tăng đến
				<span class="text-yellow-400 font-semibold">{ultimateAttack[4][UltimateLevel - 1]}</span>
			</p>
			<p class="text-base">
				<span class="font-bold underline">Hoàng Tuyền Vượt Kiếp:</span> Gây cho toàn bộ phe địch Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[5][UltimateLevel - 1]}</span> Tấn Công của Acheron và xóa tất cả 
				<span class="font-bold underline">Nút Thắt Đỏ</span>.
			</p>
			<p class="text-base">Trong thời gian Tuyệt Kỹ không thể gắn thêm
				<span class="font-bold underline">Nút Thắt Đỏ</span> cho kẻ địch.
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
  			<h3 class="text-lg font-bold mb-1">Mưa Lá Đỏ, Vạn Vật Hóa Hư Không</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường hóa</span>
  			</p>
  			<p class="text-base">Khi
				<span class="font-bold underline">"Mộng Tàn"</span> đạt 
				<span class="text-yellow-400 font-semibold">9</span> điểm sẽ có thể kích hoạt Tuyệt Kỹ. Trong thời gian Tuyệt Kỹ có thể 
				<span class="underline">bỏ qua thuộc tính Điểm yếu</span> làm giảm Sức Bền của kẻ địch, đồng thời giảm 
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span> Kháng Toàn Thuộc Tính của toàn bộ phe địch, duy trì đến khi kết thúc Tuyệt Kỹ.
 			</p>
			<p class="text-base">Trong thời gian đơn vị bất kỳ thi triển kỹ năng khiến kẻ địch rơi vào 
				<span class="underline">Hiệu Ứng Xấu</span>, Acheron sẽ nhận 1 điểm
				<span class="font-bold underline">Mộng Tàn</span>, đồng thời gắn 1 tầng 
				<span class="font-bold underline">"Nút Thắt Đỏ"</span> lên mục tiêu, nếu khiến nhiều mục tiêu rơi vào
				<span class="underline">Hiệu ứng xấu</span>, thì sẽ gắn 1 tầng 
				<span class="font-bold underline">"Nút Thắt Đỏ"</span> lên một mục tiêu địch có nhiều
				<span class="font-bold underline">"Nút Thắt Đỏ"</span> nhất. Hiệu ứng này mỗi lần thi triển kỹ năng tối đa kích hoạt 1 lần.
			</p>
			<p class="text-base">Khi Acheron có mặt, kẻ địch rời khỏi trận hoặc bị đơn vị bất kỳ tiêu diệt, 
				<span class="font-bold underline">"Nút Thắt Đỏ"</span> đang có sẽ chuyển sang kẻ địch có nhiều
				<span class="font-bold underline">"Nút Thắt Đỏ"</span> nhất.
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
  			<h3 class="text-lg font-bold mb-1">Tứ Tướng Đoạn Ngã</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phá vỡ</span>
				<span style="color: {character.elementColor}">60</span>
  			</p>
  			<p class="text-base">Lập tức tấn công kẻ địch, khi bắt đầu mỗi đợt sẽ nhận 
				<span class="font-bold underline">Tứ Tướng Đoạn Ngã</span>, gây Sát Thương
				<span style="color: {character.elementColor}">Lôi</span> cho tất cả kẻ địch bằng 
				<span class="text-yellow-400 font-semibold">200%</span> Tấn Công của Acheron, đồng thời
				<span class="underline">bỏ qua thuộc tính Điểm Yếu</span> và làm giảm Sức Bền của toàn phe địch, 
				khi phá vỡ Điểm Yếu sẽ kích hoạt hiệu ứng Phá Vỡ Điểm Yếu
				<span style="color: {character.elementColor}">Lôi</span>.
			</p>
			<p class="text-base">
				<span class="font-bold underline">Tứ Tướng Đoạn Ngã:</span> Sau khi thi triển Tuyệt Kỹ, Acheron nhận
				<span class="text-yellow-400 font semibold">1</span> điểm 
				<span class="font-bold underline">Mộng Tàn</span> đồng thời gắn
				<span class="text-yellow-400 font semibold">1</span> tầng
				<span class="font-bold underline">"Nút Thắt Đỏ"</span> lên 1 kẻ địch ngẫu nhiên.
			</p>
			<p class="text-base">Nếu tấn công kẻ địch bình thường sẽ lập tức 
				<span class="font-bold">tiêu diệt kẻ đó</span>, không vào chiến đấu. Khi chưa đánh trúng địch sẽ không tiêu hao Điểm Bí Kỹ.
			</p>
		</div>
	</div>

	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Tuyệt Kỹ &gt Thiên Phú = Chiến Kỹ &gt Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Tuyệt kỹ</p>
  			<p class="text-white/80 text-sm">Phần lớn sát thương của Acheron đến từ Tuyệt Kỹ, nên đây là kỹ năng quan trọng nhất cần tối đa hóa.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên phú</p>
    		<p class="text-white/80 text-sm">Thiên phú giảm kháng kẻ địch, tăng trực tiếp sát thương đầu ra từ Tuyệt Kỹ của Acheron.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến kỹ</p>
    		<p class="text-white/80 text-sm">Nguồn sát thương chính khi Tuyệt Kỹ chưa sẵn sàng, cũng như là giúp Acheron sạc cho Tuyệt Kỹ.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn công thường</p>
    		<p class="text-white/80 text-sm">Không cần nâng cấp, vì hầu như Acheron sẽ luôn dùng Chiến Kỹ thay vì Tấn Công Thường.</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Quỷ Đỏ"
		description="Khi bắt đầu chiến đấu sẽ nhận ngay 
					<span class='text-yellow-400 font-semibold'>5</span> điểm 
					<span class='font-bold underline'>Mộng Tàn</span> và gắn cho 1 kẻ địch ngẫu nhiên 
					<span class='text-yellow-400 font-semibold'>5</span> tầng 
					<span class='font-bold underline'>Nút Thắt Đỏ</span>. Khi 
					<span class='font-bold underline'>Mộng Tàn</span> đạt giới hạn, cứ mỗi 1 điểm 
					<span class='font-bold underline'>Mộng Tàn</span> vượt mức sẽ nhận 1 tầng 
					<span class='font-bold underline'>Tứ Tướng Đoạn Ngã</span>, khiến 
					<span class='font-bold underline'>Tứ Tướng Đoạn Ngã</span> tối đa có thể cộng dồn đến 3 tầng."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+5.3%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/ATK.png",
    		  	value: "+4%",
    		  	label: "Tấn Công",
    		  	unlock: "A3"
    		},
    		{
    		  	icon: "/images/icons-vestige/lightning.png",
    		  	value: "+3.2%",
      		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
      		  	unlock: "A3"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Vực Sâu"
		description='Khi trong đội phe ta có 
		<span class="font-bold">1</span> hoặc 
		<span class="font-bold">2</span> nhân vật Vận Mệnh 
		<span class="font-bold underline">"Hư Vô"</span> ngoại trừ Acheron, sẽ tăng sát thương gây ra bởi 
		<span class="font-bold">Tấn Công Thường, Chiến Kỹ, Tuyệt Kỹ</span> của Acheron bằng 
		<span class="text-yellow-400 font-semibold">115%</span> hoặc 
		<span class="text-yellow-400 font-semibold">160%</span> sát thương ban đầu.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+6%",
      		  	label: "Tấn Công",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+8%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A5"
			},
			{
				icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+6%",
      		  	label: "Tấn Công",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Trái Tim Sấm"
		description='Khi 
		<span class="font-bold underline">"Lưỡi Chém Mưa"</span> của Tuyệt Kỹ đánh trúng mục tiêu phe địch có 
		<span class="font-bold underline">"Nút Thắt Đỏ"</span>, sẽ khiến sát thương Acheron gây ra tăng 
		<span class="text-yellow-400 font-semibold">30%</span>, hiệu ứng này tối đa cộng dồn 
		<span class="text-yellow-400 font-semibold">3</span> tầng, duy trì 
		<span class="text-yellow-400 font-semibold">3</span> hiệp, đồng thời khi phát động 
		<span class="font-bold underline">Hoàng Tuyền Vượt Kiếp</span> sẽ gây thêm 
		<span class="text-yellow-400 font-semibold">6</span> lần sát thương, mỗi lần sát thương gây cho kẻ địch ngẫu nhiên 
		Sát Thương <span style="color: {character.elementColor}">Lôi</span> bằng 
		<span class="text-yellow-400 font-semibold">25%</span> Tấn Công của Acheron, sát thương này được xem là Sát Thương Tuyệt Kỹ.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/lightning.png",
      	  	  	value: "+4.8%",
      		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+10.7%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "LV75"
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
				icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+8%",
      		  	label: "Tấn Công",
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
  				name="Khởi Đầu Chân Ngôn Cõi Trời Thưa Thớt"
  				elementColor={character.elementColor}
  				description='Khi gây sát thương cho mục tiêu phe địch có 
				<span class="underline">Hiệu Ứng Xấu</span>, 
				<span class="font-bold">Tỷ Lệ Bạo Kích</span> tăng 
				<span class="text-yellow-400 font-semibold">18%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Sấm Thinh Lặng, Giông Tố Dừng"
  				elementColor={character.elementColor}
  				description='Giảm 1 nhân vật Vận Mệnh 
				<span class="font-semibold">"Hư Vô"</span> cần thiết để 
				<span class="font-semibold">Vết Tích <span class="underline"> "Vực Sâu"</span></span> 
				đạt được hiệu quả cao nhất. Khi hiệp của bản thân bắt đầu sẽ nhận 1 điểm 
				<span class="font-semibold underline">Mộng Tàn</span>, đồng thời kèm theo 1 tầng 
				<span class="font-semibold underline">"Nút Thắt Đỏ"</span> cho kẻ địch có nhiều 
				<span class="font-semibold underline">"Nút Thắt Đỏ"</span> nhất.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Lạnh Giá Vĩnh Hằng"
  				elementColor={character.elementColor}
  				description='Cấp 
				<span class="font-semibold">Tuyệt Kỹ</span> 
				<span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15, cấp 
				<span class="font-semibold">Tấn Công Thường</span> 
				<span class="text-yellow-400 font-semibold">+1</span>, tối đa không quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Hồn Gương Rực Lửa"
  				elementColor={character.elementColor}
  				description='Khi kẻ địch vào chiến đấu, sẽ khiến kẻ đó rơi vào trạng thái 
				<span class="font-semibold underline">Trọng Thương Tuyệt Kỹ</span>, Sát Thương 
				<span class="font-semibold">Tuyệt Kỹ</span> phải chịu tăng 
				<span class="text-yellow-400 font-semibold">8%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Núi Đá Phân Ly, Thiên Hồn Tiêu Tán"
  				elementColor={character.elementColor}
  				description='Cấp 
				<span class="font-semibold">Chiến Kỹ</span> 
				<span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15, cấp 
				<span class="font-semibold">Thiên Phú</span> 
				<span class="text-yellow-400 font-semibold">+2</span>, tối đa không quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Ngày Tận Thế, Người Giải Phóng"
  				elementColor={character.elementColor}
  				description='Tăng 
				<span class="text-yellow-400 font-semibold">20%</span> 
				<span class="underline">Xuyên Kháng</span> 
				<span class="font-semibold">Toàn Thuộc Tính</span> mà sát thương 
				<span class="font-semibold">Tuyệt Kỹ</span> của Acheron gây ra, sát thương của 
				<span class="font-semibold">Tấn Công Thường</span> và 
				<span class="font-semibold">Chiến Kỹ</span> gây ra cũng được xem là 
				<span class="font-semibold">Sát Thương Tuyệt Kỹ</span>, đồng thời bỏ qua thuộc tính 
				<span class="underline">Điểm Yếu</span> và làm giảm Sức Bền của địch. 
				Khi phá vỡ Điểm Yếu sẽ kích hoạt hiệu ứng 
				<span class="font-semibold">Phá Vỡ Điểm Yếu 
				<span style="color: {character.elementColor}">Lôi</span></span>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E2 = E6 &gt E1 &gt E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Khởi Đầu Chân Ngôn Cõi Trời Thưa Thớt</p>
  			<p class="text-white/80 text-sm">Tăng một lượng khá <span class="underline">Tỉ Lệ Bạo Kích</span>
				 khi tấn công kẻ địch đang có <span class="font-semibold">Debuff</span> giúp giảm bớt gánh nặng lên Di Vật.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Sấm Thinh Lặng, Giông Tố Dừng</p>
    		<p class="text-white/80 text-sm">Điểm dừng tốt nhất cho những bạn muốn đầu tư. 
				Khi này thay vì phải đi cùng <span class="text-yellow-400 font-bold">2</span> đồng đội
				<span class="font-semibold">Hư Vô</span> khác, thì giờ Acheron có thể chỉ cần đi cùng 
				<span class="text-yellow-400 font-bold">1</span> đồng đội
				<span class="font-semibold">Hư Vô</span> và kèm theo một nhân vật <span class="font-semibold">Hòa Hợp</span>
				để tối đa hóa Sát Thương.</p>
				<p class="text-white/80 text-sm">Chưa kể mỗi khi 
				<span class="underline">đến lượt</span> của Acheron thì sẽ tự động thêm 
				<span class="text-yellow-400 font-bold">1</span> Stack cho 
				<span class="font-semibold">Tuyệt Kỹ</span>, giúp Acheron sạc Tuyệt Kỹ nhanh hơn, đặc biệt là khi chơi cùng Hòa Hợp có thể 
				<span class="font-semibold">Speed Turning</span>.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Hồn Gương Rực Lửa</p>
    		<p class="text-white/80 text-sm">Kẻ địch sẽ nhận thêm DMG từ Tuyệt Kỹ sau khi vào trận. 
				Điều này làm cho Acheron trở thành một đơn vị hỗ trợ bán chính thức.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Ngày Tận Thế, Người Giải Phóng</p>
    		<p class="text-white/80 text-sm">
				<span class="font-semibold">Tấn Công Thường</span> và 
				<span class="font-semibold">Chiến Kỹ</span> của Acheron hiện có thể được coi là 
				<span class="font-semibold">Sát Thương Tuyệt Kỹ</span> 
				và có thể giảm Sức Bền của kẻ địch bất kể loại yếu điểm của kẻ địch.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['along-the-passing-shore', 'incessant-rain','good-night-and-sleep-well','boundless-choreo','in-the-name-of-the-world']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Tốt nhất thời điểm hiện tại, ảnh hưởng tới khả năng vận hành.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: 
			Nón 5 Sao cho <span class="font-bold">Crit Rate</span> tốt.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Nón tốt nhất trong trường hợp không có <span class="font-bold">Trấn</span>, 
			lưu ý nhớ sử dụng cầu <span class="font-bold">ATK</span>.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>:
			Thay thế nếu không có <span class="font-bold">Chúc Ngủ Ngon</span>.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>: 
			"Chắc bạn phải tuyệt vọng lắm mới tìm đến Nón này."
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
  			relicIds={['Pioneer_Diver_of_Dead_Waters', 'Scholar_Lost_in_Erudition', 'Genius_of_Brilliant_Stars']}
			mixSets={[[],[]]}
  			planarIds={['Item_Izumo_Gensei_and_Takama_Divine_Realm', 'Item_Inert_Salsotto']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Tiên Phong Trong Nước Chết</span>: 
			Cung cấp rất nhiều CV cho Acheron khi kích đủ hiệu ứng xấu - một điều mà Team Acheron luôn thừa.</p>
			<p><span class="text-amber-300 font-semibold">Học Giả Lạc Lối Trong Biển Tri Thức</span>: 
			Cho một chút CV, một chút STNT, thua <span class="font-semibold">Tiên Phong Trong Nước Chết</span> 
			khoảng <span class="text-yellow-400 font-semibold">5-7%</span>, nhưng mọi DPS đều có thể dùng set này.</p>
			<p><span class="text-amber-300 font-semibold">Thiên Tài Xuất Chúng</span>: 
			Giảm Phòng Thủ là chỉ số duy nhất mà càng nhiều thì hiệu quả từng 
			<span class="text-yellow-400 font-semibold">%</span> càng cao, 
			đặc biệt là Acheron phải đi cùng với <span class="font-bold">Hư Vô</span> - 
			thường có Giảm Thủ để cộng hưởng.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Izumo Hiện Thế Và Thần Quốc Cõi Trời</span>: 
			Tương tự bộ <span class="font-semibold">Tiên Phong Trong Nước Chết</span>,
			thiếu CV lẫn ATK thì cái này bù hết, lại còn luôn kích hoạt vì Acheron luôn đi cùng 1 
			<span class="font-semibold">Hư Vô</span> khác.</p>
			<p><span class="text-amber-300 font-semibold">Salsotto Dừng Xoay</span>: 
			Dùng cũng được nếu có sẵn bộ chỉ số tốt.</p>
			`}
			statDescriptions={[[
    		'[CR]Crit Rate &nbsp;&nbsp;&ge; &nbsp;[CD]Crit Dmg',
    		'[ATK]Tấn Công &nbsp;&nbsp;> &nbsp;[SPD]Tốc Độ',
    		'[ATK]Tấn Công &nbsp;&nbsp;> &nbsp;[lightning]<span style="color: #E26CFF">Tăng ST Lôi</span>',
    		'[ATK]Tấn Công'
			]]}
			priorityStats={
			'Tỉ Lệ Bạo &ge; Sát Thương Bạo &gt; Tấn Công &gt; Tốc Độ'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">4000+</span> &nbsp;<span class="text-white/70">(Nên dùng Cầu <span class="text-yellow-400">ATK</span> cho đa số trường hợp)</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">80%+</span> &nbsp;<span class="text-white/70">(Nếu có <span class="text-yellow-400">E1</span> hãy hướng đến: 
			   <span class="font-bold text-yellow-400">60%</span>)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">200%+</span> &nbsp;<span class="text-white/70">(Nếu có <span class="text-yellow-400">E1</span> hãy hướng đến: 
			   <span class="font-bold text-yellow-400">260%+</span>)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">BASE</span> &nbsp;<span class="text-white/70">(Hoặc build Giày SPEED nếu có E2 và combo cùng các nhân vật đẩy lượt (Bronya, Sunday, Robin))</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['acheron'],
    			supportDps: ['cipher','tribbie','black-swan'],
    			amplifier: ['jiaoqiu','silver-wolf','pela','sunday','bronya','guinaifen'],
    			sustain: ['aventurine','gallagher','female-preservation','welt','hyacine']
  			}}
  			tooltips={{
				dps: {
					acheron: 'DPS chủ lực, cần đi cùng đồng đội có khả năng gắn <span class="font-semibold">Debuff</span> để sạc Stack cho Tuyệt Kỹ. Hoặc đi cùng nhân vật đẩy lượt để Acheron có Stack Tuyệt Kỹ.',
				},
				supportDps: {
					cipher: 'Có Debuff, có <span class="underline">Tích Lũy Sát Thương</span> mà Acheron gây ra và từ đó Cipher có thể hỗ trợ gây thêm Sát Thương cho đội hình.',
					tribbie: '<span class="font-semibold">"Giản Dị Lãnh Địa"</span> Debuff <span class="underline">Tăng Sát Thương Phải Nhận</span> uptime gần 100%. Chưa kể còn Buff Xuyên Kháng cho phe ta và hỗ trợ Sát Thương từ Thiên Phú.',
					'black-swan': 'Nếu có <span class="text-red-600">E1</span> thì dùng, còn lại thì không nên.',
				},
				amplifier: {
					jiaoqiu: 'Gắn <span class="font-semibold">Debuff </span><span class="underline">Trọng Thương</span>, uptime gần 100%. Ngoài ra còn có thể tích stack cho Acheron ngoài lượt hành động.',
					'silver-wolf': '<p><span class="font-semibold text-yellow-300">Trước khi Buff: </span>Debuff đơn mục tiêu, tần suất gắn thấp.</p><p><span class="font-semibold text-yellow-300">Sau khi Buff: </span>Debuff đa mục tiêu, nạp nhanh không lo năng lượng. Có thêm E2 như vua mặc long bào, Đi ra đường ch.ó nhìn sợ không dám s.ủa. Trưa đua vài lệnh chiều xanh tím. Tối ra phố đi bộ các em gái thì tranh nhau xin chụp hình chung. Hội nyc thì đồng loạt đòi nối lại tình xưa. Bạn bè thì nhìn tôi cũng phải cúi đầu nể 10 phần. Về nhà thì gia đình tự hào, hàng xóm thì ganh tỵ vì biết tôi có Sói Đần E2 🐧</p>',
					pela: '<span class="underline">Giảm Phòng Thủ</span> diện rộng, không uptime 100%, yêu cầu Nón <span class="font-semibold">Sự Quyết Tâm Như Giọt Mồ Hôi Lấp Lánh S4+</span>.',
					sunday: 'Yêu cầu Acheron phải có <span class="text-red-600">E2</span> và build 135 tốc, Sunday nên build bằng tốc Acheron -1 để Speed Turning.',
					bronya: 'Yêu cầu Bronya <span class="text-red-600">E2+</span>, còn lại giống Sunday',
					guinaifen: 'Giống Jiaoqiu nhưng yếu hơn, không gắn ngoài lượt được.',
				},
				sustain: {
					gallagher: 'Apply Debuff khá nhiều, bảo kê ổn, bào sức bền tốt. Nên có E2+ để chơi ổn định.',
					welt: 'Yêu cầu bắt buộc phải có <span class="text-red-600">E2</span> Welt và chỉ hữu dụng khi bạn biết mình đang làm gì (team 3 nô). Newbie không nên làm theo.',
					'female-preservation': 'Có Khiêu Khích là một điểm cộng khi dùng nón <span class="font-semibold">Xu Hướng Thị Trường Vũ Trụ S4+</span>. Còn nếu đi cùng Jiaoqiu thì không nên dùng nón này mà nên dùng nón khác tăng nhiều DEF.',
					aventurine: 'Ưu tiên dùng Trấn <span class="font-semibold">Vận Mệnh Chưa Từng Cân Bằng</span>. Nếu không có thì dùng <span class="font-semibold">Xu Hướng Thị Trường Vũ Trụ S4+</span>, nếu có Jiaoqiu trong đội thì không nên dùng nón này mà nên dùng nón khác tăng nhiều DEF.',
					hyacine: 'Bắt buộc phải có Trấn nếu muốn chơi cùng Acheron, nếu không thì thôi, dùng Gallagher cho rẻ.',
				}
			}}
			notes={{
				amplifier: 'Các hư vô còn lại: <span class="font-semibold">thật luôn hả?</span>',
				sustain: 'Tất cả các bảo hộ còn lại nếu dùng nón <span class="font-semibold">Xu Hướng Thị Trường Vũ Trụ S4+</span>. Nhưng nếu có Jiaoqiu trong đội hình thì thôi, bỏ đi mà làm người.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Gây toàn bộ Sát thương lên cả đơn mục tiêu và cả diện rộng, sự kết hợp hoàn hảo giữa Săn Bắn và Tri Thức.
				Tự cung cấp Buff cho bản thân khi trên sân có 2 đồng minh vận mệnh Hư Vô, và 90% Sát Thương trong Tuyệt Kỹ.
				Bỏ qua Điểm Yếu và 20% Kháng trong Tuyệt Kỹ.
				Dọn quái nhỏ ngoài map cực nhanh mà không cần vào trận chiến.
			"
			cons="
				Yêu cầu bắt buộc phải có 2 đồng đội Hư Vô để tối đa sức mạnh, rất khó để có thể đi cùng Hòa Hợp khi slot cuối phải là nhân vật Bảo Hộ hoặc Trù Phú (trừ khi bạn có E2 Acheron hoặc muốn chơi 3 nô).
				Tùy chọn Nón Ánh Sáng miễn phí rất hạn chế, và Trấn cách biệt sức mạnh quá lớn.
				Nếu không có Jiaoqiu, Acheron cảm thấy hơi yếu trong thời điểm hiện tại vì Jiaoqiu hoàn toàn đáp ứng được mọi nhu cầu của Acheron và đưa Acheron trở lại Meta.
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt &nbsp
				<span style="color: #DA472D">Jiaoqiu</span> &nbsp &gt &nbsp
				<span style="color: {character.elementColor}">E2</span> &nbsp &gt &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p class="text-lg mt-2 ">
				<span class="font-bold text-amber-400">S1: </span>Cải thiện vận hành.
			</p>
			<p class="text-lg mt-2 ">
				<span class="font-bold text-amber-400">Jiaoqiu: </span>Nhân vật hỗ trợ tốt nhất cho Acheron ở thời điểm hiện tại.
			</p>
			<p class="text-lg mt-2 mb-1">
				<span class="font-bold text-amber-400">E2: </span>Điểm dừng tốt, tiền đâu mà đầu tư lắm. 
			</p>
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
