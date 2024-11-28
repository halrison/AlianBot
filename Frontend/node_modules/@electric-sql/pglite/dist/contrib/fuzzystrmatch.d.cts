import { d as PGliteInterface } from '../pglite-DnNPQGYh.cjs';

declare const fuzzystrmatch: {
    name: string;
    setup: (_pg: PGliteInterface, _emscriptenOpts: any) => Promise<{
        bundlePath: URL;
    }>;
};

export { fuzzystrmatch };
