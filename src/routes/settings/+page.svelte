<script lang="ts">
	import Title from '$components/Title.svelte';
	import Icon from '@iconify/svelte';

	let members = [
		{ name: 'Lưu Thế Kiên', role: 'Trưởng nhóm', mission: 'Code chính, Nội dung' },
		{ name: 'Thùng Việt Hoàn', role: 'Thành viên', mission: 'Thuyết trình, PowerPoint phụ' },
		{ name: 'Phạm Thành Long', role: 'Thành viên', mission: 'Word chính, PowerPoint chính' },
		{ name: 'Nguyễn Thành Trung', role: 'Thành viên', mission: 'Word phụ, Nội dung' },
		{ name: 'Dương Tuấn Huy', role: 'Thành viên', mission: 'Word phụ' },
		{ name: 'Đỗ Trọng Giáp', role: 'Thành viên', mission: 'PowerPoint phụ, Nội dung' },
	];
</script>

<svelte:head>
	<title>Pom.moe - Nhóm</title>
</svelte:head>
<h1 class="mb-6 text-2xl font-bold text-white">DANH SÁCH THÀNH VIÊN</h1>

<div class="overflow-x-auto rounded-md bg-black bg-opacity-30 p-4 ring-1 ring-white/5">
	<table class="w-full table-auto border-collapse text-white">
		<thead class="bg-white/10 text-left">
			<tr>
				<th class="p-2">STT</th>
				<th class="p-2">Họ và Tên</th>
				<th class="p-2">Vai trò</th>
				<th class="p-2">Nhiệm vụ</th>
			</tr>
		</thead>
		<tbody>
			{#each members as member, i}
				<tr class="odd:bg-white/5 even:bg-white/0">
					<td class="p-2">{i + 1}</td>
					<td class="p-2">{member.name}</td>
					<td class="p-2">{member.role}</td>
					<td class="p-2">{member.mission}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
