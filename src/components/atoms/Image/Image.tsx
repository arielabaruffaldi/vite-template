/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Fragment, FunctionComponent, Suspense, useEffect, useState } from 'react'

import classNames, { Argument } from 'classnames'

export interface Props {
    className?: Argument
    alt: string
    fileName: string
}

type SupportedType = 'webp' | 'jp2' | 'main'
const SupportedTypes: SupportedType[] = ['jp2', 'webp']

export const Image: FunctionComponent<Props> = ({ className, fileName, alt }) => {
    const [images, setImages] = useState<Map<SupportedType, any>>()

    useEffect(() => {
        void (async function loadImages() {
            const parts: string[] = fileName.split('.')

            const tasks = SupportedTypes.map(ex =>
                import(`@/assets/visuals/${ex}/${parts[0]}.${ex}`).then(image => {
                    return { ex, image: image.default }
                })
            ).concat(
                import(`@/assets/visuals/${fileName}`).then<{ ex: SupportedType; image: any }>(image => {
                    return { ex: 'main', image: image.default }
                })
            )

            const result = await Promise.all(tasks)

            const images = new Map()

            result.forEach(image => {
                images.set(image.ex, image.image)
            })

            setImages(images)
        })()
    }, [fileName])

    return (
        <Suspense>
            <picture>
                {images && (
                    <Fragment>
                        <source type="image/webp" srcSet={images.get('webp')} />
                        <source type="image/jp2" srcSet={images.get('jp2')} />
                        <img className={classNames(className)} src={images.get('main')} alt={alt} />
                    </Fragment>
                )}
            </picture>
        </Suspense>
    )
}
