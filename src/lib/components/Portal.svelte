<!-- script -->
<script lang="ts">
	function portal(node: HTMLElement) {
		// on mount, append node to body
		function update() {
			let target;
			target = document.querySelector('body');
			target?.appendChild(node);
			// remove hidden
			node.hidden = false;
		}

		// on destroy, remove node from body
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

<!-- use: directive attaches portal to the DOM -->
<div use:portal hidden>
	<!-- content in slot is rendered outside the DOM hierarchy -->
	<slot />
</div>
