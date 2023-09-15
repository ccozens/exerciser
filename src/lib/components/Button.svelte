<script lang="ts">
    import { started } from "$lib/stores";

    export  let text: string = "";

</script>

<button on:click>{text}</button>


<style>
    button {
        background-color: var(--accent);
        color: var(--surface-1);
        border: none;
        border-radius: 0.5rem;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
    }

    button:hover {
        background-color: var(--swatch-5);
    }
</style>