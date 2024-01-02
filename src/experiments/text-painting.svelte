<script>
	export let width = 60;
	export let height = 20;

	let mouseisdown = false;

	let text = "hello, world!";

	let lines = [];

	function clearBoard() {
		lines = [];
		for (let i = 0; i < height; i++) {
			let line = []
			for (let j = 0; j < width; j++) {
				line.push(" ");
			}
			lines.push(line);
		}
	}

	clearBoard()

	let pos = {row: 0, column: 0};

	function calculatePosition(x, y) {
		insertText(x, y)
		pos = {
			column: x,
			row: y,
		}
	}

	function insertText(x, y) {
		if (!mouseisdown) return;
		let text_lines = text.split("\n");
		console.log(text_lines);
		for (let i = y; i < height && i - y < text_lines.length; i++) {
			let line = text_lines[i-y];
			for (let j = x; i < width && j - x < line.length; j++) {
				lines[i][j] = line[j-x];
			}
		}
	}
</script>

<div class="f-col">
    <section class="f-col tool-bar">
        <label class="f-col packed">Text to insert: <textarea bind:value={text} type="text" /></label>
        <f-row>
            <label>Width: <input type="number" bind:value={width}></label>
            <label>Height: <input type="number" bind:value={height}></label>
        </f-row>
        <button class="align-self:start" on:click={clearBoard}>Clear</button>
    </section>
    
    <div class="draw-box border packed" on:mousedown={() => mouseisdown = true} on:mouseup={() => mouseisdown = false}>
        {#each lines as line, i}
            <p>
                {#each line as char, j}
                    <span on:mouseenter={() => calculatePosition(j, i)}>{@html char == " " ? "&nbsp;" : char}</span>
                {/each}
            </p>
        {/each}
    </div>
</div>


<style>
    div * {
        font-family: monospace;
    }
	.draw-box {
		font-family: monospace;
		user-select: none;
		display: flex;
		flex-direction: column;
		width: max-content;

	}
	p {
		margin: 0;
		padding: 0;
	}
	span:hover {
		background: lightblue;
	}
</style>