import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    // 用户判断组件
    this.instanceType = 'Menu';
    this.state = {
      defaultActive: props.defaultActive,
      // dd
      openedMenu: props.defaultOpened ? props.defaultOpened.slice(0) : [],
      // 子菜单
      submenus: {},
    };
  }
  getChildContext() {
    return { component: this };
  }
  // 菜单选择事件
  handleSelect(index, menuItem) {
    let { defaultActive } = this.state;
    defaultActive = index;
    if (this.props.onSelect) {
      this.props.onSelect(index, menuItem);
    }
    this.setState({ defaultActive });
  }
  // 打开子菜单
  openMenu(index) {
    const { openedMenu } = this.state;
    if (openedMenu.indexOf(index) !== -1) return;
    openedMenu.push(index);
    this.setState({ openedMenu });
  }
  // 关闭子菜单
  closeMenu(index) {
    const { openedMenu } = this.state;
    openedMenu.splice(openedMenu.indexOf(index), 1);
    this.setState({ openedMenu });
  }
  // 点击子菜单的标题事件
  handleSubmenuClick(index) {
    const isOpened = this.state.openedMenu.indexOf(index) !== -1;

    if (isOpened) {
      this.closeMenu(index);
      if (this.props.onClose) {
        this.props.onClose(index);
      }
    } else {
      this.openMenu(index);
      if (this.props.onOpen) {
        this.props.onOpen(index);
      }
    }
  }
  render() {
    const { prefixCls, className, style, mode } = this.props;
    return (
      <ul
        style={style}
        className={this.classNames(className, `${prefixCls}`, {
          [`${prefixCls}-${mode}`]: mode,
        })}
      >
        {this.props.children}
      </ul>
    );
  }
}

Menu.childContextTypes = {
  component: PropTypes.any,
};

Menu.propTypes = {
  prefixCls: PropTypes.string,
  mode: PropTypes.string,
  defaultActive: PropTypes.string,
  onSelect: PropTypes.func,
};

Menu.defaultProps = {
  prefixCls: 'w-menu',
  mode: 'vertical',
};
