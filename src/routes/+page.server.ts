import fetchChord from "$lib/actions/fetchChord";

export async function load() {
    return { 
        chord: await fetchChord()
    }
}