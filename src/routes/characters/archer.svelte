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
    id: 'archer',
    name: 'Archer',
    element: 'quantum',
    path: 'the-hunt',
	elementColor: '#8CA6E6'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%','60%','70%','80%','90%','100%','110%','120%','130%','140%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['180%','198%','216%','234%','252%','270%','292.5%','315%','337.5%','360%','378%','396%','414%','432%','450%'],
	['60%','64%','68%','72%','76%','80%','85%','90%','95%','100%','104%','108%','112%','116%','120%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
    ['600%','640%','680%','720%','760%','800%','850%','900%','950%','1000%','1040%','1080%','1120%','1160%','1200%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['100%','110%','120%','130%','140%','150%','162.5%','175%','187.5%','200%','210%','220%','230%','240%','250%']
  ]
  let TalentLevel = 1;

	const SPD = 105;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 75;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [158, 308], atk: [84, 164], def: [66, 128] },
		{ dp: 1, levels: [20, 30], hp: [372, 451], atk: [198, 240], def: [155, 188] },
		{ dp: 2, levels: [30, 40], hp: [514, 594], atk: [274, 316], def: [214, 247] },
		{ dp: 3, levels: [40, 50], hp: [657, 736], atk: [350, 392], def: [273, 306] },
		{ dp: 4, levels: [50, 60], hp: [799, 879], atk: [426, 468], def: [333, 366] },
		{ dp: 5, levels: [60, 70], hp: [942, 1021], atk: [502, 544], def: [392, 425] },
		{ dp: 6, levels: [70, 80], hp: [1085, 1164], atk: [578, 620], def: [452, 485] }
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
  		<h3 class="text-lg font-bold mb-1">Kanshou Và Bakuya</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> bằng
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Archer cho 1 kẻ địch chỉ định.
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
  		<h3 class="text-lg font-bold mb-1">Caladbolg II: Kiếm Xoắn Ốc Giả</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Đánh Đơn</span> |
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">2</span>
  		</p>
  		<p>Vào trạng thái Kết Nối Mạch. Gây Sát Thương
			<b style="color: {character.elementColor}">Lượng Tử</b> bằng
			<b class="text-yellow-400">{skillAttack[0][SkillLevel - 1]}</b>	Tấn Công của Archer cho 1 kẻ địch chỉ định. 
			Sau khi thi triển Chiến Kỹ ở trạng thái Kết Nối Mạch sẽ không kết thúc hiệp, và khiến sát thương Chiến Kỹ Archer gây ra tăng
			<b class="text-yellow-400">{skillAttack[1][SkillLevel - 1]}</b>, hiệu ứng này có thể cộng dồn 
            <b class="text-yellow-400">2</b> tầng, duy trì đến khi thoát trạng thái Kết Nối Mạch. Sau khi chủ động thi triển 
			<b class="text-yellow-400">5</b> lần Chiến Kỹ hoặc Điểm Chiến Kỹ không đủ để thi triển Chiến Kỹ lần nữa, sẽ thoát khỏi trạng thái Kết Nối Mạch. 
			Sau khi tất cả mục tiêu phe địch trong mỗi đợt bị tiêu diệt, sẽ thoát khỏi trạng thái Kết Nối Mạch.
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
  			<h3 class="text-lg font-bold mb-1">Vô Hạn Kiếm Chế</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Đơn</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">90</span><span class="text-amber-400 italic"> sức bền</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">220</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">220</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Gây Sát Thương
                <b style="color: {character.elementColor}">Lượng Tử</b> bằng
                <b class="text-yellow-400">{ultimateAttack[0][UltimateLevel - 1]}</b> Tấn Công của Archer cho 1 kẻ địch chỉ định, và nhận
				<b class="text-yellow-400">2</b> điểm Nạp Năng Lượng, tối đa có thể có
				<b class="text-yellow-400">4</b> điểm Nạp Năng Lượng.
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
  			<h3 class="text-lg font-bold mb-1">Tâm Nhãn (Thật)</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Đơn</span> |
                <span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
				<span class="text-amber-400 italic">Hồi năng lượng</span> <span style="color: {character.elementColor}">5</span> |
  			</p>
  			<p class="text-base">Sau khi đồng đội của Archer thi triển tấn công lên mục tiêu phe địch, Archer tiêu hao 1 điểm Nạp Năng Lượng, lập tức phát động
                <u>Đòn Đánh Theo Sau</u> lên mục tiêu chính, gây Sát Thương <b style="color: {character.elementColor}">Lượng Tử</b> bằng
                <b class="text-yellow-400">{talent[0][TalentLevel - 1]}</b> Tấn Công của Archer, đồng thời hồi 1 điểm Chiến Kỹ. Nếu mục tiêu bị tiêu diệt trước khi thi triển
				<u>Đòn Đánh Theo Sau</u> lần này, sẽ phát động <u>Đòn Đánh Theo Sau</u> lên 1 kẻ địch ngẫu nhiên.
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
  			<h3 class="text-lg font-bold mb-1">Thiên Lý Nhãn</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền</span> 
  			</p>
  			<p class="text-base">Lập tức tấn công kẻ địch, sau khi vào chiến đấu sẽ gây cho toàn phe địch Sát Thương
				<b style="color: {character.elementColor}">Lượng Tử</b> bằng <b class="text-yellow-400">200%</b> 
				Tấn Công của Archer, đồng thời nhận <b class="text-yellow-400">1</b> điểm Nạp Năng Lượng.
            </p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ &gt; Tuyệt Kỹ &gt; Thiên Phú &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Nguồn DMG chính, tất nhiên là phải nâng max đầu tiên rồi.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Bồi thêm DMG trong lúc dồn combo thì cũng nâng đi.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Cũng là bồi thêm DMG nhưng là ngoài lượt.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Không đủ điểm Chiến Kỹ thì dùng.</p>
  		</div>		
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Ma Thuật Chiếu Ảnh"
		description='Khi Archer trong trận, giới hạn Điểm Chiến Kỹ tăng thêm
                    <b class="text-yellow-400">2</b> điểm.'
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+4%",
      		  	label: "Tấn Công",
      		  	unlock: "A2"
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
		title="Người Bạn Của Chính Nghĩa"
		description='Khi Archer vào chiến đấu sẽ nhận 
                    <b class="text-yellow-400">1</b> điểm Nạp Năng Lượng.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/quantum.png",
    		  	value: "+4.8%",
    		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
      		  	unlock: "A4"
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
		title="Người Bảo Vệ"
		description='Sau khi phe ta nhận điểm Chiến Kỹ, nếu Điểm Chiến Kỹ lớn hơn hoặc bằng
		<b class="text-yellow-400">4</b>, thì Sát Thương Bạo Kích của Archer sẽ tăng
        <b class="text-yellow-400">120%</b>, duy trì <b class="text-yellow-400">1</b> hiệp.'
		unlock="A6"
		nodes={[
            {
				icon: "/images/icons-vestige/CR.png",
    		  	value: "+4%",
    		  	label: "Tỷ Lệ Bạo Kích",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/ATK.png",
      	  	  	value: "+8%",
      		  	label: "Tấn Công",
      		  	unlock: "LV75"
			},
            {
                icon: "/images/icons-vestige/quantum.png",
    		  	value: "+6.4%",
    		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
      		  	unlock: "LV80"
            }
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/quantum.png",
    		  	value: "+3.2%",
    		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
      		  	unlock: "LV1"
			},
            {
				icon: "/images/icons-vestige/CR.png",
    		  	value: "+2.7%",
    		  	label: "Tỷ Lệ Bạo Kích",
      		  	unlock: "A3"
			},
            {
                icon: "/images/icons-vestige/quantum.png",
    		  	value: "+4.8%",
    		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
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
  				name="Lý Tưởng Chưa Từng Chạm Đến"
  				elementColor={character.elementColor}
  				description='Sau khi thi triển <b class="text-yellow-400">3</b> lần Chiến Kỹ trong một hiệp, sẽ hồi
				<b class="text-yellow-400">2</b> Điểm Chiến Kỹ cho phe ta.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Hạnh Phúc Chưa Thành Hiện Thực"
  				elementColor={character.elementColor}
  				description='Khi thi triển Tuyệt Kỹ, khiến Kháng Lượng Tử của mục tiêu phe địch giảm
                <b class="text-yellow-400">20%</b>, đồng thời thêm Điểm Yếu Lượng Tử cho kẻ đó, duy trì
				<b class="text-yellow-400">2</b> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Đồng Minh Của Chính Nghĩa"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Một Đời Chưa Trọn Chữ Anh Hùng"
  				elementColor={character.elementColor}
  				description='Sát Thương Tuyệt Kỹ gây ra tăng <span class="text-yellow-400 font-semibold">150%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Người Bảo Vệ Vô Danh Lẻ Bóng"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Cuộc Hành Hương Vô Tận"
  				elementColor={character.elementColor}
  				description='Khi bắt đầu hiệp, sẽ hồi cho phe ta 1 điểm Chiến Kỹ. Số tầng giới hạn của hiệu ứng Tăng Sát Thương có thể cộng dồn mà Chiến Kỹ của bản thân cung cấp sẽ tăng
                <b class="text-yellow-400">1</b> tầng. Sát thương Chiến Kỹ gây ra sẽ bỏ qua <b class="text-yellow-400">20%</b> Phòng Thủ.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 = E2 = E6 &gt; E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Lý Tưởng Chưa Từng Chạm Đến</p>
  			<p class="text-white/80 text-sm">Cải thiện rất lớn cho vận hành.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Hạnh Phúc Chưa Thành Hiện Thực</p>
    		<p class="text-white/80 text-sm">Tăng lượng lớn Sát Thương đầu ra khi có thể kết hợp cùng các đồng đội giảm DEF khác.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Một Đời Chưa Trọn Chữ Anh Hùng</p>
    		<p class="text-white/80 text-sm">Như mô tả kỹ năng, tăng Sát Thương Tuyệt Kỹ.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Cuộc Hành Hương Vô Tận</p>
    		<p class="text-white/80 text-sm">= E1 + E2 + thêm 100% Sát Thương Chiến Kỹ.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['the-hell-where-ideals-burn','cruising-in-the-stellar-sea','see-you-at-the-end','subscribe-for-more','swordplay']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Archer có sẵn Crit DMG và Sát Thương gây ra, nên các nón có khả năng cung cấp nhiều ATK sẽ là các nón được ưu tiên.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: <span class="font-bold">
			Nón 5 sao F2P.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Nón 4 sao BattlePass ngon nếu tích tầng max được.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>: 
			Hữu dụng nếu biết cách sử dụng.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>: 
			Có thể dùng trong những trận chiến kéo dài.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['genius_of_brilliant_stars','scholar_lost_in_erudition','champion_of_streetwise_boxing']}
			mixSets={[[]]}
  			planarIds={['item_rutilant_arena','item_inert_salsotto','item_izumo_gensei_and_takama_divine_realm']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Thiên Tài Xuất Chúng</span>: 
			Bộ ngon nhất cho Archer, đặc biệt là khi kẹp cùng Sói Bạc nữa.</p>
			<p><span class="text-amber-300 font-semibold">Học Giả Lạc Lối Trong Biển Tri Thức</span>: 
			Tăng DMG Chiến Kỹ và Tuyệt Kỹ cũng ngon, nhưng thứ thật sự ngon là Tỷ Lệ Bạo của bộ này.</p>
            <p><span class="text-amber-300 font-semibold">Quyền Vương Đường Phố</span>:
            25% tấn công, chỉ số mà Archer cần rất nhiều.</p>
            
			`}
			planarAnalysis={`
			<p>Hiện tại thì game mới có 2 bộ này là Archer có thể dùng, nên là bạn có bộ này chỉ số đẹp hơn thì dùng.</p>
			<p><span class="text-amber-300 font-semibold">Izumo Hiện Thế Và Thần Quốc Cõi Trời</span>:
            Trường hợp đặc biệt khi đi cùng Bé 7.</p>
			`}
			statDescriptions={[[
    		'[CR]Crit Rate &nbsp;&nbsp;&gt;&nbsp; [CD]Crit Dmg &nbsp;&nbsp;&gt;&nbsp; [ATK]Tấn Công',
    		'[ATK]Tấn Công',
    		'[ATK]Tấn Công &nbsp;&nbsp;=&nbsp; [quantum]<span style="color: #8CA6E6">Tăng ST Lượng Tử</span>',
    		'[ATK]Tấn Công'
			]]}
			priorityStats={
			'Tỷ Lệ Bạo &ge; Tấn Công &gt; Sát Thương Bạo'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">3800+</span> &nbsp;<span class="text-white/70">(Đây là chỉ số quan trọng của Archer, nên hãy build càng cao càng tốt)</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">100%</span> &nbsp;<span class="text-white/70">(Tính toán sao cho cân bằng với buff của đồng minh trong trận chiến)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">150%+</span> &nbsp;<span class="text-white/70">(Acher có tự buff rất nhiều Crit Dmg và cũng rất nhiều từ sp rồi, nên hãy ưu tiên cho Crit Rate và ATK trước)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">BASE</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['archer'],
    			supportDps: ['cipher','silver-wolf','march-7th-the-hunt'],
    			amplifier: ['sparkle','female-remembrance','sunday','robin','ruan-mei','hanya','tingyun'],
    			sustain: ['gallagher','aventurine']
  			}}
  			tooltips={{
				dps: {
					archer: 'DPS tiêu hao nhiều điểm chiến kỹ nhất lịch sử, nên đồng minh phải có nhiệm vụ tạo điểm chiến kỹ nhiều nhất có thể.'
                },
                supportDps: {
					cipher: 'Debuff ổn, tích Dmg Archer gây ra được, quan trọng là tốc cao tạo điểm chiến kỹ.',
					'silver-wolf': 'Giống Cipher và có khả năng gắn điểm yếu Lượng Tử cho Archer quẩy.',
					'march-7th-the-hunt': 'Có thể dùng, trust me bro.'
                },
                amplifier: {
					sparkle: '"Trong tất cả các loại nước..."',
					'female-remembrance': 'Dương chiến kỹ khá tốt, và còn Sát Thương Chuẩn cho Archer nữa.',
					sunday: 'Bắt buộc phải có trấn, nếu không thì cook.',
					robin: 'Tăng rất nhiều ATK và Sát Thương Bạo.',
					'ruan-mei': 'Xuyên Kháng và dương chiến kỹ.',
					hanya: 'Tạo điểm chiến kỹ là dùng được.',
					tingyun: 'Vừa buff ATK, vừa hồi năng lượng, vừa có khả năng tạo điểm chiến kỹ.'
                },
                sustain: {
					gallagher: 'Siêu dương điểm chiến kỹ.',
					aventurine: 'Giống Gallagher.',
                }
			}}
			notes={{
				sustain: 'Cứ dương chiến kỹ là quất.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=' 
				Dễ chơi.
				Kỹ năng dễ hiểu.
				Sát Thương to.
				Đồng đội rẻ.
				Free.
			'
			cons='
				Tiêu tốn nhiều điểm chiến kỹ quá.
				Nhân vật Collab, khả năng một đi không trở lại.
			'
		/>
		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">Sparkle</span> &nbsp &gt; &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400">Sparkel</span>: Như tôi đã nói: "Trong tất cả các loại nước...", bạn không có thì chúng ta không cùng đẳng cấp.
			</p>	
		</div>

	</section>
</div>
