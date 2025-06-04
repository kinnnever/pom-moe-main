<script>
	const SPD = 100;         // ⚠ CỐ ĐỊNH - Tốc độ
	const AGGRO = 100;       // ⚠ CỐ ĐỊNH - Khiêu khích

	const stats = [
		{ dp: 0, levels: [1, 20], hp: [153, 298], atk: [95, 185], def: [59, 115] },
		{ dp: 1, levels: [20, 30], hp: [359, 3521], atk: [223, 92], def: [139, 205] },
		{ dp: 2, levels: [30, 40], hp: [3521, 4943], atk: [92, 129], def: [205, 288] },
		{ dp: 3, levels: [40, 50], hp: [4943, 6364], atk: [129, 167], def: [288, 370] },
		{ dp: 4, levels: [50, 60], hp: [6364, 7786], atk: [167, 204], def: [370, 453] },
		{ dp: 5, levels: [60, 70], hp: [7786, 9207], atk: [204, 241], def: [453, 535] },
		{ dp: 6, levels: [70, 80], hp: [9207, 10629], atk: [241, 278], def: [535, 618] },
		{ dp: 6, levels: [80, 90], hp: [10629, 12050], atk: [278, 316], def: [618, 700] }
	];
</script>

<svelte:head>
	<title>Argenti - Pom.moe</title>
</svelte:head>

<div class="flex flex-col gap-8 md:flex-row md:items-start">
	<!-- Hình ảnh -->
	<div class="md:w-2/3 flex justify-center">
		<img
			src="/images/characters-full/argenti.png"
			alt="Argenti"
			class="max-h-[100vh] object-contain"
		/>
	</div>

	<!-- Thông tin nhân vật -->
	<div class="md:w-2/4 space-y-6">
		<h1 class="text-4xl font-bold text-white">Argenti</h1>

		<!-- Bảng chỉ số -->
		<table class="w-full text-white border-collapse text-sm">
			<thead>
				<tr class="bg-white/10">
					<th class="p-2 border border-white/20">ĐP</th>
					<th class="p-2 border border-white/20">LVL</th>
					<th class="p-2 border border-white/20">HP</th>
					<th class="p-2 border border-white/20">ATK</th>
					<th class="p-2 border border-white/20">DEF</th>
					<th class="p-2 border border-white/20">SPD</th>
					<th class="p-2 border border-white/20">AGGRO</th>
				</tr>
			</thead>
			<tbody>
				{#each stats as row}
					<tr>
						<td class="p-2 border border-white/20 text-center" rowspan="2">{row.dp}</td>
						<td class="p-2 border border-white/20">{row.levels[0]}</td>
						<td class="p-2 border border-white/20">{row.hp[0]}</td>
						<td class="p-2 border border-white/20">{row.atk[0]}</td>
						<td class="p-2 border border-white/20">{row.def[0]}</td>
						<td class="p-2 border border-white/20">{SPD}</td>     <!-- ⚠ CỐ ĐỊNH -->
						<td class="p-2 border border-white/20">{AGGRO}</td>  <!-- ⚠ CỐ ĐỊNH -->
					</tr>
					<tr>
						<td class="p-2 border border-white/20">{row.levels[1]}</td>
						<td class="p-2 border border-white/20">{row.hp[1]}</td>
						<td class="p-2 border border-white/20">{row.atk[1]}</td>
						<td class="p-2 border border-white/20">{row.def[1]}</td>
						<td class="p-2 border border-white/20">{SPD}</td>     <!-- ⚠ CỐ ĐỊNH -->
						<td class="p-2 border border-white/20">{AGGRO}</td>  <!-- ⚠ CỐ ĐỊNH -->
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- THÔNG TIN KHÁC -->
<div class="mt-12 text-white space-y-8">
	<section>
		<h2 class="text-2xl font-bold mb-2">🌀 Kỹ năng</h2>
		<p><!-- Viết kỹ năng tại đây --></p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-2">🌟 Vết tích</h2>
		<p><!-- Viết vết tích tại đây --></p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-2">🧬 Tinh hồn</h2>
		<p><!-- Viết tinh hồn tại đây --></p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-2">💡 Nón ánh sáng phù hợp</h2>
		<p><!-- Viết tên nón tại đây --></p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-2">🛡️ Di vật & Phụ kiện</h2>
		<p><!-- Viết gợi ý di vật tại đây --></p>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-2">🧩 Đội hình phù hợp</h2>
		<p><!-- Viết gợi ý đội hình tại đây --></p>
	</section>
</div>
