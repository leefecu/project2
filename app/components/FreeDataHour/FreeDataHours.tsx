import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import throttle from 'lodash/throttle';

import FreeDataHour from './FreeDataHour';

import { THROTTLING } from '../../constants/Shared';

import { noop } from '../../helpers/general';

import Styles from './FreeDataHours.styles';

interface Props {
  freeDataHours: Array<TFreeDataHour>;
  onSelectPack: (pack: TFreeDataHour) => void;
}

class FreeDataHours extends PureComponent<Props> {
  static defaultProps: Props = {
    freeDataHours: [],
    onSelectPack: noop,
  };

  handleSelectPackThrottled: Function;

  constructor(props: Props) {
    super(props);

    this.handleSelectPackThrottled = throttle(this.handleSelectPack, THROTTLING, {
      trailing: false,
    });
  }

  keyExtractor = (item: TFreeDataHour) => item.promoId;

  handleSelectPack = (item: TFreeDataHour) => {
    const { onSelectPack } = this.props;
    onSelectPack(item);
  };

  renderFreeDataHour = ({ item }: { item: TFreeDataHour }) => {
    return (
      <View style={Styles.packRow}>
        <FreeDataHour onStart={() => this.handleSelectPackThrottled(item)} title={item.title} />
      </View>
    );
  };

  render() {
    const { freeDataHours } = this.props;
    return (
      <FlatList
        data={freeDataHours}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderFreeDataHour}
      />
    );
  }
}

export default FreeDataHours;
