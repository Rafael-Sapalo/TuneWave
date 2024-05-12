import { Hono } from 'hono';

export class PlaylistService {
    private readonly playlist = new Hono().basePath('/playlist');

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.playlist.post('/create', (ctx) => {
            return ctx.json({ message: 'Playlist created' });
        });

        this.playlist.get('/:id', (ctx) => {
            return ctx.json({ message: 'got the playlist' });
        });

        this.playlist.put('/:id', (ctx) => {
            return ctx.json({ message: 'Playlist updated' });
        });

        this.playlist.delete('/:id', (ctx) => {
            return ctx.json({ message: 'Playlist deleted' });
        });
    }

    public PlaylistInstance(): any {
        return this.playlist;
    }
}
