let DiffMatchPatchInstance = null;

export function loadDiffMatchPatch() {
    if (DiffMatchPatchInstance) {
        return DiffMatchPatchInstance;
    }

    if (typeof window !== 'undefined' && window.diff_match_patch) {
        DiffMatchPatchInstance = window.diff_match_patch;
        return DiffMatchPatchInstance;
    }

    if (typeof window !== 'undefined' && window.DiffMatchPatch) {
        DiffMatchPatchInstance = window.DiffMatchPatch;
        return DiffMatchPatchInstance;
    }

    if (typeof global !== 'undefined' && global.diff_match_patch) {
        DiffMatchPatchInstance = global.diff_match_patch;
        return DiffMatchPatchInstance;
    }

    try {
        // @ts-ignore
        const module = require('diff-match-patch');
        if (module && typeof module === 'function') {
            DiffMatchPatchInstance = module;
            return DiffMatchPatchInstance;
        }
        if (module && module.default && typeof module.default === 'function') {
            DiffMatchPatchInstance = module.default;
            return DiffMatchPatchInstance;
        }
    } catch (e) {
    }

    if (typeof require !== 'undefined') {
        try {
            return import('diff-match-patch').then(module => {
                if (module.default && typeof module.default === 'function') {
                    DiffMatchPatchInstance = module.default;
                } else if (typeof module === 'function') {
                    DiffMatchPatchInstance = module;
                }
                return DiffMatchPatchInstance;
            });
        } catch (e) {
        }
    }

    throw new Error(
        'DiffMatchPatch library is required. ' +
        'Please install it via npm: npm install diff-match-patch\n' +
        'Or include it via CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch.js"></script>'
    );
}

export function createDiffMatchPatch() {
    const DMP = loadDiffMatchPatch();

    if (DMP && typeof DMP === 'function') {
        return new DMP();
    }

    if (DMP && typeof DMP.diff_match_patch === 'function') {
        return new DMP.diff_match_patch();
    }

    throw new Error('Failed to create DiffMatchPatch instance');
}

export default {
    loadDiffMatchPatch,
    createDiffMatchPatch
};