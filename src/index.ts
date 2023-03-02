import { Processor, unified } from 'unified'
import type { MarkToHtmlOptions, MarkToTerminalOptions } from './interface'
import remarkParse from 'remark-parse'


type IParams = { type: 'html', options?: MarkToHtmlOptions } | { type: 'terminal', options?: MarkToTerminalOptions }

export class MarkTo {
    private processor: Processor | undefined

    public constructor() { }

    public async init (params: IParams) {
        this.processor = unified().use(remarkParse)
        switch (params.type) {
            case 'html':
                await this.initHtml(params.options as MarkToHtmlOptions)
                break
            case 'terminal':
                await this.initTerminal(params.options as MarkToTerminalOptions)
                break
        }
    }

    public async render (markdown: string) {
        let result = await this.processor?.process(markdown)
        return result?.toString()
    }

    private async initHtml (options?: MarkToHtmlOptions) {
        const remarkRehype = await import('remark-rehype')
        const rehypeStringify = await import('rehype-stringify')
        /* remark */ {
            if (options?.gfm) {
                const remarkGfm = await import('remark-gfm')
                this.processor?.use(remarkGfm.default)
            }
            if (options?.katex) {
                const remarkMath = await import('remark-math')
                this.processor?.use(remarkMath.default)
            }
        }

        this.processor?.use(remarkRehype.default)

        /* rehype */ {
            if (options?.katex) {
                const rehypeKatex = await import('rehype-katex')
                this.processor?.use(rehypeKatex.default)
            }
            if (options?.prism) {
                const rehypePrismPlus = await import ('rehype-prism-plus/common')
                this.processor?.use(rehypePrismPlus.default)
            }
            if (options?.sanitize) {
                const rehypeSanitize = await import('rehype-sanitize')
                this.processor?.use(rehypeSanitize.default)
            }
            this.processor?.use(rehypeStringify.default)
        }
    }

    private async initTerminal (options?: MarkToTerminalOptions) {
    }
}
