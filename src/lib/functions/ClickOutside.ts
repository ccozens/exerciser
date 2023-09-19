export function clickOutside(node) {
    function handleClick(event) {
        // fire event if: event has not been prevented default, if the node does not contain the event target, and the node exists
        if(node && !node.contains(event.target) && !(event.defaultPrevented)) {
        // could fire a function or custom node event
        node.dispatchEvent(
            // CustomEvent allows us to create an event with whatever name we want
            new CustomEvent('click-outside')
        )
    }
    }

    // add event listener to the document. Listen for click, if it happens fire handleClick
    document.addEventListener('click', handleClick, true)

    return {
        destroy() {
        // remove event listener when component is destroyed
        document.removeEventListener('click', handleClick, true)
        }
    }
}