interface Image {
  url: string;
  height: string;
  width: string;
}

export interface Album {
  release_date: string;
  name: string;
  images: Image[]
}

export interface Artist {
  name: string;
  images: Image[]
}

export interface Track {
  name: string;
  album: Album;
}

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