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
    id: 'kafka',
    name: 'Kafka',
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
	['30%','33%','36%','39%','42%','45%','48.75%','52.5%','56.25%','60%','63%','66%','69%','72%','75%'],
	['60%','61.5%','63%','64.5%','66%','67.5%','69.38%','71.25%','73.13%','75%','76.5%','78%','79.5%','81%','82.5%'],
	['40%','41%','42%','43%','44%','45%','46.25%','47.5%','48.75%','50%','51%','52%','53%','54%','55%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['48%','51.2%','54.4%','57.6%','60.8%','64%','68%','72%','76%','80%','83.2%','86.4%','89.6%','92.8%','96%'],
	['100%','102%','104%','106%','108%','110%','112.5%','115%','117.5%','120%','122%','124%','126%','128%','130%'],
	['116%','126.88%','137.75%','148.63%','159.5%','175.81%','197.56%','224.75%','257.38%','290%','304.14%','318.28%','332.41%','346.55%','360.69%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['42%','51.8%','61.6%','71.4%','81.2%','91%','103.25%','115.5%','127.75%','140%','149.8%','159.6%','169.4%','179.2%','189%']
  ]
  let TalentLevel = 1;

	const SPD = 100;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [147, 288], atk: [92, 180], def: [66, 128] },
		{ dp: 1, levels: [20, 30], hp: [347, 421], atk: [217, 263], def: [155, 188] },
		{ dp: 2, levels: [30, 40], hp: [480, 554], atk: [300, 346], def: [214, 247] },
		{ dp: 3, levels: [40, 50], hp: [613, 687], atk: [383, 429], def: [273, 306] },
		{ dp: 4, levels: [50, 60], hp: [746, 820], atk: [466, 512], def: [333, 366] },
		{ dp: 5, levels: [60, 70], hp: [879, 953], atk: [549, 595], def: [392, 425] },
		{ dp: 6, levels: [70, 80], hp: [1012, 1086], atk: [632, 679], def: [452, 485] }
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
			Thành viên của "Thợ Săn Stellaron", mang vẻ đẹp của sự phóng khoáng, điềm đạm và chuyên nghiệp. Sử dụng Bùa Mê Ngôn Từ để khiến Nhà Khai Phá hấp thụ Stellaron. Sở thích là mua và sắp xếp áo khoác.
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Thành viên của "Thợ Săn Stellaron", mang vẻ đẹp của sự phóng khoáng, điềm đạm và chuyên nghiệp. Sử dụng Bùa Mê Ngôn Từ để khiến Nhà Khai Phá hấp thụ Stellaron. Sở thích là mua và sắp xếp áo khoác.</p>
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
  		<h3 class="text-lg font-bold mb-1">Náo Động Giữa Đêm</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Lôi</span> bằng
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Kafka cho 1 kẻ địch chỉ định.
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
  		<h3 class="text-lg font-bold mb-1">Ánh Trăng Ve Vuốt</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền mục tiêu chính,</span>
			<span style="color: {character.elementColor}">30</span>	<span class="text-amber-400 italic">sức bền mục tiêu lân cận</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p class="text-base">Gây Sát Thương <span style="color: {character.elementColor}; font-weight: bold">Lôi</span>
			cho 1 kẻ địch chỉ định bằng <span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span>
			Tấn Công của Kafka, đồng thời gây cho mục tiêu lân cận của kẻ đó Sát Thương <span style="color: {character.elementColor}; font-weight: bold">Lôi</span>
			bằng <span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> Tấn Công của Kafka.
 		</p>
		<p>Nếu kẻ địch chỉ định hoặc mục tiêu lân cận đang ở trạng thái Sát Thương Duy Trì, thì tất cả Sát Thương Duy Trì mà kẻ đó đang chịu sẽ lập tức sinh ra sát thương tương đương
			<span class="text-yellow-400 font-semibold">{skillAttack[2][SkillLevel - 1]}</span>
			hoặc <span class="text-yellow-400 font-semibold">{skillAttack[3][SkillLevel - 1]}</span> sát thương gốc.</p>
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
  			<h3 class="text-lg font-bold mb-1">Âm Vọng Bi Kịch</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Lan</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span> 
				<span class="text-amber-400 italic">sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
  			<p class="text-base">Gây Sát Thương <b style="color: {character.elementColor}">Lôi</b> 
				cho toàn bộ kẻ địch tương đương <b class="text-yellow-400">{ultimateAttack[0][UltimateLevel - 1]}</b>
				Tấn Công của Kafka, có <b class="text-yellow-400">100%</b> <u>xác suất cơ bản</u>
				khiến mục tiêu phe địch bị tấn công rơi vào trạng thái Sốc Điện và khiến Hiệu Ứng Xấu dạng sát thương duy trì mà kẻ đó đang chịu lập tức sinh ra sát thương bằng
				<b class="text-yellow-400">{ultimateAttack[1][UltimateLevel - 1]}</b> sát thương gốc. Trạng thái Sốc Điện duy trì 
				<b class="text-yellow-400">2</b> hiệp.
			</p>
			<p>Trong trạng thái này, kẻ địch mỗi khi bắt đầu hiệp sẽ chịu Sát Thương
				<b style="color: {character.elementColor}">Lôi</b> duy trì tương đương
				<b class="text-yellow-400">{ultimateAttack[2][UltimateLevel - 1]}</b> Tấn Công của Kafka.
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
  			<h3 class="text-lg font-bold mb-1">Dịu Dàng Đồng Nghĩa Tàn Khốc</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Đơn</span> |
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span> 
				<span class="text-amber-400 italic">sức bền</span> | 
				<span class="text-amber-400 italic">Hồi năng lượng</span> 
				<span style="color: {character.elementColor}">10</span>
  			</p>
  			<p class="text-base">Sau khi đồng đội của Kafka thi triển tấn công lên mục tiêu phe địch, Kafka sẽ phát động ngay
				<u>Đòn Đánh Theo Sau</u>, gây Sát Thương <b style="color: {character.elementColor}">Lôi</b> tương đương
				<b class="text-yellow-400">{talent[0][TalentLevel - 1]}</b> Tấn Công của Kafka cho mục tiêu này, và có
				<b class="text-yellow-400">100%</b> <u>xác suất cơ bản</u> 
				khiến kẻ địch bị tấn công rơi vào trạng thái Sốc Điện giống với Tuyệt Kỹ, duy trì
				<b class="text-yellow-400">2</b> hiệp, Hiệu ứng này tối đa có thể kích hoạt
				<b class="text-yellow-400">2</b> lần, khi kết thúc hiệp của Kafka sẽ hồi <b class="text-yellow-400">1</b> lần.
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
  			<h3 class="text-lg font-bold mb-1">Tha Thứ Không Có Nghĩa Là Nhân Từ</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phá Vỡ</span> <span style="color: {character.elementColor}">60</span> 
				<span class="text-amber-400 italic">sức bền</span>
  			</p>
  			<p class="text-base">Lập tức tấn công tất cả kẻ địch trong phạm vi nhất định, sau khi vào chiến đấu sẽ gây Sát Thương 
				<b style="color: {character.elementColor}">Lôi</b> bằng <b class="text-yellow-400">50%</b>
				Tấn Công của Kafka cho toàn bộ phe địch, đồng thời có <b class="text-yellow-400">100%</b> <u>xác suất cơ bản</u>
				khiến mỗi một kẻ địch rơi vào trạng thái Sốc Điện giống với Tuyệt Kỹ, duy trì <b class="text-yellow-400">2</b> hiệp.
			</p>
		</div>
	</div>
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ = Tuyệt Kỹ &ge; Thiên Phú &gt; Tấn Công Thường</p>
		
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Tuyệt Kỹ</p>
  			<p class="text-white/80 text-sm">Gắn Sốc Điện rồi kích hoạt Sát Thương Duy Trì hiện đang có trên người kẻ địch.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến Kỹ</p>
    		<p class="text-white/80 text-sm">Kích hoạt Sát Thương Duy Trì trên 3 mục tiêu.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Gắn Sốc Điện và kích hoạt Sát Thương Duy Trì trên mục tiêu đó.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn công thường</p>
    		<p class="text-white/80 text-sm">Vẫn vô dụng như ngày nào.</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Giày Vò"
		description='Khi Chính Xác Hiệu Ứng của mục tiêu phe ta lớn hơn hoặc bằng <b class="text-yellow-400">75%</b>,
		Kafka sẽ khiến Tấn Công của mục tiêu này tăng <b class="text-yellow-400">100%</b>.'
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
    		  	icon: "/images/icons-vestige/HP.png",
    		  	value: "+4%",
      		  	label: "HP",
      		  	unlock: "A3"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Cướp Đoạt"
		description='Khi mục tiêu phe địch ở trạng thái Sốc Điện bị tiêu diệt, Kafka sẽ hồi thêm
		<b class="text-yellow-400">5</b> Năng Lượng.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/quantum.png",
      	  	  	value: "+4.8%",
      		  	label: "Tăng Sát Thương <span style='color:#E26CFF'>Lôi</span>",
      		  	unlock: "A5"
			},
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Gai Góc"
		description='Sau khi thi triển Tuyệt Kỹ, số lần có thể kích hoạt
		<u>Đòn Đánh Theo Sau</u> của Thiên Phú sẽ hồi 1 lần, và
		<u>Đòn Đánh Theo Sau</u> của Thiên Phú có thể khiến tất cả Hiệu Ứng Xấu loại Sát Thương Duy Trì mà mục tiêu đang phải chịu lập tức sinh ra sát thương bằng
		<b class="text-yellow-400">80%</b> sát thương gốc.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/HP.png",
      	  	  	value: "+6%",
      		  	label: "HP",
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
  				name="Vô Cùng Vô Tận!"
  				elementColor={character.elementColor}
  				description='Khi tấn công, có <b class="text-yellow-400">100%</b> <u>xác suất cơ bản</u>
				khiến Sát Thương Duy Trì mà mục tiêu phải chịu tăng <b class="text-yellow-400">30%</b>,
				duy trì <b class="text-yellow-400">2</b> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Kẻ Mơ Tưởng, Thổn Thức"
  				elementColor={character.elementColor}
  				description='Khi Kafka trong trận, Sát Thương Duy Trì toàn phe ta gây ra tăng <b class="text-yellow-400">33%</b>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Tôi Khen Ngợi, Cao Hứng"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không quá cấp 15, 
				cấp Tấn Công Thường +1, tối đa không quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Xướng Ca Dâng Tặng"
  				elementColor={character.elementColor}
  				description='Khi mục tiêu phe địch chịu sát thương từ trạng thái Sốc Điện do Kafka gây ra, sẽ hồi thêm cho Kafka
				<b class="text-yellow-400">2</b> Năng Lượng.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Chỉ Cất Giọng Đêm Nay"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không quá cấp 15, 
				cấp Thiên Phú +2, tối đa không quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Uyển Chuyển Nhẹ Nhàng"
  				elementColor={character.elementColor}
  				description='Tăng <b class="text-yellow-400">156%</b>
				Bội Số Sát Thương của trạng thái Sốc Điện mà mục tiêu phe địch rơi vào được gây ra bởi Tuyệt Kỹ, Bí Kỹ và
				<u>Đòn Đánh Theo Sau</u> kích hoạt từ Thiên Phú, đồng thời khiến thời gian duy trì của trạng thái Sốc Điện tăng
				<b class="text-yellow-400">1</b> hiệp.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 = E2 > E4 <span class="text-white/20">(Hoặc)</span> E6</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Vô Cùng Vô Tận!</p>
  			<p class="text-white/80 text-sm">Tăng DMG DoT mà kẻ địch phải chịu.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Kẻ Mơ Tưởng, Thổn Thức</p>
    		<p class="text-white/80 text-sm">Kết hợp với E1 để tăng rất nhiều Sát Thương DoT gây ra.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Xướng Ca Dâng Tặng</p>
    		<p class="text-white/80 text-sm">Cải thiện chút năng lượng cho vận hành.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Uyển Chuyển Nhẹ Nhàng</p>
    		<p class="text-white/80 text-sm">Kafka trở lại làm DPS DoT.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['lies-dance-on-the-breeze','patience-is-all-you-need','those-many-springs','before-the-tutorial-mission-starts']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: 
			Giảm DEF giúp tăng DMG DoT gây ra, và còn tăng nhiều tốc cho người trang bị nữa.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: <span class="font-bold">Trấn</span> -
			Nếu E4 trở lên thì Kafka vô địch.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Chơi Kafka hỗ trợ DoT thì dùng khá tốt.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>: 
			Chơi xoay quanh kích DoT thì nón này rất tốt cho việc nạp năng lượng để spam Tuyệt Kỹ.
  			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['eagle_of_twilight_line','prisoner_in_deep_confinement']}
			mixSets={[['messenger_traversing_hackerspace','sacerdos_relived_ordeal']]}
  			planarIds={['item_lushaka_the_sunken_seas','item_revelry_by_the_sea','item_firmament_frontline_glamoth','item_pan-cosmic_commercial_enterprise']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Chim Ưng Ranh Giới Ngày Đêm</span>: Ưu tiên hành động cho Kafka hành động nhiều để kích DoT của đồng đội.</p>			
			<p><span class="text-amber-300 font-semibold">Tù Nhân Ngục Tối</span>: Nếu bạn vẫn muốn giữ lối chơi cũ của Kafka thì cứ dùng thôi.</p>
			<p><span class="text-amber-300 font-semibold">MIX 2-2 DMG+Tốc</span>: Tăng tốc của Kafka lên cao nhất có thể để kích DoT là chính.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>: Khi chơi Kafka với vai trò hỗ trợ kích DoT thì bộ cầu dây này hoàn toàn phù hợp, vừa tăng ATK cho DPS DoT, vừa tăng khả năng hồi năng lượng cho Kafka giúp Kafka sử dụng Tuyệt Kỹ nhiều hơn.</p> 
			<p><span class="text-amber-300 font-semibold">Bờ Biển Men Say</span>: Vẫn có thể dùng như một Kafka DPS DoT bình thường vì bộ cầu dây này vừa tăng ATK và vừa tăng DMG DoT gây ra.</p> 
			<p><span class="text-amber-300 font-semibold">Glamoth, Chiến Tuyến Không Trung</span>: Không còn mạnh như xưa nhưng vẫn có thể dùng được.</p> 
			<p><span class="text-amber-300 font-semibold">Công Ty Kinh Doanh Liên Ngân Hà</span>: Nếu bạn muốn chơi tập chung vào Chính Xác Hiệu Ứng thì cũng ok thôi.</p> 
			`}
			statDescriptions={[
			  [
    			'[ATK]Tấn Công &nbsp;&nbsp;= &nbsp; [EHR]Chính Xác Hiệu Ứng',
    			'[SPD]Tốc Độ',
    			'[lightning]<span style="color: #E26CFF">Tăng ST Lôi</span> &nbsp;&nbsp;&ge;&nbsp; [ATK]Tấn Công',
    			'[ERR]HS Hồi Năng Lượng &nbsp;&nbsp;&ge;&nbsp; [ATK]Tấn Công'
			  ]
			]}
			
			priorityStats={[
			'Tốc Độ &gt; Chính Xác Hiệu Ứng = Tấn Công'
			]}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">3000+</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">170+</span> &nbsp;<span class="text-white/70">(Càng cao càng tốt)</span></p>
			<p><span class="text-white/70">Chính Xác Hiệu Ứng:</span>&nbsp; <span class="font-bold">75%</span> &nbsp;<span class="text-white/70">(Bạn có thể build tầm này để bú 100% tấn công từ vết tích)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: [],
    			supportDps: ['kafka','black-swan','jiaoqiu','tribbie','luka','guinaifen','sampo'],
    			amplifier: ['ruan-mei','silver-wolf','robin','tingyun','asta','pela'],
    			sustain: ['huohuo','gallagher']
  			}}
  			tooltips={{
				dps: {
				},	
				supportDps:{	
					kafka: 'Kafka sau remake thì đã trở thành một driver kích DoT đúng nghĩa, không còn kiêm chủ lực như trước nữa, nên bây giờ cô thật sự cần một chủ lực DPS DoT mạnh mẽ.',
					'black-swan': 'Nhân vật có khả năng gắn DoT nhiều nhất hiện tại.',
					jiaoqiu: 'Vừa gắn DoT, vừa gắn Debuff trọng thương.',
					tribbie: 'Tăng xuyên kháng và gắn DMG phải chịu lên kẻ địch.',
					guinaifen: 'Phiên bản yếu hơn của Jiaoqiu',
					luka: 'DoT vật lý DMG to nha.',
					sampo: '"Giờ ai còn dùng thằng này?"',
				},
				amplifier:{	
					'ruan-mei': 'Xuyên kháng và tăng khả năng bào sức bền có thể giúp gắn DoT qua hiệu ứng phá vỡ điểm yếu.',
					robin: 'Hơi phí Buff Sát Thương Bạo, nhưng Buff ATK và kéo lượt cả team thì vấn bú được.',
					'silver-wolf': 'Giảm Def, gián tiếp tăng DMG DoT gây ra.',
					tingyun: 'Buff ATK và hồi năng lượng, có thể tạo điểm chiến kỹ nữa.',
					asta: 'Vừa tăng tấn công, vừa tăng tốc toàn team, phiên bản F2P của Robin.',
					pela: 'Giống Sói Bạc.',
				},
				sustain: {	
					huohuo: 'Bảo kê có khả năng Buff ATK và hồi năng lượng cho đồng đội, Kafka rất yêu.',
					gallagher: 'Tạo chiến kỹ cho các nhân vật chủ lực dùng.'
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
				Kích nổ Sát Thương theo thời gian (Damage over Time) mà không cần chờ kẻ địch đến lượt.
				What is Crit?
				Dễ chơi và hiệu quả cao.
				Có thể chơi trong mọi loại Content nhờ bộ kỹ năng đa dụng trên mọi chiến trường.
				Mommy Kafka.
			"
			cons="
				Cần khá nhiều đầu tư để đạt được ngưỡng sức mạnh cao.
				Yêu cầu lượng lớn Tốc mà không biết lấy đâu ra.
				Tốn hơi nhiều điểm chiến kỹ.
				Lối chơi DoT chưa đến thời.
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: #1FE7A5">Black Swan</span> &nbsp &gt &nbsp 
				<span style="color: {character.elementColor}">E2</span> &nbsp &gt &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">Black Swan</span>: Nhân vật có khả năng gắn DoT tốt nhất hiện tại.
			</p>
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">E2</span>: Hỗ trợ mạnh và tốt hơn cho đội hình DoT trong tương lai.
			</p>
		</div>

	</section>
</div>
