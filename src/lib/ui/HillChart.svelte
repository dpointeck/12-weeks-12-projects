<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let pathD = ''; // This will hold the path data
	let handleCX = 10; // Initial X position of the handle
	let handleCY = 290; // Initial Y position of the handle

	function dragStarted(event: any) {
		//@ts-ignore
		d3.select(this).raise();
	}

	function dragged(event: DragEvent) {
		const mouseX = event.x;
		const mouseY = event.y;
		const closestPoint = getClosestPointOnPath(mouseX, mouseY);

        if (!closestPoint) {
            return;
        }

		handleCX = closestPoint.x;
		handleCY = closestPoint.y;
	}

	function dragEnded(event: DragEvent) {
		// Optional: do something when the drag ends
	}

	function dragBehavior(node: Element) {
		const drag = d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded);

		drag(d3.select(node));
	}

	function getClosestPointOnPath(mouseX: number, mouseY: number) {
		let minDist = Infinity;
		let closestPoint = null;

        // Get a reference to the path element
        const pathNode = document.querySelector('path');

        if (!pathNode) {
            return null;
        }
		// Iterate over a range of points along the path
		for (let i = 0; i <= 1; i += 0.01) {
			// Adjust step size as needed
			const point = pathNode.getPointAtLength(i * pathNode.getTotalLength());

			const dist = Math.sqrt(Math.pow(point.x - mouseX, 2) + Math.pow(point.y - mouseY, 2));
			if (dist < minDist) {
				minDist = dist;
				closestPoint = point;
			}
		}

		return closestPoint;
	}

	onMount(() => {
		const path = d3.path();
		path.moveTo(10, 290); // Starting point
		path.quadraticCurveTo(250, 10, 490, 290); // Create a curve

		pathD = path.toString();
	});
</script>

<div class="mx-auto mt-12 max-w-[500px]">
	<svg width="500" height="300">
		<path d={pathD} fill="none" stroke="black" />
		<circle cx={handleCX} cy={handleCY} r="10" class="fill-sky-300" use:dragBehavior />
	</svg>
</div>
