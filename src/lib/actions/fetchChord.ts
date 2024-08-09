import { getRandomChord } from "$lib/utils";

type ChordResponse = {
    strings: string,
    fingering: string,
    chordName: string,
    enharmonicChordName: string,
    voicingID: string,
    tones: string
}


export default async function fetchChord(): Promise<ChordResponse | null> {
    const chord = getRandomChord();
    console.log(chord);
    try {
        const randomChordResponse = await fetch(`https://api.uberchord.com/v1/chords/${chord}`, {
            method: 'GET',

        });
        if(!randomChordResponse.ok) {
            console.log('server fail');
            throw new Error(randomChordResponse.status.toString());
        }
        return randomChordResponse.json();
    } catch (e) {
        if(e instanceof Error) {
            console.error(e.message);
        }
        return null;
    }
}