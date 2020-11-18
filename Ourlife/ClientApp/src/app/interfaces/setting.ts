export interface ISetting {
    tagMeta: {
        title: string,
        description: string;
    };
    footer: {
        src: string;
        text: string;
    };
    hero: {
        src: string;
        text: string;
    };
    countdown:{
        value: Date;
    }
}
