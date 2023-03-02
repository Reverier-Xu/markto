export type MarkToType = 'html' | 'terminal'

export interface MarkToHtmlOptions {
    sanitize?: boolean
    gfm?: boolean
    katex?: boolean
    prism?: boolean
}

export interface MarkToTerminalOptions {
}
