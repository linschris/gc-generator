<script lang="ts">
	import { onDestroy } from "svelte";
	import ChordDiagram from "../components/ChordDiagram.svelte";

    export let data;

    console.log(data.chord);

    const cMaj9Notes = [[1, 3], [2, 2], [4, 1]]
    const randomNotes = data.chord?.[0].strings?.split(" ").map((fretNum, i) => {
        return [i, fretNum];
    });
    let on = true;
    // const interval = setInterval(() => {
    //     notes = on ? cMaj9Notes : randomNotes;
    //     on = !on;
    // }, 1000)
    $: notes = randomNotes;
    $: console.log(notes);
    // onDestroy(() => clearInterval(interval))
</script>
<h1>COTD</h1>
<!-- Carousel of chords for different positions up and down the neck -->

<p>The current chord of the day is: {data.chord[0].chordName.split(",").join('')}!</p>
<ChordDiagram {notes}/>
<ChordDiagram notes={cMaj9Notes}/>



<!-- Chord Diagram -->
<!-- Starting Fret -->

<!-- Notes -->
<style>

</style>