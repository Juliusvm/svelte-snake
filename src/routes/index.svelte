<script lang="ts">
    import { fly, blur } from 'svelte/transition';
    let visible = true;
    let status = 'waiting...';
</script>
<div class="absolute left-1/3 top-1/3 w-1/3 h-1/3 flex flex-col justify-center items-center bg-black opacity-90" in:fly={{ y: -80 }}>
    <h1 class="text-7xl text-white">
        Welcome
    </h1>
<!--    <label>-->
<!--        <input class="w-10 h-10" type="checkbox" bind:checked={visible}>-->
<!--        visible-->
<!--    </label>-->
    <!--{#if visible}-->
    <!--    <p-->
    <!--            class="bg-white h-20 w-20 absolute top-10"-->
    <!--            transition:fly="{{ y: 200, duration: 500 }}"-->
    <!--    >-->
    <!--    </p>-->
    <!--{/if}-->
</div>



