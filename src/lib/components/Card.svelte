<!-- script -->
<script lang='ts'>

</script>

<!-- html -->

<div class="card">
    <slot />
</div>

<!-- style -->
<style lang='postcss'>
    .card {
        background-color: var(--color-white);
        border-radius: 0.5rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        padding: 1rem;
    }
</style>