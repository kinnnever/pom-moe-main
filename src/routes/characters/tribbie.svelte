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
    id: 'tribbie',
    name: 'Tribbie',
    element: 'quantum',
    path: 'harmony',
	elementColor: '#8CA6E6'
  };

  let lightconeNames: string[] = [];

  const normalAttack = [
    ['15%','18%','21%','24%','27%','30%','33%','36%','39%','42%'],
    ['7,5%','9%','10,5%','12%','13,5%','15%','16,5%','18%','19,5%','21%']
  ]; 
  let NormalLevel = 1;

  const skillAttack = [
	['12%','13.2%','14.4%','15.6%','16.8%','18%','19.5%','21%','22.5%','24%','25.2%','26.4%','27.6%','28.8%','30%']
  ];
  let SkillLevel = 1;

  const ultimateAttack = [
    ['15%','16.5%','18%','19.5%','21%','22.5%','24.38%','26.25%','28.13%','30%','31.5%','33%','34.5%','36%','37.5%'],
    ['6%','6.6%','7.2%','7.8%','8.4%','9%','9.75%','10.5%','11.25%','12%','12.6%','13.2%','13.8%','14.4%','15%']
  ];
  let UltimateLevel = 1;

  const talent = [
  	['9%','9.9%','10.8%','11.7%','12.6%','13.5%','14.63%','15.75%','16.88%','18%','18.9%','19.8%','20.7%','21.6%','22.5%']
  ]
  let TalentLevel = 1;

	const SPD = 96;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

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
			Từ thánh địa được Lời Sấm Truyền Tam Thần ban phước, vị tín sứ tự chia mình thành hàng ngàn thân thể và bắt đầu bước lên cuộc hành trình xa xôi. Thánh nữ của Janusopolis, Tribios, Hậu Duệ Chrysos đã đánh cắp Ngọn Lửa của Cánh Cổng, bôn ba vì chúng sinh, mang thông điệp cứu thế đến muôn nơi. Tìm kiếm những người con mang dòng máu vàng thần thánh đó, phá vỡ bóng tối bao trùm thế gian, tiến tới một ngày mai trăng sao soi sáng.
  		</p>
		<div class="hidden md:block bg-gradient-to-l from-black/80 to-black/0 text-white text-base p-2 rounded-xl max-w-md
              absolute bottom-7 left-0">
    		<p style="text-shadow: 1px 1px 1px black">
                Từ thánh địa được Lời Sấm Truyền Tam Thần ban phước, vị tín sứ tự chia mình thành hàng ngàn thân thể và bắt đầu bước lên cuộc hành trình xa xôi. Thánh nữ của Janusopolis, Tribios, Hậu Duệ Chrysos đã đánh cắp Ngọn Lửa của Cánh Cổng, bôn ba vì chúng sinh, mang thông điệp cứu thế đến muôn nơi. Tìm kiếm những người con mang dòng máu vàng thần thánh đó, phá vỡ bóng tối bao trùm thế gian, tiến tới một ngày mai trăng sao soi sáng.
            </p>
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
  		<h3 class="text-lg font-bold mb-1">Hỏa Tiễn Một Trăm Tầng</h3>
		<p class="text-sm mb-1">
		    <span class="text-amber-400 italic">Khuếch Tán</span> | 
			<span class="text-amber-400 italic">Phá vỡ </span><span style="color: {character.elementColor}">30</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">20</span> |
			<span class="text-amber-400 italic">Hồi Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
		</p>
		<p class="text-base">Gây Sát Thương 
		<span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> cho 1 kẻ địch chỉ định tương đương
		<span class="text-yellow-400 font-semibold">{normalAttack[0][NormalLevel - 1]}</span> Giới Hạn HP của Tribbie, gây sát Thương
        <span style="color: {character.elementColor}; font-weight: bold">Lượng Tử</span> cho mục tiêu lân cận tương đương
        <span class="text-yellow-400 font-semibold">{normalAttack[1][NormalLevel - 1]}</span> Giới Hạn HP của Tribbie.
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
  		<h3 class="text-lg font-bold mb-1">Quà Tặng Đâu Hết Cả Rồin</h3>
  		<p class="text-sm mb-1">
 		    <span class="text-amber-400 italic">Hỗ Trợ</span> |
			<span class="text-amber-400 italic">Hồi năng lượng </span><span style="color: {character.elementColor}">30</span> |
			<span class="text-amber-400 italic">Tiêu hao Điểm Chiến Kỹ </span><span style="color: {character.elementColor}">1</span>
  		</p>
  		<p>Nhận "Thần Khải", duy trì
            <span class="text-yellow-400 font-semibold">3</span> hiệp, khi bắt đầu mỗi hiệp của bản thân, số hiệp duy trì sẽ giảm 1. Khi Tribbie có "Thần Khải",
			<span class="underline">Xuyên Kháng</span> Toàn Thuộc Tính của toàn bộ mục tiêu phe ta tăng
            <span class="text-yellow-400 font-semibold">{skillAttack[0][SkillLevel - 1]}</span>.
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
  			<h3 class="text-lg font-bold mb-1">Đoán Xem Ai Ở Đây Nào</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Lan</span> | 
				<span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">60</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
				<span class="text-amber-400 italic">Điểm năng lượng</span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Tiêu hao năng lượng </span>
				<span style="color: {character.elementColor}">120</span> |
				<span class="text-amber-400 italic">Hồi lại </span><span style="color: {character.elementColor}">5</span>
  			</p>
			<p class="text-base">Mở Kết Giới, gây Sát Thương
                <span style="color: {character.elementColor}" class="font-bold">Lượng Tử</span> bằng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span> Giới Hạn HP của Tribbie cho toàn bộ phe địch.
            </p>
			<p>Trong thời gian Kết Giới, sát thương mục tiêu phe địch phải chịu tăng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[0][UltimateLevel - 1]}</span>. 
                Sau khi bị mục tiêu phe ta tấn công, mỗi 1 mục tiêu bị tấn công, sẽ gây 1 lần 
                <span class="underline">Sát Thương Kèm Theo</span> thuộc tính
                <span style="color: {character.elementColor}" class="font-bold">Lượng Tử</span> bằng
                <span class="text-yellow-400 font-semibold">{ultimateAttack[1][UltimateLevel - 1]}</span>
                Giới Hạn HP của Tribbie cho mục tiêu có HP hiện tại cao nhất trong số các mục tiêu bị tấn công.
			</p>
            <p>Kết Giới duy trì
                <span class="text-yellow-400 font-semibold">2</span>  hiệp, khi bắt đầu mỗi hiệp của bản thân, số hiệp duy trì Kết Giới sẽ giảm 1.
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
  			<h3 class="text-lg font-bold mb-1">Tribbie Rất Rất Bận</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Đánh Lan</span> |
                <span class="text-amber-400 italic">Phá vỡ </span> <span style="color: {character.elementColor}">15</span><span class="text-amber-400 italic"> sức bền/hit</span> | 
				<span class="text-amber-400 italic">Hồi năng lượng</span> <span style="color: {character.elementColor}">5</span> |
  			</p>
  			<p class="text-base">Sau khi nhân vật khác của phe ta thi triển Tuyệt Kỹ, Tribbie sẽ phát động 
                <span class="underline">Đòn Đánh Theo Sau</span>, gây sát thương
                <span style="color: {character.elementColor}" class="font-bold">Lượng Tử</span> bằng
                <span class="text-yellow-400 font-semibold">{talent[0][TalentLevel - 1]}</span> Giới Hạn HP của Tribbie cho toàn bộ phe địch. 
                Hiệu ứng này mỗi nhân vật chỉ kích hoạt tối đa 1 lần, khi Tribbie thi triển Tuyệt Kỹ sẽ tái lập số lần có thể kích hoạt của nhân vật khác thuộc phe ta. 
                Nếu mục tiêu bị tiêu diệt trước khi thi triển <span class="underline">Đòn Đánh Theo Sau</span>
                thì sẽ phát động <span class="underline">Đòn Đánh Theo Sau</span> cho mục tiêu phe địch vừa mới vào trận.
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
  			<h3 class="text-lg font-bold mb-1">Nếu Vui Thì Vỗ Tay</h3>
  			<p class="text-sm mb-1">
 			    <span class="text-amber-400 italic">Cường Hóa</span>
  			</p>
  			<p class="text-base">Sau khi dùng Bí Kỹ, khi vào chiến đấu sẽ nhận "Thần Khải", duy trì
				<span class="text-yellow-400 font-semibold">3</span> hiệp.
            </p>
		</div>
	</div>
	
	
	<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên nâng cấp Kỹ Năng</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">Tuyệt Kỹ = Chiến Kỹ &gt; Thiên Phú &gt; Tấn Công Thường</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white">Tuyệt Kỹ</p>
  			<p class="text-white/80 text-sm">Khai triển kết giới, gắn Debuff hiếm lên toàn bộ kẻ địch.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Chiến Kỹ</p>
    		<p class="text-white/80 text-sm">Tăng xuyên kháng cho toàn bộ phe ta.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Thiên Phú</p>
    		<p class="text-white/80 text-sm">Hỗ trợ Sát Thương cho đồng đội, một điều mà không phải Hòa Hợp nào cũng làm được.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white">Tấn Công Thường</p>
    		<p class="text-white/80 text-sm">Chiến Kỹ chưa hết hiệu lực thì dùng.</p>
  		</div>		
	</div>
	</section>

	<section>
		<Title>VẾT TÍCH</Title>
	<TraceBlock
		icon="/images/skills/{character.id}/trace1.png"
		title="Cừu Non Ngoài Tường Thành..."
		description='Sau khi thi triển
                    <span class="underline">Đòn Đánh Theo Sau</span>
                    ủa Thiên Phú, sát thương Tribbie gây ra tăng
                    <span class="text-yellow-400 font-semibold">72%</span>, 
                    hiệu ứng này tối đa cộng dồn 
					<span class="text-yellow-400 font-semibold">3</span> tầng, duy trì 
					<span class="text-yellow-400 font-semibold">3</span> hiệp.'
		unlock="A2"
		
		nodes={[
			{
      		  	icon: "/images/icons-vestige/CR.png",
      	  	  	value: "+2.7%",
      		  	label: "Tỷ Lệ Bạo Kích",
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
		title="Quả Cầu Thủy Tinh Có Cánh!"
		description='Trong thời gian duy trì kết giới, Giới Hạn HP của Tribbie tăng, mức tăng bằng
                    <span class="text-yellow-400 font-semibold">9%</span>
                    tổng Giới Hạn HP của toàn bộ nhân vật phe ta.'
		unlock="A4"

		nodes={[
			{
				icon: "/images/icons-vestige/CD.png",
      	  	  	value: "+8%",
      		  	label: "Sát Thương Bạo Kích",
      		  	unlock: "A4"
			},
			{
				icon: "/images/icons-vestige/CR.png",
    		  	value: "+4%",
    		  	label: "Tỷ Lệ Bạo Kích",
      		  	unlock: "A5"
			}
		]}
	/>

	<TraceBlock
		icon="/images/skills/{character.id}/trace3.png"
		title="Hòn Đá Bên Ngã Rẽ?"
		description='Khi bắt đầu chiến đấu, Tribbie sẽ hồi
		<span class="text-yellow-400 font-semibold">30</span> Năng Lượng. Sau khi mục tiêu khác của phe ta tấn công, 
        cứ mỗi khi đánh trúng 1 mục tiêu sẽ khiến Tribbie hồi 
        <span class="text-yellow-400 font-semibold">1.5</span> Năng Lượng.'
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
				icon: "/images/icons-vestige/HP.png",
      	  	  	value: "+4%",
      		  	label: "HP",
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
  				name="Lễ Hội Nhặt Đường Cát"
  				elementColor={character.elementColor}
  				description='Trong thời gian duy trì Kết Giới, sau khi mục tiêu phe ta tấn công kẻ địch, sẽ gây thêm
                <span class="underline">Sát Thương Chuẩn</span> bằng
				<span class="text-yellow-400 font-semibold">24%</span> tổng sát thương của lần tấn công này lên mục tiêu bị Kết Giới gây
                <span class="underline">Sát Thương Kèm Theo</span>.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e2.png"
  				number={2}
  				name="Người Dẫn Dắt Thăm Dò Mộng Đẹp"
  				elementColor={character.elementColor}
  				description='<span class="underline">Sát Thương Kèm Theo</span> do kết giới gây ra tăng đến mức bằng 
                <span class="text-yellow-400 font-semibold">120%</span> sát thương gốc. Khi kết giới gây ra
                <span class="underline">Sát Thương Kèm Theo</span>, sẽ gây thêm 
                <span class="text-yellow-400 font-semibold">1</span> lần Sát Thương Kèm Theo.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e3.png"
  				number={3}
  				name="Kho Tàng Ngập Ánh Bình Minh"
  				elementColor={character.elementColor}
  				description='Cấp Tuyệt Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Tấn Công Thường +1, tối đa không vượt quá cấp 10.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e4.png"
  				number={4}
  				name="Bình Yên Tâm Ý Tương Thông"
  				elementColor={character.elementColor}
  				description='Trong thời gian duy trì Thần Khải, khi toàn bộ phe ta gây sát thương, sẽ bỏ qua
				<span class="text-yellow-400 font-semibold">18%</span> Phòng Thủ của mục tiêu.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e5.png"
  				number={5}
  				name="Đồng Hồ Kích Hoạt Kỳ Tích"
  				elementColor={character.elementColor}
  				description='Cấp Chiến Kỹ +2, tối đa không vượt quá cấp 15; 
                Cấp Thiên Phú +2, tối đa không vượt quá cấp 15.'
			/>
			<EidolonBlock
				icon="/images/eidolons/{character.id}/e6.png"
  				number={6}
  				name="Ngày Mai Trăng Sao Đầy Trời"
  				elementColor={character.elementColor}
  				description='Sau khi Tribbie thi triển Tuyệt Kỹ sẽ phát động 
                <span class="underline">Đòn Đánh Theo Sau</span> của Thiên Phú lên toàn bộ phe địch. Sát thương 
                <span class="underline">Đòn Đánh Theo Sau</span> của Thiên Phú gây ra tăng
				<span class="text-yellow-400 font-semibold">729%</span>.'
			/>
			</div>

			<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10">
		<h2 class="text-3xl font-semibold mt-2 mb-4">Ưu tiên đầu tư Tinh Hồn</h2>
		<p style="color: {character.elementColor}" class="text-xl font-bold mt-2 mb-5">E1 &gt; E2 &ge; E4 <span class="text-white/20">(Hoặc)</span> E6</p>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
   			<p class="font-bold text-white"><span style="color: {character.elementColor}">E1</span> 
			- Lễ Hội Nhặt Đường Cát</p>
  			<p class="text-white/80 text-sm">Tinh hồn lỗi nhất cái game này.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E2</span> 
			- Người Dẫn Dắt Thăm Dò Mộng Đẹp</p>
    		<p class="text-white/80 text-sm">Tăng Sát Thương của E1.</p>
  		</div>
  		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E4</span> 
			- Bình Yên Tâm Ý Tương Thông</p>
    		<p class="text-white/80 text-sm">Vừa xuyên kháng, vừa bỏ qua DEF, ai lại không thích chứ.</p>
  		</div>
		<div class="space-y-3 bg-black/40 p-4 rounded-lg border border-white/30">
    		<p class="font-bold text-white"><span style="color: {character.elementColor}">E6</span> 
			- Ngày Mai Trăng Sao Đầy Trời</p>
    		<p class="text-white/80 text-sm">Tribbie thành DPS luôn rồi.</p>
  		</div>
	</div>

	</section>

	<section>
		<Title>NÓN ÁNH SÁNG</Title>
		<LightconesBlock
  			ids={['if-time-were-a-flower','dance-dance-dance','memories-of-the-past','meshing-cogs']}
  			characterName={character.name}
  			exposeNames={(names) => {lightconeNames = names}}
		/>
		{#if lightconeNames.length}
  		<div class="space-y-3 bg-black/20 p-4 rounded-lg border border-white/10 text-sm text-white/80 leading-relaxed mt-4">
    	  <ol class="list-decimal list-inside space-y-2 text-white/80 text-sm leading-relaxed">
  			<li>
    		<strong class="text-amber-300">{lightconeNames[0]}</strong>: <span class="font-bold">Trấn</span> -
			Giúp dễ vận hành hơn, tuy nhiên không quá bắt buộc.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[1]}</strong>: <span class="font-bold">
			Trấn 4 Sao.
  			</li>
  			<li>
    		<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Bù Mana để duy trì Tuyệt Kỹ.
  			</li>
			<li>
			<strong class="text-amber-300">{lightconeNames[2]}</strong>: 
			Như cái trên nhưng 3 Sao.
			</li>
		  </ol>
  		</div>
		{/if}

	</section>

	<section>
		<Title>DI VẬT & PHỤ KIỆN VỊ DIỆN</Title>
		<RelicsBlock
			relicIds={['Poet_of_Mourning_Collapse','Longevous_Disciple','Eagle_of_Twilight_Line']}
			mixSets={[['Scholar_Lost_in_Erudition','Longevous_Disciple'],['Scholar_Lost_in_Erudition','Poet_of_Mourning_Collapse'],['Scholar_Lost_in_Erudition','Messenger_Traversing_Hackerspace']]}
  			planarIds={['Item_Bone_Collection_s_Serene_Demesne','Item_Inert_Salsotto','Item_Lushaka_the_Sunken_Seas','Item_Penacony_Land_of_the_Dreams','Item_Fleet_of_the_Ageless','Item_Sprightly_Vonwacq']}
			relicAnalysis={`
			<p><span class="text-amber-300 font-semibold">Nhà Thơ Khúc Bi Ca Vong Quốc</span>: 
			Bộ tập trung vào khả năng Sát Thương tốt nhất cho Tribbie nhưng buộc cô ấy phải chơi chậm. Điều này rất đáng để đánh đổi, vì đóng góp Sát Thương của Tribbie lên các mục tiêu ưu tiên trong giao tranh là đáng kể và chắc chắn đáng để đầu tư.</p>
			<p><span class="text-amber-300 font-semibold">Môn Đồ Trường Thọ</span>: 
			Không mạnh bằng bộ trên nhưng là một lựa chọn thay thế khả thi cũng như là một lựa chọn khi chơi Tribbie đi nhanh.</p>
            <p><span class="text-amber-300 font-semibold">Chim Ưng Chạng Vạng</span>:
            Chỉ dùng khi bạn đã có hiểu biết về game và biết mình đang làm gì.
			<p><span class="text-amber-300 font-semibold">Mix 2-2</span>:
			Nếu bạn không thể kiếm được bộ 4 được đề xuất với các chỉ số chính/phụ đẹp, hãy Mix tạm với bộ Học Giả để có đủ chỉ số.</p>
            
			`}
			planarAnalysis={`
			<p><span class="text-amber-300 font-semibold">Vùng Đất Nhặt Hài Cốt Tĩnh Lặng</span>:
			Tribbie có thể đáp ứng yêu cầu của bộ Cầu Dây này, là lựa chọn tập trung vào Sát Thương tốt nhất cho Tribbie.</p>
			<span class="text-amber-300 font-semibold">Salsotto Dừng Xoay</span>:
			Mặc dù là một lựa chọn khá tốt cho Tribbie, nhưng nó không giúp tăng DMG <span class="underline">Sát Thương Kèm Theo</span>, nguồn hỗ trợ Sát Thương chính của Tribbie.</p>
            <span class="text-amber-300 font-semibold">Biển Lục Địa Chìm Lushaka</span>:
			Lựa chọn hàng đầu để hỗ trợ một DPS tỷ lệ ATK và khả năng Hồi Năng Lượng (không thể tăng sức mạnh cho Linh Hồn Ký Ức).</p>
            <span class="text-amber-300 font-semibold">Penacony, Vùng Đất Của Những Giấc Mơ</span>:
			Lựa chọn hàng đầu cho các đội hỗ trợ có cùng Nguyên Tố với người mặc và khả năng Hồi Năng Lượng.</p>
            <span class="text-amber-300 font-semibold">Xianzhou Không Có Tuổi</span>:
			Thích hợp để hỗ trợ các đội tăng sức mạnh theo ATK.</p>
            <span class="text-amber-300 font-semibold">Vonwacq Hoạt Bát</span>:
			Cung cấp cho Tribbie khả năng Hồi Năng Lượng mà cô ấy có thể cần, nhưng quan trọng hơn là giúp cô ấy có thể hành động nhanh hơn và kết hợp với Tốc Độ cao đủ để cô ấy có thể di chuyển trước hầu hết các nhân vật khác để kích hoạt Tuyệt Kỹ ngay lập tức và áp dụng mọi Buff hay Debuff của bộ kỹ năng ngay khi bắt đầu trận chiến bất kể đội hình của cô ấy như thế nào (chỉ chơi khi bạn build được hơn 160+ Tốc).</p>
			`}
			statDescriptions={[[
    		'[CR]Crit Rate &nbsp;&nbsp;=&nbsp; [CD]Crit Dmg',
    		'[HP]HP &nbsp;&nbsp;&gt;&nbsp; [SPD]Tốc Độ',
    		'[HP]HP',
    		'[ERR]Hiệu Suất Hồi Năng Lượng'
			]]}
			priorityStats={
			'Tỷ Lệ Bạo = Sát Thương Bạo &ge; HP &gt; Tốc Độ'
			}
			endgameStats={`
			<p><span class="text-white/70">HP:</span>&nbsp; <span class="font-bold">5000+</span></p>
			<p><span class="text-white/70">DEF:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">ATK:</span>&nbsp; <span class="font-bold">BASE</span></p>
			<p><span class="text-white/70">CRIT RATE:</span>&nbsp; <span class="font-bold">90%+</span> &nbsp;<span class="text-white/70">(Nếu dùng bộ di vật Nhà Thơ thì chỉ cần build 60%+ và Tốc Base)</span></p>
			<p><span class="text-white/70">CRIT DMG:</span>&nbsp; <span class="font-bold">180%+</span> &nbsp;<span class="text-white/70">(Build được càng cao càng tốt)</span></p>
			<p><span class="text-white/70">SPD:</span>&nbsp; <span class="font-bold">?</span> &nbsp;<span class="text-white/70">(Có thể build Tốc chậm 95- cùng bộ di vật Nhà Thơ, hoặc build Tốc cao 120~160+ như các Hòa Hợp khác)</span></p>
			`}
		/>
	</section>

	<section>
		<Title>ĐỘI HÌNH</Title>
		<TeamBlock
			team={{
    			dps: ['castorice','therta','aglaea','feixiao'],
    			supportDps: ['tribbie'],
    			amplifier: ['robin','ruan-mei'],
    			sustain: ['gallagher','aventurine','hyacine','lingsha']
  			}}
  			tooltips={{
				dps: {
                    castorice: 'Castorice nên chơi cùng đồng đội nhiều HP để nạp Tuyệt Kỹ nhanh, Tribbie đáp ứng được yêu cầu đó. Không những vậy, Tribbie còn có các Buff và Debuff "hiếm" diện rộng, rất tốt để Linh Hồn Ký Ức của Castorice có thể Nuke.',
                    therta: ' '
                },
                supportDps: {
                    tribbie: 'Tương tác tốt với DPS chơi HP.',
                    jade: '"Có thể" dùng nếu bạn muốn trải nghiệm trò mới.'
                },
                amplifier: {
                    sunday: 'Khả năng khuếch đại Sát Thương không quá ấn tượng nhưng khả năng cải thiện vận hành với <span class="underline">Kéo Lượt</span> và <span class="underline">Hồi Năng Lượng</span> vẫn giúp Tribbie giải quyết rất nhiều nhu cầu trong chiến đấu.',
                    'male-remembrance': 'Có khả năng khuếch đại Sát Thương tốt nhưng khả năng <span class="underline">Kéo Lượt</span> khó kiểm soát.',
                    sparkle: 'Giúp Tribbie không cần build chỉ số Tốc Độ, vận hành đơn giản nhưng khuếch đại Sát Thương kém.',
                    bronya: 'Ít được khuyến nghị vì chỉ là phiên bản <span class="underline">Kéo Lượt</span> của Sunday. Có thể đi cùng với Sunday trong team 3 nô.',
                    'ruan-mei': 'Khuếch đại Sát Thương rất tốt nhưng đôi khi hơi bóp vì kẻ địch bị hạn chế, không thể tấn công Tribbie. Chỉ nên dùng trong Ảo Ảnh Tận Thế.'
                },
                sustain: {
                    gallagher: 'Hồi HP khi Tribbie tấn công, gần như luôn duy trì HP Tribbie trên 50%.',
                    lingsha: 'Mọi kỹ năng của Lighsha đều gây Sát Thương AoE, vừa kích nhiều Thiên Phú, vừa Hồi Năng Lượng cho Tribbie.'
                }
			}}
			notes={{
                dps: 'Tribbie là một Hòa Hợp với những Buff và Debuff hiếm, có kiêm luôn khả năng hỗ trợ gây Sát Thương nên Tribbie có thể đi được cùng hầu hết DPS chơi Crit thuần, đặc biệt tốt với những chủ lực có kỹ năng gây Sát Thương AoE.'
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
