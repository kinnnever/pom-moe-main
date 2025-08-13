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

  const character = {
    id: 'cipher',
    name: 'Cipher',
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
	['100%','110%','120%','130%','140%','150%','162.5%','175%','187.5%','200%','210%','220%','230%','240%','250%'],
  	['50%','55%','60%','65%','70%','75%','81.25%','87.5%','93.75%','1000%','105%','110%','115%','120%','125%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
	['60%','66%','72%','78%','84%','90%','97.5%','105%','112.5%','120%','126%','132%','138%','144%','150%'],
  	['20%','22%','24%','26%','28%','30%','32.5%','35%','37.5%','40%','42%','44%','46%','48%','50%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['75%','82.5%','90%','97.5%','105%','112.5%','121.88%','131.25%','140.63%','150%','157.5%','165%','172.5%','180%','187.5%']
  ]
  let TalentLevel = 1;

	const SPD = 106;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [126, 247], atk: [87, 169], def: [69, 135] },
		{ dp: 1, levels: [20, 30], hp: [297, 361], atk: [204, 248], def: [162, 197] },
		{ dp: 2, levels: [30, 40], hp: [411, 475], atk: [283, 326], def: [225, 259] },
		{ dp: 3, levels: [40, 50], hp: [525, 589], atk: [361, 405], def: [287, 322] },
		{ dp: 4, levels: [50, 60], hp: [639, 703], atk: [439, 483], def: [349, 384] },
		{ dp: 5, levels: [60, 70], hp: [753, 817], atk: [518, 561], def: [412, 446] },
		{ dp: 6, levels: [70, 80], hp: [868, 931], atk: [596, 640], def: [474, 509] }
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
			Tại Dolos - thành phố trộm cướp đã sụp đổ, 300 Hiệp Đạo đang mặc sức hoành hành. Cifera, ngôi sao trộm cắp có đôi chân thần tốc, Hậu Duệ Chrysos đùa giỡn với Ngọn Lửa "Mưu Kế", hãy chạy nhanh lên nào. Nguyện những lời dối trá của cô theo gió lan xa, thổi khắp thế gian này... "Ha, còn muốn lừa tôi sao? Mơ đi!"
		</div>
		<div class="hidden lg:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-24 left-0 select-none">
    		<p style="text-shadow: 1px 1px 1px black">Tại Dolos - thành phố trộm cướp đã sụp đổ, 300 Hiệp Đạo đang mặc sức hoành hành. Cifera, ngôi sao trộm cắp có đôi chân thần tốc, Hậu Duệ Chrysos đùa giỡn với Ngọn Lửa "Mưu Kế", hãy chạy nhanh lên nào. Nguyện những lời dối trá của cô theo gió lan xa, thổi khắp thế gian này... "Ha, còn muốn lừa tôi sao? Mơ đi!"</p>
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
  		<h3 class="text-lg font-bold mb-1">Ôi Chao, Cá Lọt Lưới</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Đánh Đơn </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> cho 1 kẻ địch chỉ định tương đương 
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Tấn Công của Cipher.
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
  		<h3 class="text-lg font-bold mb-1">Hey, Tay Không Bắt Bạc</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Khuếch Tán </span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span>
			<span class="text-amber-400 italic">sức bền/hit</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p class="text-base">Có <span class="text-yellow-400 font-semibold">120%</span> 
			<span class="underline">xác suất cơ bản</span> khiến 1 kẻ địch chỉ định và mục tiêu lân cận rơi vào trạng thái Suy Yếu (sát thương gây ra giảm 
			<span class="text-yellow-400 font-semibold">10%</span>), khiến tấn công của Cipher tăng  
			<span class="text-yellow-400 font-semibold">30%</span>, duy trì 
			<span class="text-yellow-400 font-semibold">2</span> hiệp,  đồng thời gây sát thương 
			<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span> Tấn Công của Cipher cho 1 kẻ địch chỉ định, gây sát thương 
			<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> bằng 
			<span class="text-yellow-400 font-semibold">{skillAttack[1][SkillLevel - 1]}</span> Tấn Công của Cipher cho mục tiêu lân cận.
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
  			<h3 class="text-lg font-bold mb-1">Mèo Tặc, Kính Bút!</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Khuếch Tán </span> | 
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">90</span> 
				<span class="text-amber-400 italic">sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">130</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">130</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
  			<p class="text-base">Gây Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> cho 1 kẻ địch chỉ định bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> Tấn Công của Cipher. Sau đó, gây
				<span class="underline">Sát Thương Chuẩn</span> bằng 
				<span class="text-yellow-400 font-semibold">25%</span> giá trị ghi nhận hiện tại của Thiên Phú cho 1 kẻ địch chỉ định, 
				đồng thời gây cho 1 kẻ địch chỉ định và mục tiêu lân cận Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> bằng 
				<span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span> Tấn Công của Cipher và 
				<span class="underline">Sát Thương Chuẩn</span> tổng cộng bằng 
				<span class="text-yellow-400 font-semibold">75%</span> giá trị ghi nhận hiện tại của Thiên Phú, 
				<span class="underline">Sát Thương Chuẩn</span> này sẽ chia đều cho tất cả mục tiêu kỹ năng.
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
  			<h3 class="text-lg font-bold mb-1">Người Dolos Nhiệt Tình Hiếu Khách</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Đơn</span> |
				<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">60</span> 
				<span class="text-amber-400 italic">sức bền</span> | 
				<span class="text-amber-400 italic">Hồi năng lượng</span> 
				<span style="color: {character.elementColor}">5</span>
  			</p>
  			<p class="text-base">Khi trong trận không có mục tiêu phe địch rơi vào trạng thái "Khách Quen", 
				Cipher sẽ lập tức khiến kẻ địch có Giới Hạn HP cao nhất hiện tại trong trận trở thành "Khách Quen". 
				Khi thi triển Chiến Kỹ và Tuyệt Kỹ, sẽ khiến mục tiêu chính trở thành "Khách Quen". 
				Trạng thái "Khách Quen" chỉ có hiệu lực với mục tiêu được thi triển mới nhất.
 			</p>
			<p class="text-base">Sau khi "Khách Quen" bị mục tiêu khác của phe ta tấn công, Cipher sẽ lập tức phát động 
				<span class="underline">Đòn Đánh Theo Sau</span> lên "Khách Quen", gây Sát Thương 
				<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> bằng 
				<span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span>
				Tấn Công của Cipher. Hiệu ứng này mỗi hiệp tối đa kích hoạt 
				<span class="text-yellow-400 font-semibold">1</span> lần, 
				khi bắt đầu hiệp của Cipher sẽ làm mới số lần có thể kích hoạt.
			</p>
			<p class="text-base">Cipher sẽ ghi nhận lại 
				<span class="text-yellow-400 font-semibold">12%</span> không phải 
				<span class="underline">Sát Thương Chuẩn</span> mà mục tiêu phe ta gây ra cho "Khách Quen", 
				không ghi nhận sát thương dư ra, sau khi thi triển Tuyệt Kỹ sẽ xóa giá trị ghi nhận.
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
  			<h3 class="text-lg font-bold mb-1">Chú Mèo Đi Hia</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span>
  			</p>
  			<p class="text-base">Nhận được "Chúc Phúc Của Zagreus", duy trì 
				<span class="text-yellow-400 font-semibold">15</span> giây, trong thời gian này, Cipher sẽ không bị kẻ địch phát hiện, 
				tốc độ di chuyển tăng 50%, khi đến gần kẻ địch trong bản đồ lớn/Vũ Trụ Mô Phỏng/Vũ Trụ Sai Phân, 
				có thể lập tức nhận Vật Tiêu Hao ngẫu nhiên, mỗi ngày thực tế tối đa nhận
				<span class="text-yellow-400 font-semibold">50</span> lần.
			</p>
			<p class="text-base">Vào chiến đấu trong thời gian có "Chúc Phúc Của Zagreus" sẽ gây Sát Thương
				<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> cho toàn bộ kẻ địch bằng
				<span class="text-yellow-400 font semibold">100%</span> Tấn Công của Cipher, điểm Cipher ghi nhận được từ lần sát thương này tăng 
				<span class="text-yellow-400 font semibold">200%</span>.
			</p>
		</div>
	</div>
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Thiên Phú &gt Tuyệt Kỹ &gt Chiến Kỹ = Tấn Công Thường</p>
		<p class="text-white/40">(thực ra không nâng cũng được, chỉ cần nâng hết mấy Vết Tích lớn và mấy điểm Tốc thôi)</p>
		
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Thiên Phú</p>
  			<p class="text-white/80 text-sm">Mặc dù Sát Thương Chuẩn không tăng theo LV nhưng hãy nâng cấp Kỹ Năng này vì đây là nguồn Sát Thương chính của Cipher nếu bạn muốn Cipher hỗ trợ DMG trong đội hình.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tuyệt Kỹ</p>
    		<p class="text-white/80 text-sm">Nâng cho có DMG chứ vẫn phụ thuộc vào Sát Thương Chuẩn từ Thiên Phú.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến kỹ</p>
    		<p class="text-white/80 text-sm">Dùng cho có thêm Sát Thương.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn công thường</p>
    		<p class="text-white/80 text-sm">Nâng đi để tạo Điểm Chiến Kỹ cho đồng đội.</p>
  		</div>
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Giày Quý Thần Tốc"
		description="Khi tốc độ của Cipher lớn hơn hoặc bằng 
					<span class='font-semibold'>140</span>/<span class='font-semibold'>170</span>, 
					Tỷ Lệ Bạo Kích tăng 
					<span class='text-yellow-400 font-semibold'>25%</span>/<span class='text-yellow-400 font-semibold'>50%</span>,
					điểm ghi nhận nhận được tăng 
					<span class='text-yellow-400 font-semibold'>50%</span>/<span class='text-yellow-400 font-semibold'>100%</span>."
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/quantum.png",
      	  	  	value: "+3.2%",
      		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
      		  	unlock: "A2"
    		},
    		{
    		  	icon: "/images/icons-vestige/SPD.png",
    		  	value: "+2",
    		  	label: "Tốc Độ",
    		  	unlock: "A3"
    		},
    		{
    		  	icon: "/images/icons-vestige/EHR.png",
    		  	value: "+4%",
      		  	label: "Chính Xác Hiệu Ứng",
      		  	unlock: "A3"
    		}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace2.png"
		title="300 Hiệp Đạo"
		description='Cipher sẽ ghi nhận 
		<span class="text-yellow-400 font-semibold">8%</span> không phải 
		<span class="underline">Sát Thương Chuẩn</span> 
		mà mục tiêu phe ta gây ra cho mục tiêu phe địch ngoại trừ "Khách Quen", sát thương vượt mức sẽ không ghi nhận.'
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
      		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
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
		title="Đổi Trắng Thay Đen"
		description='Sát Thương Bạo Kích do 
		<span class="underline">Đòn Đánh Theo Sau</span> của Thiên Phú gây ra tăng 
		<span class="text-yellow-400 font-semibold">100%</span>.
		Khi Cipher trong trận, sát thương toàn bộ mục tiêu phe địch phải chịu sẽ tăng 
		<span class="text-yellow-400 font-semibold">40%</span>.'
		unlock="A6"
		nodes={[
			{
				icon: "/images/icons-vestige/EHR.png",
      	  	  	value: "+6%",
      		  	label: "Chính Xác Hiệu Ứng",
      		  	unlock: "A6"
			},
			{
				icon: "/images/icons-vestige/quantum.png",
      	  	  	value: "+6.4%",
      		  	label: "Tăng Sát Thương <span style='color:#8CA6E6'>Lượng Tử</span>",
      		  	unlock: "LV75"
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
				icon: "/images/icons-vestige/SPD.png",
      	  	  	value: "+4",
      		  	label: "Tốc Độ",
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
  				name="Dòm Ngó Kỹ, Bắt Cơ May"
  				elementColor={character.elementColor}
  				description='Điểm sát thương được ghi nhận của Cipher là 
				<span class="text-yellow-400 font-semibold">150%</span> điểm ghi nhận ban đầu. Khi thi triển
				<span class="underline">Đòn Đánh Theo Sau</span>, của Thiên Phú, Tấn Công của Cipher tăng
				<span class="text-yellow-400 font-semibold">80%</span>, duy trì
				<span class="text-yellow-400 font-semibold">2</span> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Vụng Về Ra Tay, Lấm Lem Ngay"
  				elementColor={character.elementColor}
  				description='Khi Cipher đánh trúng mục tiêu phe địch, có
				<span class="text-yellow-400 font-semibold">120%</span>
				<span class="underline">xác suất cơ bản</span> khiến sát thương kẻ địch phải chịu tăng 
				<span class="text-yellow-400 font-semibold">30%</span>, duy trì
				<span class="text-yellow-400 font-semibold">2</span> hiệp.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Gian Ngôn Tráo Thật Giả Bày"
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
  				name="Lòi Đuôi Vội Vụt Chân Bay"
  				elementColor={character.elementColor}
  				description='Sau khi "Khách Quen" bị mục tiêu phe ta tấn công, Cipher sẽ gây
				<span class="underline">Sát Thương Kèm Theo</span> thuộc tính Lượng Tử bằng
				<span class="text-yellow-400 font-semibold">50%</span> Tấn Công của Cipher cho kẻ đó.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Trốn Thoát Tinh Vi, Giăng Kế Dày"
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
  				name="Lừa Cả Thế Giới Chẳng Ai Hay"
  				elementColor={character.elementColor}
  				description='Tăng 
				<span class="text-yellow-400 font-semibold">350%</span> sát thương gây ra bởi
				<span class="underline">Đòn Đánh Theo Sau</span> của Thiên Phú Cipher, khi ghi nhận, sẽ ghi thêm 
				<span class="text-yellow-400 font-semibold">16%</span>
				của sát thương gây ra không thuộc phạm trù vượt mức của đòn tấn công này. 
				Sau khi thi triển Tuyệt Kỹ sẽ xóa điểm ghi nhận, hoàn trả
				<span class="text-yellow-400 font-semibold">20%</span> điểm ghi nhận bị xóa của lần này.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Bạn thật sự định đầu tư Tinh Hồn cho con này à? Thôi bỏ đi trước khi bị bác sĩ mắng..</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Dòm Ngó Kỹ, Bắt Cơ May</p>
  			<p class="text-white/80 text-sm">Tăng 50% lượng Sát Thương Chuẩn, nhưng mà thế vẫn là quá ít với E1 SP hiện nay (cụ thể là Hòa Hợp).</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Vụng Về Ra Tay, Lấm Lem Ngay</p>
    		<p class="text-white/80 text-sm">+1 Debuff hiếm nhưng không đủ nhiều để đáng đầu tư.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Lòi Đuôi Vội Vụt Chân Bay</p>
    		<p class="text-white/80 text-sm">Hỗ trợ bồi thêm DMG giống Robin, nhưng tốn tận E4 để bằng Robin?</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Lừa Cả Thế Giới Chẳng Ai Hay</p>
    		<p class="text-white/80 text-sm">Bạn không phải <span class="font-semibold">"ngài Da Ky"</span>, đừng làm gì dại dột.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['lies-dance-on-the-breeze','resolution-shines-as-pearls-of-sweat','patience-is-all-you-need','before-the-tutorial-mission-starts','eyes-of-the-prey']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Có thì dùng, không thì các Nón dưới.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: 
			Tích Tầng <span class="text-yellow-400 font-bold">5</span> có tác dụng gần bằng Trấn.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Có Speed là bú.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[3]}</strong>: 
			Lấy Chính Xác Hiệu Ứng là chính, Hồi Năng Lượng là mười.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[4]}</strong>:
			Lấy Chính Xác Hiệu Ứng. Hết.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['genius_of_brilliant_stars','pioneer_diver_of_dead_waters']}
			mixSets={[['messenger_traversing_hackerspace','sacerdos_relived_ordeal'],['messenger_traversing_hackerspace','genius_of_brilliant_stars']]}
  			planarIds={['item_firmament_frontline_glamoth','item_duran_dynasty_of_running_wolves','item_inert_salsotto','item_sprightly_vonwacq','item_lushaka_the_sunken_seas','item_penacony_land_of_the_dreams','item_broken_keel','item_fleet_of_the_ageless']}
			relicAnalysis={`
			<p class="text-xl font-bold pl-3" style="color: #EC4D37">Build Sub-DPS</p>
			<p><span class="text-amber-300 font-semibold">Thiên Tài Xuất Chúng</span>: 
			Nếu bạn muốn build Cipher thuần DPS thì có thể cân nhắc, nhưng phải đủ 170 tốc.</p>
			<p><span class="text-amber-300 font-semibold">Tiên Phong Trong Nước Chết</span>: 
			Cung cấp rất nhiều CV nếu muốn build DPS, nhưng vẫn phải đủ 170 tốc.</p>

			<p class="text-xl font-bold pl-3 mt-3"style="color: #EC4D37">Build Support</p>
			<p><span class="text-amber-300 font-semibold">MIX 2-2 Tốc+Tốc</span>: 
			Lấy 12% Tốc từ 2 bộ sao cho đủ 170+ Tốc là được.</p>
			<p><span class="text-amber-300 font-semibold">MIX 2-2 Tốc+DMG</span>: 
			Mix này chỉ để hỗ trợ thêm tí DMG cho đội.</p>
			`}
			planarAnalysis={`
			<p class="text-xl font-bold pl-3" style="color: #EC4D37">Build Sub-DPS</p>
			<p><span class="text-amber-300 font-semibold">Glamoth, Chiến Tuyến Không Trung</span>: 
			Tăng Sát Thương cho Cipher khi cô nàng đủ Tốc, mà Cipher lại có nhiều Tốc hơn thế.</p> 
			<span class="text-amber-300 font-semibold">Duran - Vương Triều Sói Hoang</span>:
			Tăng Sát Thương cho <span class="underline">Đòn Đánh Theo Sau</span> từ Thiên Phú và thêm chút CV.</p>
			<span class="text-amber-300 font-semibold">Salsotto Dừng Xoay</span>:
			Tăng chút CV, tăng Sát Thương Tuyệt Kỹ và Thiên Phú gây ra.</p>

			<p class="text-xl font-bold pl-3 mt-3"style="color: #EC4D37">Build Support</p>
			<p><span class="text-amber-300 font-semibold">Vonwacq Hoạt Bát</span>: 
			Tăng Hiệu Suất Nạp và ưu tiên hành động khi bắt đầu trận đấu.</p> 
			<p><span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>: 
			Mạnh khi hỗ trợ một nhân vật DPS dựa trên ATK và tăng Hiệu Suất Nạp rất hữu ích. Chung chung hơn hầu hết các tùy chọn khác.</p> 
			<p><span class="text-amber-300 font-semibold">Penacony, Vùng Đất Của Những Giấc Mơ</span>: 
			Lựa chọn hàng đầu khi hỗ trợ một hoặc nhiều đồng đội cùng nguyên tố với người mặc và tăng Hiệu Suất Nạp rất hữu ích. (Chỉ sử dụng với DPS Lượng Tử)
			<p><span class="text-amber-300 font-semibold">Bộ Khung Bị Gãy</span>:
			Tăng Kháng cho bản thân, tăng CV cho toàn đội.
			<p><span class="text-amber-300 font-semibold">Xianzhou Không Có Tuổi</span>:
			Lý tưởng cho các nhân vật có tỷ lệ HP%/ATK% và hoặc khi hỗ trợ các đội hưởng lợi từ ATK%. (Hữu ích để giúp Cipher trở nên trâu bò hơn một chút)
			`}
			statDescriptions={[
			  [
    			'[CD]Crit Dmg &nbsp;&nbsp;&ge; &nbsp;[CR]Crit Rate',
    			'[SPD]Tốc Độ',
    			'[quantum]<span style="color: #8CA6E6">Tăng ST Lượng Tử</span> &nbsp;&nbsp;= &nbsp;[ATK]Tấn Công',
    			'[ATK]Tấn Công &nbsp;&nbsp;= &nbsp; [ERR]Hiệu Suất Hồi Năng Lượng'
			  ],
			  [
				'[HP]HP &nbsp;&nbsp;=&nbsp;&nbsp; [DEF]DEF',
				'[SPD]Tốc Độ',
				'[HP]HP &nbsp;&nbsp;=&nbsp;&nbsp; [DEF]DEF',
				'[ERR]Hiệu Suất Hồi Năng Lượng &nbsp;&nbsp;&ge;&nbsp;&nbsp; [HP]HP &nbsp;&nbsp;=&nbsp;&nbsp; [DEF]DEF'
			  ]
			]}
			
			priorityStats={[
			'Tốc Độ &gt; Sát Thương Bạo &ge; Tỉ Lệ Bạo &gt; Tấn Công <span class="text-white/50">&nbsp;(Hoặc)&nbsp;</span> Tốc Độ &gt; Chính Xác Hiệu Ứng &ge; HP = DEF'
			]}
			endgameStats={`
			<p class="text-yellow-300 text-xl font-extrabold">BUILD SUB-DPS</p>
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">3000+</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">50%</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">180%+</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">170+</span></p>
			<p><span class="text-white/70">Chính Xác Hiệu Ứng:</span>&nbsp; <span class="font-bold">39%</span></p>

			<p class="text-yellow-300 text-xl font-extrabold mt-4">BUILD SUPPORT</p>
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">3000 ~ 4500+</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">1000 ~ 2000+</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">170+</span></p>
			<p><span class="text-white/70">Chính Xác Hiệu Ứng:</span>&nbsp; <span class="font-bold">39%</span></p>
			<p><span class="text-white/70">Hiệu Suất Hồi Năng Lượng:</span>&nbsp; <span class="font-bold">119.44%+</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['acheron','feixiao','aglaea','castorice','dr-ratio'],
    			supportDps: ['cipher','tribbie'],
    			amplifier: ['robin','ruan-mei','silver-wolf','pela'],
    			sustain: ['aventurine']
  			}}
  			tooltips={{
				dps: {
					acheron: 'Acheron cần đi cùng đồng đội là Hư Vô, trùng hợp thay Cipher cũng là Hư Vô và Cipher có thể hỗ trợ Sát Thương cho Acheron phòng trường hợp thiếu chút Sát Thương. Nhưng Cipher vẫn nên có Trấn để cải thiện vận hành trong đội hình này.',
					feixiao: 'Feixiao cần đồng đội Hành Động và gây Sát Thương nhiều, và cần đi cùng Robin, vừa hay Cipher có thể đáp ứng được tất cả yêu cầu đó.',
					'dr-ratio': 'Ông thầy này cần Debuff để chơi, và Cipher có Debuff mà không cần gắn lại.',
					aglaea: 'Nhiều tốc, Hành Động nhiều, gây Sát Thương nhiều, Cipher rất yêu.',
					castorice: 'Cipher có thể hoạt động tốt với DPS diện rộng không yêu cầu thêm thủ thuật nào khác ngoài việc chỉ khuếch đại DMG thô. Hệ số nhân "hiếm" của cô ấy khiến cô ấy có lợi thế hơn so với các hỗ trợ cung cấp chỉ số pha loãng như ATK/HP hoặc CritDMG.',
				},	
				supportDps:{	
					cipher: 'Nên đi cùng với DPS có thể gây Sát Thương lớn để "bú" ké Sát Thương Chuẩn, và có thể đi cùng các Hòa Hợp Buff cho toàn phe mình để tích lũy Sát Thương cho Thiên Phú.',
					tribbie: 'Cipher có thể thay thế Tribbie trong một vài đội hình, nhưng đâu có nghĩa 2 nhân vật này không thể cùng một đội, cho hết vào để Cipher tích Thiên Phú nào.',
				},
				amplifier:{	
					robin: 'Buff cả team, có <span class="underline">Sát Thương Kèm Theo</span> giúp Cipher tích điểm Thiên Phú.',
					'ruan-mei': 'Giống Robin.',
					'silver-wolf': 'Giảm Def, tăng Sát Thương mà đồng đội gây ra, gián tiếp giúp Cipher tích nhanh Thiên Phú.',
					pela: 'Giống Sói Bạc.',
				},
				sustain: {	
					aventurine: 'Cứ có Sát Thương là được.',
				}
			}}
			notes={{
				dps: 'Cứ cho đi cùng nhân vật nào gây ra nhiều Sát Thương là được vì Cipher có tác dụng tương tự Robin/Ruan Mei/Tribbie, \nBuff/Debuff cả team trong thời gian dài.',
				amplifier: 'Hòa Hợp Buff toàn phe đồng minh là cho đi cùng được.',
				sustain: 'Nhân vật nào chả được, miễn là có hỗ trợ Sát Thương như Aventurine, hoặc đi cùng Robin và có nhiều kỹ năng gây DMG lên mục tiêu địch.'
			}}
		/>
	</section>

	<section>
		<Title>TIPS & TRICKS</Title> 
		<ProsConsBlock 
			pros=" 
				Tốc cao tạo Điểm Chiến Kỹ cho team, siêu dương Điểm Chiến Kỹ.
				Debuff siêu hiếm, không cần tái gắn Debuff.
				Có thể vừa làm Sub DPS, vừa thay thế SP Hòa Hợp trong một vài đội hình.
				Lưu trữ sát thương của đội để gây ra cho một đòn tấn công Sát Thương Chuẩn.
				Không phụ thuộc vào chỉ số tấn công vì hầu hết sát thương đến từ Thiên Phú.
				Được xây dựng cho tương lai với nhiều tiềm năng để tối ưu hóa.
			"
			cons="
				Quá phụ thuộc vào Sát Thương mà DPS và đồng đội gây ra.
				Yêu cầu SPD rất cao để mở khóa toàn bộ sức mạnh.
				Không thể thay thế DPS truyền thống nhưng cũng không thể thay thế SP hoàn toàn được. Chỉ có thể build slave cho các DPS khác.
				Thời điểm hiện tại chưa có DPS phát huy tối đa sức mạnh Cipher được.
				Không thể chơi Auto.
				Ra mắt ngay trước Banner Aeon Animation 🐧.
			"
		/>


		<div class="text-xl font-bold mt-4 mb-2">Định Hướng Đầu Tư Cho <span style="color: {character.elementColor}">{character.name}</span>:</div>
			<span class="text-3xl font-bold mb-1 mt-3 pl-2">
				<span style="color: {character.elementColor}">S1</span> &nbsp &gt &nbsp 
				<span class="text-white/70 text-2xl">(Những Thứ Khác)</span> 
				
			</span>
		<div class="grid p-2 bg-black/20 border border-white/50 rounded-lg mt-3">
			<p class="text-lg mt-2">Yep, bạn chỉ cần mỗi cái <span class="font-semibold text-amber-400">S1</span> là quá đủ rồi.
			</p>
			<p class="text-lg mt-2 ">Mà thực ra bạn chỉ cần roll mỗi xác thôi là được rồi, còn lại để DPS lo.</p>
		</div>

		<div class="mt-8 w-full flex justify-center">
			<p class="text-white/10 font-bold">
				Nguồn Guide:
				<a
				href="https://discord.gg/W8g3nqu2p9" 
				class="hover:text-white/60 transition-colors "
				target="_blank"
				rel="noopener noreferrer"
				>
				Bệnh viện Lê Bách
				</a>
			</p>
		</div>

	</section>
</div>
