<!-- script -->
<script lang='ts'>
    import Card from "./Card.svelte";
    import Timer from "./Timer.svelte";


    export let interval: number = 15;

</script>

<!-- html -->
<h2>Rest</h2>
<Timer interval={interval} />
