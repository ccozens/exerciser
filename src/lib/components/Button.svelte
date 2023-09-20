<script lang="ts">
    export  let text: string = "";
</script>

<button on:click>{text}</button>


<style>
    button {
        background-color: var(--accent);
        color: var(--surface-1);
        border: none;
        border-radius: var(--radius);
        padding: 1rem 2rem;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        width: 100%;
        height: 4rem;
    }

    button:hover, button:focus {
        background-color: var(--surface-1);
        color: var(--text-2);
        border: solid 1px var(--accent);
        scale: 1.2;
    }
</style>