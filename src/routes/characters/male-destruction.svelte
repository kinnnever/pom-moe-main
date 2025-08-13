<script lang="ts">
  	import Title from '$components/Title.svelte';
  	import {onMount} from 'svelte';
	import { element } from 'svelte/internal';
	import TraceBlock from '$components/TraceBlock.svelte';
	import EidolonBlock from '$components/EidolonBlock.svelte';
	import LightconesBlock from '$components/LightconesBlock.svelte';
	import RelicsBlock from '$components/relicsBlock.svelte';
	import TeamBlock from '$components/TeamBlock.svelte';

  const character = {
    id: 'male-destruction',
    name: 'Nhà Khai Phá - Hủy Diệt',
    element: 'physical',
    path: 'destruction',
	elementColor: '#CFCFCF'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [[
    '50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%'
  ]]; 
  let NormalLevel = 1;

  const skillAttack = [
	['62.5%','68.75%','75%','81.25%','87.5%','93.75%','101.56%','109.38%','117.19%','125%','131.25%','137.5%','143.75%','150%','156.25%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['300%','315%','330%','345%','360%','375%','393.75%','412.5%','431.25%','450%','465%','480%','495%','510%','525%'],
  	['180%','189%','198%','207%','216%','225%','236.25%','247.5%','258,75%','270%','279%','288%','297%','306%','315%'],
	['108%','113.4%','118.8%','124.2%','129.6%','135%','141.75%','148.5%','155.25%','162%','167.4%','172.8%','178.2%','183.6%','189%']
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

<div class="flex flex-col gap-8 md:flex-row md:items-start">
	<!-- Hình ảnh -->
	<div class="md:w-2/3 flex justify-center">
		<img
			src="/images/characters-full/{character.id}.png"
			alt="{character.name}"
			class="max-h-[100vh] object-contain"
		/>
		<div class="absolute bottom-6 left-16 bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-lg max-w-md">
    		<p style="text-shadow: 1px 1px 1px black">Thiếu nữ/Thiếu niên lên Đội Tàu Astral. Để diệt trừ hiểm họa mà Stellaron mang đến, đã quyết định đồng hành cùng đoàn tàu.</p>
  		</div>
	</div>

	<!-- Thông tin nhân vật -->
	<div class="md:w-2/4 space-y-6">
		<div class="flex items-center gap-4 mb-4">
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
		<table class="w-full text-white border-collapse text-sm table-fixed">
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
		<img
    		src="/images/skills/{character.id}/attack.png"
   			alt="Tấn công thường"
    		class="h-20 w-20 rounded border border-white/10 object-cover"
  		/>
		<div class="flex-1">
  		<h3 class="text-lg font-bold mb-1">Trận Đánh Chia Tay</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span> 
			<span class="text-amber-400 italic">sức bền </span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Vật Lý</span> cho 1 kẻ địch chỉ định tương đương 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Nhà Khai Phá.
		</p>
			<div class="flex items-center gap-4 mb-2">
  				<!-- svelte-ignore a11y-label-has-associated-control -->
  				<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  				<input type="range" min="1" max="10" bind:value={NormalLevel} class="w-48 accent-white/10" />
  				<span class="text-sm text-white/40">Lv{NormalLevel}</span>
			</div>
		</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
		<img
    	src="/images/skills/{character.id}/skill.png"
   		alt="Chiến kỹ"
    	class="h-20 w-20 rounded border border-white/10 object-cover"
  		/>
		<div class="flex-1">
  		<h3 class="text-lg font-bold mb-1">Trận Chiến Cuối Cùng</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch tán </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền mục tiêu chính,</span> 
			<span style="color: {character.elementColor}">30</span> 
			<span class="text-amber-400 italic">sức bền mục tiêu lân cận</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span>
  		</p>
  		<p class="text-base">Gây sát thương 
			<span style="color: {character.elementColor}; font-weight: bold">Vật Lý</span> 
            cho 1 kẻ địch chỉ định và mục tiêu lân cận kẻ đó tương đương 
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Tấn Công của Nhà Khai Phá.
 		</p>
			<div class="flex items-center gap-4 mb-2">
  				<!-- svelte-ignore a11y-label-has-associated-control -->
  				<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  				<input type="range" min="1" max="15" bind:value={SkillLevel} class="w-48 accent-white/10" />
  				<span class="text-sm text-white/40">Lv{SkillLevel}</span>
			</div>
		</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
			<img
    		src="/images/skills/{character.id}/ultimate.png"
   			alt="Tuyệt kỹ"
    		class="h-20 w-20 rounded border border-white/10 object-cover"
  			/>
			<div class="flex-1">
  			<h3 class="text-lg font-bold mb-1">Át Chủ Bài Ma Thuật</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa </span> |  
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
  			<p class="text-base">Chọn <span class="text-yellow-400 font-semibold">1</span> trong 2 chế độ tấn công để ra đòn toàn lực:</p>
			<h2 class="text-lg font-bold mt-4">「Toàn Thắng - Trận Đánh Chia Tay」</h2>
			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Đơn </span> |  
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">90</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Gây Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Vật Lý</span> cho 1 kẻ địch chỉ định tương đương 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> Tấn Công của Nhà Khai Phá.
			</p>
			<h2 class="text-lg font-bold mt-4">「Toàn Thắng - Trận Chiến Cuối Cùng」</h2>
			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Khuếch Tán </span> |  
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span>
				<span class="text-amber-400 italic">/hit </span> |
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Gây Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Vật Lý</span> cho 1 kẻ địch chỉ định bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span> Tấn Công của Nhà Khai Phá, đồng thời gây Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Vật Lý</span> cho mục tiêu lân cận kẻ đó bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[2][UltimateLevel - 1]}</span> Tấn Công của Nhà Khai Phá.
			</p>
			
			<div class="flex items-center gap-4 mb-2">
  				<!-- svelte-ignore a11y-label-has-associated-control -->
  				<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  				<input type="range" min="1" max="15" bind:value={UltimateLevel} class="w-48 accent-white/10" />
  				<span class="text-sm text-white/40">Lv{UltimateLevel}</span>
			</div>
</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
			<img
    		src="/images/skills/{character.id}/talent.png"
   			alt="Thiên phú"
    		class="h-20 w-20 rounded border border-white/10 object-cover"
  			/>
			<div class="flex-1">
  			<h3 class="text-lg font-bold mb-1">Thành Lũy Cầm Chân</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường hóa</span>
  			</p>
  			<p class="text-base">Sau mỗi lần 
				<span class="underline">Phá Vỡ Điểm Yếu</span> của mục tiêu địch, Tấn Công sẽ tăng 
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span> , hiệu ứng này tối đa cộng dồn 
				<span class="text-yellow-400 font-bold">2</span> tầng.
			</p>
			<div class="flex items-center gap-4 mb-2">
  				<!-- svelte-ignore a11y-label-has-associated-control -->
  				<label class="text-sm text-white/40">Cấp độ kỹ năng:</label>
  				<input type="range" min="1" max="15" bind:value={TalentLevel} class="w-48 accent-white/10" />
  				<span class="text-sm text-white/40">Lv{TalentLevel}</span>
			</div>
</div>
	</div>

	<div class="mb-4 border p-4 rounded-lg bg-black/20 flex gap-4 items-start">
			<img
    		src="/images/skills/{character.id}/technique.png"
   			alt="Bí kỹ"
    		class="h-20 w-20 rounded border border-white/10 object-cover"
  			/>
			<div class="flex-1">
  			<h3 class="text-lg font-bold mb-1">Đòn Đánh Bất Diệt</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hồi Phục</span>
  			<p class="text-base">Sau khi dùng Bí Kỹ sẽ hồi ngay HP cho toàn thể phe ta tương đương 
				<span class="text-yellow-400 font-bold">15%</span> Giới Hạn HP của mỗi người.
			</p>
		</div>
	</div>

	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Tuyệt Kỹ &gt Chiến Kỹ  &gt Thiên Phú &gt Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Tuyệt kỹ</p>
  			<p class="text-white/80 text-sm">Đừng nâng, để dành tài nguyên cho nhân vật khác.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến kỹ</p>
    		<p class="text-white/80 text-sm">Đừng nâng, để dành tài nguyên cho nhân vật khác.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên phú</p>
    		<p class="text-white/80 text-sm">Đừng nâng, để dành tài nguyên cho nhân vật khác.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn công thường</p>
    		<p class="text-white/80 text-sm">Đừng nâng, để dành tài nguyên cho nhân vật khác.</p>
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
			statDescriptions={[
    		'[CR]Crit Rate &nbsp;&nbsp;>= &nbsp;[CD]Crit Dmg',
    		'[ATK]Tấn Công &nbsp;&nbsp;> &nbsp;[SPD]Tốc Độ',
    		'[ATK]Tấn Công &nbsp;&nbsp;> &nbsp;[lightning]Tăng ST Lôi',
    		'[ATK]Tấn Công'
  			]}
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
    			sustain: ['aventurine','gallagher','female-preservation','welt']
  			}}
  			tooltips={{
				acheron: 'DPS chủ lực, cần đi cùng đồng đội có khả năng gắn <span class="font-semibold">Debuff</span> để sạc Stack cho Tuyệt Kỹ.',
				jiaoqiu: 'Gắn <span class="font-semibold">Debuff </span><span class="underline">Trọng Thương</span>, uptime gần 100%. Ngoài ra còn có thể tích stack cho Acheron ngoài lượt hành động.',
				'silver-wolf': '<p><span class="font-semibold text-yellow-300">Trước khi Buff: </span>Debuff đơn mục tiêu, tần suất gắn thấp.</p><p><span class="font-semibold text-yellow-300">Sau khi Buff: </span>Debuff đa mục tiêu, nạp nhanh không lo năng lượng. Có thêm E2 như vua mặc long bào, Đi ra đường ch.ó nhìn sợ không dám s.ủa. Trưa đua vài lệnh chiều xanh tím. Tối ra phố đi bộ các em gái thì tranh nhau xin chụp hình chung. Hội nyc thì đồng loạt đòi nối lại tình xưa. Bạn bè thì nhìn tôi cũng phải cúi đầu nể 10 phần. Về nhà thì gia đình tự hào, hàng xóm thì ganh tỵ vì biết tôi có Sói Đần E2 🐧</p>',
				cipher: 'Mặc dù không phải gắn Debuff gì ghê gớm nhưng Cipher có thể <span class="underline">Tích Lũy Sát Thương</span> mà Acheron gây ra và từ đó Cipher có thể hỗ trợ gây thêm Sát Thương cho đội hình.',
    			tribbie: '<span class="font-semibold">"Giản Dị Lãnh Địa"</span> Debuff <span class="underline">Tăng Sát Thương Phải Nhận</span> uptime gần 100%. Chưa kể còn Buff Xuyên Kháng cho phe ta và hỗ trợ Sát Thương từ Thiên Phú.',
				pela: '<span class="underline">Giảm Phòng Thủ</span> diện rộng, không uptime 100%, yêu cầu Nón <span class="font-semibold">Sự Quyết Tâm Như Giọt Mồ Hôi Lấp Lánh S4+</span>.',
    			sunday: 'Yêu cầu Acheron phải có <span class="text-red-600">E2</span> và build 135 tốc, Sunday nên build bằng tốc Acheron -1 để Speed Turning.',
				bronya: 'Yêu cầu Bronya <span class="text-red-600">E2+</span>, còn lại giống Sunday',
				guinaifen: 'Giống Jiaoqiu nhưng yếu hơn, không gắn ngoài lượt được.',
				'black-swan': 'Nếu có <span class="text-red-600">E1</span> thì dùng, còn lại thì không nên.',
				gallagher: 'Apply Debuff khá nhiều, bảo kê ổn, bào sức bền tốt. Nên có E2+ để chơi ổn định.',
				welt: 'Yêu cầu bắt buộc phải có <span class="text-red-600">E2</span> Welt và chỉ hữu dụng khi bạn biết mình đang làm gì (team 3 nô). Newbie không nên làm theo.',
				'female-trailblazer-preservation': 'Có Khiêu Khích là một điểm cộng khi dùng nón <span class="font-semibold">Xu Hướng Thị Trường Vũ Trụ S4+</span>. Còn nếu đi cùng Jiaoqiu thì vứt.',
				aventurine: 'Ưu tiên dùng Trấn <span class="font-semibold">Vận Mệnh Chưa Từng Cân Bằng</span>. Nếu không có thì dùng <span class="font-semibold">Xu Hướng Thị Trường Vũ Trụ S4+</span>, nếu có Jiaoqiu trong đội thì không nên dùng nón này mà nên dùng nón khác tăng nhiều DEF.',
				'female-trailblazer-preservation': 'Nên ưu tiên nón <span class="font-semibold">Xu Hướng Thị Trường Vũ Trụ S4+</span>, nếu có Jiaoqiu trong đội thì không nên dùng nón này mà nên dùng nón khác tăng nhiều DEF.'
  			}}
			notes={{
				amplifier: 'Các hư vô còn lại: <span class="font-semibold">thật luôn hả?</span>',
				sustain: 'Tất cả các bảo hộ còn lại nếu dùng nón <span class="font-semibold">Xu Hướng Thị Trường Vũ Trụ S4+</span>. Nhưng nếu có Jiaoqiu trong đội hình thì thôi, bỏ đi mà làm người.'
			}}
		/>
	</section>
	
	<section>
		<Title>TƯ BẢN</Title> 
		<div class="text-xl font-bold mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt &nbsp
				<span style="color: #FF5555">Jiaoqiu</span> &nbsp &gt &nbsp
				<span style="color: {character.elementColor}">E2</span> &nbsp &gt &nbsp 
				<span class="text-white/70">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid bg-black/20 border border-white/50 rounded-lg mt-3">
			<p class="text-lg mt-2 mb-1">
				<span class="font-bold text-white/80 pl-4">S1: </span>Cải thiện vận hành.
			</p>
			<p class="text-lg mt-2 mb-1">
				<span class="font-bold text-white/80 pl-4">Jiaoqiu: </span>Hỗ trợ tốt nhất cho Acheron ở thời điểm hiện tại.
			</p>
			<p class="text-lg mt-2 mb-1">
				<span class="font-bold text-white/80 pl-4">E2: </span>Điểm dừng tốt, tiền đâu mà đầu tư lắm. 
			</p>
		</div>
	</section>
</div>
