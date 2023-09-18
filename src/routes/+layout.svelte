<script>
	import '../app.postcss';
	import Analytics from '$lib/components/Analytics.svelte';
</script>

<Analytics />
<slot />


<style>
	:global(html) {
	--swatch-1: oklch(96% 0.05 147);
	--swatch-2: oklch(90% 0.2 147);
	--swatch-3: oklch(80% 0.2 147);
	--swatch-4: oklch(86% 0.32 147);
	--swatch-5: oklch(77% 0.31 147);
	--swatch-6: oklch(51% 0.2 147);
	--swatch-7: oklch(39.5% 0.16 147);
	--swatch-8: oklch(25% 0.1 147);
	--swatch-9: oklch(16% 0.06 147);
	--swatch-10: oklch(17% 0.03 147);

	--text-1: var(--swatch-1);
	--text-2: var(--swatch-2);
	--link: var(--swatch-3);
	--accent: var(--swatch-4);
	--surface-1: var(--swatch-10);
	--surface-2: var(--swatch-9);
	--surface-3: var(--swatch-8);
	--radius: 1rem;
	}

	:global(p) {
		color: var(--text-1);
		font-size: 1.5rem;
	}

	:global(h1, h2, h3) {
		color: var(--text-2);
	}

	:global(a) {
		color: var(--link);
	}

	:global(body) {
		background-color: var(--surface-2);
	}
</style>
