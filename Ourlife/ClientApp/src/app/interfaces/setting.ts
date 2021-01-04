export interface ISetting {
    tagMeta: {
        title: string,
        description: string;
    };
    footer: {
        src: string;
        text: string;
        form: {
            id: string,
            data: {
                id: string,
                name: string,
                value: string,
            }
        };
    };
    hero: {
        src: string;
        text: string;
    };
    countdown:{
        value: Date;
    }
}
