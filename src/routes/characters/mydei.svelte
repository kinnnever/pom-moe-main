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
    id: 'mydei',
    name: 'Mydei',
    element: 'imaginary',
    path: 'destruction',
	elementColor: '#FADA7A'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['25%','30%','35%','40%','45%','50%','55%','60%','65%','70%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['45%','49.5%','54%','58.5%','63%','67.5%','73.13%','78.75%','84.38%','90%','94.5%','99%','103.5%','108%','112.5%'],
	['25%','27.5%','30%','32.5%','35%','37.5%','40.63%','43.75%','46.88%','50%','52.5%','55%','57.5%','60%','62.5%'],
	['55%','60.5%','66%','71.5%','77%','82.5%','89.38%','96.25%','103.13%','110%','115.5%','121%','126.5%','132%','137.5%'],
    ['33%','36.3%','39.6%','42.9%','46.2%','49.5%','53.63%','57.75%','61.88%','66%','69.3%','72.6%','75.9%','79.2%','82.5%'],
    ['140%','154%','168%','182%','196%','210%','227.5%','245%','262.5%','280%','294%','308%','322%','336%','350%'],
    ['84%','92.4%','100.8%','109.2%','117.6%','126%','136.5%','147%','157.5%','168%','176.4%','184.8%','193.2%','201.6%','210%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
    ['15%','15.5%','16%','16.5%','17%','17.5%','18.13%','18.75%','19.38%','20%','20.5%','21%','21.5%','22%','22.5%'],
	['96%','102.4%','108.8%','115.2%','121.6%','128%','136%','144%','152%','160%','166.4%','172.8%','179.2%','185.6%','192%'],
  	['60%','64%','68%','72%','76%','80%','85%','90%','95%','100%','104%','108%','112%','116%','120%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['15%','16%','17%','18%','19%','20%','21.25%','22.5%','23.75%','25%','26%','27%','28%','29%','30%']
  ]
  let TalentLevel = 1;

	const SPD = 95;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 125;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [211, 411], atk: [58, 113], def: [26, 51] },
		{ dp: 1, levels: [20, 30], hp: [496, 601], atk: [136, 165], def: [62, 75] },
		{ dp: 2, levels: [30, 40], hp: [686, 792], atk: [188, 217], def: [85, 99] },
		{ dp: 3, levels: [40, 50], hp: [876, 982], atk: [241, 270], def: [109, 122] },
		{ dp: 4, levels: [50, 60], hp: [1066, 1172], atk: [293, 322], def: [133, 146] },
		{ dp: 5, levels: [60, 70], hp: [1256, 1362], atk: [345, 374], def: [157, 170] },
		{ dp: 6, levels: [70, 80], hp: [1446, 1552], atk: [397, 426], def: [180, 194] }
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
			Kremnos, thành bang chìm trong sương mù, thành bang của hỗn loạn và chiến tranh! Hoàng tộc của nó mang dòng máu sát hại thân thích, thần linh của nó mang tên gọi Tai Ương. Mydeimos bất tử, con sư tử xa bầy, Hậu Duệ Chrysos săn lùng Ngọn Lửa "Phân Tranh". Chịu đựng cái chết hàng vạn lần, tắm máu để trở về quê hương, một mình gánh vác số mệnh điên rồ — Giết vua để trở thành vua, diệt thần để trở thành thần. Vó sắt của chiến tranh đạp qua hoang mạc, cuối cùng cũng phải nhuốm máu quê hương.
  		</p>
		<div class="hidden md:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-7 left-0">
    		<p style="text-shadow: 1px 1px 1px black">Kremnos, thành bang chìm trong sương mù, thành bang của hỗn loạn và chiến tranh! Hoàng tộc của nó mang dòng máu sát hại thân thích, thần linh của nó mang tên gọi Tai Ương. Mydeimos bất tử, con sư tử xa bầy, Hậu Duệ Chrysos săn lùng Ngọn Lửa "Phân Tranh". Chịu đựng cái chết hàng vạn lần, tắm máu để trở về quê hương, một mình gánh vác số mệnh điên rồ — Giết vua để trở thành vua, diệt thần để trở thành thần. Vó sắt của chiến tranh đạp qua hoang mạc, cuối cùng cũng phải nhuốm máu quê hương.</p>
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
  		<h3 class="text-lg font-bold mb-1">Lời Thề Dẫm Nát Hành Trình</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Số Ảo</span> bằng  
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Giới Hạn HP của Mydei cho 1 kẻ địch chỉ định.
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
  		<h3 class="text-lg font-bold mb-1">Vạn Lần Chết Không Hối Hận</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền/hit</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">0</span>
  		</p>
  		<p>Tiêu hao lượng HP bằng
            <span class="text-yellow-400 font-semibold">50%</span> HP hiện tại của Mydei, gây Sát Thương 
			<span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
            <span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Giới Hạn HP của Mydei cho 1 kẻ địch chỉ định, đồng thời gây Sát Thương
            <span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
            <span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> Giới Hạn HP của Mydei cho mục tiêu lân cận kẻ đó.
		</p>
        <p>Nếu HP hiện tại không đủ, thì khi thi triển Chiến Kỹ, HP hiện tại của Mydei sẽ giảm còn 1.</p>

		<h3 class="text-lg font-bold mb-1 mt-3">「Sát Vương Thành Vương」</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền/hit</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">0</span>
  		</p>
		<p class="text-base">Tiêu hao lượng HP bằng
            <span class="text-yellow-400 font-semibold">35%</span> HP hiện tại của Mydei. Gây Sát Thương 
            <span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
            <span class="text-yellow-400 font-semibold">{skillAttack[2][SkillLevel - 1]}</span> Giới Hạn HP của Mydei cho 1 kẻ địch, đồng thời gây Sát Thương
            <span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
            <span class="text-yellow-400 font-semibold">{skillAttack[3][SkillLevel - 1]}</span> Giới Hạn HP của Mydei cho mục tiêu lân cận kẻ đó.
		</p>
        <p>Nếu HP hiện tại không đủ, thì khi thi triển Chiến Kỹ, HP hiện tại của Mydei sẽ giảm còn 1.</p>
        <p>Kỹ năng này sẽ tự động thi triển.</p>

        <h3 class="text-lg font-bold mb-1 mt-3">「Sát Thần Đăng Thần」</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">90</span>
			<span class="text-amber-400 italic">sức bền/hit</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">10</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">0</span>
  		</p>
        <p class="text-base">Tiêu hao <span class="text-yellow-400 font-semibold">150</span> điểm Nạp Năng Lượng, gây Sát Thương 
            <span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
            <span class="text-yellow-400 font-semibold">{skillAttack[4][SkillLevel - 1]}</span> Giới Hạn HP của Mydei cho 1 kẻ địch, đồng thời gây Sát Thương
            <span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
            <span class="text-yellow-400 font-semibold">{skillAttack[5][SkillLevel - 1]}</span> Giới Hạn HP của Mydei cho mục tiêu lân cận kẻ đó.
        </p>
        <p>Kỹ năng này sẽ tự động thi triển. Trong thời gian kỹ năng này sẽ không thể tích lũy Nạp Năng Lượng.</p>
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
  			<h3 class="text-lg font-bold mb-1">Ngai Vàng Xương Cốt</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Khuếch Tán</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">160</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">160</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Hồi HP bằng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> Giới Hạn HP của Mydei và tích lũy
                <span class="text-yellow-400 font-semibold">20</span> điểm Nạp Năng Lượng Thiên Phú. Gây Sát Thương 
				<span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span> Giới Hạn HP của Mydei cho 1 kẻ địch chỉ định, đồng thời gây Sát Thương 
                <span class="text-yellow-400 font-semibold">{ultimateAttack[2][UltimateLevel - 1]}</span>
                Giới Hạn HP của Mydei cho mục tiêu lân cận, khiến mục tiêu và mục tiêu lân cận rơi vào trạng thái Khiêu Khích, duy trì
                <span class="text-yellow-400 font-semibold">2</span> hiệp. 
                Sát Thần Đăng Thần lần kế tiếp sẽ ưu tiên tấn công 1 kẻ địch chỉ định, hiệu ứng này chỉ có hiệu lực với mục tiêu mới nhất.
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
  			<h3 class="text-lg font-bold mb-1">Nợ Máu Trả Bằng Máu</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span>
  			</p>
  			<p class="text-base">Mỗi 1% HP bị mất đi sẽ tích lũy 1 điểm Nạp Năng Lượng, tối đa tích lũy 200 điểm. Khi Nạp Năng Lượng đạt 100 điểm thì sẽ tiêu hao 100 điểm này để vào trạng thái "Huyết Thù" và hồi HP bằng
                <span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>
                Giới Hạn HP của Mydei, đồng thời Ưu Tiên Hành Động 100%. Trong trạng thái "Huyết Thù", Giới Hạn HP sẽ tăng, giá trị tăng bằng
                <span class="text-yellow-400 font-semibold">50%</span> Giới Hạn HP hiện tại, Phòng Thủ duy trì bằng 0. Khi hiệp của bản thân bắt đầu sẽ tự động thi triển "Sát Vương Thành Vương".
			</p>
            <p>Trong trạng thái "Huyết Thù" khi Nạp Năng Lượng đạt 
                <span class="text-yellow-400 font-semibold">150</span> điểm, Mydei sẽ lập tức nhận được 1 
                <span class="underline">hiệp thêm</span> và tự động thi triển "Sát Thần Đăng Thần".
            </p>
            <p>Trong trạng thái "Huyết Thù", khi Mydei chịu tấn công chí tử sẽ không rơi vào
                <span class="underline">trạng thái không thể chiến đấu</span> nhưng sẽ xóa Nạp Năng Lượng và thoát khỏi trạng thái Huyết Thù, đồng thời hồi HP bằng
                <span class="text-yellow-400 font-semibold">50%</span> Giới Hạn HP của bản thân.
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
  			<h3 class="text-lg font-bold mb-1">Lồng Giam Giáo Gãy Thần Phục</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Quấy Nhiễu</span>
  			</p>
  			<p class="text-base">Sau khi dùng Bí Kỹ sẽ lôi kéo kẻ địch trong khu vực nhất định và khiến chúng rơi vào trạng thái Choáng 
				<span class="text-yellow-400 font-semibold">10</span> giây. Kẻ địch trong trạng thái Choáng sẽ không thể chủ động tấn công mục tiêu phe ta.
			</p>
			<p class="text-base">Nếu chủ động tấn công kẻ địch rơi vào trạng thái Choáng, thì khi vào chiến đấu sẽ gây Sát Thương
				<span style="color: {character.elementColor}" class="font-bold">Số Ảo</span> bằng
				<span class="text-yellow-400 font-semibold">80%</span> Giới Hạn HP của Mydei cho toàn bộ phe địch, đồng thời khiến mục tiêu rơi vào trạng thái Khiêu Khích, duy trì
                <span class="text-yellow-400 font-semibold">1</span> hiệp. Bản thân tích lũy
                <span class="text-yellow-400 font-semibold">50</span> điểm Nạp Năng Lượng của Thiên Phú.
			</p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Chiến Kỹ = Tuyệt Kỹ &gt; Thiên Phú &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Chiến Kỹ</p>
  			<p class="text-white/80 text-sm">Nguồn DMG chính, không tiêu hao Điểm Chiến Kỹ, và máy tự dụng kỹ năng này cho bạn.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Hỗ trợ thêm tí DMG, chủ yếu là dùng để sinh tồn.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Ngoài khả năng hồi HP khi vào trạng thái thì còn lại coi như vứt. Nhưng nếu chơi team 3 nô thì cân nhắc nên nâng.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Bạn có được điều khiển Mydei đâu mà đòi nâng, mà kể cả bạn có điều khiển thì bạn cũng chả dùng Đánh Thường bao giờ đâu mà.</p>
  		</div>		
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Nước Và Bùn"
		description="Khi Mydei chịu tấn công chí tử khi ở trạng thái Huyết Thù sẽ không thoát khỏi trạng thái Huyết Thù. 
                    Hiệu ứng này có thể kích hoạt
					<span class='text-yellow-400 font-semibold'>3</span> 
					lần trong 1 trận."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/HP.png",
      	  	  	value: "+4%",
      		  	label: "HP",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/CD.png",
    		  	value: "+5.3%",
    		  	label: "Sát Thương Bạo Kích",
    		  	unlock: "A3"
    		},
			{
    		  	icon: "/images/icons-vestige/SPD.png",
    		  	value: "+2",
    		  	label: "Tốc Độ",
    		  	unlock: "A3"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="Ba Mươi Bạo Chúa"
		description='Khi trong trạng thái "Huyết Thù", Mydei sẽ miễn dịch
                    <span class="underline">Hiệu Ứng Xấu loại Khống Chế</span>.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+8%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/HP.png",
    		  	value: "+6%",
    		  	label: "HP",
      		  	unlock: "A5"
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
		title="Tấm Áo Đẫm Máu"
		description='Khi bắt đầu chiến đấu, nếu Giới Hạn HP của Mydei trên
		<span class="text-yellow-400 font-semibold">4000</span> điểm thì mỗi 100 HP vượt quá có thể khiến Tỷ Lệ Bạo Kích của bản thân tăng
        <span class="text-yellow-400 font-semibold">1.2%</span>, tỷ lệ Nạp Năng Lượng của Mydei do sát thương của mục tiêu phe địch gây ra tăng 
        <span class="text-yellow-400 font-semibold">2.5%</span>, lượng hồi phục khi nhận trị liệu tăng 
        <span class="text-yellow-400 font-semibold">0.75%</span>, phần vượt mức sẽ được tính vào tối đa
        <span class="text-yellow-400 font-semibold">4000</span> điểm HP.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/HP.png",
      	  	  	value: "+8%",
      		  	label: "HP",
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
  				name="Gió Lạnh Khắc Nên Xương Sống Bất Khuất"
  				elementColor={character.elementColor}
  				description='Tăng 
				<span class="text-yellow-400 font-semibold">30%</span> Bội Số Sát Thương mà Sát Thần Đăng Thần gây ra cho mục tiêu chính, 
                đồng thời biến thành Sát Thương Số Ảo gây ra cho toàn bộ phe địch bằng với Bội Số Sát Thương của mục tiêu chính.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Phân Tranh Chứng Kiến Tiếng Gào Của Thi Thể"
  				elementColor={character.elementColor}
  				description='Trong trạng thái "Huyết Thù", sát thương Mydei gây ra sẽ bỏ qua
                <span class="text-yellow-400 font-semibold">15%</span> Phòng Thủ của mục tiêu phe địch, đồng thời sau khi nhận trị liệu, sẽ khiến
                <span class="text-yellow-400 font-semibold">40%</span> 
                giá trị trị liệu chuyển hóa thành Nạp Năng Lượng, Nạp Năng Lượng được tích lũy chuyển hóa này không vượt quá
                <span class="text-yellow-400 font-semibold">40</span> điểm. Sau khi bất kỳ đơn vị nào hành động, sẽ tái lập Nạp Năng Lượng có thể tích lũy.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Vinh Quang Soi Chiếu Bữa Tiệc Không Tàn"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Kèn Lệnh Đánh Thức Con Sư Tử Trầm Mặc"
  				elementColor={character.elementColor}
  				description='Trong thời gian trạng thái "Huyết Thù", sát thương Bạo Kích tăng
				<span class="text-yellow-400 font-semibold">30%</span>, sau khi bị mục tiêu phe địch tấn công, sẽ hồi HP bằng
                <span class="text-yellow-400 font-semibold">10%</span> Giới Hạn HP của bản thân.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Binh Đao Chạm Trổ Ngọn Lửa Của Thân Xác"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Quá Khứ Đạp Lên Ngọn Núi Máu"
  				elementColor={character.elementColor}
  				description='Khi vào chiến đấu lập tức vào trạng thái "Huyết Thù", 
                đồng thời điểm Nạp Năng Lượng cần cho "Sát Thần Đăng Thần" sẽ giảm còn
				<span class="text-yellow-400 font-semibold">100</span>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E6 &gt; E2 &gt; E1 &gt; E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Gió Lạnh Khắc Nên Xương Sống Bất Khuất</p>
  			<p class="text-white/80 text-sm">Không đáng đầu tư.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Phân Tranh Chứng Kiến Tiếng Gào Của Thi Thể</p>
    		<p class="text-white/80 text-sm">Mạnh và dễ chơi hơn nhiều so với E0 hay E1.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Kèn Lệnh Đánh Thức Con Sư Tử Trầm Mặc</p>
    		<p class="text-white/80 text-sm">Kết hợp với E2 tốt, nhưng vẫn phụ thuộc vào tần xuất tấn công của kẻ địch.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Quá Khứ Đạp Lên Ngọn Núi Máu</p>
    		<p class="text-white/80 text-sm">"Cút ra góc phòng chơi, chúng tôi không nói chuyện với Cá Voi". Đấy là ai nói thế chứ ở đây, Mydei ngay lập tức vào trạng thái mạnh nhất ngay khi vừa vào chiến đấu, còn tăng mạnh tần suất hành động, và kết hợp với E2 thì Mydei trở thành con quái vật đúng nghĩa.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['flame-of-blood-blaze-my-path','the-unreachable-side','a-secret-vow','ninja-record-sound-hunt']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Tốt nhất về Stats Base.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: <span class="font-bold">
			Lỏ hơn Trấn xíu.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Tốt nhất nếu không có 2 nón 5 sao.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Free Event, Stats Base tốt, không còn gì thì xài tạm.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['Scholar_Lost_in_Erudition','Longevous_Disciple']}
			mixSets={[['Scholar_Lost_in_Erudition','Longevous_Disciple']]}
  			planarIds={['Item_Bone_Collection_s_Serene_Demesne','Item_Rutilant_Arena']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Học Giả Lạc Lối Trong Biển Tri Thức</span>: 
			Bộ di vật tốt nhất cho Mydei nhờ cung cấp Tỷ Lệ Bạo Kích và khả năng khuếch đại Sát Thương Chiến Kỹ.</p>
			<p><span class="text-amber-300 font-semibold">Môn Đồ Trường Thọ</span>: 
			Tăng HP và chút Tỉ Lệ Bạo, có thể dùng tạm trước khi có bộ Trấn đủ tốt.</p>
			<p><span class="text-amber-300 font-semibold">Mix 2-2</span>:
			Nếu bạn không thể kiếm được bộ 4 được đề xuất với các chỉ số chính/phụ đẹp, hãy Mix tạm 2 bộ trên lại với nhau.
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Vùng Đất Nhặt Hài Cốt Tĩnh Lặng</span>:
			Best in Slot với hiệu quả tăng cường Giới Hạn HP và Bạo Kích.</p>
			<span class="text-amber-300 font-semibold">Đấu Trường Ngôi Sao</span>:
			Tuy không cung cấp HP, nhưng tăng DMG Chiến Kỹ thì vẫn dùng tốt.</p>
			`}
			statDescriptions={[[
    		'[HP]HP &nbsp;&nbsp;&ge;&nbsp; [CD]Crit Dmg',
    		'[SPD]Tốc Độ &nbsp;&nbsp;&ge;&nbsp; [HP]HP',
    		'[HP]HP &nbsp;&nbsp;&ge;&nbsp; [imaginary]<span style="color: #FADA7A">Tăng ST Số Ảo</span>',
    		'[HP]HP'
			]]}
			priorityStats={
			'HP <span class="text-white/20">(Đủ 8000 HP thì dừng lại)</span> &ge; Sát Thương Bạo Kích &ge;  Tỷ Lệ Bạo Kích = Tốc Độ '
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">8000</span> &nbsp;<span class="text-white/70">(Đây là chỉ số ngoài màn hình chờ)</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">40%+</span> &nbsp;<span class="text-white/70">(Nếu bạn build đủ 8000 HP thì khi vào trận bạn sẽ có free 48% Tỷ Lệ Bạo, có thể giảm nếu bạn kẹp Sunday hay bất kỳ nguồn tăng Tỷ Lệ Bạo nào khác)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">150%+</span> &nbsp;<span class="text-white/70">(Build được càng cao càng tốt)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">?</span> &nbsp;<span class="text-white/70">(Có thể build Speed Turning là 134/135 Tốc, nhưng nếu đi cùng SP tốc cao như Sparkle hay Sunday 160+ Tốc thì để Mydei Tốc BASE cho dễ đầu tư HP)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['mydei'],
    			supportDps: ['tribbie','jade'],
    			amplifier: ['sunday','male-remembrance','sparkle','bronya','ruan-mei'],
    			sustain: ['gallagher','luocha','lynx']
  			}}
  			tooltips={{
				dps: {
                   mydei: 'DPS cần hành động nhiều để chủ động giảm HP bản thân, hoặc nhờ đồng đội giảm HP bản thân.' 
                },
                supportDps: {
                    tribbie: 'Tương tác tốt với DPS chơi HP như Mydei.',
                    jade: '"Có thể" dùng nếu bạn muốn trải nghiệm trò mới.'
                },
                amplifier: {
                    sunday: 'Khả năng khuếch đại Sát Thương không quá ấn tượng nhưng khả năng cải thiện vận hành với <span class="underline">Kéo Lượt</span> và <span class="underline">Hồi Năng Lượng</span> vẫn giúp Mydei giải quyết rất nhiều nhu cầu trong chiến đấu.',
                    'male-remembrance': 'Có khả năng khuếch đại Sát Thương tốt nhưng khả năng <span class="underline">Kéo Lượt</span> khó kiểm soát.',
                    sparkle: 'Giúp Mydei không cần build chỉ số Tốc Độ, vận hành đơn giản nhưng khuếch đại Sát Thương kém.',
                    bronya: 'Ít được khuyến nghị vì chỉ là phiên bản <span class="underline">Kéo Lượt</span> của Sunday. Có thể đi cùng với Sunday trong team 3 nô.',
                    'ruan-mei': 'Khuếch đại Sát Thương rất tốt nhưng đôi khi hơi bóp vì kẻ địch bị hạn chế, không thể tấn công Mydei. Chỉ nên dùng trong Ảo Ảnh Tận Thế.'
                },
                sustain: {
                    gallagher: 'Hồi HP khi Mydei tấn công, gần như luôn duy trì HP Mydei trên 50%.',
                    luocha: 'Tương tự Gallagher nhưng có hiệu quả cả khi ngoài hiệp.',
                    lynx: 'Tăng HP Tối Đa và tăng chỉ số <span class="underline">Khiêu Khích</span> của Mydei.',
                }
			}}
			notes={{
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=' 
				Lượng Sát Thương đầu ra khổng lồ.
				"Từ Chối Tử Thần" 3 lần.
				Có lượng HP lớn và chỉ số scale theo HP.
				"Muốn động vào đồng đội ta thì phải bước qua xá.c ta trước, hoặc DMG AoE" (Khiêu khích thường xuyên và liên tục).
				Hồi năng lượng nhanh di liên tục bị tấn công.
				Đội hình linh hoạt và có nhiều biến thể.
				Vô não khi chơi.
			'
			cons='
				Nón F2P khá hạn chế.
				Máy chơi hay hơn bạn.
			'
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt; &nbsp 
				<span style="color: {character.elementColor}">E2</span> &nbsp
				<span class="text-white/70 text-2xl">(Hoặc)</span> &nbsp Skip
				
			</span>
		<div class="grid grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400">S1</span>: Tăng khả năng vận hành và tăng Sát Thương đầu ra.
			</p>
			<p>
				<span class="font-semibold text-amber-400">E2</span>: Tương tự Trấn nhưng đắt tiền hơn.
			</p>		
		</div>

	</section>
</div>
