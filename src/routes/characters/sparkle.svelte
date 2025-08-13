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
    id: 'sparkle',
    name: 'Sparkle',
    element: 'quantum',
    path: 'harmony',
	elementColor: '#8CA6E6'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%', '60%', '70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['12%','13.2%','14.4%','15.6%','16.8%','18%','19.5%','21%','22.5%','24%','25.2%','26.4%','27.6%','28.8%','30%'],
	['27%','28.8%','30.6%','32.4%','34.2%','36%','38.25%','40.5%','42.75%','45%','46.8%','48.6%','50.4%','52.2%','54%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
    ['6%','6.4%','6.8%','7.2%','7.6%','8%','8.5%','9%','9.5%','10%','10.4%','10.8%','11.2%','11.6%','12%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['3%','3.3%','3.6%','3.9%','4.2%','4.5%','4.88%','5.25%','5.63%','6%','6.3%','6.6%','6.9%','7.2%','7.5%']
  ]
  let TalentLevel = 1;

	const SPD = 101;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [190, 370], atk: [71, 139], def: [66, 128] },
		{ dp: 1, levels: [20, 30], hp: [446, 541], atk: [167, 203], def: [155, 188] },
		{ dp: 2, levels: [30, 40], hp: [617, 712], atk: [231, 267], def: [214, 247] },
		{ dp: 3, levels: [40, 50], hp: [788, 883], atk: [295, 331], def: [273, 306] },
		{ dp: 4, levels: [50, 60], hp: [959, 1054], atk: [359, 395], def: [333, 366] },
		{ dp: 5, levels: [60, 70], hp: [1130, 1226], atk: [424, 459], def: [392, 425] },
		{ dp: 6, levels: [70, 80], hp: [1302, 1397], atk: [488, 523], def: [452, 485] }
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
			Một trong các thành viên của "Kẻ Ngốc Đeo Mặt Nạ", khó đoán, bất chấp thủ đoạn. Một bậc thầy sân khấu nguy hiểm, nghiện diễn xuất, lúc nào cũng đeo cả ngàn chiếc mặt nạ, có thể hóa thân thành hàng vạn diện mạo khác nhau. Của cải, địa vị, quyền lực... đối với Sparkle đều không quan trọng. Điều duy nhất khiến cô hành động, chỉ có mỗi "niềm vui".
  		</p>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">
                Một trong các thành viên của "Kẻ Ngốc Đeo Mặt Nạ", khó đoán, bất chấp thủ đoạn. Một bậc thầy sân khấu nguy hiểm, nghiện diễn xuất, lúc nào cũng đeo cả ngàn chiếc mặt nạ, có thể hóa thân thành hàng vạn diện mạo khác nhau. Của cải, địa vị, quyền lực... đối với Sparkle đều không quan trọng. Điều duy nhất khiến cô hành động, chỉ có mỗi "niềm vui".
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
  		<h3 class="text-lg font-bold mb-1">Hài Độc Thoại</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<b style="color: {character.elementColor}">Lượng Tử</b> cho 1 kẻ địch chỉ định tương đương
		<b class="text-yellow-400">{normalAttack[0][NormalLevel - 1]}</b> Tấn Công của Sparkle.
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
  		<h3 class="text-lg font-bold mb-1">Cá Nhỏ Cõi Mơ</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Hỗ Trợ</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Tăng Sát Thương Bạo Kích của 1 đồng đội chỉ định, mức tăng bằng
			<b class="text-yellow-400">{skillAttack[0][SkillLevel - 1]}</b> Sát Thương Bạo Kích của Sparkle 
			+<b class="text-yellow-400">{skillAttack[1][SkillLevel - 1]}</b>, duy trì <b class="text-yellow-400">1</b> hiệp,
			đồng thời khiến mục tiêu này ưu tiên hành động <b class="text-yellow-400">50%</b>.
		</p>
		<p>Khi Sparkle thi triển kỹ năng này lên bản thân, sẽ không thể kích hoạt hiệu ứng Ưu Tiên Hành Động.</p>
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
  			<h3 class="text-lg font-bold mb-1">Cô Gái Nghìn Mặt</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hỗ Trợ</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">110</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">110</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p>Hồi phục <b class="text-yellow-400">4</b> Điểm Chiến Kỹ cho phe ta, đồng thời khiến toàn thể phe ta nhận được Câu Đố Kỳ Dị.
				Khi mục tiêu phe ta có Câu Đố Kỳ Dị kích hoạt hiệu ứng Tăng Sát Thương từ Thiên Phú của Sparkle, mỗi tầng sẽ tăng thêm
				<b class="text-yellow-400">{ultimateAttack[0][UltimateLevel - 1]}</b>, duy trì <b class="text-yellow-400">2</b> hiệp.
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
  			<h3 class="text-lg font-bold mb-1">Ngụy Biện Cá Trích Đỏ</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hỗ Trợ</span>
  			</p>
  			<p class="text-base">Khi Sparkle trong trận, giới hạn Điểm Chiến Kỹ sẽ tăng thêm
				<b class="text-yellow-400">2</b> điểm. Mục tiêu phe ta mỗi khi tiêu hao 1 Điểm Chiến Kỹ, sẽ tăng
                <b class="text-yellow-400">{talent[0][TalentLevel - 1]}</b> sát thương do toàn bộ phe ta gây ra, hiệu ứng này duy trì 
				<b class="text-yellow-400">2</b> hiệp, tối đa có thể cộng dồn <b class="text-yellow-400">3</b> tầng.
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
  			<h3 class="text-lg font-bold mb-1">Kẻ Kể Chuyện Không Đáng Tin</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hỗ Trợ</span>
  			</p>
  			<p>Sau khi dùng Bí Kỹ, toàn thể phe ta sẽ vào trạng thái Lạc Lối trong <span class="text-yellow-400 font-semibold">20</span>
				giây liên tục. Ở trạng thái Lạc Lối sẽ không bị kẻ địch phát hiện. Khi vào chiến đấu trong thời gian Lạc Lối sẽ hồi
				<b class="text-yellow-400">3</b> Điểm Chiến Kỹ cho phe ta.
            </p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ = Tuyệt Kỹ = Thiên Phú &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Tăng Sát Thương Bạo cho nhân vật được Buff.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Hồi Điểm Chiến Kỹ và tăng hiệu quả Sát Thương của Thiên Phú.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Tăng Sát Thương đồng đội gây ra.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Sparkle không đánh thường bao giờ, trừ khi bạn bị skill issue.</p>
  		</div>		
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Ghi Dấu Năm Tháng"
		description='Khi thi triển Tấn Công Thường sẽ hồi thêm
					<b class="text-yellow-400">10</b> Năng Lượng.'
		unlock="A2"
		nodes={[
			{
      		  	icon: "/images/icons-vestige/CD.png",
    		  	value: "+5.3%",
    		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A2"
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
		title="Hoa Nhân Tạo"
		description='Hiệu ứng Tăng Sát Thương Bạo Kích cung cấp bởi Chiến Kỹ sẽ kéo dài đến khi bắt đầu hiệp kế tiếp của mục tiêu.'
		unlock="A4"
		nodes={[
			{
				icon: "/images/icons-vestige/HP.png",
    		  	value: "+6%",
    		  	label: "HP",
      		  	unlock: "A4"
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
		title="Dạ Khúc Tưởng Nhớ"
		description='Tấn Công của toàn phe ta tăng <b class="text-yellow-400">15%</b>. Khi trong đội phe ta có 1/2/3 nhân vật thuộc tính
		<b style="color: #8CA6E6">Lượng Tử</b>, tấn công của nhân vật có thuộc tính <b style="color: #8CA6E6">Lượng Tử</b> phe ta tăng thêm
		<b class="text-yellow-400">5%</b>/<b class="text-yellow-400">15%</b>/<b class="text-yellow-400">30%</b>.'
		unlock="A6"
		nodes={[
            {
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+6%",
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/CD.png",
    		  	value: "+10.7%",
    		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "LV75"
			},
            {
                icon: "/images/icons-vestige/HP.png",
    		  	value: "+8%",
    		  	label: "HP",
      		  	unlock: "LV80"
            }
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/HP.png",
    		  	value: "+4%",
    		  	label: "HP",
      		  	unlock: "LV1"
			},
            {
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+4%",
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "A3"
			},
            {
                icon: "/images/icons-vestige/HP.png",
    		  	value: "+6%",
    		  	label: "HP",
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
  				name="Dẹp Bỏ Hoài Nghi"
  				elementColor={character.elementColor}
  				description='Thời gian duy trì Câu Đố Kỳ Dị thi triển bởi Tuyệt Kỹ tăng thêm 1 hiệp, 
				mục tiêu phe ta sở hữu Câu Đố Kỳ Dị sẽ tăng	<b class="text-yellow-400">40%</b> Tấn Công.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Hư Cấu Vô Cớ"
  				elementColor={character.elementColor}
  				description='Mỗi tầng hiệu ứng của Thiên Phú khiến mục tiêu phe ta khi gây sát thương sẽ bỏ qua
                <b class="text-yellow-400">8%</b> Phòng Thủ của mục tiêu.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Giấc Mộng Viển Vông"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Cuộc Sống Là Canh Bạc"
  				elementColor={character.elementColor}
  				description='Tuyệt Kỹ có thể hồi phục thêm 1 Điểm Chiến Kỹ, hiệu ứng tăng giới hạn Điểm Chiến Kỹ của Thiên Phú tăng thêm 1 điểm.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Chân Tướng Hai Mặt"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Lời Giải Đáp Đa Tầng"
  				elementColor={character.elementColor}
  				description='Tăng thêm hiệu ứng Tăng Sát Thương Bạo Kích của Chiến Kỹ, mức tăng bằng <b class="text-yellow-400">30%</b> 
				Sát Thương Bạo Kích của Sparkle, và khi Sparkle thi triển Chiến Kỹ, 
				sẽ khiến hiệu ứng Tăng Sát Thương Bạo Kích của Chiến Kỹ có hiệu lực với đồng đội sở hữu Câu Đố Kỳ Dị, 
				khi Sparkle thi triển Tuyệt Kỹ, nếu trong phe ta có mục tiêu mang hiệu ứng Tăng Sát Thương Bạo Kích của Chiến Kỹ, 
				sẽ khiến hiệu ứng này khuếch tán đến đồng đội đang có Câu Đố Kỳ Dị.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E2 &ge; E4 &gt; E6 &gt; E1</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Dẹp Bỏ Hoài Nghi</p>
  			<p class="text-white/80 text-sm">Chỉ có tác dụng với những DPS chơi theo ATK, và chỉ số như trên là quá thấp so với một Tinh Hồn.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Hư Cấu Vô Cớ</p>
    		<p class="text-white/80 text-sm">Bỏ qua DEF ngon mà.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Cuộc Sống Là Canh Bạc</p>
    		<p class="text-white/80 text-sm">Nhiều Điểm Chiến Kỹ hơn.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Lời Giải Đáp Đa Tầng</p>
    		<p class="text-white/80 text-sm">Có thể chơi nhiều DPS trong đội.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['earthly-escapade','a-grounded-ascent','but-the-battle-isnt-over','dance-dance-dance','planetary-rendezvous','carve-the-moon-weave-the-clouds','dreamville-adventure']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Tốt, nhưng không phải tốt nhất, có thể skip.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>:
			Dùng được.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Giống cái trên.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>: 
			Đây mới là trấn thật 🐧.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>: 
			Chỉ dùng khi đi cùng DPS Lượng Tử.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[5]}</strong>: 
			Hiệu ứng random nhưng vẫn ngon.
			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[6]}</strong>: 
			Hơi tốn não để dùng.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['sacerdos_relived_ordeal','eagle_of_twilight_line','messenger_traversing_hackerspace']}
			mixSets={[['sacerdos_relived_ordeal','messenger_traversing_hackerspace']]}
  			planarIds={['item_broken_keel','item_lushaka_the_sunken_seas','item_penacony_land_of_the_dreams','item_sprightly_vonwacq']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Lại Một Hành Trình Gian Khổ Của Linh Mục</span>: 
			Bộ tốt nhất cho Sparkle ở thời điểm hiện tại.</p>
			<p><span class="text-amber-300 font-semibold">Chim Ưng Ranh Giới Ngày Đêm</span>: 
			Có thể dùng nếu muốn thử.</p>
			<p><span class="text-amber-300 font-semibold">Tín Sứ Du Ngoạn Không Gian Hacker</span>: 
			Hàng kém hơn bộ trên.</p>
			<p><p><span class="text-amber-300 font-semibold">MIX 2-2 Tốc</span>: 
			Build cho Sparkle tốc cao nhất có thể đề bù lại khả năng kéo hơi kém của cô ấy.</p>            
			`}
			planarAnalysis={`
			<span class="text-amber-300 font-semibold">Bộ Khung Bị Gãy</span>:
			Tăng chút Crit Dmg cho toàn đội và chút Kháng hiệu ứng cho cô nàng.</p>
			<span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>:
			Tăng ATK cho DPS và một chút Hiệu quả hồi năng lượng cũng ok.</p>
            <span class="text-amber-300 font-semibold">Penacony, Vùng Đất Của Những Giấc Mơ</span>:
			Có thể dùng nếu DPS có cùng Nguyên Tố với người mặc.</p>
            <span class="text-amber-300 font-semibold">Vonwacq Hoạt Bát</span>:
			Dùng ngon nếu bạn có thể build Tốc đẹp.</p>
			`}
			statDescriptions={[[
    		'[CD]Crit Dmg',
    		'[SPD]Tốc Độ &nbsp;&nbsp;&gt;&nbsp; [HP]HP &nbsp;&nbsp;=&nbsp; [DEF]Phòng Thủ',
    		'[HP]HP &nbsp;&nbsp;=&nbsp; [DEF]Phòng Thủ',
    		'[ERR]Hiệu Suất Hồi Năng Lượng'
			]]}
			priorityStats={
			'Tốc Độ &gt; Sát Thương Bạo &gt; Kháng Hiệu Ứng = HP = Phòng Thủ'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">4000+</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">200%+</span> &nbsp;<span class="text-white/70">(Build được càng cao càng tốt)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">160+</span> &nbsp;<span class="text-white/70">(Vì kéo chỉ 50% hơi ngu nên build tốc càng cao càng tốt)</span></p>
			<p><span class="text-white/70">Kháng Hiệu Ứng:</span>&nbsp; <span class="font-bold">30+</span> &nbsp;<span class="text-white/70">(Thêm tí cho đỡ bị khống chế)</span></p>
			<p><span class="text-white/70">Hiệu Suất Hồi Năng Lượng:</span>&nbsp; <span class="font-bold">119.44% <span class="text-white/50">hoặc</span> 124.44%</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['archer','seele','dan-heng-imbibitor-lunae',],
    			supportDps: [],
    			amplifier: ['sparkle'],
    			sustain: ['fu-xuan']
  			}}
  			tooltips={{
				dps: {
					archer: 'Anh daden để đưa Sparkle ra khỏi hang 🐧.',
					seele: 'Dùng được là được.',
					'dan-heng-imbibitor-lunae': 'Cũng gọi là dùng được.',
				},
                supportDps: {
                },
                amplifier: {
					sparkle: 'Siêu nhiều nước à nhầm Điểm Chiến Kỹ, nhưng vì chỉ kéo 50% nên ai cũng xa lánh cô.',
                },
                sustain: {
					'fu-xuan': 'Fuxuan có thể hỗ trợ Sparkle kích hoạt Vết Tích nên mới cho vào.'
                }
			}}
			notes={{
                dps: 'Bất cứ nhân vật nào cần tiêu hao nhiều Điểm Chiến Kỹ đều có thể đi cùng Sparkle được.',
				supportDps: 'Cho mấy nhân vật hỗ trợ cho DPS đi cùng là được, cũng không ảnh hưởng đến khả năng Buff của Sparkle cho lắm.',
				sustain: 'Nhân vật nào chả được.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=' 
				Rất nhiều Điểm Chiến Kỹ.
				Kéo DPS "cụt chân" khá tốt.
				"Trong tất cả các loại nước...."
			'
			cons='
				Chưa nhiều đội hình cần đến cô nàng.
				Dev cho quả kéo 50% hơi nhiều vấn đề.
				Đầu tiên là không thể Speed Turning.
				Thứ 2 là ngày đầu tuần.
				Thứ 3 là tưởng dương nhiều điểm chiến kỹ nhưng thực ra chỉ dương 1 điểm mà thôi.
			'
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">Archer</span> &nbsp &gt; &nbsp 
				<span class="text-white/70 text-2xl">(Skip)</span> 
				
			</span>
		<div class="grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				Có Archer đã rồi hãng rước cô nàng về, sau đó thích làm gì thì làm.
			</p>
		</div>

	</section>
</div>
