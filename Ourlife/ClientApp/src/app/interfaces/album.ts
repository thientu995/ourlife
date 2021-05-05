export interface IAlbum {
    ListImage: string[],
    albumCategory: string,
    albumAlbum: string,
    albumType: string,
    audioLink: string,
    isShowHome: boolean,
    createDateLink: any,
    date: any,
    description: string,
    id: string,
    title: string,
    order: number,
}

export interface IAlbumAudio {
    links: string[],
    title: string,
}