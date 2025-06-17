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
    id: 'hyacine',
    name: 'Hyacine',
    element: 'wind',
    path: 'remembrance',
	elementColor: '#1FE7A5'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['4%','4.5%','5%','5.5%','6%','6.4%','6.8%','7.2%','7.6%','8%','8.4%','8.8%','9.2%','9.6%','10%'],
    ['40','64','82','100','112','124','133','142','151','160','169','178','187','196','205'],
    ['5%','5.63%','6.25%','6.88%','7.5%','8%','8.5%','9%','9.5%','10%','10.5%','11%','11.5%','12%','12,5%'],
    ['50','80','103','125','140','155','166','178','189','200','211','223','234','245','256']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['5%','5.63%','6.25%','6.88%','7.5%','8%','8.5%','9%','9.5%','10%','10.5%','11%','11.5%','12%','12,5%'],
    ['50','80','103','125','140','155','166','178','189','200','211','223','234','245','256'],
    ['6%','6.75%','7.5%','8.25%','9%','9.6%','10.2%','10.8%','11.4%','12%','12.6%','13.2%','13.8%','14.4%','15%'],
    ['60','96','123','150','168','186','200','213','227','240','254','267','281','294','308'],
    ['15%','16.5%','18%','19.5%','21%','22.5%','24.38%','26.25%','28.13%','30%','31.5%','33%','34.5%','36%','37.5%'],
    ['150','240','308','375','420','465','499','533','566','600','634','668','701','735','769']
  ];
  let UltimateLevel = 1;

  const talent = [
    ['40%','44%','48%','52%','56%','60%','65%','70%','75%','80%','84%','88%','92%','96%','100%']
  ]
  let TalentLevel = 1;

  const skillPet = [
	['10%','12%','14%','16%','18%','20%','22%','24%','26%','28%']
  ]
  let SkillPetLevel = 1;

  const talentPet = [
	['1%','1.2%','1.4%','1.6%','1.8%','2%','2.2%','2.4%','2.6%','2.8%'],
    ['10%','12%','14%','16%','18%','20%','22%','24%','26%','28%']
  ]
  let talentPetLevel =1;

	const SPD = 110;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [148, 288], atk: [52, 102], def: [85, 167] },
		{ dp: 1, levels: [20, 30], hp: [347, 421], atk: [124, 150], def: [201, 244] },
		{ dp: 2, levels: [30, 40], hp: [418, 555], atk: [171, 198], def: [278, 321] },
		{ dp: 3, levels: [40, 50], hp: [614, 688], atk: [219, 245], def: [356, 398] },
		{ dp: 4, levels: [50, 60], hp: [747, 821], atk: [266, 293], def: [433, 476] },
		{ dp: 5, levels: [60, 70], hp: [880, 954], atk: [314, 340], def: [510, 553] },
		{ dp: 6, levels: [70, 80], hp: [1013, 1087], atk: [361, 388], def: [587, 630] }
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
            Thành bang giữa những tầng mây tan rã theo năm tháng, Đình Viện Hoàng Hôn một lần nữa mở rộng cánh cửa, mang đến ánh sáng le lói cho Đêm Vĩnh Hằng. Thầy Thuốc Hyacinthia, Hậu Duệ Chrysos canh giữ Ngọn Lửa "Bầu Trời". Kế thừa ý chí của tổ tiên, vá lại bình minh và hoàng hôn đã nứt vỡ. ...Mong ánh cầu vồng rọi xuống, xóa tan hận thù, đưa bình minh trở về với mặt đất.
        </p>
		<div class="hidden md:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0">
    		<p style="text-shadow: 1px 1px 1px black">Thành bang giữa những tầng mây tan rã theo năm tháng, Đình Viện Hoàng Hôn một lần nữa mở rộng cánh cửa, mang đến ánh sáng le lói cho Đêm Vĩnh Hằng. Thầy Thuốc Hyacinthia, Hậu Duệ Chrysos canh giữ Ngọn Lửa "Bầu Trời". Kế thừa ý chí của tổ tiên, vá lại bình minh và hoàng hôn đã nứt vỡ. ...Mong ánh cầu vồng rọi xuống, xóa tan hận thù, đưa bình minh trở về với mặt đất.</p>
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
  		<h3 class="text-lg font-bold mb-1">Khi Gió Nhẹ Hôn Mây Trời</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Phong</span> cho 1 kẻ địch chỉ định bằng 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Giới Hạn HP của Hyacine.
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
  		<h3 class="text-lg font-bold mb-1">Tình Yêu Khi Cầu Vồng Lan Tỏa</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Hồi Phục</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p class="text-base">
            <span class="underline">Triệu hồi Linh Hồn Ký Ức</span> Nhóc Ica, hồi phục cho toàn thể mục tiêu phe ta ngoại trừ Nhóc Ica lượng HP bằng
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Giới Hạn HP của Hyacine 
            +<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span>. Hồi phục cho Nhóc Ica lượng HP bằng 
            <span class="text-yellow-400 font-semibold">{skillAttack[2][SkillLevel - 1]}</span> Giới Hạn HP của Hyacine 
            +<span class="text-yellow-400 font-semibold">{skillAttack[3][SkillLevel - 1]}</span>.
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
  			<h3 class="text-lg font-bold mb-1">Chúng Ta Bay Vào Hoàng Hôn</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hỗ Trợ</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">140</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">140</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
  			<p class="text-base"><span class="underline">Triệu hồi Linh Hồn Ký Ức</span> 
				Nhóc Ica, hồi phục cho toàn bộ mục tiêu phe ta ngoại trừ Nhóc Ica lượng HP bằng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> Giới Hạn HP của Hyacine 
                +<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span>, hồi phục cho Nhóc Ica lượng HP bằng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[2][UltimateLevel - 1]}</span> Giới Hạn HP của Hyacine 
                +<span class="text-yellow-400 font-semibold">{ultimateAttack[3][UltimateLevel - 1]}</span>. Hyacine vào trạng thái "Sau Cơn Mưa Trời Lại Sáng", duy trì 
                <span class="text-yellow-400 font-semibold">3</span> hiệp, khi hiệp của Hyacine bắt đầu, số hiệp duy trì sẽ trừ 1. 
                Khi trong trạng thái "Sau Cơn Mưa Trời Lại Sáng", Giới Hạn HP của toàn bộ mục tiêu phe ta tăng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[4][UltimateLevel - 1]}</span> +
                <span class="text-yellow-400 font-semibold">{ultimateAttack[5][UltimateLevel - 1]}</span> Điểm.
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
  			<h3 class="text-lg font-bold mb-1">Ánh Bình Minh Chữa Lành Thế Gian</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span> | 
				<span class="text-amber-400 italic">Hồi năng lượng</span> 
				<span style="color: {character.elementColor}">10</span>
  			</p>
  			<p class="text-base">Linh Hồn Ký Ức Nhóc Ica ban đầu có Giới Hạn HP bằng
				<span class="text-yellow-400 font-semibold">50%</span>
				Giới Hạn HP của Hyacine. Khi Hyacine hoặc Nhóc Ica cung cấp trị liệu, sát thương Nhóc Ica gây ra sẽ tăng
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>, duy trì 2 hiệp, tối đa cộng dồn 3 tầng.
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
  			<h3 class="text-lg font-bold mb-1">Thời Tiết Thật Đẹp, Vạn Vật Thật Đáng Yêu!</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Hồi Phục </span>
  			</p>
  			<p class="text-base">Khi bắt đầu trận kế tiếp, sẽ hồi cho toàn phe ta lượng HP bằng
				<span class="text-yellow-400 font-semibold">30%</span> Giới Hạn HP của Hyacine 
                +<span class="text-yellow-400 font-semibold">600</span> và tăng
                <span class="text-yellow-400 font-semibold">20%</span> Giới Hạn HP, duy trì 
				<span class="text-yellow-400 font-semibold">2</span> hiệp.
			</p>
		</div>
	</div>
	<section>
		<TielePet 
			text="Nhọc Ica" 
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
				<h3 class="text-lg font-bold mb-1">Mây Đen Hãy Tan Biến!</h3>
				<p class="text-sm mb-1">
		    		<span class="text-amber-400 italic">Đánh Lan</span>
				</p>
			<p class="text-base">Gây cho toàn phe địch Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Phong</span> bằng
				<span class="text-yellow-400 font-semibold">{skillPet[0][SkillPetLevel - 1]}</span> lượng trị liệu Hyacine và Nhóc Ica tích lũy trong trận này. Đồng thời xóa
				<span class="text-yellow-400 font-semibold">50%</span> lượng trị liệu tích lũy.
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
				<h3 class="text-lg font-bold mb-1">Bàn Tay Nắm Lấy Trời Xanh</h3>
				<p class="text-sm mb-1 text-amber-400 italic">Hồi Phục</p>
				<p class="text-base">Tốc độ của Nhóc Ica duy trì bằng 0, miễn
					<span class="underline">Hiệu Ứng Xấu</span>, đồng thời sẽ không xuất hiện trong thứ tự hành động.
                </p>
                <p>
                    Nếu mục tiêu phe ta ngoại trừ Nhóc Ica bị giảm HP, thì khi bắt đầu hiệp của mục tiêu bất kỳ hoặc sau khi hành động, Nhóc Ica sẽ tiêu hao HP bằng 
                    <span class="text-yellow-400 font-semibold">4%</span> Giới Hạn HP của bản thân, và giúp mục tiêu bị giảm HP của phe ta hồi HP bằng 
                    <span class="text-yellow-400 font-semibold">{talentPet[0][talentPetLevel - 1]}</span> Giới Hạn HP của Hyacine 
                    +<span class="text-yellow-400 font-semibold">{talentPet[1][talentPetLevel - 1]}</span>.
				</p>
                <p>
                    Khi Hyacine trong trạng thái "Sau Cơn Mưa Trời Lại Sáng", sau khi Hyacine thi triển kỹ năng, Nhóc Ica sẽ nhận ngay 1 
                    <span class="underlien">hiệp tăng thêm</span> và tự động thi triển "Mây Đen Hãy Tan Biến!", đồng thời khi Nhóc Ica kích hoạt hiệu ứng trị liệu của Thiên Phú sẽ hồi thêm cho toàn thể mục tiêu phe ta lượng HP bằng 
                    <span class="text-yellow-400 font-semibold">{talentPet[0][talentPetLevel - 1]}</span> Giới Hạn HP của Hyacine 
                    +<span class="text-yellow-400 font-semibold">{talentPet[1][talentPetLevel - 1]}</span>. Sau khi Nhóc Ica thi triển kỹ năng, sẽ khiến số hiệp duy trì của tất cả 
                    <span class="underlien">hiệu ứng duy trì</span> của bản thân giảm 1.
                </p>


				<h3 class="text-lg font-bold mb-1 mt-4">「Dang Cánh, Hướng Về Mặt Trời」</h3>
				<p class="text-sm mb-1 text-amber-400 italic">Cường Hóa</p>
				<p class="text-base">Khi được triệu hồi, hồi phục
                    <span class="text-yellow-400 font-semibold">15</span> Năng Lượng cho Hyacine, lần đầu triệu hồi, sẽ hồi phục thêm
                    <span class="text-yellow-400 font-semibold">30</span> Năng Lượng.
				</p>

				<h3 class="text-lg font-bold mb-1 mt-4">「Rơi Xuống Rồi Bay Lên」</h3>
				<p class="text-sm mb-1 text-amber-400 italic">Cường Hóa</p>
				<p class="text-base">Khi biến mất, sẽ khiến Hyacine Ưu Tiên Hành Động
					<span class="text-yellow-400 font-semibold">30%</span>.
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
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">
			Tuyệt Kỹ &gt; Chiến Kỹ = Thiên Phú (Linh Hồn Ký Ức) &gt Thiên Phú = Chiến Kỹ (Linh Hồn Ký Ức)  &gt; Tấn Công Thường
		</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
  			<p class="text-white/80 text-sm">Ngoại trừ "Tấn Công Thường" ra thì còn lại cứ nâng hết đi, thứ tự này chỉ tập trung vào khả năng 
				<span class="font-semibold">Hồi Phục</span> thôi, sau này nâng hết thì thành <span class="font-semibold">DPS</span> thôi mà.</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Mây Đen Mỉm Cười"
		description="ỷ Lệ Bạo Kích của Hyacine và Nhóc Ica tăng
					<span class='text-yellow-400 font-semibold'>100%</span>, khi trị liệu cho mục tiêu phe ta có HP hiện tại nhỏ hơn hoặc bằng
					<span class='text-yellow-400 font-semibold'>50%</span> Giới Hạn HP của bản thân, lượng trị liệu của Hyacine và Nhóc Ica tăng
                    <span class='text-yellow-400 font-semibold'>25%</span>."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/HP.png",
      	  	  	value: "+4%",
      		  	label: "HP",
      		  	unlock: "A3"
    		},
    		{
    		  	icon: "/images/icons-vestige/SPD.png",
    		  	value: "+3",
    		  	label: "Tốc Độ",
    		  	unlock: "A4"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Mưa Dông Dịu Dàng"
		description='Kháng Hiệu Ứng của Hyacine tăng
		<span class="text-yellow-400 font-semibold">50%</span>. Khi thi triển Chiến Kỹ và Tuyệt Kỹ sẽ giải trừ
        <span class="text-yellow-400 font-semibold">1</span>
        <span class="underline">Hiệu Ứng Xấu</span> của toàn bộ mục tiêu phe ta.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+6%",
      		  	label: "Kháng Hiệu Ứng",
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
		title="Bão Tố Dừng Lại"
		description='Khi Tốc Độ của Hyacine lớn hơn
		<span class="text-yellow-400 font-semibold">200</span>, Giới Hạn HP của Hyacine và Nhóc Ica sẽ tăng
		<span class="text-yellow-400 font-semibold">20%</span>, sau đó cứ mỗi 
        <span class="text-yellow-400 font-semibold">1</span> điểm Tốc Độ vượt quá, Lượng Trị Liệu Hyacine và Nhóc Ica cung cấp sẽ tăng
        <span class="text-yellow-400 font-semibold">1%</span>, tối đa tính
        <span class="text-yellow-400 font-semibold">200</span> điểm Tốc Độ vượt quá.'
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
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "LV75"
			},
			{
				icon: "/images/icons-vestige/SPD.png",
    		  	value: "+4",
    		  	label: "Tốc Độ",
      		  	unlock: "LV80"
			}
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/SPD.png",
    		  	value: "+2",
    		  	label: "Tốc Độ",
      		  	unlock: "LV1"
			},
			{
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+4%",
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "A2"
			},
			{
				icon: "/images/icons-vestige/SPD.png",
    		  	value: "+2",
    		  	label: "Tốc Độ",
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
  				name="Bảo Vệ Ngọn Nến Trong Đêm Tối"
  				elementColor={character.elementColor}
  				description='Khi Hyacine ở trạng thái Sau Cơn Mưa Trời Lại Sáng, Giới Hạn HP của toàn bộ mục tiêu phe ta tăng
				<span class="text-yellow-400 font-semibold">50%</span>, và sau khi thi triển tấn công sẽ hồi ngay HP bằng
				<span class="text-yellow-400 font-semibold">8%</span> Giới Hạn HP của Hyacine.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Mời Đến Đình Viện Ngồi Chơi"
  				elementColor={character.elementColor}
  				description='Khi HP của mục tiêu phe ta giảm, Tốc Độ sẽ tăng 
				<span class="text-yellow-400 font-semibold">30%</span>, duy trì
				<span class="text-yellow-400 font-semibold">2</span> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Xuất Phát! Hướng Về Mặt Trời"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không quá cấp 15; 
				Cấp Tấn Công Thường +1, tối đa không quá cấp 10; 
				Cấp Kỹ Năng Linh Hồn Ký Ức +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Tặng Bạn Hổ Phách Hoàng Hôn"
  				elementColor={character.elementColor}
  				description='Vết Tích Bão Tố Dừng Lại được cường hóa, mỗi
				<span class="text-yellow-400 font-semibold">1</span> điểm Tốc Độ vượt quá, Sát Thương Bạo Kích của Hyacine và Nhóc Ica sẽ tăng thêm
                <span class="text-yellow-400 font-semibold">2%</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Ráng Chiều Nhuộm Đỏ Biển Sâu"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không quá cấp 15; 
				Cấp Thiên Phú +2, tối đa không quá cấp 15; 
				Cấp Thiên Phú Linh Hồn Ký Ức +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Bầu Trời... Đáp Lời Nguyện Cầu"
  				elementColor={character.elementColor}
  				description='Khi Nhóc Ica thi triển Kỹ Năng Linh Hồn Ký Ức, lượng điểm trị liệu tích lũy xóa bỏ sẽ sửa thành	
                <span class="text-yellow-400 font-semibold">12%</span>. Khi Nhóc Ica ở trong trận,
				<span class="underline">Xuyên Kháng</span> Toàn Thuộc Tính của toàn bộ mục tiêu phe ta tăng
				<span class="text-yellow-400 font-semibold">20%</span>. '
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E6 &ge; E2 &gt; E4 = E1</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Bảo Vệ Ngọn Nến Trong Đêm Tối</p>
  			<p class="text-white/80 text-sm">Chỉ có tác dụng khi đi cùng DPS chơi theo HP, còn lại vô dụng.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Mời Đến Đình Viện Ngồi Chơi</p>
    		<p class="text-white/80 text-sm">Tăng SPD rất tốt cho Hyacine, đặc biệt dễ dàng có khi Hyacine cầm Nón Trấn.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Tặng Bạn Hổ Phách Hoàng Hôn</p>
    		<p class="text-white/80 text-sm">Nhóc Ica có gây thêm DMG thôi chứ Hyacine làm gì có Sát Thương.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Bầu Trời... Đáp Lời Nguyện Cầu</p>
    		<p class="text-white/80 text-sm">Hyacine hóa thành nhân vật Hòa Hợp có khả năng hồi máu.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['long-may-rainbows-adorn-the-sky','memory-s-curtain-never-falls','time-waits-for-no-one','time-woven-into-gold']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Nhưng không bắt buộc, chỉ nên quay nếu đang định chơi cùng Castorice/Acheron/Blade/Mydei.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: 
			Cho Speed gần giống Trấn, nhưng free S5.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Nhiều HP là bú.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[3]}</strong>:
			Chắc bạn phải tuyệt vọng lắm mới tìm đến Speed của tôi.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['Warrior_Goddess_of_Sun_and_Thunder']}
			mixSets={[['Warrior_Goddess_of_Sun_and_Thunder','Messenger_Traversing_Hackerspace']]}
  			planarIds={['Item_Giant_Tree_of_Rapt_Brooding','Item_Lushaka_the_Sunken_Seas','Item_Sprightly_Vonwacq','Item_Broken_Keel']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Nữ Thần Chiến Binh Nắng Sấm</span>: 
			Bộ di vật phù hợp nhất với bộ kit của Hyacine. Vừa tăng Tốc cho bản thân, vừa tăng Sát Thương Bạo cho toàn đội.</p>
			<p><span class="text-amber-300 font-semibold">Mix 2-2 Tốc</span>: 
			Lấy 12% Tốc, sao cho Hyacine đủ 200+ Tốc.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Đại Thụ Trầm Tư</span>:
			Giúp Hyacine đạt 200 SPD dễ dàng hơn và đồng thời tăng cường khả năng hồi phục. Lựa chọn hàng đầu cho các chiến lược tập trung vào sát thương cá nhân và hồi phục của Hyacine.</p>
			<span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>:
			Mạnh khi hỗ trợ một nhân vật DPS dựa trên ATK và Hiệu Quả Hồi Năng Lượng rất hữu ích (Không thể tăng sức mạnh cho Ica Béo).</p>
			<span class="text-amber-300 font-semibold">Vonwacq Hoạt Bát</span>:
			Ưu Tiên Hành Động khi vừa vào trận kết hợp với Tốc cao của Hyacine rất tốt để mở đầu một trận chiến, và Hiệu Quả Hồi Năng Lượng cũng rất tốt.</p>
			<span class="text-amber-300 font-semibold">Bộ Khung Bị Gãy</span>:
			Hyacine cũng cần một chút Kháng Hiệu Ứng, và vừa hay chỉ số cô Kháng mà cần lại vừa đủ để món Phụ Kiện này tăng Sát Thương Bạo toàn đội.</p>
			`}
			statDescriptions={[[
    		'[OHB]Tăng Lượng Trị Liệu &nbsp;&nbsp;&gt;&nbsp; [HP]HP',
    		'[SPD]Tốc Độ',
    		'[HP]HP',
    		'[ERR]Hiệu Suất Hồi Năng Lượng'
			]]}
			priorityStats={
			'Tốc Độ &gt; HP &gt; Kháng Hiệu Ứng &ge; Sát Thương Bạo'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">4500+</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">120%+</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">200+</span> 
			<p><span class="text-white/70">Kháng Hiệu Ứng:</span>&nbsp; <span class="font-bold">32%</span> &nbsp;<span class="text-white/70">(Hyacine có sẵn 68% từ các Vết Tích, nên nếu có thêm 32% này nữa thì Hyacine không khác gì một cỗ xe tăng không thể cản phá)</span></p>
			<p><span class="text-white/70">Hiệu Suất Hồi Năng Lượng:</span>&nbsp; <span class="font-bold">119.44%</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['castorice','blade','mydei','therta','feixiao','acheron','hyacine'],
    			supportDps: ['tribbie'],
    			amplifier: ['robin','sunday','ruan-mei'],
    			sustain: ['hyacine']
  			}}
  			tooltips={{
				dps: {
					castorice: 'Hyacine là nhân vật có khả năng Hồi Tuyệt Kỹ Castorice nhanh nhất game này. Có thể hồi máu cho đội mỗi khi Castorice rút máu team. Tăng HP Tối Đa toàn team, tăng trực tiếp lượng Sát Thương đầu ra của Castorice.',
					blade: 'Hyacine bắt buộc phải có Trấn để có thể đi cùng, vì Trấn cô có thể rút máu toàn đội, tích stack Thiên Phú cho Blade. Nếu không có Trấn thì dùng tạm "tăng HP Tối Đa" để tăng DMG cho Blade cũng được.',
					acheron: 'Hyacine bắt buộc phải có Trấn để có thể đi cùng, không có Trấn Hyacine thì cook, dùng Gallagher cho rẻ.',
					mydei: 'Tương tự Blade.',
					therta: 'Ica Béo rất tốt để nạp Năng Lượng và tích stack Thiên Phú cho Đại Herta, nhưng bạn cần phải để ý Điểm Chiến Kỹ.',
					feixiao: 'Tốc cao, hành động nhiều là được, nhưng vẫn phải để ý Điểm Chiến Kỹ.',
					hyacine: 'Bạn không nhìn nhầm đâu, Ica Béo có thể "lấy thịt đè người" làm DPS đấy, nếu bạn build CritDMG đủ để làm điều đó.',
				},
				supportDps: {
					tribbie: 'Cứ cho vào đi cùng DPS đi, Nhóc Ica chỉ dùng ké một ít chỉ số thôi mà.',
				},
				amplifier: {
					sunday: '"Có thể" dùng cho Hyacine DPS.',
					robin: 'Hơi giống Tribbie nhưng có thêm CritDMG.',
					'ruan-mei': 'Có Xuyên Kháng toàn team, và đặc biệt là tăng Tốc Độ cho phe ta, Hyacine rất cần chỉ số này.',
				},
				sustain: {
					hyacine: 'Nhân vật Ký Ức có thể Hồi HP tốt.'
			}}}
			notes={{
				amplifier: 'Cứ Buff toàn phe hoặc Debuff lên kẻ địch để Nhóc Ica hỗ trợ Sát Thương là được, còn lại thì cứ coi Hyacine như một nhân vật Trù Phú thông thường thôi.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Khả năng Healing tuyệt vời, cả chủ động và bị động.
				Cung cấp khả năng tăng HP Tối Đa cho toàn đội.
				Gây lượng Sát Thương lớn với Crit Rate là 100%.
				Có giải khống cho toàn đội.
				Tốc siêu cao không khác gì tay đua F1.
				Hỗ trợ tuyệt vời cho các DPS chơi theo HP.
			"
			cons="
				Nhóc Ica ăn hơi nhiều Điểm Chiến Kỹ.
				Rất phụ thuộc vào Tuyệt Kỹ để đạt được hiệu quả tối đa và gây Sát Thương.
				Không nhiều Nón Ánh Sáng thích hợp.
				Ica Béo ăn hết Ngọ<span class='text-transparent'>c</span> Á<span class='text-transparent'>n</span>h <span class='text-transparent'>S</span>ao củ<span class='text-transparent'>a</span> t<span class='text-transparent'>ô</span>i r<span class='text-transparent'>ồi.</span>
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400 text-lg mt-2">S1</span>: Thật sự là một thứ gì đó mà Hyacine không có thì nó chả khác gì một con Trù Phú thông thường cả.
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
