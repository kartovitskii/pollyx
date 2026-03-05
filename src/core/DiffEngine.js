import { createDiffMatchPatch } from '../utils/diffMatchPatchLoader.js';

export class DiffEngine {
    constructor(options = {}) {
        this.options = {
            timeout: 1.0,
            editCost: 4,
            ...options
        };

        try {
            this.dmp = createDiffMatchPatch();
            if (this.dmp) {
                this.dmp.Diff_Timeout = this.options.timeout;
                this.dmp.Diff_EditCost = this.options.editCost;
            }
        } catch (error) {
            console.error('Failed to initialize DiffEngine:', error.message);
            // Создаем заглушку, которая будет использовать полную замену
            this.dmp = null;
        }
    }

    computeDiff(oldHtml, newHtml) {
        if (!this.dmp) {
            return {
                hasChanges: oldHtml !== newHtml,
                patches: [],
                html: newHtml,
                statistics: {
                    patchesCount: 0,
                    successfulPatches: 0,
                    failedPatches: 0
                }
            };
        }

        if (oldHtml === newHtml) {
            return {
                hasChanges: false,
                patches: [],
                html: oldHtml,
                statistics: {
                    patchesCount: 0,
                    successfulPatches: 0,
                    failedPatches: 0
                }
            };
        }

        try {
            const patches = this.dmp.patch_make(oldHtml, newHtml);
            const [patchedHtml, results] = this.dmp.patch_apply(patches, oldHtml);

            return {
                hasChanges: patches.length > 0,
                patches: patches,
                results: results,
                html: patchedHtml,
                statistics: {
                    patchesCount: patches.length,
                    successfulPatches: results.filter(r => r === true).length,
                    failedPatches: results.filter(r => r === false).length
                }
            };
        } catch (error) {
            console.warn('Diff computation failed, falling back to full replace:', error);
            return {
                hasChanges: true,
                patches: [],
                html: newHtml,
                statistics: {
                    patchesCount: 0,
                    successfulPatches: 0,
                    failedPatches: 0
                }
            };
        }
    }

    applyDiffToElement(element, diff) {
        if (!diff || !diff.hasChanges) return false;

        try {
            // Если нет патчей или dmp не работал, используем полную замену
            if (!this.dmp || diff.patches.length === 0) {
                element.innerHTML = diff.html;
                return true;
            }

            if (diff.patches.length < 5) {
                element.innerHTML = diff.html;
                return true;
            }

            this.applyPatchesSmart(element, diff);
            return true;
        } catch (error) {
            console.warn('Failed to apply diff, falling back to full replace:', error);
            element.innerHTML = diff.html;
            return true;
        }
    }

    applyPatchesSmart(element, diff) {
        const focusedElement = document.activeElement;
        const focusedElementId = focusedElement?.id;
        const selection = this.saveSelection();

        element.innerHTML = diff.html;

        if (focusedElementId) {
            const newFocusedElement = document.getElementById(focusedElementId);
            if (newFocusedElement && newFocusedElement.tagName === focusedElement?.tagName) {
                newFocusedElement.focus();
                this.restoreSelection(newFocusedElement, selection);
            }
        }
    }

    saveSelection() {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return null;

        try {
            const range = sel.getRangeAt(0);
            return {
                startContainer: this.getNodePath(range.startContainer),
                startOffset: range.startOffset,
                endContainer: this.getNodePath(range.endContainer),
                endOffset: range.endOffset
            };
        } catch (e) {
            return null;
        }
    }

    restoreSelection(element, selection) {
        if (!selection) return;

        try {
            const startNode = this.findNodeByPath(element, selection.startContainer);
            const endNode = this.findNodeByPath(element, selection.endContainer);

            if (startNode && endNode) {
                const range = document.createRange();
                range.setStart(startNode, selection.startOffset);
                range.setEnd(endNode, selection.endOffset);

                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } catch (e) {
            // Ignore selection restoration errors
        }
    }

    getNodePath(node) {
        if (!node || node === document.body) return 'body';

        const path = [];
        let currentNode = node;

        while (currentNode && currentNode !== document.body) {
            let index = 0;
            let sibling = currentNode.previousSibling;
            while (sibling) {
                index++;
                sibling = sibling.previousSibling;
            }
            path.unshift({
                tag: currentNode.nodeName,
                index: index
            });
            currentNode = currentNode.parentNode;
        }
        return path;
    }

    findNodeByPath(root, path) {
        if (path === 'body') return document.body;
        if (!Array.isArray(path)) return null;

        let node = root;
        for (const segment of path) {
            let found = null;
            let index = 0;
            for (const child of node.childNodes) {
                if (child.nodeName === segment.tag) {
                    if (index === segment.index) {
                        found = child;
                        break;
                    }
                    index++;
                }
            }
            if (!found) return null;
            node = found;
        }
        return node;
    }

    getDiffReport(diff) {
        if (!diff.hasChanges) return 'No changes detected';

        return {
            summary: `${diff.statistics.patchesCount} patches applied, ${diff.statistics.failedPatches} failed`,
            patches: diff.patches.map((patch, index) => ({
                index: index,
                changes: patch.changes.length,
                successful: diff.results[index]
            }))
        };
    }
}