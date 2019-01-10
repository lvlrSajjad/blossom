/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,global-require,prefer-template,react/prop-types,react/destructuring-assignment */
// @flow
import React, { Component } from 'react';

const fixPath = require('fix-path');

fixPath();

type Props = {
  setFolderPath(folderPath: string): void
};

export default class Home extends Component<Props> {
  props: Props;

  listFiles = (path) => {
    const { remote } = require('electron');
    remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (folderPath) => {
      if (folderPath === undefined) {
        console.log('No file selected');
        return;
      }
      if (path === '/Opened') {
        console.log('opened');
      } else {
        this.props.setFolderPath(folderPath);
        this.props.history.push(path);
      }
    });
  };

  render() {
    return (
      <div style={{ height: 710 }}>
        <div className="toolbar" style={{
          display: 'flex',flexDirection: 'row', width: '98%', height: 24, textAlign: 'right', justifyContent: 'right'
        }}>
          <div style={{ flex: 1 }}/>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().minimize();
          }}>
            <i style={{ marginRight: 8, color:'#f44336' }} className="fa fa-minus"/>
          </a>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().close();
          }}>
            <i style={{ marginRight: 16, color:'#f44336' }} className="fa fa-times"/>
          </a>
        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <img alt='logo' width='100%' src={require('../../resources/logo.png')}/>
        </div>
        <ul style={{ width: '80%', padding: 0, paddingLeft: 16 }}>

          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i style={{ color:'#f44336' }} className="fa fa-fire fa-1x no-drag"/>
            <a style={{ fontSize: 16, color:'#f44336'  }} onClick={() => this.listFiles('/new/options')}> New Bud </a>

          </li>
          <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
            <i style={{ color:'#f44336' }} className="fa fa-folder-open fa-1x no-drag"/>
            <a style={{ fontSize: 16, color:'#f44336'  }}> Open Bud </a>
          </li>
        </ul>
      </div>
    );
  }

}
