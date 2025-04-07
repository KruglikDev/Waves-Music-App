import { v4 as uuidv4 } from "uuid";

const chillHopData = [
  {
    name: "LoFi Chill",
    cover: "public/images/1.webp",
    artist: "BoDleasons",
    audio: "https://cdn.pixabay.com/audio/2023/07/24/audio_65d744b9d0.mp3",
    color: ["#205950", "#2ab3bf"],
    id: uuidv4(),
    active: true,
  },
  {
    name: "Good Night",
    cover: "public/images/2.webp",
    artist: "FASSounds",
    audio: "https://cdn.pixabay.com/audio/2023/07/30/audio_e0908e8569.mp3",
    color: ["#EF8EA9", "#ab417f"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Whispering Vinyl Loops",
    cover: "public/images/3.webp",
    artist: "RibhavAgrawal",
    audio: "https://cdn.pixabay.com/audio/2024/12/27/audio_3ee67607bb.mp3",
    color: ["#205950", "#48A860"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Vlog",
    cover: "public/images/4.webp",
    artist: "Pumpupthemind",
    audio: "https://cdn.pixabay.com/audio/2023/11/17/audio_c1975362e0.mp3",
    color: ["#EF8EA9", "#ab417f"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Lofi Vibes",
    cover: "public/images/5.webp",
    artist: "chill_background",
    audio: "https://cdn.pixabay.com/audio/2022/06/25/audio_4ca472b499.mp3",
    color: ["#CD607D", "#c94043"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Orchestra",
    cover: "public/images/6.webp",
    artist: "xethrocc",
    audio: "https://cdn.pixabay.com/audio/2023/08/15/audio_41ba2a2f6a.mp3",
    color: ["#205950", "#2ab3bf"],
    id: uuidv4(),
    active: false,
  },
];

export default chillHopData;
