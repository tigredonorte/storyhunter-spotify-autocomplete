interface Image {
  url: string;
  height: string;
  width: string;
}

export interface Album {
  id: string;
  name: string;
  release_date: string;
  images: Image[];
  tracks?: { items: Track[] };
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  albums?: { items: Album[] };
}

export interface Track {
  id: string;
  name: string;
  preview_url: string;
  album: Album;
  duration_ms?: string;
}

export type Item = Album | Artist | Track

export interface Results {
  albums: {
    href: string;
    items: Album[];
  },
  artists: {
    href: string;
    items: Artist[];
  },
  tracks: {
    href: string;
    items: Track[];
  },
}