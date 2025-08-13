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
	import EnhancedSwitch from '$components/EnhancedSwitch.svelte';

  const character = {
    id: 'silver-wolf',
    name: 'Sói Bạc',
    element: 'quantum',
    path: 'nihility',
	elementColor: '#8CA6E6'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [	
	['75%','76%','77%','78%','79%','80%','81.25%','82.5%','83.75%','85%','86%','87%','88%','89%','90%'],
	['7.5%','7.75%','8%','8.25%','8.5%','8.75%','9.06%','9.38%','9.69%','10%','10.25%','10.5%','10.75%','11%','11.25%'],
	['98%','107.8%','117.6%','127.4%','137.2%','147%','159.25%','171.5%','183.75%','196%','205.8%','215.6%','225.4%','235.2%','245%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['85%','86.5%','88%','89.5%','91%','92.5%','94.38%','96.25%','98.13%','100%','101.5%','103%','104.5%','106%','107.5%'],
	['36%','36.9%','37.8%','38.7%','39.6%','40.5%','41.63%','42.75%','43.88%','45%','45.9%','46.8%','47.7%','48.6%','49.5%'],
	['228%','243.2%','258.4%','273.6%','288.8%','304%','323%','342%','361%','380%','395.2%','410.4%','425.6%','440.8%','456%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['5%','5.5%','6%','6.5%','7%','7.5%','8.13%','8.75%','9.38%','10%','10.5%','11%','11.5%','12%','12.5%'],
	['4%','4.4%','4.8%','5.2%','5.6%','6%','6.5%','7%','7.5%','8%','8.4%','8.8%','9.2%','9.6%','10%'],
	['3%','3.3%','3.6%','3.9%','4.2%','4.5%','4.88%','5.25%','5.63%','6%','6.3%','6.6%','6.9%','7.2%','7.5%'],
	['60%','61.2%','62.4%','63.6%','64.8%','66%','67.5%','69%','70.5%','72%','73.2%','74.4%','75.6%','76.8%','78%']
  ]
  let TalentLevel = 1;

	const SPD = 107;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [142, 278], atk: [87, 169], def: [62, 122] },
		{ dp: 1, levels: [20, 30], hp: [335, 406], atk: [204, 248], def: [147, 178] },
		{ dp: 2, levels: [30, 40], hp: [463, 534], atk: [283, 326], def: [203, 235] },
		{ dp: 3, levels: [40, 50], hp: [591, 662], atk: [361, 405], def: [260, 291] },
		{ dp: 4, levels: [50, 60], hp: [719, 791], atk: [439, 483], def: [316, 347] },
		{ dp: 5, levels: [60, 70], hp: [848, 919], atk: [518, 561], def: [373, 404] },
		{ dp: 6, levels: [70, 80], hp: [976, 1047], atk: [596, 640], def: [429, 460] }
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
			Thành viên của "Thợ Săn Stellaron", một bậc thầy hacker. Xem vũ trụ là một trò chơi mô phỏng nhập vai tầm cỡ và vui chơi trong đó. Nắm giữ "Trình Chỉnh Sửa Aether" có thể sửa đổi dữ liệu hiện thực.
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Thành viên của "Thợ Săn Stellaron", một bậc thầy hacker. Xem vũ trụ là một trò chơi mô phỏng nhập vai tầm cỡ và vui chơi trong đó. Nắm giữ "Trình Chỉnh Sửa Aether" có thể sửa đổi dữ liệu hiện thực.</p>
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
				<EnhancedSwitch characterId={character.id} />
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
  		<h3 class="text-lg font-bold mb-1">Cảnh Báo Hệ Thống</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic">sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<b style="color: {character.elementColor}">Lượng Tử</b> cho 1 kẻ địch chỉ định tương đương 
		<b class="text-yellow-400">{normalAttack[0][NormalLevel - 1]}</b> Tấn Công của Sói Bạc.
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
  		<h3 class="text-lg font-bold mb-1">Cho Phép Thay Đổi?</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic">sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
		<p>Có <b class="text-yellow-400">{skillAttack[0][SkillLevel - 1]}</b> <u>xác suất cơ bản</u> thêm cho 1 kẻ địch chỉ định 1 Điểm Yếu mang thuộc tính có từ đồng đội trong trận, 
			và giảm <b class="text-yellow-400">20%</b> kháng thuộc tính của Điểm Yếu đó trong <b class="text-yellow-400">2</b> hiệp.
			Nếu kẻ địch đã có điểm yếu của thuộc tính này thì hiệu ứng giảm kháng thuộc tính tương ứng sẽ không được kích hoạt.
		</p>
		<p>Mỗi kẻ địch chỉ có thể bị Sói Bạc thêm 1 điểm yếu, khi Sói Bạc thêm điểm yếu lần nữa cho kẻ đó thì chỉ giữ lại điểm yếu được thêm vào sau cùng.</p>
		<p>Có <b class="text-yellow-400">100%</b> <u>xác suất cơ bản</u> giảm kháng toàn bộ thuộc tính của kẻ địch này đi
			<b class="text-yellow-400">{skillAttack[1][SkillLevel - 1]}</b> trong <b class="text-yellow-400">2</b> hiệp.
		</p>
  		<p>Gây cho kẻ địch này Sát Thương <b style="color: {character.elementColor}">Lượng Tử</b> bằng <b class="text-yellow-400">{skillAttack[2][SkillLevel - 1]}</b> Tấn Công của Sói Bạc.</p>
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
  			<h3 class="text-lg font-bold mb-1">Tài Khoản Đã Bị Khóa</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Đơn</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">90</span><span class="text-amber-400 italic">sức bền</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">110</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">110</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p>Có <b class="text-yellow-400">{ultimateAttack[0][UltimateLevel - 1]}</b> <u>xác suất cơ bản</u> khiến Phòng Thủ của 1 kẻ địch chỉ định giảm
				<b class="text-yellow-400">{ultimateAttack[1][UltimateLevel - 1]}</b> trong <b class="text-yellow-400">3</b> hiệp,
				đồng thời gây cho mục tiêu này Sát Thương <b style="color: {character.elementColor}">Lượng Tử</b> bằng
				<b class="text-yellow-400">{ultimateAttack[2][UltimateLevel - 1]}</b> Tấn Công của Sói Bạc.
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
  			<h3 class="text-lg font-bold mb-1">Chờ Hệ Thống Phản Hồi...</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Quấy Nhiễu</span>
  			</p>
  			<p>Sói Bạc có thể gây 3 loại Bug: Tấn Công giảm <b class="text-yellow-400">{talent[0][TalentLevel - 1]}</b>,
				Phòng Thủ giảm <b class="text-yellow-400">{talent[1][TalentLevel - 1]}</b>,
				Tốc Độ giảm <b class="text-yellow-400">{talent[2][TalentLevel - 1]}</b>.
			</p>
			<p>Sói Bạc sau mỗi lần thi triển tấn công có <b class="text-yellow-400">{talent[3][TalentLevel - 1]}</b> 
				<u>xác suất cơ bản</u> cài 1 "Bug" ngẫu nhiên cho mục tiêu phe địch bị tấn công, duy trì
				<b class="text-yellow-400">3</b> hiệp.				
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
  			<h3 class="text-lg font-bold mb-1">Buộc Kết Thúc Tiến Trình</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phá Vỡ</span> <span style="color: {character.elementColor}">60</span> 
				<span class="text-amber-400 italic">sức bền</span>
  			</p>
  			<p>Tấn công kẻ địch ngay lập tức, sau khi vào chiến đấu sẽ gây Sát Thương <b style="color: {character.elementColor}">Lượng Tử</b>
				bằng <b class="text-yellow-400">80%</b> Tấn Công của Sói Bạc cho toàn bộ địch, đồng thời bỏ qua các thuộc tính Điểm Yếu và làm giảm Sức Bền của toàn phe địch. 
				Khi phá vỡ điểm yếu sẽ kích hoạt hiệu ứng Phá Vỡ Điểm Yếu thuộc tính <b style="color: {character.elementColor}">Lượng Tử</b>.
			</p>
		</div>
	</div>
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ = Tuyệt Kỹ &gt; Thiên Phú &gt; Tấn Công Thường</p>
		
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Gắn điểm yếu và làm giảm kháng.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Giảm Def.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Gắn hiệu ứng xấu.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn công thường</p>
    		<p class="text-white/80 text-sm">Không có Dmg đâu, dùng để gắn hiệu ứng xấu của thiên phú và hồi điểm chiến kỹ là chính.</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Tạo"
		description='Thời gian duy trì của "Bug" tăng <b class="text-yellow-400">1</b> hiệp.
					Mỗi khi có điểm yếu của mục tiêu phe địch bị phá vỡ, Sói Bạc có <b class="text-yellow-400">65%</b>
					<u>xác suất cơ bản</u> cài cho mục tiêu này 1 "Bug" ngẫu nhiên.'
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+4%",
      		  	label: "Chính Xác Hiệu Ứng",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/ATK.png",
    		  	value: "+4%",
    		  	label: "Tấn Công",
    		  	unlock: "A3"
    		},
    		{
    		  	icon: "/images/icons-vestige/quantum.png",
    		  	value: "+3.2%",
      		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
      		  	unlock: "A3"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Truyền Thụ"
		description='Thời gian duy trì của Điểm Yếu được thêm cho mục tiêu địch sẽ tăng
		<b class="text-yellow-400">1</b> hiệp khi thi triển Chiến Kỹ.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/ATK.png",
    		  	value: "+6%",
    		  	label: "Tấn Công",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+6%",
      		  	label: "Chính Xác Hiệu Ứng",
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
		title="Chú Thích"
		description='Khi thi triển Chiến Kỹ, nếu số lượng <u>Hiệu Ứng Xấu</u> của mục tiêu phe địch nhiều hơn hoặc bằng
		<b class="text-yellow-400">3</b>, thì Chiến Kỹ khiến hiệu ứng giảm Kháng Toàn Thuộc Tính của kẻ địch giảm thêm
		<b class="text-yellow-400">3%</b>.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/quantum.png",
    		  	value: "+4.8%",
      		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+8%",
      		  	label: "Chính Xác Hiệu Ứng",
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
  				name="Công Trình Xã Hội"
  				elementColor={character.elementColor}
  				description='Sau khi thi triển Tuyệt Kỹ tấn công mục tiêu phe địch, mỗi một <u>Hiệu Ứng Xấu</u>
				mà mục tiêu sở hữu sẽ khiến Sói Bạc hồi <b class="text-yellow-400">7</b> điểm Năng Lượng. 
				Hiệu ứng này tối đa có hiệu lực <b class="text-yellow-400">5</b> lần trong mỗi lần dùng Tuyệt Kỹ.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Mạng Zombie"
  				elementColor={character.elementColor}
  				description='Khi kẻ địch vào chiến đấu sẽ giảm <b class="text-yellow-400">20%</b> Kháng Hiệu Ứng của kẻ đó.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Tải Trọng Tấn Công"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không quá cấp 15, 
				cấp Thiên Phú +2, tối đa không quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Tấn Công Phản Đòn"
  				elementColor={character.elementColor}
  				description='Sau khi thi triển Tuyệt Kỹ tấn công mục tiêu phe địch, mỗi một <u>Hiệu Ứng Xấu</u>
				mà mục tiêu sở hữu sẽ gây thêm <u>Sát Thương Kèm Theo</u> thuộc tính 
				<b style="color: {character.elementColor}">Lượng Tử</b> bằng <b class="text-yellow-400">20%</b> 
				Tấn Công của Sói Bạc. Hiệu ứng này tối đa kích hoạt <b class="text-yellow-400">5</b> lần trong mỗi lần dùng Tuyệt Kỹ.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Diệt Trừ Bạo Lực"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không quá cấp 15, 
				cấp Tấn Công Thường +1, tối đa không quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Mạng Lưới Trùng Lặp"
  				elementColor={character.elementColor}
  				description='Với mỗi một <u>Hiệu Ứng Xấu</u> mà mục tiêu phe địch sở hữu, sát thương Sói Bạc gây ra cho mục tiêu đó sẽ tăng
				<b class="text-yellow-400">20%</b>, tối đa tăng	<b class="text-yellow-400">100%</b>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 = E2 > E6 &ge; E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Công Trình Xã Hội</p>
  			<p class="text-white/80 text-sm">Gia tăng khả năng tái tạo năng lượng cho Sói Đần.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Mạng Zombie</p>
    		<p class="text-white/80 text-sm">Giảm yêu cầu chỉ số build đồ cho Sói Bạc xuống chút.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Tấn Công Phản Đòn</p>
    		<p class="text-white/80 text-sm">Hỗ trợ thêm Sát Thương cho đồng minh mỗi khi họ hành động.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Mạng Lưới Trùng Lặp</p>
    		<p class="text-white/80 text-sm">Tăng Sát Thương gây ra của Sói Bạc, kết hợp với E4 rất tốt.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['incessant-rain','lies-dance-on-the-breeze','those-many-springs','before-the-tutorial-mission-starts','resolution-shines-as-pearls-of-sweat','holiday-thermae-escapade']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Dùng tốt.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: 
			Nón ánh sáng cực tốt cho Sói Bạc nếu build đủ 170 tốc trở lên.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Có thể dùng được.
  			</li>
			<li>
    		<strong class="text-amber-300">{lightconeNames[3]}</strong>: 
			Trấn 4 sao hồi năng lượng cho Tuyệt Kỹ tốt.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[4]}</strong>: 
			Nón 4 sao rẻ.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[5]}</strong>:
			Tích tầng cao thì dùng tốt.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['eagle_of_twilight_line']}
			mixSets={[['messenger_traversing_hackerspace','sacerdos_relived_ordeal']]}
  			planarIds={['item_sprightly_vonwacq','item_lushaka_the_sunken_seas','item_penacony_land_of_the_dreams','item_broken_keel']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Chim Ưng Ranh Giới Ngày Đêm</span>: Ưu tiên hành động khá tốt.</p>
			<p><span class="text-amber-300 font-semibold">MIX 2-2 Tốc</span>: Tất nhiên là Tốc càng cao càng tốt rồi.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Vonwacq Hoạt Bát</span>: Ưu tiên hành động có thể setup thế trận trước cho đồng đội quẩy và hồi năng lượng rất tốt.</p> 
			<p><span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>: Tăng ATK cho DPS và khả năng hồi năng lượng cho bản thân.</p> 
			<p><span class="text-amber-300 font-semibold">Penacony, Vùng Đất Của Những Giấc Mơ</span>: Chỉ dùng khi đi cùng DPS cùng Nguyên Tố.</p> 
			<p><span class="text-amber-300 font-semibold">Bộ Khung Bị Gãy</span>: Kháng hiệu ứng là một chỉ số có thể cần nếu sp muốn đảm bảo vận hành, và chút Sát Thương Bạo cho toàn đội cũng không phải đồ bỏ.</p> 
			`}
			statDescriptions={[
			  [
    			'[EHR]Chính Xác Hiệu Ứng',
    			'[SPD]Tốc Độ',
    			'[HP]HP = [DEF]Phòng Thủ',
    			'[ERR]Hiệu Xuất Hồi Năng Lượng'
			  ]
			]}
			
			priorityStats={[
			'Tốc Độ &gt; Chính Xác Hiệu Ứng'
			]}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span> &nbsp;<span class="text-white/70">(Hoặc 4000+ cho cứng cáp chút cũng được)</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">170+</span> &nbsp;<span class="text-white/70">(Như đã nói, càng cao càng tốt)</span></p>
			<p><span class="text-white/70">Chính Xác Hiệu Ứng:</span>&nbsp; <span class="font-bold">96%</span> &nbsp;<span class="text-white/70">(Nếu có E2 thì 47%)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['seele','archer','acheron','dr-ratio','castorice'],
    			supportDps: ['tribbie','silver-wolf'],
    			amplifier: ['ruan-mei','silver-wolf'],
    			sustain: ['fu-xuan']
  			}}
  			tooltips={{
				dps: {
					seele: 'DPS mạnh nhất lịch sử.',
					archer: 'DPS mạnh nhất hiện tại.',
					acheron: 'Sói Bạc gắn Debuff liên tục cho Acheron tích stack Tuyệt Kỹ tốt.',
					'dr-ratio': 'Sói Bạc gắn Debuff cho Thầy Phấn ném.',
					castorice: 'Sao tôi lại để cô nàng ở đây nhỉ?'
				},	
				supportDps:{	
					tribbie: 'Khủng bố loli, vừa xuyên kháng, vừa cùng nguyên tốt với Sói Bạc, giúp tỉ lệ gacha của sói đần giảm bớt nguyên tố.',
					'silver-wolf': 'Nếu bạn có thể build Sói Bạc đứng đây được thì quả thực quá bodoi.',
				},
				amplifier:{	
					'ruan-mei': 'Xuyên kháng của Ruan Mei và giảm kháng của Sói Bạc kết hợp lại thì cũng ngon đấy.',
					'silver-wolf': 'Gắn điểm yếu, giảm Def, giảm kháng, và nhiều thứ Debuff khác, có thể đi cùng nhiều loại DPS được.',
				},
				sustain: {	
					'fu-xuan': 'Bạn chưa nghe mono Lượng Tử à? Thử đi, không nghiện đâu.'
				}
			}}
			notes={{
				dps: 'Bạn nghĩ ra nhân vật nào dùng được thì đều có thể dùng.',
				supportDps: 'Nhân vật nào hỗ trợ đặc biệt cho DPS thì cứ bế vào.',
				amplifier: 'Nhân vật nào hỗ trợ đặc biệt cho DPS thì cứ bế vào.',
				sustain: 'Nhân vật nào chả được.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Nhiều Debuff hỗ trợ khuếch đại Sát Thương.
				Có thể gắn điểm yếu mới cho kẻ thù.
				Hỗ trở khả năng bào sức bền tốt.
				Mono Lượng Tử.
			"
			cons="
				Có thể tốn nhiều điểm chiến kỹ nếu xui.
				Gắn Debuff quái đơn.
				Khả năng hồi năng lượng gặp nhiều trục trặc.
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">E2</span> &nbsp &gt &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">E2</span>: Tin tôi, bạn cứ sở hữu E2 đi, rồi qua phần Enhanced mà xem.
			</p>
		</div>

	</section>
</div>
