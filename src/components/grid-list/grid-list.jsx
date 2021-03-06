import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { getGroupListByColumn } from '@/utils/index'
import './grid-list.scss'

/**
 * 参考 taro-ui的grid写了写了一个
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function GridList(props) {
  const { items = [], columnNum = 3, onClick } = props
  const groupList = getGroupListByColumn(items, columnNum)
  const handleClick = (item, index, row) => onClick(item, row * columnNum + index)

  return (
    <View className='grid-list'>
      {groupList.map((row) => {
        const { list } = row
        return (
          <View key={`row-${row.id}`} className='grid-list-row'>
            {list.map((item, idx) => {
              const { disabled, imageUrl, title = '', brief = '', icon = '' } = item

              const bodyClass = classNames('grid-list-item', {
                'grid-list-item--last': idx === columnNum - 1,
                'grid-list-item--active': !disabled,
                'grid-list-item--disabled': disabled,
              })

              const itemStyle = { flex: `0 0 ${100 / columnNum}%` }
              const actionTitle = `${title}${isNotEmpty(brief) ? '\n' + brief : ''}`

              return (
                <View
                  key={`item-${item.id}`}
                  className={bodyClass}
                  style={itemStyle}
                  onClick={handleClick.bind(this, item)}
                >
                  <View className='grid-list-item_icon'>
                    {isNotEmpty(imageUrl) ? (
                      <Image className='grid-list-item_icon-image' src={imageUrl} mode='scaleToFill' />
                    ) : (
                      <Text className={`iconfont iconfont-${icon}`} />
                    )}
                  </View>
                  <Text className='grid-list-item_title'>{actionTitle}</Text>
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}
