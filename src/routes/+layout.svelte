<script>
	import '../app.postcss';
	import Analytics from '$lib/components/Analytics.svelte';
</script>

<Analytics />
<slot />


<style>
	:global(html) {
	--swatch-1: oklch(99% 0.05 147);
	--swatch-2: oklch(90% 0.1 147);
	--swatch-3: oklch(80% 0.2 147);
	--swatch-4: oklch(86% 0.31 147);
	--swatch-5: oklch(77% 0.31 147);
	--swatch-6: oklch(50% 0.27 147);
	--swatch-7: oklch(35% 0.25 147);
	--swatch-8: oklch(25% 0.2 147);
	--swatch-9: oklch(13% 0.2 147);
	--swatch-10: oklch(5% 0.1 147);

	--text-1: var(--swatch-1);
	--text-2: var(--swatch-2);
	--link: var(--swatch-3);
	--accent: var(--swatch-4);
	--surface-1: var(--swatch-10);
	--surface-2: var(--swatch-9);
	--surface-3: var(--swatch-8);
	}

	:global(p) {
		color: var(--text-1);
	}

	:global(h1, h2, h3) {
		color: var(--text-2);
	}

	:global(a) {
		color: var(--link);
	}

	:global(body) {
		background-color: var(--surface-1);
	}
</style>
