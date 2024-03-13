import classNames, { Argument } from 'classnames'
import { Component } from 'react'

export { default as Icons } from '@/assets/icons/iconlyData.json'

import styles from './Icon.module.scss'

export type SizeType = number | [number, number]

interface Props {
    icon: IconType
    className?: Argument
    size?: SizeType
}

interface ParsedIcon {
    icon: string
    size: number[]
}

export interface IconType {
    name: string
    svgs: IconData[]
}

export interface IconData {
    size: [number, number]
    sourcePath: string
    fileData: string
}

function parseInputWidth(size?: SizeType) {
    if (Array.isArray(size)) {
        return size[0]
    }
    return size
}

function parseInputHeight(size?: SizeType) {
    if (Array.isArray(size)) {
        return size[1]
    }
    return size
}

export class Icon extends Component<Props> {
    private width?: number = parseInputWidth(this.props.size)
    private height?: number = parseInputHeight(this.props.size)

    public render() {
        const { icon, size } = this.getBestFitIcon()

        return (
            <i
                className={classNames(styles.i, this.props.className)}
                style={this.getIconStyles(size)}
                dangerouslySetInnerHTML={{
                    __html: icon,
                }}
            />
        )
    }

    private getIconStyles(size: number[]) {
        return {
            width: this.width ? this.width : size[0],
            height: this.height ? this.height : size[1],
        }
    }

    private getBestFitIcon(): ParsedIcon {
        const { icon } = this.props
        const sortedIcons = icon.svgs.slice().sort((a: IconData, b: IconData) => {
            return a.size[0] - b.size[0]
        })

        // Try to find (square) size match
        const bestFitIconArray = sortedIcons.filter((svg: IconData) => {
            return this.width === svg.size[0]
        })
        let bestFitIcon = bestFitIconArray[0]

        // Else we try to find the largest but not larger
        const { width } = this
        if (!bestFitIcon && width) {
            icon.svgs.forEach((svg: IconData) => {
                if (svg.size[0] <= width) {
                    bestFitIcon = svg
                }
            })
        }

        // Else just return the first we have (probably the only one)
        // This will allow for usage of larger icons should you choose a size under the minimum size
        if (!bestFitIcon) {
            bestFitIcon = icon.svgs[0]
        }

        return {
            size: bestFitIcon.size,
            icon: bestFitIcon.fileData,
        }
    }
}
