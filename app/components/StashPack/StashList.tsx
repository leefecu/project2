import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import throttle from 'lodash/throttle';

import StashPack from './StashPack';

import { THROTTLING } from '../../constants/Shared';

import { noop } from '../../helpers/general';

import Styles from './StashList.styles';

interface Props {
  stashes: Array<TStash>;
  onSelectStash: (stash: TStash) => void;
}

class StashList extends PureComponent<Props> {
  static defaultProps: Props = {
    stashes: [],
    onSelectStash: noop,
  };

  handleSelectStashThrottled: Function;

  constructor(props: Props) {
    super(props);

    this.handleSelectStashThrottled = throttle(this.handleSelectStash, THROTTLING, {
      trailing: false,
    });
  }

  keyExtractor = (item: TStash) => item.packetId;

  handleSelectStash = (item: TStash) => {
    const { onSelectStash } = this.props;
    onSelectStash(item);
  };

  renderStash = ({ item }: { item: TStash }) => {
    return (
      <View style={Styles.packRow}>
        <StashPack onPress={() => this.handleSelectStashThrottled(item)} {...item} />
      </View>
    );
  };

  render() {
    const { stashes } = this.props;
    return (
      <FlatList data={stashes} keyExtractor={this.keyExtractor} renderItem={this.renderStash} />
    );
  }
}

export default StashList;
