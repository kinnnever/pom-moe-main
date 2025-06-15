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
    id: 'aglaea',
    name: 'Aglaea',
    element: 'lightning',
    path: 'remembrance',
	elementColor: '#E26CFF'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%'],
	['100%','120%','140%','160%','180%','200%','220%','240%','260%','280%'],
	['45%','54%','63%','72%','81%','90%','99%','108%','117%','126%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['25%','27.5%','30%','32.5%','35%','37.5%','40.63%','43.75%','46.88%','50%','52.5%','55%','57.5%','60%','62.5%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['10%','10.5%','11%','11.5%','12%','12.5%','13.13%','13.75%','14.38%','15%','15.5%','16%','16.5%','17%','17.5%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['44%','46.75%','49.5%','52.25%','55%','57.2%','59.4%','61.6%','63.8%','66%','68.2%','70.4%','72.6%','74.8%','77%'],
	['180','248','315','383','450','504','558','612','666','720','774','828','882','936','990'],
	['12%','13.8%','15.6%','17.4%','19.2%','21%','23.25%','25.5%','27.75%','30%','31.8%','33.6%','35.4%','37.2%','39%']
  ]
  let TalentLevel = 1;

  const skillPet = [
	['55%','66%','77%','88%','99%','110%','121%','132%','143%','154%'],
	['33%','39,6%','46,2%','52,8%','59,4%','66%','72,6%','79,2%','85,8%','92,4%']
  ]
  let SkillPetLevel = 1;

  const talentPet = [
	['44','46','48','51','53','55','57','59','62','64']
  ]
  let talentPetLevel =1;

	const SPD = 102;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [168, 329], atk: [95, 185], def: [66, 128] },
		{ dp: 1, levels: [20, 30], hp: [397, 481], atk: [223, 270], def: [155, 188] },
		{ dp: 2, levels: [30, 40], hp: [549, 633], atk: [308, 356], def: [214, 247] },
		{ dp: 3, levels: [40, 50], hp: [710, 785], atk: [394, 441], def: [273, 306] },
		{ dp: 4, levels: [50, 60], hp: [853, 937], atk: [479, 527], def: [333, 366] },
		{ dp: 5, levels: [60, 70], hp: [1005, 1089], atk: [565, 613], def: [392, 425] },
		{ dp: 6, levels: [70, 80], hp: [1157, 1241], atk: [651, 698], def: [452, 485] }
	];
</script>

<svelte:head>
	<title>{character.name} - Pom.moe</title>
</svelte:head>

<div class="flex flex-col gap-8 md:flex-row md:items-start">
	<!-- Hình ảnh -->
	<div class="md:w-2/3 flex flex-col items-center justify-center relative">
		<img
			src="/images/characters-full/{character.id}.png"
			alt="{character.name}"
			class="max-h-[100vh] object-contain"
		/>
		<p class="text-white text-base mt-4 text-center px-4 md:hidden" style="text-shadow: 1px 1px 1px black">
			Tại tòa Thánh Thành được bình minh chiếu cố ấy, người thợ dệt vuốt ve tơ vàng, nối kết vận mệnh. Hậu Duệ Chrysos gánh vác Ngọn Lửa "Lãng Mạn", triệu tập anh hùng thế gian, dẫn dắt bọn họ một lần nữa bước lên cuộc hành trình dài ...Đánh hạ chúng thần, trả lại ngọn lửa thần, giúp cho Amphoreus gần như bị hủy diệt hồi sinh.
  		</p>
		<div class="hidden md:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0">
    		<p style="text-shadow: 1px 1px 1px black">Tại tòa Thánh Thành được bình minh chiếu cố ấy, người thợ dệt vuốt ve tơ vàng, nối kết vận mệnh. Hậu Duệ Chrysos gánh vác Ngọn Lửa "Lãng Mạn", triệu tập anh hùng thế gian, dẫn dắt bọn họ một lần nữa bước lên cuộc hành trình dài ...Đánh hạ chúng thần, trả lại ngọn lửa thần, giúp cho Amphoreus gần như bị hủy diệt hồi sinh.</p>
  		</div>
	</div>

	<!-- Thông tin nhân vật -->
		<div class="md:w-2/4 space-y-">
		<div class="flex items-left gap-4 mb-4">
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
  		<h3 class="text-lg font-bold mb-1">Mật Hoa Có Gai</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> cho 1 kẻ địch chỉ định tương đương 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Aglaea.
		</p>

		<h3 class="text-lg font-bold mb-1 mt-2">「Ngàn Nụ Hôn Trên Lưỡi Kiếm」</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">0</span>
		</p>
		<p class="text-base">Aglaea và Thợ May thi triển 
		<span class="underline">Tấn Công Phối Hợp</span> ên mục tiêu, lần lượt gây cho mục tiêu Sát Thương Lôi bằng
		<span class="text-yellow-400 font-semibold">{normalAttack[1][NormalLevel - 1]}</span> Tấn Công của Aglaea và
		<span class="text-yellow-400 font-semibold">{normalAttack[1][NormalLevel - 1]}</span> Tấn Công của Thợ May. Đồng thời gây cho mục tiêu lân cận Sát Thương
		<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng
		<span class="text-yellow-400 font-semibold">{normalAttack[2][NormalLevel - 1]}</span> Tấn Công của Aglaea và
		<span class="text-yellow-400 font-semibold">{normalAttack[2][NormalLevel - 1]}</span> Tấn Công của Thợ May.
		</p>
		<p class="text-base">Ngàn Nụ Hôn Trên Lưỡi Kiếm không thể Hồi Điểm Chiến Kỹ.</p>

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
  		<h3 class="text-lg font-bold mb-1">Lên Nào, Danh Tiếng Thăng Hoa</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Triệu Hồi</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p class="text-base">Giúp Thợ May Hồi HP bằng
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Giới Hạn HP của mình. Nếu Thợ May không ở trong trận, thì sẽ 
			<span class="undeline">triệu hồi Linh Hồn Ký Ức</span> Thợ May, và khiến bản thân lập tức hành động.
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
  			<h3 class="text-lg font-bold mb-1">Cùng Nhảy Múa Nào, Thợ May Định Mệnh</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">350</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">350</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
  			<p class="text-base"><span class="underline">Triệu hồi Linh Hồn Ký Ức</span> 
				Thợ May, nếu Thợ May đã ở trong trận, thì sẽ hồi HP của đối tượng này đến mức tối đa. Aglaea vào trạng thái 
				<span class="font-semibold">Tư Thế Tối Cao</span> và khiến bản thân lập tức hành động.
			</p>
			<p>
				Ở trạng thái <span class="font-semibold">Tư Thế Tối Cao</span>, 
				Aglaea sẽ nhận được số tầng tăng Tốc Độ của Thiên Phú Linh Hồn Ký Ức Thợ May, mỗi tầng khiến Tốc Độ của bản thân tăng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> , Cường Hóa Tấn Công Thường thành 
				<span class="font-bold">Ngàn Nụ Hôn Trên Lưỡi Kiếm</span> và không thể thi triển Chiến Kỹ, Thợ May miễn dịch 
				<span class="underline">Hiệu Ứng Xấu loại khống chế</span>.
			</p>
			<p>
				Thời gian đếm ngược xuất hiện trên thứ tự hành động, cố định là 
				<span class="text-yellow-400 font-semibold">100</span> Tốc Độ, 
				trong thời gian vẫn còn đếm ngược nếu thi triển Tuyệt Kỹ lần nữa sẽ tái lập đếm ngược, Thợ May sẽ tự hủy khi bắt đầu hiệp. 
				Khi Thợ May biến mất, Aglaea sẽ giải trừ trạng thái Tư Thế Tối Cao.
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
  			<h3 class="text-lg font-bold mb-1">Ngón Tay Hoa Hồng Vàng</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span> | 
				<span class="text-amber-400 italic">Hồi năng lượng</span> 
				<span style="color: {character.elementColor}">10</span>
  			</p>
  			<p class="text-base">Linh Hồn Ký Ức Thợ May ban đầu có Tốc Độ bằng
				<span class="text-yellow-400 font-semibold">35%</span>
				Tốc Độ của Aglaea và Giới Hạn HP bằng 
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>
				Giới Hạn HP của Aglaea 
				+<span class="text-yellow-400 font-semibold">{talent[1][TalentLevel - 1]}</span>
				. Khi Thợ May trong trận, Aglaea tấn công sẽ khiến mục tiêu rơi vào trạng thái Đường Khâu, 
				sau khi tấn công kẻ địch ở trạng thái Đường Khâu sẽ gây thêm 
				<span class="underlien">Sát Thương Kèm Theo</span> thuộc tính
				<span style="color: {character.elementColor}" class="font-bold">Lôi</span> bằng 
				<span class="text-yellow-400 font-semibold">{talent[2][TalentLevel - 1]}</span> Tấn Công của Aglaea.
 			</p>
			<p class="text-base">Đường Khâu chỉ có hiệu lực với mục tiêu được thi triển mới nhất.
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
 			    <span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền</span>
  			</p>
  			<p class="text-base">
				<span class="underline">Triệu hồi Linh Hồn Ký Ức</span> Thợ May và cùng tấn công về phía trước. Sau khi vào chiến đấu, hồi 
				<span class="text-yellow-400 font-semibold">30</span> điểm Năng Lượng, đồng thời gây Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng
				<span class="text-yellow-400 font-semibold">100%</span> Tấn Công của Aglaea cho toàn bộ mục tiêu phe địch, sau đó khiến mục tiêu ngẫu nhiên của phe địch rơi vào trạng thái "Đường Khâu".
			</p>
		</div>
	</div>
	<section>
		<TielePet 
			text="Thợ May" 
			elementColor={character.elementColor} 
			icon={`/images/skills/${character.id}/pet.png`}
		/>
		
		<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
			<div class="flex flex-col items-center break-words w-20 text-center">
				<img
    				src="/images/skills/{character.id}/skill_memosprite.png"
   					alt="Chiến Kỹ"
    				class="h-20 w-20 object-cover"
  				/>
				<span class="text-sm text-white/80 mt-2">Chiến Kỹ</span>
			</div>
			<div class="flex-1">
				<h3 class="text-lg font-bold mb-1">Bẫy Gai</h3>
				<p class="text-sm mb-1">
		    		<span class="text-amber-400 italic">Khuếch Tán</span>
				</p>
			<p class="text-base">Gây cho 1 kẻ địch Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> tương đương
				<span class="text-yellow-400 font-semibold">{skillPet[0][SkillPetLevel - 1]}</span> Tấn Công, gây cho mục tiêu lân cận Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> tương đương
				<span class="text-yellow-400 font-semibold">{skillPet[1][SkillPetLevel - 1]}</span> Tấn Công
			</p>
			<div class="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 mt-2">
  				<!-- svelte-ignore a11y-label-has-associated-control -->
  				<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  				<input type="range" min="1" max="10" bind:value={SkillPetLevel} class="w-48 accent-white/10 opacity-80" />
  				<span class="text-sm text-white/40">Lv{SkillPetLevel}</span>
			</div>
			</div>
		</div>

		<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
			<div class="flex flex-col items-center break-words w-20 text-center">
				<img
    				src="/images/skills/{character.id}/talent_memosprite.png"
   					alt="Thiên Phú"
    				class="h-20 w-20 object-cover"
  				/>
				<span class="text-sm text-white/80 mt-2">Thiên Phú</span>
			</div>
			<div class="flex-1">
				<h3 class="text-lg font-bold mb-1">Thân Thể Rèn Từ Nước Mắt</h3>
				<p class="text-sm mb-1 text-amber-400 italic">Cường Hóa</p>
				<p class="text-base">Sau khi tấn công kẻ địch ở trạng thái 
					<span class="font-bold">Đường Khâu</span>, sẽ khiến Tốc Độ của bản thân tăng
					<span class="text-yellow-400 font-semibold">{talentPet[0][talentPetLevel - 1]}</span>
					điểm, hiệu ứng này tối đa cộng dồn
					<span class="text-yellow-400 font-semibold">6</span> tầng. Khi Thợ May hành động sẽ tự động thi triển Bẫy Gai, 
					ưu tiên tấn công kẻ địch ở trạng thái Đường Khâu.				
				</p>

				<h3 class="text-lg font-bold mb-1 mt-4">「Mùa Hè Lao Vun Vút」</h3>
				<p class="text-sm mb-1 text-amber-400 italic">Cường Hóa</p>
				<p class="text-base">Khi Thợ May được triệu hồi, khiến bản thân
					<span class="underline">Ưu Tiên Hành Động</span>
					<span class="text-yellow-400 font-semibold">100%</span>
				</p>

				<h3 class="text-lg font-bold mb-1 mt-4">「Cỏ Khô Nở Hoa」</h3>
				<p class="text-sm mb-1 text-amber-400 italic">Cường Hóa</p>
				<p class="text-base">Khi Thợ May biến mất, khiến Aglaea hồi
					<span class="text-yellow-400 font-semibold">20</span> điểm Năng Lượng.
				</p>
				
				<div class="flex flex-col md:flex-row md:items-center md:gap-4 mb-2 mt-2">
  					<!-- svelte-ignore a11y-label-has-associated-control -->
  					<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  					<input type="range" min="1" max="10" bind:value={talentPetLevel} class="w-48 accent-white/10 opacity-80" />
  					<span class="text-sm text-white/40">Lv{talentPetLevel}</span>
				</div>
			</div>
		</div>
	</section>
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Tấn Công Thường &ge; Tuyệt Kỹ &gt; Chiến Kỹ (Linh Hồn Ký Ức) &ge; Thiên Phú (Linh Hồn Ký Ức) &gt Thiên Phú &gt Chiến Kỹ</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Tấn Công Thường</p>
  			<p class="text-white/80 text-sm">Nguồn Sát Thương chính của Aglaea.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Giúp Aglaea đạt được lượng Tốc Độ cần thiết.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến Kỹ <span style="color: {character.elementColor}">(Linh Hồn Ký Ức)</span></p>
    		<p class="text-white/80 text-sm">Gây DMG cùng Aglaea, không nhiều nhưng là có.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú (Linh Hồn Ký Ức)</p>
    		<p class="text-white/80 text-sm">Nguồn SPD chính của Linh Hồn Ký Ức và cũng như là Aglaea khi cô sử dụng Tuyệt Kỹ.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Tăng thêm tí HP cho "bao cát thứ 5" trong đội và thêm tí DMG mỗi khi Linh Hồn Ký Ức hành động.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến Kỹ</p>
    		<p class="text-white/80 text-sm">Nếu tôi nhận được 1000vnđ mỗi khi có ai dùng kỹ năng này 2 lần trong một trận đấu, thì tôi sẽ có 0vnđ. Đùa, ai lại dùng kỹ năng này trong trạng thái Tuyệt Kỹ chứ, hay bạn làm mất trạng thái Tuyệt Kỹ?</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Trừng Phạt Tầm Nhìn Hạn Hẹp"
		description="Khi ở trạng thái Tư Thế Tối Cao, Tấn Công của Aglaea và Thợ May tăng. Mức tăng bằng
					<span class='text-yellow-400 font-semibold'>720%</span> Tốc Độ của Aglaea +
					<span class='text-yellow-400 font-semibold'>360%</span> Tốc Độ của Thợ May."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/DEF.png",
      	  	  	value: "+5%",
      		  	label: "Phòng Thủ",
      		  	unlock: "A3"
    		},
    		{
    		  	icon: "/images/icons-vestige/lightning.png",
    		  	value: "+4.8%",
    		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
    		  	unlock: "A4"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Kết Thúc Dệt Vận Mệnh"
		description='Khi Thợ May biến mất, số tầng tăng Tốc Độ của Thiên Phú Linh Hồn Ký Ức tối đa bảo lưu
		<span class="text-yellow-400 font-semibold">1</span> tầng. 
		Khi Thợ May bị triệu hồi lần nữa, sẽ nhận được hiệu ứng tăng Tốc Độ số tầng tương ứng.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+4%",
      		  	label: "Tỉ Lệ Bạo Kích",
      		  	unlock: "A5"
			},
			{
				icon: "/images/icons-vestige/lightning.png",
    		  	value: "+4.8%",
    		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Mặt Trời Lao Vun Vút"
		description='Khi bắt đầu chiến đấu, nếu Năng Lượng của bản thân không đủ 
		<span class="text-yellow-400 font-semibold">50%</span>, sẽ hồi Năng Lượng của bản thân đến
		<span class="text-yellow-400 font-semibold">50%</span>.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/DEF.png",
      	  	  	value: "+7.5%",
      		  	label: "Phòng Thủ",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+5.3%",
      		  	label: "Tỉ Lệ Bạo Kích",
      		  	unlock: "LV75"
			},
			{
				icon: "/images/icons-vestige/lightning.png",
    		  	value: "+6.4%",
    		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
      		  	unlock: "LV80"
			}
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/lightning.png",
    		  	value: "+3.2%",
    		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
      		  	unlock: "LV1"
			},
			{
				icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+2.7%",
      		  	label: "Tỉ Lệ Bạo Kích",
      		  	unlock: "A2"
			},
			{
				icon: "/images/icons-vestige/lightning.png",
    		  	value: "+3.2%",
    		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
      		  	unlock: "A3"
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
  				name="Trôi Dạt Theo Sao Kim"
  				elementColor={character.elementColor}
  				description='Sát thương mà kẻ địch ở trạng thái Đường Khâu phải chịu tăng
				<span class="text-yellow-400 font-semibold">15%</span>, 
				Aglaea hoặc Thợ May sau khi tấn công mục tiêu này, sẽ hồi thêm
				<span class="text-yellow-400 font-semibold">20</span> điểm Năng Lượng.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Du Hành Trên Mi Mắt Vận Mệnh"
  				elementColor={character.elementColor}
  				description='Khi Aglaea hoặc Thợ May hành động, Sát Thương gây ra của Aglaea và Thợ May sẽ bỏ qua
				<span class="text-yellow-400 font-semibold">14%</span> Phòng Thủ của mục tiêu, hiệu ứng này tối đa cộng dồn
				<span class="text-yellow-400 font-semibold">3</span> tầng, 
				duy trì đến khi đơn vị bất kỳ ngoại trừ bản thân và Thợ May chủ động thi triển kỹ năng.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Món Quà Sương Đọng"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không quá cấp 15; 
				Cấp Tấn Công Thường +1, tối đa không quá cấp 10; 
				Cấp Thiên Phú Linh Hồn Ký Ức +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Sự Lấp Lánh Trong Đá Cẩm Thạch"
  				elementColor={character.elementColor}
  				description='Giới hạn số tầng hiệu ứng tăng Tốc Độ của Thiên Phú Linh Hồn Ký Ức tăng
				<span class="text-yellow-400 font-semibold">1</span> tầng. 
				Sau khi Aglaea thi triển tấn công cũng có thể khiến Thợ May nhận được hiệu ứng tăng Tốc Độ của Thiên Phú Linh Hồn Ký Ức.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Thợ Dệt Khổ Nạn Tăm Tối"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không quá cấp 15; 
				Cấp Thiên Phú +2, tối đa không quá cấp 15; 
				Cấp kỹ năng của Linh Hồn Ký Ức +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Tơ Vàng Đầy Khuyết Vô Thường"
  				elementColor={character.elementColor}
  				description='Khi Aglaea ở trạng thái Tư Thế Tối Cao, 				
				<span class="underline">Xuyên Kháng</span> Lôi của bản thân và Thợ May tăng 
				<span class="text-yellow-400 font-semibold">20%</span>. 
				Khi Aglaea và Thợ May có tốc độ cao hơn 160/240/320 điểm, sát thương gây ra bởi 
				<span class="underline">Tấn Công Phối Hợp</span> sẽ tăng 
				<span class="text-yellow-400 font-semibold">10%</span>/<span class="text-yellow-400 font-semibold">30%</span>/<span class="text-yellow-400 font-semibold">60%</span>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 &gt; E2 &ge; E6 &gt; E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Trôi Dạt Theo Sao Kim</p>
  			<p class="text-white/80 text-sm">Cải thiện vận hành nhất cho Aglaea.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Du Hành Trên Mi Mắt Vận Mệnh</p>
    		<p class="text-white/80 text-sm">Bỏ qua DEF lên tới 42%, một chỉ số lớn và bá trong con game này.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Sự Lấp Lánh Trong Đá Cẩm Thạch</p>
    		<p class="text-white/80 text-sm">Tăng thêm 1 tầng Tốc Độ, nhưng ở tận mốc Tinh Hồn này thì không đáng. </p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Tơ Vàng Đầy Khuyết Vô Thường</p>
    		<p class="text-white/80 text-sm">Tăng cực mạnh lượng Sát Thương đầu ra.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['time-woven-into-gold','sweat-now-cry-less','reminiscence','geniuses-greetings']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Tốt nhất ở thời điểm hiện tại.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: 
			Trấn 4 Sao tuy nhiên phải nạp BattelPass nên không khuyến khích.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Trấn 3 Sao.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>:
			Không còn gì thì dùng tạm.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['Hero_of_Triumphant_Song','Musketeer_of_Wild_Wheat']}
			mixSets={[[]]}
  			planarIds={['Item_The_Wondrous_BananAmusement_Park','Item_Rutilant_Arena','Item_Firmament_Frontline_Glamoth']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Anh Hùng Ca Khúc Khải Hoàn</span>: 
			Bộ di vật phù hợp với bộ kit của Aglaea.</p>
			<p><span class="text-amber-300 font-semibold">Thiện Xạ Bông Lúa</span>: 
			Giống bộ Anh Hùng Ca Khúc Khải Hoàn nhưng yếu hơn chút.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Công Viên Chuối Kỳ Ảo</span>:
			Tăng rất nhiều CV cho aglaea.</p>
			<span class="text-amber-300 font-semibold">Đấu Trường Ngôi Sao</span>:
			Tăng Tỉ Lệ Bạo và Sát Thương Tấn Công Thường cho Aglaea.</p>
			<span class="text-amber-300 font-semibold">Glamoth, Chiến Tuyến Không Trung</span>:
			Tăng Sát Thương gây ra khi người dùng có đủ Tốc, một chỉ số mà Aglaea có rất nhiều trong thực chiến.</p>
			`}
			statDescriptions={[[
    		'[CR]Crit Rate &nbsp;&nbsp;&ge;&nbsp; [CD]Crit Dmg',
    		'[SPD]Tốc Độ',
    		'[lightning]<span style="color: #E26CFF">Tăng ST Lôi</span>',
    		'[ERR]Hiệu Suất Hồi Năng Lượng'
			]]}
			priorityStats={
			'Tốc Độ &gt; Tỉ Lệ Bạo &ge; Sát Thương Bạo &gt; Tấn Công'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">2000+</span> &nbsp;<span class="text-white/70">(ATK của Aglaea phụ thuộc vào Tốc của cô nàng, Tốc càng cao thì ATK cũng cao theo)</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">90%+</span>&nbsp;<span class="text-white/70">(<span class="font-semibold">80%</span> nếu đi cùng Sunday)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">150%+</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">?</span> &nbsp;
			<span class="text-white/70">(Không có mốc Speed cố định hướng tới dành cho Aglaea do lượng Speed tự buff lớn. 
			Tuy nhiên sau khi tìm hiểu từ nhiều nguồn <span class="text-white/40">(cụ thể là Reddit)</span> thì tôi khuyến nghị bạn nên
			build Aglaea <span class="font-bold">~155 Tốc</span> nếu dùng trấn và 
			<span class="font-bold">158 Tốc</span> SPD nếu dùng nón khác và đi cùng Sunday 161 SPD)</span></p>
			<p><span class="text-white/70">Hiệu Suất Hồi Năng Lượng:</span>&nbsp; <span class="font-bold">119.44%</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['aglaea'],
    			supportDps: [],
    			amplifier: ['sunday','bronya','robin','tingyun'],
    			sustain: ['huohuo']
  			}}
  			tooltips={{
				aglaea: 'Tốc cao, hành động nhiều, nên đi cùng những nhân vật Hỗ Trợ <span class="underline">Kéo Lượt</span> để hành động nhiều hơn nữa, và nên đi cùng những Hỗ Trợ có khả năng Hồi Năng Lượng cho đồng minh.',
				sunday: 'Ưu tiên hành động 100% cho Aglaea và cả Linh Hồn Ký Ức của cô, có Hồi Năng Lượng cho đồng mình. "Core" Team Aglaea.',
				bronya: 'Bản litte của Sunday. Có thể build 160 Tốc để làm nole kéo lượt Sunday, sau đó để Sunday kéo Aglaea tiếp (Sunday nên có Trấn để dễ vận hành).',
				robin: 'Có thể thay thế Bronya. Hoặc đi team 3 nô siêu kéo lượt (không khuyến khích newbie làm theo).',
				tingyu: 'S5 Múa Múa Múa, bản supper ultra litte của Sunday.',
				huohuo: 'Bảo Kê duy nhất có khả năng hồi năng lượng cho đồng minh.'
    			}}
			notes={{
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Dễ chơi, spam đánh thường đến c.hết.
				Lượng sát thương đầu ra lớn.
				Không tiêu hao nhiều Điểm Chiến Kỹ.
				Tấn Công Phối Hợp kích hoạt hiệu ứng on-hit hai lần (bao gồm cả Tuyệt Kỹ của Robin).
				Tăng mạnh SPD và ATK cho bản thân.
			"
			cons="
				Điểm Năng Lượng quá lớn, tận 350.
				Sát thương ngoài Tuyệt Kỹ không ấn tượng.
				Đồng đội có thể đi tốt đều là 5 Sao, không F2P chút nào.
				Phụ thuộc nhiều vào Sunday để đạt hiệu quả tốt nhất (Aglaea rất yếu nếu không đi cùng Sunday).
				Phải giải quyết vấn đề bằng tiền (cụ thể là E1 và Trấn).
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: #FFD75E">Sunday</span> &nbsp &gt &nbsp 
				<span style="color: {character.elementColor}">E1</span> &nbsp &ge; &nbsp 
				<span style="color: #1FE7A5">Huohuo</span> &nbsp &gt &nbsp 
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">Sunday</span>: "Core" team Aglaea. Aglaea không Sunday, Aglaea nhót.
			</p>
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">E1</span>: Cải thiện cực nhiều vận hành cho Aglaea trong thực chiến. Nếu chưa có Sunday thì nên có E1.
			</p>
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">Huohuo</span>: Bảo kê tốt, hồi 20% Năng Lượng tối đa cho toàn team (tức 70 điểm cho Aglaea), cực tốt cho Aglaea khi kẹp cùng Sunday, còn tăng ATK nữa. 
			</p>
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">S1</span>: Tăng SPD trực tiếp vào chỉ số <span class="underline">Tốc Độ Cơ Bản</span> giúp giảm nhẹ gánh nặng lên di vật khi build Tốc cao.
			</p>
		</div>

		<div class="mt-8 w-full flex justify-center">
  			<!-- <iframe
    			width="448"
    			height="252"
    			src="https://www.youtube.com/embed/b7E4FdrXUEA"
    			title="YouTube video player"
    			frameborder="0"
    			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    			allowfullscreen
    			class="rounded-lg shadow-lg"
  			></iframe> -->
		</div>

	</section>
</div>
