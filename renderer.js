import { GAME_CONFIG as CONFIG, THEME } from './config.js';

/**
 * @class Renderer
 * @description Handles all canvas rendering operations
 */
export class Renderer {
    /** @type {CanvasRenderingContext2D} */
    #ctx;
    /** @type {HTMLCanvasElement} */
    #canvas;

    /**
     * @param {HTMLCanvasElement} canvas - The game canvas
     */
    constructor(canvas) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');
    }

    /**
     * @param {Grid} grid - The current game grid
     */
    render(grid) {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        grid.forEachCell((cell, row, col, neighbors) => {
            if (cell === 1) {
                this.#drawCell(row, col, neighbors);
            }
        });
    }

    /**
     * @param {number} row - Cell row
     * @param {number} col - Cell column
     * @param {number} neighbors - Number of neighbors
     */
    #drawCell(row, col, neighbors) {
        this.#ctx.fillStyle = this.#getCellColor(neighbors);
        this.#ctx.beginPath();
        this.#ctx.roundRect(
            col * CONFIG.CELL_SIZE,
            row * CONFIG.CELL_SIZE,
            CONFIG.CELL_SIZE-1,
            CONFIG.CELL_SIZE-1,
            2
        );
        this.#ctx.fill();
    }

    /**
     * @private
     * @param {number} neighbors
     * @returns {string}
     */
    #getCellColor(neighbors) {
        if (neighbors <= 2) return THEME.COLORS.ALIVE.LOW;
        if (neighbors <= 4) return THEME.COLORS.ALIVE.MEDIUM;
        if (neighbors <= 6) return THEME.COLORS.ALIVE.HIGH;
        return THEME.COLORS.ALIVE.MAX;
    }

    // ... rest of the Renderer methods
}
