export type YoutubeVideo = {
    search: string;
    results: number | string;
    sort: string;
};

export type VideoInfo = {
    kind?: string;
    etag?: string;
    id?: {
        kind: string;
        videoId: string;
    };
    snippet?: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            high: {
                url: string;
                width: number;
                height: number;
            };
        };
        channelTitle?: string;
        liveBroadcastContent?: string;
        publishTime?: string;
    };
};

export type Data = {
    data?: VideoInfo[];
    search: string;
};
