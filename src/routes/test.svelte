<script>
    let x = 500;
    let y = 300;
    let color = 'white';
    function handleDragDrop(e) {
        x = e.clientX;
        y = e.clientY;
    }
    function handleDragOver(e) {
        color = "red";
        console.log("tjena")
    }
</script>
<div
        on:drop={handleDragDrop}
        class="w-96 h-96 bg-red-600 top-1/3 absolute left-1/3"
        onDragOver="return false">
</div>


<div
        on:drop={handleDragDrop}
        on:dragenter={handleDragOver}
        class="w-96 h-96 bg-red-700 top-1/3 absolute left-2/3"
        onDragOver="return false">
</div>

<div style="position:absolute; left:{x}px; top:{y}px; color:{color};"
     class="bg-green-400 w-24 h-12 cursor-pointer p-2;"
     draggable=true
>
    jadå
</div>
