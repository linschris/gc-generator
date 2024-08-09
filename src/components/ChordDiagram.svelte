<script lang="ts">
	import { onMount } from "svelte";
    export let notes: number[][] = [];

    const devicePixelRatio = 3;
    const fretSpacing = 40;
    const stringSpacing = 30;

    const numStrings = 6;
    const numFrets = 5;
    const width = stringSpacing * numStrings;
    const height = fretSpacing * numFrets;
    
    
    let canvas: HTMLCanvasElement | undefined;
    let ctx: CanvasRenderingContext2D | null;

    let noteCanvas: HTMLCanvasElement | undefined;
    let noteCtx: CanvasRenderingContext2D | null;
    function drawNut() {
        ctx?.fillRect(0, 0, width, 10);
    }
    /**
     * Draws the guitar neck as a backdrop to place notes
     */
    function drawGuitarNeck() {
        if(!ctx || !canvas) {
            return;
        }

        drawNut();
        // ctx.imageSmoothingEnabled = false;
        // Drawing horizontal lines, i.e. the frets
        for(let i = 0; i < numStrings; i++) {
            ctx.beginPath();
            ctx.moveTo(0, fretSpacing * i);
            ctx.lineTo(width, fretSpacing * i);
            ctx.stroke();
        }
        // Drawing vertical lines, i.e. the strings
        for(let i = 0; i < numStrings; i++) {
            ctx.beginPath();
            ctx.moveTo(stringSpacing * i, 0);
            ctx.lineTo(stringSpacing * i, height);
            ctx.stroke();
        }
        drawNotes();
    }

    function drawNotes() {
        if(!ctx) {
            return;
        }
        notes.forEach(([fretNum, stringNum]) => {
            drawNote(fretNum, stringNum);
        });
        ctx.fillText("1", 0, 150);
    }

    function drawNote(stringNum: number, fretNum: number) {
        if(!noteCtx) {
            return;
        }
        console.log(stringNum, fretNum);
        const startingX = stringNum * stringSpacing;
        const startingY = fretNum * fretSpacing;
        noteCtx.beginPath();
        noteCtx.arc(startingX, startingY - (fretSpacing / 2), 7.5, 0, Math.PI * 2, true);
        noteCtx.fill();
    }

    function setupCanvases() {
        if(!ctx || !noteCtx) {
            return;
        }
        ctx.translate(0.5 * devicePixelRatio, 0.5 * devicePixelRatio); // Lines have 1px width, so we need to shift the canvas to avoid cutoff
        noteCtx.translate(0.5 * devicePixelRatio, 0.5 * devicePixelRatio);
        ctx.scale(devicePixelRatio, devicePixelRatio);
        noteCtx.scale(devicePixelRatio, devicePixelRatio);
    }

    function clearCanvas() {
        if(!noteCtx) {
            return;
        }
        noteCtx.clearRect(0, 0, width, height);
    }

    onMount(() => {
        if(canvas) {
            ctx = canvas.getContext('2d');
            drawGuitarNeck();
        }
        if(noteCanvas) {
            noteCtx = noteCanvas.getContext('2d');
            drawNotes();
        }
    });

    $: {
        clearCanvas();
        drawNotes(notes);
    }
</script>

<div class="chord" style="width: {width}px; height: {height}px">
    <canvas bind:this={canvas} {width} {height}>
        The current chord rendered is Cmaj9.
    </canvas>
    <canvas bind:this={noteCanvas} {width} {height}>
    </canvas>
</div>

<style>
    .chord {
        position: relative;
    }
    canvas {
        position: absolute;
    }
</style>

