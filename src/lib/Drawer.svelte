<script>
    import { page } from '$app/stores';
    let open = true;
    let selectedPage = $page.url.pathname.replace("/", "")
    import { navigating } from '$app/stores';
    function myFunction(){
        selectedPage = $navigating.to.pathname.replace("/", "");
    }
    $: if($navigating) myFunction();

</script>
<style>
    .drawer-opened {
        transform: translateX(0);
        transition-duration: 0.5s;
    }

    .drawer-closed {
        transform: translateX(-130px);
        transition-duration: 0.5s;
    }
    h1{
        color: #818181;
        cursor: pointer;
        font-size: 2rem;
    }
    h1:hover{
        color: white;
        transition-duration: 500ms;
    }
    .h1-selected{
        color: white;
    }
    .expand-button{
        color: white;
        font-size: 4rem;
    }
</style>

<div class={"absolute w-40 h-screen bg-[#00080f] " + (open ? "drawer-opened" : "drawer-closed")}>
    <!--{#if open}-->
    <!--    <button class="expand-button" on:click={() => {open = !open;}}>-->
    <!--        ->-->
    <!--    </button>-->
    <!--{/if}-->
    <!--{#if !open}-->
    <!--    <div class="flex flex-row justify-end">-->
    <!--        <button class="expand-button" on:click={() => {open = !open;}}>-->
    <!--            ==-->
    <!--        </button>-->
    <!--    </div>-->
    <!--{/if}-->

    <div class="p-10">
        <h1 class={selectedPage === "" ? "h1-selected pl-1" : ""}><a href="/">Home</a></h1>
        <h1 class={selectedPage === "snake" ? "h1-selected pl-1" : ""}><a href="/snake">Snake</a></h1>
        <h1 class={selectedPage === "tetris" ? "h1-selected pl-1" : ""}><a href="/tetris">Tetris</a></h1>
    </div>
</div>