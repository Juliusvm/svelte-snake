<script context="module" lang="ts">
    import Drawer from "../lib/Drawer.svelte";
    import "../app.css";
    import {initFirestore} from "../initFirestore";
    initFirestore();
</script>
<Drawer/>
<slot />
