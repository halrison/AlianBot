import { d as PGliteInterface } from '../pglite-DnNPQGYh.js';

declare const adminpack: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { adminpack };
