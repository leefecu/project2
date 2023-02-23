import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import throttle from 'lodash/throttle';

import TimePack from './TimePack';

import { THROTTLING } from '../../constants/Shared';

import { noop } from '../../helpers/general';

import Styles from './TimePacks.styles';

interface Props {
  balance: number;
  disableOnBalance: boolean;
  onSelectPack: (pack: TTimePack, lowBalance: boolean) => void;
  packs: Array<TTimePack>;
}

class TimePacks extends PureComponent<Props> {
  static defaultProps: Props = {
    balance: 0,
    disableOnBalance: false,
    onSelectPack: noop,
    packs: [],
  };

  handleSelectPackThrottled: Function;

  constructor(props: Props) {
    super(props);

    this.handleSelectPackThrottled = throttle(this.handleSelectPack, THROTTLING, {
      trailing: false,
    });
  }

  disabled = (pack: TTimePack): boolean => pack.disabled || this.lowBalance(pack);

  handleSelectPack = (item: TTimePack, lowBalance: boolean) => {
    const { onSelectPack } = this.props;
    onSelectPack(item, lowBalance);
  };

  lowBalance = (pack: TTimePack): boolean => {
    const { balance, disableOnBalance } = this.props;
    return disableOnBalance && balance < pack.price;
  };

  keyExtractor = (item: TTimePack) => item.packetId;

  renderPack = ({ item }: { item: TTimePack }) => {
    return (
      <View style={Styles.packRow}>
        <TimePack
          onPress={() => this.handleSelectPackThrottled(item, this.lowBalance(item))}
          {...item}
          disabled={this.disabled(item)}
        />
      </View>
    );
  };

  render() {
    const { packs } = this.props;
    return <FlatList data={packs} keyExtractor={this.keyExtractor} renderItem={this.renderPack} />;
  }
}

export default TimePacks;
