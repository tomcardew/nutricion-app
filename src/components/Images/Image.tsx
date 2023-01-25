import React from 'react'
import { StyleProp } from 'react-native'
import FastImage, { Source, ImageStyle } from 'react-native-fast-image'

interface Props {
    style?: StyleProp<ImageStyle>,
    source?: number | Source | undefined
}

const Image = (props: Props) => {
    return (
        <FastImage {...props} />
    )
}

export default Image;