import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';

import { gerFormatedRemainingTime } from '../../helpers/format';

import Styles from './Timer.styles';

export enum LINE_CAP {
  BUTT = 'butt',
  SQUARE = 'square',
  ROUND = 'round',
}

export enum LINE_JOIN {
  MITER = 'miter',
  BEVEL = 'bevel',
  ROUND = 'round',
}

interface TTimer {
  arcSweepAngle: number;
  backgroundColor?: string;
  backgroundWidth?: number;
  fill: number;
  lineCap?: LINE_CAP;
  lineJoin?: LINE_JOIN;
  rotation?: number;
  size: number;
  timeRemaining: number;
  tintColor?: string;
  width: number;
}

interface TCartesian {
  x: number;
  y: number;
}

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): TCartesian => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const getCirclePath = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const start = polarToCartesian(x, y, radius, endAngle * 0.9999);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
  return d.join(' ');
};

const clampFill = (fill: number): number => Math.min(100, Math.max(0, fill));

class Timer extends PureComponent<TTimer> {
  static defaultProps = {
    tintColor: 'black',
    rotation: 90,
    lineCap: LINE_CAP.ROUND,
    lineJoin: LINE_JOIN.ROUND,
    arcSweepAngle: 360,
  };

  render() {
    const {
      arcSweepAngle,
      backgroundColor,
      backgroundWidth,
      fill,
      lineCap,
      lineJoin,
      rotation,
      size,
      timeRemaining,
      tintColor,
      width,
    } = this.props;
    const maxWidthCircle = backgroundWidth ? Math.max(width, backgroundWidth) : width;

    const backgroundPath = getCirclePath(
      size / 2,
      size / 2,
      size / 2 - maxWidthCircle / 2,
      0,
      arcSweepAngle,
    );
    const circlePath = getCirclePath(
      size / 2,
      size / 2,
      size / 2 - maxWidthCircle / 2,
      0,
      (arcSweepAngle * clampFill(fill)) / 100,
    );
    const offset = size - width * 3;

    const localChildrenContainerStyle = {
      left: maxWidthCircle + width / 2,
      top: maxWidthCircle + width / 2,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
    };
    return (
      <View style={Styles.container}>
        <Svg width={size} height={size} style={Styles.svgContainer}>
          <G rotation={rotation} originX={size / 2} originY={size / 2}>
            {backgroundColor && (
              <Path
                d={backgroundPath}
                stroke={backgroundColor}
                strokeWidth={backgroundWidth || width}
                strokeLinecap={lineCap}
                fill="transparent"
              />
            )}
            {fill > 0 && (
              <Path
                d={circlePath}
                stroke={tintColor}
                strokeWidth={width}
                strokeLinecap={lineCap}
                strokeLinejoin={lineJoin}
                fill="transparent"
              />
            )}
          </G>
        </Svg>
        <View style={[Styles.clockContainer, localChildrenContainerStyle]}>
          <Text style={Styles.timeLabel}>TIME LEFT:</Text>
          <Text style={Styles.time}>{gerFormatedRemainingTime(timeRemaining)}</Text>
        </View>
      </View>
    );
  }
}

export default Timer;
