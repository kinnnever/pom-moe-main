<script lang="ts">
  import Title from '../components/Title.svelte'
  export let text: string;
  export let elementColor: string = '#ffffff';
  export let icon: string = '';
</script>

<div class="flex items-center mt-6">
  <Title>LINH HỒN KÝ ỨC</Title> 
  <img src={icon} 
				alt="pet"
				class="h-20 w-20 md:h-14 md:w-14 object-cover border-2 border-white rounded-full ml-8 mr-4"
				style="box-shadow: -2.5px 2.5px 0 {elementColor}, -5px 5px 0 #444"
			/>
  <h1 class="relative text-white font-bold text-3xl md:text-5xl inline-block leading-tight"
      style="text-shadow: -2.5px 2.5px 0 {elementColor}, -5px 5px 0 #444;">
        {text}
  </h1>
</div>