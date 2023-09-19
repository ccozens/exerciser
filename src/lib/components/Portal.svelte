<!-- script -->
<script lang="ts">
	export let element = 'body';
	function portal(node, element) {
		function update() {
			let target;
			target = document.querySelector(element);
			target?.appendChild(node);
			// remove hidden
			node.hidden = false;
		}

		function destroy() {
			// if child has a parent (ie, exists), remove it
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}

		update();

		return {
			update,
			destroy
		};
	}
</script>

<div use:portal hidden>
	<slot />
</div>
