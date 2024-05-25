import { PlaylistService } from "./playlist/playlist.service";
import { Hono } from "hono";

export class LibraryService {
    private readonly lib = new Hono().basePath('/library');
    
    constructor() {
        this.initRoutes();
    }
    
    private initRoutes() {
        this.lib.get('/get-All-Playlists', (ctx) => {
            return ctx.json({ message: 'get all users' });
        });
        this.lib.route('/', (new PlaylistService()).PlaylistInstance());
    }

    public LibInstance() {
        return this.lib;
    }
}
