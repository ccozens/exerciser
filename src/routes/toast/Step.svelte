<script>
	export let label
	export let tween
</script>

<p>
	{label}: {$tween.toFixed(2)}%
</p>
<progress value={$tween} max=100/>