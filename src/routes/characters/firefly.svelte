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
    id: 'firefly',
    name: 'Firefly',
    element: 'fire',
    path: 'destruction',
	elementColor: '#DA472D'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['50%','60%','70%','80%','90%','100%','110%','120%','130%','140%'],
	['100%','120%','140%','160%','180%','200%','220%','240%','260%','280%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['50%','51%','52%','53%','54%','55%','56.25%','57.5%','58.75%','60%','61%','62%','63%','64%','65%'],
	['100%','110%','120%','130%','140%','150%','162.5%','175%','187.5%','200%','210%','220%','230%','240%','250%'],
	['50%','55%','60%','65%','70%','75%','81.25%','87.5%','93.75%','100%','105%','110%','115%','120%','125%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
    ['30%','33%','36%','39%','42%','45%','49%','53%','56%','60%','63%','66%','69%','72%','75%'],
	['10','11','12','13','14','15','16.25','17.5','18.75','20','21','22','23','24','25']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['20%','22%','24%','26%','28%','30%','32.5%','35%','37.5%','40%','42%','44%','46%','48%','50%'],
	['10%','12%','14%','16%','18%','20%','22.5%','25%','27.5%','30%','32%','34%','36%','38%','40%']
  ];
  let TalentLevel = 1;

	const SPD = 104;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 125;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [110, 216], atk: [71, 139], def: [105, 205] },
		{ dp: 1, levels: [20, 30], hp: [260, 316], atk: [167, 203], def: [248, 300] },
		{ dp: 2, levels: [30, 40], hp: [360, 415], atk: [231, 267], def: [343, 396] },
		{ dp: 3, levels: [40, 50], hp: [460, 515], atk: [295, 331], def: [438, 491] },
		{ dp: 4, levels: [50, 60], hp: [559, 615], atk: [359, 395], def: [533, 586] },
		{ dp: 5, levels: [60, 70], hp: [659, 715], atk: [424, 459], def: [628, 681] },
		{ dp: 6, levels: [70, 80], hp: [759, 814], atk: [488, 523], def: [723, 776] }
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
  		<h3 class="text-lg font-bold mb-1">Chỉ Lệnh: Lực Đẩy Bùng Phát</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<b style="color: {character.elementColor}">Hỏa</b> bằng
		<b class="text-yellow-400">{normalAttack[0][NormalLevel - 1]}</b> Tấn Công của Chiến Giáp SAM cho một kẻ địch chỉ định.
		</p>

		<h3 class="text-lg font-bold mb-1 mt-4">「Đom Đóm IV - Nhát Chém Kích Nổ」</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">45</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">0</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Hồi HP bằng  <b class="text-yellow-400">20%</b> Giới Hạn HP của bản thân. Gây Sát Thương
		<b style="color: {character.elementColor}">Hỏa</b> bằng 
		<b class="text-yellow-400">{normalAttack[1][NormalLevel - 1]}</b> Tấn Công của Chiến Giáp SAM cho một kẻ địch chỉ định.
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
  		<h3 class="text-lg font-bold mb-1">Chỉ Lệnh: Oanh Tạc Trên Không</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Đánh Đơn</span> |
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Tiêu hao HP bằng <b class="text-yellow-400">40%</b> Giới Hạn HP của bản thân để hồi phục cố định một lượng năng lượng bằng 
			<b class="text-yellow-400">{skillAttack[0][SkillLevel - 1]}</b> Giới Hạn Năng Lượng của bản thân, gây Sát Thương
			<b style="color: {character.elementColor}">Hỏa</b> bằng
			<b class="text-yellow-400">{skillAttack[1][SkillLevel - 1]}</b>	Tấn Công của Chiến Giáp SAM cho một kẻ địch chỉ định. 
			Nếu HP hiện tại không đủ, khi thi triển Chiến Kỹ thì HP hiện tại của Chiến Giáp SAM sẽ giảm còn 1 điểm. Khiến bản thân lần sau 
			<u>Ưu Tiên Hành Động</u> <b class="text-yellow-400">25%</b>.
		</p>
		<h3 class="text-lg font-bold mb-1 mt-4">「Đom Đóm IV - Sao Chết Quá Tải」</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán</span> |
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">90</span><span class="text-amber-400 italic"> sức bền mục tiêu chính,</span>
			<span style="color: {character.elementColor}">45</span><span class="text-amber-400 italic"> sức bền mục tiêu lân cận</span> | 
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Hồi HP bằng <b class="text-yellow-400">25%</b>  Giới Hạn HP của bản thân. Thêm Điểm Yếu
			<b style="color: {character.elementColor}">Hỏa</b> cho 1 kẻ địch chỉ định, duy trì 
			<b class="text-yellow-400">2</b> hiệp. Gây Sát Thương <b style="color: {character.elementColor}">Hỏa</b> bằng
			(<b class="text-yellow-400">0.2</b>*Tấn Công Kích Phá +<b class="text-yellow-400">{skillAttack[1][SkillLevel - 1]}</b>)
			Tấn Công của Chiến Giáp SAM cho mục tiêu này. Đồng thời gây Sát Thương <b style="color: {character.elementColor}">Hỏa</b> bằng
			(<b class="text-yellow-400">0.1</b>*Tấn Công Kích Phá +<b class="text-yellow-400">{skillAttack[2][SkillLevel - 1]}</b>)
			Tấn Công của Chiến Giáp SAM cho các mục tiêu ở gần kẻ đó. Tối đa tính
			<b class="text-yellow-400">360%</b> Tấn Công Kích Phá.
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
  			<h3 class="text-lg font-bold mb-1">Đom Đóm IV: Thiêu Đốt Hoàn Toàn</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">240</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">240</span> | 
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Bước vào trạng thái Thiêu Đốt Hoàn Toàn, bản thân ưu tiên hành động 100% đồng thời nhận được Tấn Công Thường Cường Hóa và Chiến Kỹ Cường Hóa. Ở trạng thái Thiêu Đốt Hoàn Toàn, Tốc Độ tăng
				<b class="text-yellow-400">{ultimateAttack[0][UltimateLevel - 1]}</b> điểm, hơn nữa khi thi triển Tấn Công Thường Cường Hóa và Chiến Kỹ Cường Hóa, hiệu suất Phá Vỡ Điểm Yếu của bản thân tăng
				<b class="text-yellow-400">50%</b>, khiến Sát Thương Phá Vỡ mà kẻ địch phải chịu do Chiến Giáp SAM gây ra tăng 
				<b class="text-yellow-400">{ultimateAttack[1][UltimateLevel - 1]}</b>, duy trì đến khi kết thúc lần tấn công này.
			<p>Khi xuất hiện đếm ngược Thiêu Đốt Hoàn Toàn ở thứ tự hành động, thì khi hiệp đếm ngược bắt đầu, Chiến Giáp SAM sẽ giải trừ trạng thái Thiêu Đốt Hoàn Toàn, đếm ngược sở hữu cố định <b class="text-yellow-400">70</b> Tốc Độ.
			<p>Ở trạng thái Thiêu Đốt Hoàn Toàn, Chiến Giáp SAM không thể thi triển Tuyệt Kỹ.
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
  			<h3 class="text-lg font-bold mb-1">Trung Khu Kén Lửa</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phòng Thủ</span> 
			</p>
  			<p>HP càng thấp, sát thương phải chịu càng thấp, khi HP từ <b class="text-yellow-400">20%</b> 
				trở xuống, hiệu ứng Giảm Sát Thương sẽ đạt mức tối đa, tối đa giảm
                <b class="text-yellow-400">{talent[0][TalentLevel - 1]}</b>. 
				Hiệu ứng Giảm Sát Thương trong trạng thái Thiêu Đốt Hoàn Toàn duy trì mức tối đa, Kháng Hiệu Ứng tăng
				<b class="text-yellow-400">{talent[1][TalentLevel - 1]}</b>.
			<p>Nếu năng lượng không đủ <b class="text-yellow-400">50%</b>
				thì khi bắt đầu chiến đấu, năng lượng sẽ hồi đến <b class="text-yellow-400">50%</b>
				Khi năng lượng hồi đến giới hạn sẽ giải trừ tất cả <u>Hiệu Ứng Xấu</u> của bản thân.
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
  			<h3 class="text-lg font-bold mb-1">Δ Chỉ Lệnh: Thiêu Đốt Sao Băng</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Phá Vỡ</span>
				<span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền </span>
  			</p>
  			<p>Nhảy lên không trung và thực hiện di chuyển tự do, duy trì <b class="text-yellow-400">5</b> giây, 
				lúc này dùng tấn công từ trên cao sẽ kết thúc sớm thời gian duy trì. Sau khi hết thời gian duy trì, 
				sẽ đáp xuống và tấn công ngay tất cả kẻ địch trong phạm vi nhất định, 
				khi bắt đầu mỗi đợt sẽ thêm Điểm Yếu <b style="color: {character.elementColor}">Hỏa</b> 
				cho toàn phe địch, duy trì <b class="text-yellow-400">2</b> hiệp, sau đó sẽ gây Sát Thương
				<b style="color: {character.elementColor}">Hỏa</b> bằng
				<b class="text-yellow-400">200%</b> Tấn Công của Chiến Giáp SAM cho toàn phe địch.
            </p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Tuyệt Kỹ &gt; Chiến Kỹ = Thiên Phú &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Tuyệt Kỹ</p>
  			<p class="text-white/80 text-sm">Cho Sam rất nhiều Speed, chỉ số cực kỳ quan trọng đối với cô nàng.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến Kỹ</p>
    		<p class="text-white/80 text-sm">Sát Thương của Sam chủ yếu đến từ lượng sức bền mà cô nàng phá được (Siêu Sát Thương Phá Vỡ), nên mấy Sát Thương từ chỉ số này không cao lắm. Chủ yếu nâng là để sạc năng lượng cho Tuyệt Kỹ.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Gia tăng và đảm bảo khả năng sinh tồn cho cô nàng.</p>
  		</div>	
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Giống Chiến Kỹ nhưng chỉ dùng khi hết điểm chiến kỹ.</p>
  		</div>	
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Mô Đun α: Anti-lag Bùng Lửa"
		description='Ở trạng thái Thiêu Đốt Hoàn Toàn, tấn công kẻ địch không có Điểm Yếu
					<b style="color:#DA472D">Hỏa</b> cũng có thể làm giảm Sức Bền, hiệu ứng bằng
					<b class="text-yellow-400">55%</b> Giảm Sức Bền của kỹ năng vốn có.'
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+4%",
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/BE.png",
    		  	value: "+5.3%",
    		  	label: "Tấn Công Kích Phá",
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
		title="Mô Đun β: Chiến Giáp Tự Phản Ứng"
		description='Ở trạng thái Thiêu Đốt Hoàn Toàn, khi Tấn Công Kích Phá của Chiến Giáp SAM lớn hơn hoặc bằng
					<b class="text-yellow-400">200%</b>/<b class="text-yellow-400">360%</b>, tấn công mục tiêu phe địch trong
					<u>trạng thái Phá Vỡ Điểm Yếu</u>, sẽ khiến Giảm Sức Bền của lần tấn công này chuyển hóa thành 1 lần 
					<b class="text-yellow-400">30%</b>/<b class="text-yellow-400">50%</b>
					<u>Siêu Sát Thương Phá Vỡ</u>.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/BE.png",
    		  	value: "+8%",
    		  	label: "Tấn Công Kích Phá",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+6%",
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "A5"
			},
			{
				icon: "/images/icons-vestige/BE.png",
    		  	value: "+8%",
    		  	label: "Tấn Công Kích Phá",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Mô Đun γ: Lõi Quá Tải"
		description='Nếu Tấn Công của Chiến Giáp SAM cao hơn <b class="text-yellow-400">1800</b> điểm, mỗi
					 <b class="text-yellow-400">10</b> điểm Tấn Công vượt quá sẽ khiến Tấn Công Kích Phá của bản thân tăng
					<b class="text-yellow-400">0.8%</b>.'
		unlock="A6"
		nodes={[
            {
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+3",
      		  	label: "Tốc Độ",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/ER.png",
      	  	  	value: "+8%",
      		  	label: "Kháng Hiệu Ứng",
      		  	unlock: "LV75"
			},
            {
                icon: "/images/icons-vestige/BE.png",
    		  	value: "+10.7%",
    		  	label: "Tấn Công Kích Phá",
      		  	unlock: "LV80"
            }
		]}
	/>

	<TraceBlock
		nodes={[
			{
				icon: "/images/icons-vestige/BE.png",
    		  	value: "+5.3%",
    		  	label: "Tấn Công Kích Phá",
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
  				name="Tôi Từng Ngủ Yên, Trong Chiếc Kén Đỏ"
  				elementColor={character.elementColor}
  				description='Khi thi triển Chiến Kỹ Cường Hóa sẽ bỏ qua <b class="text-yellow-400">15%</b> 
				phòng thủ của mục tiêu, Chiến Kỹ Cường Hóa không tiêu hao Điểm Chiến Kỹ.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Rơi Xuống, Từ Bầu Trời Vỡ Vụn"
  				elementColor={character.elementColor}
  				description='Khi đang ở trong trạng thái Thiêu Đốt Hoàn Toàn, thi triển Tấn Công Thường Cường Hóa, Chiến Kỹ Cường Hóa tiêu diệt mục tiêu phe địch hoặc khiến mục tiêu rơi vào
				<u>trạng thái Phá Vỡ Điểm Yếu</u>, Chiến Giáp SAM sẽ nhận ngay 1 <u>hiệp cộng thêm</u>.
                Hiệu ứng này có thể kích hoạt lại sau <b class="text-yellow-400">1</b> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Ngủ Say Trong Thiên Hà Lặng Thinh"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Tôi Sẽ Nhìn Thấy, Ngọn Lửa Đom Đóm"
  				elementColor={character.elementColor}
  				description='Ở trạng thái Thiêu Đốt Hoàn Toàn, Kháng Hiệu Ứng của Chiến Giáp SAM tăng <b class="text-yellow-400">50%</b>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Sáng Lên Từ Đêm Không Mộng Mị"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Nở Rộ Ở Ngày Mai Vô Tận"
  				elementColor={character.elementColor}
  				description='<u>Xuyên Kháng</u> <span style="color:#DA472D">Hỏa</span> của Chiến Giáp SAM ở trạng thái Thiêu Đốt Hoàn Toàn tăng
                <b class="text-yellow-400">20%</b>. Khi thi triển Tấn Công Thường Cường Hóa, Chiến Kỹ Cường Hóa, Hiệu Suất Phá Vỡ Điểm Yếu sẽ tăng
				<b class="text-yellow-400">50%</b>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E2 &ge; E1 &ge; E6 > E4</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Tôi Từng Ngủ Yên, Trong Chiếc Kén Đỏ</p>
  			<p class="text-white/80 text-sm">Không tiêu hao điểm chiến kỹ khi trong trạng thái Tuyệt Kỹ, quá mạnh.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Rơi Xuống, Từ Bầu Trời Vỡ Vụn</p>
    		<p class="text-white/80 text-sm">Seele hệ Hỏa, thêm lượt liên tục.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Tôi Sẽ Nhìn Thấy, Ngọn Lửa Đom Đóm</p>
    		<p class="text-white/80 text-sm">Phế, vứt, tinh hồn rác.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Nở Rộ Ở Ngày Mai Vô Tận</p>
    		<p class="text-white/80 text-sm">Tăng Dmg Siêu Sát Thương Phá Vỡ gây ra.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['whereabouts-should-dreams-rest','on-the-fall-of-an-aeon','indelible-promise']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Trấn, tất nhiên rồi, ngại gì không mặc.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>:
			Nón 5 sao cho và tăng ATK tốt.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Nón 4 sao cho chỉ số Break tốt, yếu hơn nón trên nhưng dùng được.
  			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['iron_cavalry_against_the_scourge','thief_of_shooting_meteor']}
			mixSets={[[]]}
  			planarIds={['item_forge_of_the_kalpagni_lantern','item_talia_kingdom_of_banditry']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Thiết Kỵ Diệt Trừ Tai Họa</span>: 
			Bộ di vật phù hợp nhất dành cho Firefly.</p>
			<p><span class="text-amber-300 font-semibold">Kẻ Cướp Vệt Sao Băng</span>: 
			Kém hơn bộ trên nhiều chút.</p>
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Cung Điện Rèn Đúc Kiếp Hỏa Liên Đăng</span>:
            Vừa tăng Speed, vừa tăng thêm Break cho Firefly.</p>
			<p><span class="text-amber-300 font-semibold">Talia - Vương Quốc Trộm Cướp</span>:
            Ngoài Break ra thì cũng không có gì nhiều.</p>
			`}
			statDescriptions={[[
    		'[ATK]Tấn Công',
    		'[SPD]Tốc Độ',
    		'[ATK]Tấn Công',
    		'[BE]Tấn Công Kích Phá'
			]]}
			priorityStats={
			'Tốc Độ > Tấn Công Kích Phá > Tấn Công'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <b>BASE</b></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <b>BASE</b></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <b>2500+</b></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <b>BASE</b></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <b>BASE</b></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <b>174+</b> &nbsp;<span class="text-white/70">(Break được kẻ địch thì mới có sát thương)</span></p>
			<p><span class="text-white/70">Tấn Công Kích Phá:</span>&nbsp; <b>250%+</b></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['firefly'],
    			supportDps: ['female-harmony'],
    			amplifier: ['ruan-mei','fugue'],
    			sustain: ['lingsha','gallagher']
  			}}
  			tooltips={{
				dps: {
					firefly: 'Cần đồng minh hỗ trợ bào sức bền hoặc tăng tấn công kích phá hoặc các Buff, Debuff liên quan.'
                },
                supportDps: {
					'female-harmony': 'Ngoài việc có thể giúp mọi nhân vật có khả năng bào sức bền tốt thành DPS thì nhân vật chính chúng ta cũng có thể hỗ trợ một phần sát thương nhờ khả năng bào sức bền khá tốt ở Chiến Kỹ.',
                },
                amplifier: {
					'ruan-mei': 'Tăng hiệu xuất phá vỡ, tăng chỉ số Break, tăng Tốc Độ toàn team. Firefly bú hết.',
					fugue: 'Buff và Debuff khá ngon cho team Break, nhưng Firefly lại không tận dụng tốt hiệu quả phá vỡ điểm yếu 2 lần mà nàng cáo này mang lại.',
                },
                sustain: {
					lingsha: 'Hỗ trợ bào sức bền nhiều mục tiêu và Debuff dùng được.',
					gallagher: 'Hỗ trợ bào sức bền đơn mục tiêu cực tốt, và siêu dương điểm chiến kỹ cho Firefly tha hồ spam kỹ năng.'
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
				Tốc cao và gây Dmg nhiều.
				Tự thân hồi năng lượng tốt.
				Đội hình F2P cực dễ và cực rẻ.
				Vợ tôi.
			'
			cons='
				Cần nhiều chỉ số đầu tư.
				Vô hại trước kẻ địch khóa điểm yếu.
				Lạm phát HP là bóp chết lối chơi Supper Break.
			'
		/>
		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: #5CD6FF">Ruan Mei</span> &nbsp &gt; &nbsp 
				<span style="color: {character.elementColor}">E2</span> &nbsp &gt; &nbsp 				
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt; &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p>
				<span class="font-semibold text-amber-400">Ruan Mei</span>: Nhân vật hỗ trợ tốt thứ 2 trong đội Firefly, sau nhân vật chính chúng ta.
			</p>	
			<p>
				<span class="font-semibold text-amber-400">E2</span>: Mở ra lối chơi mới và cải thiện rất nhiều cho vận hành.
			</p>	
			<p>
				<span class="font-semibold text-amber-400">S1</span>: Hỗ trợ chỉ số tốt.
			</p>	
		</div>

	</section>
</div>
