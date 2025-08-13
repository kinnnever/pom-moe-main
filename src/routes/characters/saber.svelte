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
	import Tribbie from './tribbie.svelte';
	import JingliuEnhanced from './jingliu-enhanced.svelte';

  const character = {
    id: 'saber',
    name: 'Saber',
    element: 'wind',
    path: 'destruction',
	elementColor: '#1FE7A5'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%','60%','70%','80%','90%','100%','110%','120%','130%','140%'],
	['75%','90%','105%','120%','135%','150%','165%','180%','195%','210%'],
	['110%','132%','154%','176%','198%','220%','242%','264%','286%','308%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['75%','82.5%','90%','97.5%','105%','112.5%','121.88%','131.25%','140.63%','150%','157.5%','165%','172.5%','180%','187.5%'],
	['37.5%','41.25%','45%','48.75%','52.5%','56.25%','60.94%','65.63%','70.31%','75%','78.75%','82.5%','86.25%','90%','93.75%'],
	['7%','7.7%','8.4%','9.1%','9.8%','10.5%','11.38%','12.25%','13.13%','14%','14.7%','15.4%','16.1%','16.8%','17.5%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
    ['140%','154%','168%','182%','196%','210%','227.5%','245%','262.5%','280%','294%','308%','322%','336%','350%'],
	['55%','60.5%','66%','71.5%','77%','82.5%','89.38%','96.25%','103.13%','110%','115.5%','121%','126.5%','132%','137.5%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['30%','33%','36%','39%','42%','45%','48.75%','52.5%','56.25%','60%','63%','66%','69%','72%','75%']
  ]
  let TalentLevel = 1;

	const SPD = 101;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 125;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [168, 329], atk: [81, 159], def: [89, 173] },
		{ dp: 1, levels: [20, 30], hp: [397, 481], atk: [192, 233], def: [209, 253] },
		{ dp: 2, levels: [30, 40], hp: [549, 633], atk: [265, 306], def: [289, 334] },
		{ dp: 3, levels: [40, 50], hp: [701, 785], atk: [339, 380], def: [369, 414] },
		{ dp: 4, levels: [50, 60], hp: [853, 937], atk: [413, 454], def: [449, 494] },
		{ dp: 5, levels: [60, 70], hp: [1005, 1089], atk: [486, 527], def: [530, 574] },
		{ dp: 6, levels: [70, 80], hp: [1157, 1241], atk: [560, 601], def: [610, 654] }
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
			
  		</p>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-7 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">
                
            </p>
  		</div>
	</div>

	<!-- Thông tin nhân vật -->
	<div class="lg:w-2/4 space-y-">
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
  		<h3 class="text-lg font-bold mb-1">Kết Giới Vua Gió</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<b style="color: {character.elementColor}">Phong</b> cho 1 kẻ địch chỉ định bằng
		<b class="text-yellow-400">{normalAttack[0][NormalLevel - 1]}</b> Tấn Công của Saber.
		</p>

		<h3 class="text-lg font-bold mb-1 mt-4">「Vương Quyền Vàng Giải Phóng」</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Lan</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Nhận <b class="text-yellow-400">2</b> điểm "Cộng Hưởng Lõi Trung Tâm", và gây Sát Thương
		<b style="color: {character.elementColor}">Phong</b> bằng 
		<b class="text-yellow-400">{normalAttack[1][NormalLevel - 1]}</b> Tấn Công của Saber cho toàn bộ phe địch. 
		Nếu khi thi triển, số lượng mục tiêu phe địch là 2/1, sẽ gây thêm Sát Thương
		<b style="color: {character.elementColor}">Phong</b> bằng 
		<b class="text-yellow-400">{normalAttack[1][NormalLevel - 1]}</b>/<b class="text-yellow-400">{normalAttack[2][NormalLevel - 1]}</b>
		Tấn Công của Saber cho toàn bộ địch.
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
  		<h3 class="text-lg font-bold mb-1">Búa Sắt Vua Gió</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán</span> |
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Gây Sát Thương
			<b style="color: {character.elementColor}">Phong</b> cho 1 kẻ địch chỉ định bằng
			<b class="text-yellow-400">{skillAttack[0][SkillLevel - 1]}</b>	Tấn Công của Saber, gây Sát Thương
			<b style="color: {character.elementColor}">Phong</b> cho mục tiêu lân cận bằng 
			<b class="text-yellow-400">{skillAttack[1][SkillLevel - 1]}</b> Tấn Công của Saber. 
			Nếu đang có "Cộng Hưởng Lõi Trung Tâm", và sau lần tấn công Chiến Kỹ này có thể hồi đầy năng lượng cho Saber bằng cách tiêu hao 
			"Cộng Hưởng Lõi Trung Tâm", thì sẽ tăng Bội Số của Chiến Kỹ lần này, mỗi 1 điểm "Cộng Hưởng Lõi Trung Tâm" sẽ tăng
			<b class="text-yellow-400">{skillAttack[2][SkillLevel - 1]}</b> Bội Số Sát Thương của Chiến Kỹ lần này, 
			đồng thời sau khi tấn công sẽ tiêu hao tất cả "Cộng Hưởng Lõi Trung Tâm" hồi năng lượng cho Saber, nếu không sẽ lập tức nhận
			<b class="text-yellow-400">3</b> điểm "Cộng Hưởng Lõi Trung Tâm".
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
  			<h3 class="text-lg font-bold mb-1">Excalibur</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Lan</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">120</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">360</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">360</span> | 
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Gây Sát Thương
                <b style="color: {character.elementColor}">Phong</b> bằng
                <b class="text-yellow-400">{ultimateAttack[0][UltimateLevel - 1]}</b> Tấn Công của Saber lên toàn bộ phe địch. Đồng thời gây thêm
				<b class="text-yellow-400">10</b>  lần sát thương, mỗi lần sát thương gây Sát Thương <b style="color: {character.elementColor}">Phong</b> 
				bằng <b class="text-yellow-400">{ultimateAttack[1][UltimateLevel - 1]}</b> Tấn Công của Saber lên 1 kẻ địch ngẫu nhiên. 
				Sau khi thi triển Tuyệt Kỹ, lần Tấn Công Thường tiếp theo sẽ bị thay thế bằng "Vương Quyền Vàng Giải Phóng" và chỉ có thể thi triển "Vương Quyền Vàng Giải Phóng".
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
  			<h3 class="text-lg font-bold mb-1">Lõi Phản Ứng Rồng</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span> |
				<span class="text-amber-400 italic">Hồi năng lượng</span> <span style="color: {character.elementColor}">10</span> |
  			</p>
  			<p>Khi vào chiến đấu, nhận <b class="text-yellow-400">1</b> điểm "Cộng Hưởng Lõi Trung Tâm". 
				Khi mục tiêu bất kỳ của phe ta thi triển Tuyệt Kỹ, sát thương Saber gây ra sẽ tăng
                <b class="text-yellow-400">{talent[0][TalentLevel - 1]}</b>, duy trì <b class="text-yellow-400">2</b> hiệp,
				và nhận <b class="text-yellow-400">3</b> điểm "Cộng Hưởng Lõi Trung Tâm". Mỗi khi tiêu hao 1 điểm "Cộng Hưởng Lõi Trung Tâm" sẽ cố định hồi cho Saber
				<b class="text-yellow-400">8</b> điểm Năng Lượng.
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
  			<h3 class="text-lg font-bold mb-1">Vua Kỵ Sĩ Ra Trận</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span>
  			</p>
  			<p>Sau khi dùng Bí Kỹ, khi bắt đầu lần chiến đấu tiếp theo, Tấn Công của Saber sẽ tăng 
				<b class="text-yellow-400">35%</b>, duy trì <b class="text-yellow-400">2</b> hiệp,
				và nhận <b class="text-yellow-400">2</b> điểm "Cộng Hưởng Lõi Trung Tâm".
            </p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Tuyệt Kỹ &gt; Chiến Kỹ &gt; Tấn Công Thường = Thiên Phú</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Tuyệt Kỹ</p>
  			<p class="text-white/80 text-sm">Nguồn Sát Thương lớn nhất của Saber.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến Kỹ</p>
    		<p class="text-white/80 text-sm">Hỗ trợ Sát Thương và khả năng nạp cho bản thân.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Hỗ trợ Sát Thương.</p>
  		</div>	
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Gia tăng Sát Thương gây ra của Saber khi đồng minh phe ta bất kỳ sử dụng Tuyệt Kỹ.</p>
  		</div>	
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Kỵ Sĩ Rồng"
		description='Tỷ Lệ Bạo Kích của Saber tăng <b class="text-yellow-400">20%</b>. 
					Khi vào chiến đấu và thi triển Tấn Công Thường Cường Hóa sẽ nhận hiệu ứng Ma Lực Phóng Thích, dưới hiệu ứng này, 
					nếu Saber có Cộng Hưởng Lõi Trung Tâm, đồng thời thi triển Chiến Kỹ và tiêu hao Cộng Hưởng Lõi Trung Tâm có thể hồi đầy năng lượng cho Saber, 
					sẽ tiêu hao Ma Lực Phóng Thích hồi 1 Điểm Chiến Kỹ cho phe ta và khiến Saber lập tức hành động.'
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+2.7%",
      		  	label: "Tỷ Lệ Bạo Kích",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/wind.png",
    		  	value: "+3.2%",
    		  	label: "Tăng Sát Thương <span style='color:#1FE7A5'>Phong</span>",
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
		title="Phước Lành Hồ Thiêng"
		description='Saber có thể tích lũy tối đa <b class="text-yellow-400">120</b> Năng Lượng vượt mức, 
					sau khi thi triển Tuyệt Kỹ sẽ xóa và hồi Năng Lượng tương ứng. Khi bắt đầu chiến đấu nếu Năng Lượng không đủ
                    <b class="text-yellow-400">60%</b> thì sẽ hồi phục đến <b class="text-yellow-400">60%</b>.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/wind.png",
    		  	value: "+4.8%",
    		  	label: "Tăng Sát Thương <span style='color:#1FE7A5'>Phong</span>",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+4%",
      		  	label: "Tỷ Lệ Bạo Kích",
      		  	unlock: "A5"
			},
			{
				icon: "/images/icons-vestige/wind.png",
    		  	value: "+4.8%",
    		  	label: "Tăng Sát Thương <span style='color:#1FE7A5'>Phong</span>",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Vương Miện Của Những Vì Sao"
		description='Khi thi triển Chiến Kỹ, khiến Sát Thương Bạo Kích của Saber tăng
		<b class="text-yellow-400">50%</b>, duy trì <b class="text-yellow-400">2</b> hiệp.
		Trong trận này mỗi khi nhận được 1 điểm Cộng Hưởng Lõi Trung Tâm, khiến Sát Thương Bạo Kích của Saber tăng 
        <b class="text-yellow-400">4%</b>, hiệu ứng này tối đa cộng dồn <b class="text-yellow-400">8</b> tầng.'
		unlock="A6"
		nodes={[
            {
				icon: "/images/icons-vestige/HP.png",
      	  	  	value: "+6%",
      		  	label: "HP",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+5.3%",
      		  	label: "Tỷ Lệ Bạo Kích",
      		  	unlock: "LV75"
			},
            {
                icon: "/images/icons-vestige/wind.png",
    		  	value: "+6.4%",
    		  	label: "Tăng Sát Thương <span style='color:#1FE7A5'>Phong</span>",
      		  	unlock: "LV80"
            }
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/wind.png",
    		  	value: "+3.2%",
    		  	label: "Tăng Sát Thương <span style='color:#1FE7A5'>Phong</span>",
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
  				name="Bức Tường Phấn Trắng Thất Lạc"
  				elementColor={character.elementColor}
  				description='Sát Thương Tuyệt Kỹ Saber gây ra tăng <b class="text-yellow-400">60%</b>. 
				Sau khi Saber thi triển Tấn Công Thường hoặc Chiến Kỹ, sẽ nhận <b class="text-yellow-400">1</b>
				điểm "Cộng Hưởng Lõi Trung Tâm".'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Lời Thề Bàn Tròn Phủ Bụi"
  				elementColor={character.elementColor}
  				description='Trong trận đấu mỗi khi nhận 1 điểm Cộng Hưởng Lõi Trung Tâm sẽ khiến sát thương Saber gây ra bỏ qua
                <b class="text-yellow-400">1%</b> Phòng Thủ của mục tiêu, hiệu ứng này tối đa cộng dồn <b class="text-yellow-400">15</b> tầng.
				Khi kích hoạt hiệu ứng tăng Bội Số Chiến Kỹ của Cộng Hưởng Lõi Trung Tâm, mỗi điểm Cộng Hưởng Lõi Trung Tâm sẽ khiến Bội Số Sát Thương của Chiến Kỹ lần này tăng thêm
				<b class="text-yellow-400">7%</b>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Ước Nguyện Suốt 15 Thế Kỷ"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Kỳ Ngộ 16 Ngày Đông"
  				elementColor={character.elementColor}
  				description='<u>Xuyên Kháng</u> <span style="color:#1FE7A5">Phong</span> của Saber tăng	<b class="text-yellow-400">8%</b>. 
				Sau khi thi triển Tuyệt Kỹ, <u>Xuyên Kháng</u> <span style="color:#1FE7A5">Phong</span> của Saber tăng <b class="text-yellow-400">4%</b>,
				hiệu ứng này tối đa cộng dồn <b class="text-yellow-400">3</b> lần.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Khi Chạm Đến Bình Minh Lý Tưởng"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Đêm Dài Bảo Vệ Vận Mệnh"
  				elementColor={character.elementColor}
  				description='<u>Xuyên Kháng</u> <span style="color:#1FE7A5">Phong</span> của Sát Thương Tuyệt Kỹ Saber gây ra tăng
                <b class="text-yellow-400">20%</b>, Năng Lượng vượt mức mà Vết Tích "Phước Lành Hồ Thiêng" có thể tích lũy tăng đến
				<b class="text-yellow-400">200</b> điểm. Sau khi vào chiến đấu, lần đầu thi triển Tuyệt Kỹ sẽ cố định hồi cho Saber
				<b class="text-yellow-400">300</b> điểm Năng Lượng. Hiệu ứng này mỗi khi thi triển thêm
				<b class="text-yellow-400">3</b> lần Tuyệt Kỹ có thể kích hoạt 1 lần.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 = E2 = E4 = E6</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Bức Tường Phấn Trắng Thất Lạc</p>
  			<p class="text-white/80 text-sm">Nhân vật Collab mà, cố đến đâu thì cố.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Lời Thề Bàn Tròn Phủ Bụi</p>
    		<p class="text-white/80 text-sm">Nhân vật Collab mà, cố đến đâu thì cố.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Kỳ Ngộ 16 Ngày Đông</p>
    		<p class="text-white/80 text-sm">Nhân vật Collab mà, cố đến đâu thì cố.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Đêm Dài Bảo Vệ Vận Mệnh</p>
    		<p class="text-white/80 text-sm">Nhân vật Collab mà, cố đến đâu thì cố.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['a-thankless-coronation','thus-burns-the-dawn','on-the-fall-of-an-aeon','brighter-than-the-sun','a-trail-of-bygone-blood']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Bổ sung khả năng vận hành cho Saber khi giải quyết được vấn đề năng lượng.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>:
			Cho base Tốc và xuyên giáp.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Nón F2P cho ATK gần giống trấn.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>: 
			Crit Rate + hồi năng lượng.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>: 
			Nón BattlePass ngon nếu tích tầng max.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['wavestrider_captain','scholar_lost_in_erudition']}
			mixSets={[[]]}
  			planarIds={['item_inert_salsotto','item_rutilant_arena','item_firmament_frontline_glamoth','item_space_sealing_station']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Thuyền Trưởng Đuổi Sóng Biển Sâu</span>: 
			Yêu cầu đồng đội phải có kỹ năng nhắm vào Saber để tối đa sức mạnh cô nàng, khi này bộ di vật này là khỏe nhất cho Saber.</p>
			<p><span class="text-amber-300 font-semibold">Học Giả Lạc Lối Trong Biển Tri Thức</span>: 
			Kém hơn bộ trên một chút.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Salsotto Dừng Xoay</span>:
            Mặc dù hơi phí tăng sát thương đòn đánh theo sau, nhưng bù lại thì Crit Rate và sát thương Tuyệt Kỹ vẫn dùng được.</p>
			<p><span class="text-amber-300 font-semibold">Đấu Trường Ngôi Sao</span>:
            Tăng DMG Tấn Công Thường và Chiến Kỹ cũng được, Crit Rate cũng ok.</p>
			<p><span class="text-amber-300 font-semibold">Glamoth, Chiến Tuyến Không Trung</span>:
            Tăng Sát Thương gây ra, nếu bạn đã build đủ Crit Rate thì bộ này rất ngon cho Saber.</p>
			<p><span class="text-amber-300 font-semibold">Trạm Phong Ấn Không Gian</span>:
            Tăng ATK thuần, một chỉ số mà Saber rất cần khi đi cùng Sunday.</p>
			`}
			statDescriptions={[[
    		'[CD]Crit Dmg &nbsp;&nbsp;&gt;&nbsp; [CR]Crit Rate &nbsp;&nbsp;&gt;&nbsp; [ATK]Tấn Công',
    		'[SPD]Tốc Độ &nbsp;&nbsp;&gt;&nbsp; [ATK]Tấn Công',
    		'[wind]<span style="color: #1FE7A5">Tăng ST Phong</span> &nbsp;&nbsp;=&nbsp; [ATK]Tấn Công',
    		'[ATK]Tấn Công'
			]]}
			priorityStats={
			'Tỷ Lệ Bạo &gt; Sát Thương Bạo &ge; Tấn Công &ge; Tốc Độ'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">2800+</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">80%</span> &nbsp;<span class="text-white/70">(Saber được free 20% Crit Rate rồi, giảm xuống 60% nếu đi cùng Sunday)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">150%</span> &nbsp;<span class="text-white/70">(Saber có buff tự thân và rất nhiều buff từ đồng đội rồi nên hãy build cân bằng)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">134</span> &nbsp;<span class="text-white/70">(Saber thích hợp chơi speed turning thay vì chơi ATK thuần)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['saber'],
    			supportDps: ['tribbie','cipher','jiaoqiu'],
    			amplifier: ['sunday','female-remembrance','bronya','robin','tingyun'],
    			sustain: ['huohuo']
  			}}
  			tooltips={{
				dps: {
					saber: 'DPS tiêu chuẩn và khá cân bằng, có thể dùng trong nhiều dạng content.'
                },
                supportDps: {
					cipher: 'Debuff ổn, tích Dmg Saber gây ra được nhưng phải spam liên tục cho Saber hồi năng lượng Tuyệt Kỹ.',
					tribbie: 'Buff và Debuff khỏe, có E1 nữa thì Excalibur cứ phải gọi là một bổ bình thiên hạ.',
					jiaoqiu: 'Bạn biết DMG của Saber rất nhiều đến từ Tuyệt Kỹ chứ, và Jiaoqiu sẽ đưa lượng DMG đó lên một tầm cao mới.'
                },
                amplifier: {
					'female-remembrance': 'Sát Thương Chuẩn + 10% Tỷ Lệ Bạo.',
					sunday: 'Hồi năng lượng và buff rất nhiều CV cho Saber.',
					robin: 'Tăng rất nhiều ATK và Sát Thương Bạo.',
					tingyun: 'Vừa buff ATK, vừa hồi năng lượng nhưng hơi yếu.',
					bronya: 'Buff Tấn Công và kéo lượt.',
                },
                sustain: {
					huohuo: 'Bảo kê tốt và khả năng hồi năng lượng và buff ATK đều là những thứ Saber cần.',
                }
			}}
			notes={{
				supportDps: 'Nhân vật nào spam được nhiều Tuyệt Kỹ là cho vào được.',
				sustain: 'Spam Tuyệt Kỹ được nhiều thì cho vào, không thì ai cũng như ai thôi.',
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=' 
				Sát thương ổn định trong mọi content.
				Nuke Damage.
				Rất nhiều chỉ số Bạo Kích free.
				Hồi năng lượng nhanh dù tận 360 điểm năng lượng.
				Vận mệnh Hủy Diệt.
				Nhân vật Collab.
				Excalibur.
			'
			cons='
				Hơi khó chơi và kiểm soát bộ kỹ năng.
				Nhân vật hỗ trợ tốt toàn rát vàng và nhiều đội hình khác cũng cần.
				Nhân vật Collab, khả năng một đi không trở lại.
			'
		/>
		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt; &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400">S1</span>: Trấn có thể ảnh hưởng nhiều đến vận hành lối chơi, nên ưu tiên có trấn trước khi có ý định roll thêm tinh hồn.
			</p>	
		</div>

	</section>
</div>
