<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  const character = {
    id: 'acheron',
    name: 'Acheron',
    element: 'Lightning',
    path: 'Nihility'
  };
</script>

<div class="character-page">
  <div class="layout">
    <img
      src={`/images/characters-full/${character.id}.png`}
      alt={character.name}
      class="character-image"
    />

    <div class="info">
      <h1>{character.name}</h1>
      <p><strong>Nguyên tố:</strong> ⚡ {character.element}</p>
      <p><strong>Vận mệnh:</strong> {character.path}</p>

      <h2>Chỉ số cơ bản</h2>
      <ul>
        <li><strong>HP:</strong> <!-- Nhập tay HP gốc --></li>
        <li><strong>ATK:</strong> <!-- Nhập tay ATK gốc --></li>
        <li><strong>DEF:</strong> <!-- Nhập tay DEF gốc --></li>
        <li><strong>SPD:</strong> <!-- Nhập tay SPD gốc --></li>
      </ul>
    </div>
  </div>

  <h2>📊 Bảng chỉ số theo mốc Đột Phá</h2>
  <table>
    <thead>
      <tr><th>ĐP</th><th>Lv</th><th>HP</th><th>ATK</th><th>DEF</th></tr>
    </thead>
    <tbody>
      <tr><td>0</td><td>Lv1–20</td><td><!-- nhập HP --></td><td><!-- nhập ATK --></td><td><!-- nhập DEF --></td></tr>
      <tr><td>1</td><td>20–30</td><td><!-- nhập HP --></td><td><!-- nhập ATK --></td><td><!-- nhập DEF --></td></tr>
      <tr><td>2</td><td>30–40</td><td><!-- nhập HP --></td><td><!-- nhập ATK --></td><td><!-- nhập DEF --></td></tr>
      <tr><td>3</td><td>40–50</td><td><!-- nhập HP --></td><td><!-- nhập ATK --></td><td><!-- nhập DEF --></td></tr>
      <tr><td>4</td><td>50–60</td><td><!-- nhập HP --></td><td><!-- nhập ATK --></td><td><!-- nhập DEF --></td></tr>
      <tr><td>5</td><td>60–70</td><td><!-- nhập HP --></td><td><!-- nhập ATK --></td><td><!-- nhập DEF --></td></tr>
      <tr><td>6</td><td>70–80</td><td><!-- nhập HP --></td><td><!-- nhập ATK --></td><td><!-- nhập DEF --></td></tr>
    </tbody>
  </table>

  <h2>✨ Kỹ năng</h2>

  <div class="skill-block">
    <h3>1. Đòn đánh thường: <!-- Tên kỹ năng --></h3>
    <p><!-- Mô tả kỹ năng --></p>
    <table>
      <thead><tr><th>Lv</th><th>Hiệu ứng</th></tr></thead>
      <tbody>
        <tr><td>1</td><td><!-- nhập --> </td></tr>
        <tr><td>2</td><td><!-- nhập --> </td></tr>
        <!-- ... -->
      </tbody>
    </table>
  </div>

  <div class="skill-block">
    <h3>2. Chiêu kỹ năng: <!-- Tên kỹ năng --></h3>
    <p><!-- Mô tả kỹ năng --></p>
    <!-- Bảng cấp độ tương tự -->
  </div>

  <div class="skill-block">
    <h3>3. Tuyệt kỹ: <!-- Tên tuyệt kỹ --></h3>
    <p><!-- Mô tả tuyệt kỹ --></p>
    <!-- Bảng cấp độ tương tự -->
  </div>

  <h2>🔮 Vết tích</h2>
  <!-- Mô tả vết tích và hiệu ứng khi mở -->

  <h2>💡 Nón Ánh Sáng Thích Hợp</h2>
  <!-- Gợi ý nón ánh sáng -->

  <h2>⚙️ Di Vật và Phụ Kiện</h2>
  <!-- Gợi ý 2 hoặc 4 mảnh -->

  <h2>👥 Đội Hình Đề Xuất</h2>
  <!-- Tên đồng đội, lý do phù hợp -->
</div>

<style>
  .layout {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    align-items: flex-start;
  }

  .character-image {
    width: 280px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }

  .info {
    flex: 1;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: center;
  }

  th {
    background-color: #f0f0f0;
  }

  .skill-block {
    margin-top: 1.5rem;
  }

  .skill-block table {
    margin-top: 0.5rem;
  }
</style>
