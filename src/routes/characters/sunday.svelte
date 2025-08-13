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
    id: 'sunday',
    name: 'Sunday',
    element: 'imaginary',
    path: 'harmony',
	elementColor: '#FADA7A'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['15%','16.5%','18%','19.5%','21%','22.5%','24.38%','26.25%','28.13%','30%','31.5%','33%','34.5%','36%','37.5%'],
	['25%','27.5%','30%','32.5%','35%','37.5%','40.63%','43.75%','46.88%','50%','52.5%','55%','57.5%','60%','62.5%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
    ['12%','13.8%','15.6%','17.4%','19.2%','21%','23.25%','25.5%','27.75%','30%','31.8%','33.6%','35.4%','37.2%','39%'],
	['8%','8.4%','8.8%','9.2%','9.6%','10%','10.5%','11%','11.5%','12%','12.4%','12.8%','13.2%','13.6%','14%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['10%','11%','12%','13%','14%','15%','16.25%','17.5%','18.75%','20%','21%','22%','23%','24%','25%']
  ]
  let TalentLevel = 1;

	const SPD = 96;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [168, 329], atk: [87, 169], def: [72, 141] },
		{ dp: 1, levels: [20, 30], hp: [397, 481], atk: [204, 248], def: [170, 206] },
		{ dp: 2, levels: [30, 40], hp: [549, 633], atk: [283, 326], def: [235, 272] },
		{ dp: 3, levels: [40, 50], hp: [701, 785], atk: [361, 405], def: [301, 337] },
		{ dp: 4, levels: [50, 60], hp: [853, 937], atk: [439, 483], def: [366, 402] },
		{ dp: 5, levels: [60, 70], hp: [1005, 1089], atk: [518, 561], def: [431, 468] },
		{ dp: 6, levels: [70, 80], hp: [1157, 1241], atk: [596, 640], def: [497, 533] }
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
		<p class="text-white text-base mt-4 text-center px-4 lg:hidden italic" style="text-shadow: 1px 1px 1px black">
			Giấc mộng đẹp của "Trật Tự" đã tan biến, nhưng vẫn có người không chịu buông bỏ ước nguyện ban đầu. ...Lữ khách với đôi cánh gãy, bước chân của anh ta sẽ đi về đâu?
  		</p>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">
                Giấc mộng đẹp của "Trật Tự" đã tan biến, nhưng vẫn có người không chịu buông bỏ ước nguyện ban đầu. ...Lữ khách với đôi cánh gãy, bước chân của anh ta sẽ đi về đâu?
            </p>
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
  		<h3 class="text-lg font-bold mb-1">Lời Khuyên Can Lấp Lánh</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Số Ảo</span> cho 1 kẻ địch chỉ định tương đương
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Sunday.
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
  		<h3 class="text-lg font-bold mb-1">Sự Ban Ơn Của Giấy Và Nghi Thức</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Hỗ Trợ</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Khiến 1 nhân vật chỉ định phe ta và vật triệu hồi của nhân vật đó lập tức hành động, đồng thời tăng
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> sát thương họ gây ra, nếu mục tiêu có vật triệu hồi, sẽ tăng thêm
			<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> hiệu ứng Tăng Sát Thương gây ra, duy trì
            <span class="text-yellow-400 font-semibold">2</span> hiệp.
		</p>
		<p>Sau khi thi triển Chiến Kỹ lên Chân Phước sẽ hồi 1 điểm Chiến Kỹ.</p>
		<p>Khi Sunday thi triển kỹ năng này lên nhân vật vận mệnh Hòa Hợp, sẽ không thể kích hoạt hiệu ứng lập tức hành động.</p>
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
  			<h3 class="text-lg font-bold mb-1">Lời Ca Tụng Sự Vuốt Ve Và Vết Sẹo</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hỗ Trợ</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">130</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">130</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Hồi năng lượng bằng <span class="text-yellow-400 font-semibold">20%</span> 
				giới hạn năng lượng cho 1 nhân vật chỉ định phe ta, đồng thời khiến mục tiêu và vật triệu hồi của mục tiêu đó trở thành Chân Phước, tăng Sát Thương Bạo Kích của Chân Phước, trị số tăng bằng
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> 
				sát thương bạo kích của Sunday +<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span>.
            </p>
			<p>Mỗi khi hiệp của Sunday bắt đầu, thì số hiệp duy trì của trạng thái Chân Phước giảm 1, tổng cộng duy trì 
                <span class="text-yellow-400 font-semibold">3</span> hiệp. Hơn nữa chỉ có hiệu lực với mục tiêu thi triển Tuyệt Kỹ mới nhất (ngoài bản thân Sunday). 
				Khi Sunday rơi vào trạng thái không thể chiến đấu, hiệu ứng Chân Phước cũng sẽ bị giải trừ.
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
  			<h3 class="text-lg font-bold mb-1">Thân Xác Thổ Lộ</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hỗ Trợ</span>
  			</p>
  			<p class="text-base">Khi thi triển Chiến Kỹ sẽ tăng
                <span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span> Tỷ Lệ Bạo Kích của mục tiêu, duy trì 
				<span class="text-yellow-400 font-semibold">3</span> hiệp.
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
  			<h3 class="text-lg font-bold mb-1">Bí Mật Phồn Vinh</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hỗ Trợ</span>
  			</p>
  			<p class="text-base">Sau khi dùng Bí Kỹ, lần chiến đấu tiếp theo khi Sunday lần đầu tiên thi triển kỹ năng lên mục tiêu phe ta, sẽ khiến sát thương mục tiêu gây ra tăng 
				<span class="text-yellow-400 font-semibold">50%</span>, duy trì <span class="text-yellow-400 font-semibold">2</span> hiệp.
            </p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ = Tuyệt Kỹ &ge; Thiên Phú &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Buff tăng Sát Thương gây ra, gần như mọi DPS từ ATK đến HP, từ Crit truyền thống đến DoT đều có thể dùng.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Buff Sát Thương Bạo cho chủ lực, có thể giúp DPS giảm bớt gánh nặng lên di vật và tập trung vào chỉ số khác để tối đa hóa Sát Thương, tránh bão hòa. Nhưng chủ yếu là dùng hồi 20% Năng Lương.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Buff một lượng lớn Tỉ Lệ Bạo, giúp giảm gánh nặng lên Di Vật của DPS.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Sunday không đánh thường bao giờ, trừ khi bạn bị skill issue.</p>
  		</div>		
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Khát Vọng Chủ Nhật"
		description='Khi thi triển Tuyệt Kỹ, nếu năng lượng hồi cho mục tiêu không đủ
					<span class="text-yellow-400 font-semibold">40</span> điểm, thì năng lượng hồi phục sẽ tăng đến
                    <span class="text-yellow-400 font-semibold">40</span> điểm.'
		unlock="A2"
		nodes={[
			{
      		  	icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+4%",
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/CD.png",
    		  	value: "+5.3%",
    		  	label: "Sát Thương Bạo Kích",
    		  	unlock: "A3"
            }
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Phất Trần Cao Thượng"
		description='Khi bắt đầu trận, Sunday sẽ hồ
                    <span class="text-yellow-400 font-semibold">25</span>
                    điểm năng lượng.'
		unlock="A4"
		nodes={[
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+8%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/ER.png",
    		  	value: "+6%",
    		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Thiên Đường Trong Tay"
		description='Khi thi triển Chiến Kỹ, giải trừ
			<span class="text-yellow-400 font-semibold">1</span> <span class="underline">Hiệu Ứng Xấu</span> của mục tiêu.'
		unlock="A6"
		nodes={[
            {
				icon: "/images/icons-vestige/DEF.png",
      	  	  	value: "+7.5%",
      		  	label: "Phòng Thủ",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/ER.png",
    		  	value: "+8%",
    		  	label: "Kháng Hiệu Ứng",
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
			},
            {
				icon: "/images/icons-vestige/DEF.png",
      	  	  	value: "+5%",
      		  	label: "Phòng Thủ",
      		  	unlock: "A3"
			},
            {
                icon: "/images/icons-vestige/CD.png",
    		  	value: "8%",
    		  	label: "Sát Thương Bạo Kích",
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
  				name="Sự Kết Thúc Của Thiên Niên Kỷ Tĩnh Lặng"
  				elementColor={character.elementColor}
  				description='Khi Sunday thi triển Chiến Kỹ, khiến nhân vật mục tiêu gây sát thương, sẽ bỏ qua
				<span class="text-yellow-400 font-semibold">16%</span> phòng thủ của mục tiêu, khi Vật Triệu Hồi gây sát thương sẽ bỏ qua
				<span class="text-yellow-400 font-semibold">40%</span> phòng thủ của mục tiêu, duy trì 
				<span class="text-yellow-400 font-semibold">2</span> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Đức Tin Bổ Túc"
  				elementColor={character.elementColor}
  				description='Sau khi lần đầu tiên thi triển Tuyệt Kỹ sẽ hồi 
                <span class="text-yellow-400 font-semibold">2</span> Điểm Chiến Kỹ. Sát thương Chân Phước gây ra tăng
                <span class="text-yellow-400 font-semibold">30%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Viện Tịnh Tu Của Bụi Gai"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Lời Mở Đầu Của Bức Tượng"
  				elementColor={character.elementColor}
  				description='Khi bắt đầu hiệp, sẽ hồi phục
				<span class="text-yellow-400 font-semibold">8</span> điểm Năng Lượng.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Thuyền Giấy Lênh Đênh Vịnh Bạc"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Sự Khởi Đầu Náo Động Của Quần Sao"
  				elementColor={character.elementColor}
  				description='Hiệu ứng Tăng Tỷ Lệ Bạo Kích của Thiên Phú có thể cộng dồn, tối đa cộng dồn 
				<span class="text-yellow-400 font-semibold">3</span> tầng, đồng thời khiến thời gian duy trì của Thiên Phú tăng
				<span class="text-yellow-400 font-semibold">1</span> hiệp. Khi Sunday thi triển Tuyệt Kỹ cũng có thể thêm hiệu ứng Tăng Tỷ Lệ Bạo Kích của Thiên Phú cho mục tiêu. 
				Khi hiệu ứng Tăng Tỷ Lệ Bạo Kích của Thiên Phú có hiệu lực, nếu Tỷ Lệ Bạo Kích của mục tiêu trên 100% thì cứ mỗi 1% Tỷ Lệ Bạo Kích vượt mức sẽ tăng
				<span class="text-yellow-400 font-semibold">2%</span> sát thương Bạo Kích.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 = E6 &ge; E4 &gt; E2</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Sự Kết Thúc Của Thiên Niên Kỷ Tĩnh Lặng</p>
  			<p class="text-white/80 text-sm">Bỏ quả Phòng Thủ vẫn là một cái gì đó rất khỏe trong tựa game này.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Đức Tin Bổ Túc</p>
    		<p class="text-white/80 text-sm">Sleep.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Lời Mở Đầu Của Bức Tượng</p>
    		<p class="text-white/80 text-sm">Cải thiện rất tốt khả năng vận hành của Sunday vì nhiều khi Sunday bị thiếu vài điểm Năng Lượng để có thể kích hoạt Tuyệt Kỹ.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Sự Khởi Đầu Náo Động Của Quần Sao</p>
    		<p class="text-white/80 text-sm">60% Tỉ Lệ Bạo đấy.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['a-grounded-ascent','but-the-battle-isnt-over','earthly-escapade','past-and-future','planetary-rendezvous','carve-the-moon-weave-the-clouds']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Tốt nhất ở thời điểm hiện tại, ảnh hưởng tới khả năng vận hành.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>:
			Ở tích tầng 3 có hiệu quả tương đương Trấn ở khả năng duy trì Tuyệt Kỹ.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Phiên bản kém hơn của Cuộc Chiến Chưa Nguôi, và có vấn đề về nạp năng lượng, thứ rất quan trọng với Sunday.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>: 
			Chỉ dùng khi đi cùng DPS Số Ảo. Vấn đề giống cái trên.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>: 
			Hiệu ứng random nhưng vẫn ngon. Vẫn vấn đề giống cái trên.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['sacerdos_relived_ordeal','messenger_traversing_hackerspace']}
			mixSets={[]}
  			planarIds={['item_lushaka_the_sunken_seas','item_penacony_land_of_the_dreams','item_sprightly_vonwacq']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Lại Một Hành Trình Gian Khổ Của Linh Mục</span>: 
			Bộ tốt nhất cho Sunday khi chơi Speed Turning.</p>
			<p><span class="text-amber-300 font-semibold">Tín Sứ Du Ngoạn Không Gian Hacker</span>: 
			Hàng kém hơn bộ trên.</p>
			<p>Bạn có thể mặc cầu vồng cho Sunday, miễn sao chỉ số đẹp là được.</p>            
			`}
			planarAnalysis={`
			<span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>:
			Sự lựa chọn ưu tiên trong đa số trường hợp.</p>
            <span class="text-amber-300 font-semibold">Penacony, Vùng Đất Của Những Giấc Mơ</span>:
			Có thể dùng nếu DPS có cùng Nguyên Tố với người mặc.</p>
            <span class="text-amber-300 font-semibold">Vonwacq Hoạt Bát</span>:
			Chỉ hữu ích khi chơi Sunday Tốc cao. Nếu chơi Speed Turning với bộ này thì rất dễ làm hỏng chu kỳ.</p>
			`}
			statDescriptions={[[
    		'[CD]Crit Dmg',
    		'[SPD]Tốc Độ &nbsp;&nbsp;&gt;&nbsp; [HP]HP &nbsp;&nbsp;=&nbsp; [DEF]Phòng Thủ',
    		'[HP]HP &nbsp;&nbsp;=&nbsp; [DEF]Phòng Thủ',
    		'[ERR]Hiệu Suất Hồi Năng Lượng'
			]]}
			priorityStats={
			'Tốc Độ &ge; Sát Thương Bạo &gt; Kháng Hiệu Ứng &gt; HP = DEF'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">4000+</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">200%+</span> &nbsp;<span class="text-white/70">(Build được càng cao càng tốt)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">134</span> &nbsp;<span class="text-white/70">(Tốc của Sunday nên bằng Tốc của DPS -1 để chơi Speed Turning. Hoặc lên 16x nếu chơi Tốc cao)</span></p>
			<p><span class="text-white/70">Kháng Hiệu Ứng:</span>&nbsp; <span class="font-bold">30+</span> &nbsp;<span class="text-white/70">(Vì Sunday là nhân vật Speed Turning tốt, nên hãy build một ít để đảm bảo rotation)</span></p>
			<p><span class="text-white/70">Hiệu Suất Hồi Năng Lượng:</span>&nbsp; <span class="font-bold">119.44%+</span> &nbsp;<span class="text-white/70">(Sunday có thể thiếu hụt vài điểm năng lượng trong thực chiến, nên hãy build cho anh chàng nạp cao một chút)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['aglaea','jing-yuan','phainon','mydei','jingliu','saber','castorice','therta','acheron','feixiao'],
    			supportDps: ['sunday'],
    			amplifier: ['robin','bronya'],
    			sustain: []
  			}}
  			tooltips={{
				dps: {
					aglaea: 'Aglaea cần Sunday.',
					'jing-yuan': '"Ngài đưa Sunday lên đỉnh Meta"🐧.',
					"phainon": 'Phainon cần đồng minh dùng kỹ năng lên bản thân, Sunday có 2 cái.',
					mydei: 'Sunday có thể bù trừ vào phần Tỉ Lệ Bạo và Sát Thương Bạo bị thiếu của Mydei rất tốt, và Speed Turning cũng rất hiệu quả.',
					jingliu: 'Thực ra để lấy hồi 20% năng lượng là chính bởi Jingliu cũng tự Buff bản thân rất nhiều Tỉ Lệ Bạo và Sát Thương Bạo rồi.',
					saber: 'Bể năng lượng của Saber rất lớn, lên tới 300 điểm, nên hồi 20% năng lượng của Sunday rất tốt cho Saber, và những Buff khác cũng hiệu quả không kém.',
					castorice: 'Sunday Buff khá tốt cho Castorice, nhưng bạn nên lưu ý là chỉ Buff Tuyệt Kỹ Sunday sau khi Castorice gọi rồng. Tuyệt đối không được dùng trước, rồng sẽ không nhận được Buff.',
					therta: 'Tương tự Saber, Đại Herta cũng có một bể năng lượng rất lớn. Và trong team này thì Sunday nên build tốc cao thay vì speed turning.',
					acheron: 'Chỉ dùng khi có Acheron E2 và chơi speed turning.',
					feixiao: 'Chơi speed turning được.'
				},
                supportDps: {
					sunday: 'Sunday Buff thiên về Sát Thương gây ra, Crit Rate và Crit DMG, điều này khiến anh chàng có thể đi được với bất kỳ DPS nào bất kể chơi theo ATK, HP, hay DEF.'
                },
                amplifier: {
					robin: 'Được hàng động nhiều hơn, ai lại không thích chứ. Và còn đi cùng team với em gái nữa.',
					bronya: 'Có thể build tốc = Sunday (hoặc -1) để tối đa lượt hành động của DPS.'
                },
                sustain: {
                }
			}}
			notes={{
                dps: 'Sunday là một Hòa Hợp có khả năng đi được với gần như tất cả mọi DPS vì anh chàng không Buff cố định một mảng nào cả.',
				sustain: 'Nhân vật nào chả được.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=' 
				Có thể đi được cả DPS ATK hoặc HP.
				Ưu tiên hành động 100% cho nhân vật và vật triệu hồi của họ.
				Luôn hòa chiến kỹ, nếu có trấn thì luôn dương.
				Speed Turning tốt, dễ vận hành.
				Buff Crit Rate và Crit DMG liên tục.
				Hồi năng lượng cho đồng minh.
				7 ngày là Chủ Nhật.
			'
			cons='
				Rất nhiều vấn đề về năng lượng của bản thân.
				Khả năng hồi năng lượng bị lãng phí khi đi cùng các DPS không có Năng Lượng.
				Chưa có nhiều nhân vật tận dụng tối đa Buff của Sunday.
			'
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt; &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400">S1</span>: Sunday khá là bó trấn nên hãy đầu tư cho anh chàng 1 cái nón Chuyến Bay Trở Về Mặt Đất trước đã.
			</p>
			<p>
				Sau đó thích làm gì thì làm.
			</p>		
		</div>

	</section>
</div>
