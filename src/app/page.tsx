"use client";

import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";

type WrappedData = {
  artists: string[];
  songs: string[];
  minutes: number;
  genre: string;
};

// state vide, on utilise les placeholders pour remplir la carte
const defaultData: WrappedData = {
  artists: ["", "", "", "", ""],
  songs: ["", "", "", "", ""],
  minutes: 10055666,
  genre: "Talk",
};

const artistPlaceholders = [
  "Charlie Kirk",
  "DJ Patapim",
  "Nonna Delirio",
  "Italian Brainrot FM",
  "Lil Tralalero",
];

const songPlaceholders = [
  "We Are Charlie Kirk",
  "Brr Brr Patapim Funk",
  "Tralalero Tralala",
  "Pasta e Techno",
  "Mamma Mia (Nightcore)",
];

export default function Home() {
  const [data, setData] = useState<WrappedData>(defaultData);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleArtistChange = (index: number, value: string) => {
    const copy = [...data.artists];
    copy[index] = value;
    setData({ ...data, artists: copy });
  };

  const handleSongChange = (index: number, value: string) => {
    const copy = [...data.songs];
    copy[index] = value;
    setData({ ...data, songs: copy });
  };

  const handleMinutesChange = (value: string) => {
    const num = Number(value.replace(/\D/g, ""));
    setData({ ...data, minutes: isNaN(num) ? 0 : num });
  };

  const handleGenreChange = (value: string) => {
    setData({ ...data, genre: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;

    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#f4f1ea",
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "wrapefy-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleOpenInstagram = () => {
    window.open("https://instagram.com", "_blank");
  };

  // petit composant pour une ligne d’artiste / song alignée
  const ListItem = ({ index, label }: { index: number; label: string }) => (
    <li className="flex items-center text-[14px] font-medium tracking-tight">
      <span className="w-4 shrink-0 font-semibold">{index + 1}</span>
      <span className="ml-2 truncate whitespace-nowrap">{label}</span>
    </li>
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* HEADER */}
      <header className="w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#111111] flex items-center justify-center">
              <div className="flex gap-[3px] items-end">
                <div className="w-[3px] h-[9px] rounded-full bg-[#32e26b]" />
                <div className="w-[3px] h-[7px] rounded-full bg-[#32e26b]" />
                <div className="w-[3px] h-[5px] rounded-full bg-[#32e26b]" />
              </div>
            </div>
            <span className="font-semibold tracking-tight text-lg">
              Wrapefy
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-neutral-300">
            <a href="#editor" className="hover:text-white">
              Create yours
            </a>
            <a
              href="https://wrapefy.com"
              className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full border border-neutral-700 hover:border-neutral-500"
            >
              wrapefy.com
            </a>
          </nav>
        </div>
      </header>

      {/* HERO / LANDING */}
      <section className="w-full border-b border-neutral-900 bg-linear-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Fake your{" "}
              <span className="text-emerald-400">Spotify-style Wrapped</span>
              <br />
              in seconds.
            </h1>
            <p className="text-sm md:text-base text-neutral-300 max-w-md">
              Wrapefy lets you generate a fake “Wrapped” card with custom
              artists, songs, minutes and even a photo. Share it with friends,
              troll your group chats or make memes for social media.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#editor"
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
              >
                Create your fake Wrapped
              </a>
            </div>
          </div>

          {/* Example card (static demo) */}
          <div className="flex-1 flex justify-center">
            <div
              className="w-[320px] h-[620px] rounded-4xl overflow-hidden shadow-2xl border border-[#222222]"
              style={{ backgroundColor: "#f4f1ea", color: "#111111" }}
            >
              {/* TOP SECTION */}
              <div className="relative h-[52%]">
                {/* checker pattern bloc */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 right-0 h-8 flex">
                    <div className="w-full grid grid-cols-14">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div
                          key={i}
                          className={i % 2 === 0 ? "bg-black" : "bg-white"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-8 right-0 bottom-0 w-10 flex">
                    <div className="w-full grid grid-rows-12">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className={i % 2 === 0 ? "bg-black" : "bg-white"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* contenu au-dessus */}
                <div className="relative z-10 h-full flex">
                  {/* bande violette avec 2025 */}
                  <div
                    className="w-24 relative overflow-hidden flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(180deg,#6b5bff 0%,#4b3fff 100%)",
                    }}
                  >
                    <span className="absolute -left-10 text-[80px] font-extrabold leading-none text-white -rotate-90 tracking-tight">
                      2025
                    </span>
                    <svg
                      viewBox="0 0 100 200"
                      className="absolute inset-0 opacity-45"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M5 20 C 30 40, 50 10, 90 40 S 70 120, 90 150 60 180, 10 190"
                        fill="none"
                        stroke="#2b1f80"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>

                  {/* zone violette + image fake */}
                  <div className="flex-1 h-full flex pt-4 pr-4 pb-4 pl-0">
                    <div
                      className="flex-1 h-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(145deg,#6b5bff 0%,#7f63ff 40%,#4b3fff 100%)",
                      }}
                    >
                      <div className="relative w-[94%] h-[90%] bg-black">
                        <div className="absolute inset-[3px] bg-[#f4f1ea] flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-[#f0b48a] border-4 border-black flex items-center justify-center">
                            <span className="text-3xl font-extrabold text-black">
                              :)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM – texte statique */}
              <div
                className="flex-1 px-6 pt-5 pb-5"
                style={{ backgroundColor: "#111111", color: "#f8f8f8" }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                      Top Artists
                    </p>
                    <ul className="mt-2 space-y-1">
                      {artistPlaceholders.map((a, i) => (
                        <ListItem key={i} index={i} label={a} />
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                      Top Songs
                    </p>
                    <ul className="mt-2 space-y-1">
                      {songPlaceholders.map((s, i) => (
                        <ListItem key={i} index={i} label={s} />
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-6 items-end">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                      Minutes Listened
                    </p>
                    <p className="mt-1 text-[22px] font-extrabold tracking-tight">
                      10,055,666
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                      Top Genre
                    </p>
                    <p className="mt-1 text-[18px] font-extrabold tracking-tight">
                      Talk
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#f4f1ea] flex items-center justify-center">
                      <div className="flex gap-0.5 items-end">
                        <div className="w-[3px] h-[9px] rounded-full bg-[#32e26b]" />
                        <div className="w-[3px] h-[7px] rounded-full bg-[#32e26b]" />
                        <div className="w-[3px] h-[5px] rounded-full bg-[#32e26b]" />
                      </div>
                    </div>
                    <span className="tracking-tight">Wrapefy Demo</span>
                  </div>
                  <span className="tracking-wide">WRAPEFY.COM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="w-full border-b border-neutral-900 bg-neutral-950"
      >
        <div className="max-w-5xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6 text-sm text-neutral-300">
          <div>
            <h3 className="font-semibold mb-1 text-white">Custom everything</h3>
            <p>Edit artists, songs, minutes listened and your top genre.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-white">Upload a photo</h3>
            <p>Use any picture (you + friends, memes, pets, whatever).</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-white">One-click export</h3>
            <p>Download your card as a PNG, ready to share on socials.</p>
          </div>
        </div>
      </section>

      {/* EDITOR */}
      <section
        id="editor"
        className="w-full flex-1 bg-neutral-900 border-t border-neutral-900"
      >
        <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center gap-10">
          {/* FORM */}
          <section className="w-full max-w-md space-y-5">
            <h2 className="text-2xl font-bold tracking-tight">
              Create your own card
            </h2>
            <p className="text-sm text-neutral-300">
              Fill in your fake stats and upload a picture. The preview updates
              live. When you&apos;re happy, export it as an image.
            </p>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-xs uppercase tracking-[0.14em] text-neutral-400 mb-1">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:bg-emerald-400"
              />
              <p className="mt-1 text-xs text-neutral-400">
                This picture will appear in the top part of the card.
              </p>
            </div>

            {/* TOP ARTISTS */}
            <div>
              <label className="block text-xs uppercase tracking-[0.14em] text-neutral-400 mb-2">
                Top Artists
              </label>
              <div className="space-y-1.5">
                {data.artists.map((artist, i) => (
                  <input
                    key={i}
                    type="text"
                    value={artist}
                    onChange={(e) => handleArtistChange(i, e.target.value)}
                    placeholder={artistPlaceholders[i]}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ))}
              </div>
            </div>

            {/* TOP SONGS */}
            <div>
              <label className="block text-xs uppercase tracking-[0.14em] text-neutral-400 mb-2">
                Top Songs
              </label>
              <div className="space-y-1.5">
                {data.songs.map((song, i) => (
                  <input
                    key={i}
                    type="text"
                    value={song}
                    onChange={(e) => handleSongChange(i, e.target.value)}
                    placeholder={songPlaceholders[i]}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ))}
              </div>
            </div>

            {/* MINUTES + GENRE */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] text-neutral-400 mb-1">
                  Minutes listened
                </label>
                <input
                  type="text"
                  value={data.minutes.toLocaleString("en-US")}
                  onChange={(e) => handleMinutesChange(e.target.value)}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] text-neutral-400 mb-1">
                  Top genre
                </label>
                <input
                  type="text"
                  value={data.genre}
                  onChange={(e) => handleGenreChange(e.target.value)}
                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
              >
                Download PNG ⬇️
              </button>
              <button
                type="button"
                onClick={handleOpenInstagram}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-800 transition"
              >
                Open Instagram
              </button>
            </div>
          </section>

          {/* EDITABLE CARD */}
          <section
            ref={cardRef}
            className="w-[360px] h-[640px] rounded-4xl overflow-hidden shadow-2xl border border-[#222222] flex flex-col"
            style={{ backgroundColor: "#f4f1ea", color: "#111111" }}
          >
            {/* TOP SECTION */}
            <div className="relative h-[58%]">
              {/* checker pattern */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-8 flex">
                  <div className="w-full grid grid-cols-14">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className={i % 2 === 0 ? "bg-black" : "bg-white"}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute top-8 right-0 bottom-0 w-10 flex">
                  <div className="w-full grid grid-rows-12">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={i % 2 === 0 ? "bg-black" : "bg-white"}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 h-full flex">
                {/* bande violette */}
                <div
                  className="w-24 relative overflow-hidden flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(180deg,#6b5bff 0%,#4b3fff 100%)",
                  }}
                >
                  <span className="absolute -left-10 text-[80px] font-extrabold leading-none text-white -rotate-90 tracking-tight">
                    2025
                  </span>
                  <svg
                    viewBox="0 0 100 200"
                    className="absolute inset-0 opacity-45"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M5 20 C 30 40, 50 10, 90 40 S 70 120, 90 150 60 180, 10 190"
                      fill="none"
                      stroke="#2b1f80"
                      strokeWidth="4"
                    />
                  </svg>
                </div>

                {/* zone violette + vraie image */}
                <div className="flex-1 h-full flex pt-4 pr-4 pb-4 pl-0">
                  <div
                    className="flex-1 h-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(145deg,#6b5bff 0%,#7f63ff 40%,#4b3fff 100%)",
                    }}
                  >
                    <div className="relative w-[94%] h-[90%] bg-black">
                      <div className="absolute inset-[3px] bg-[#f4f1ea] overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt="Uploaded"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-[#111111] text-center px-4">
                            Upload a photo on the left to show it here.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div
              className="flex-1 px-6 pt-5 pb-5"
              style={{ backgroundColor: "#111111", color: "#f8f8f8" }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.16em] mb-2"
                    style={{ color: "#a3a3a3" }}
                  >
                    Top Artists
                  </p>
                  <ul className="space-y-1">
                    {data.artists.map((artist, i) => (
                      <ListItem
                        key={i}
                        index={i}
                        label={artist || artistPlaceholders[i]}
                      />
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.16em] mb-2"
                    style={{ color: "#a3a3a3" }}
                  >
                    Top Songs
                  </p>
                  <ul className="space-y-1">
                    {data.songs.map((song, i) => (
                      <ListItem
                        key={i}
                        index={i}
                        label={song || songPlaceholders[i]}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-6 items-end">
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "#a3a3a3" }}
                  >
                    Minutes Listened
                  </p>
                  <p className="mt-1 text-[24px] font-extrabold tracking-tight">
                    {data.minutes.toLocaleString("en-US")}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "#a3a3a3" }}
                  >
                    Top Genre
                  </p>
                  <p className="mt-1 text-[20px] font-extrabold tracking-tight">
                    {data.genre}
                  </p>
                </div>
              </div>

              <div
                className="mt-5 flex items-center justify-between text-[11px]"
                style={{ color: "#a3a3a3" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#f4f1ea] flex items-center justify-center">
                    <div className="flex gap-0.5 items-end">
                      <div className="w-[3px] h-[9px] rounded-full bg-[#32e26b]" />
                      <div className="w-[3px] h-[7px] rounded-full bg-[#32e26b]" />
                      <div className="w-[3px] h-[5px] rounded-full bg-[#32e26b]" />
                    </div>
                  </div>
                  <span className="tracking-tight">Wrapefy</span>
                </div>
                <span className="tracking-wide">WRAPEFY.COM</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
          <span>
            © {new Date().getFullYear()} Wrapefy. Not affiliated with Spotify.
          </span>
          <span>Built in a few hours for fun.</span>
        </div>
      </footer>
    </main>
  );
}
