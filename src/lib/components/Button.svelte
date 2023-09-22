<script lang="ts">
    export  let text: string = "";

</script>

<button on:click>{text}</button>


<style>
    button {
        background-color: var(--accent);
        color: var(--surface-1);
        margin: 0 auto;
        border: none;
        border-radius: var(--radius);
        padding: 1rem 2rem;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        width: var(--width, 100%);
        height: var(--height, 4rem);
        opacity: var(--opacity, 1);
    }

    button:hover, button:focus {
        background-color: var(--surface-1);
        color: var(--text-2);
        border: solid 1px var(--accent);
        scale: var(--scale, 1.2);
        opacity: 1;
    }
</style>