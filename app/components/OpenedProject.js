/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/prop-types */
/* eslint-disable global-require */

// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import routes from '../constants/routes';
import Autocomplete from 'react-autocomplete';

const childProcess = require('child_process');

// const nonWindowsPlatforms = ['aix',
//   'darwin',
//   'freebsd',
//   'linux',
//   'openbsd',
//   'sunos'];

type Props = {
  folderPath: string
};

export default class NewProject extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      stdout: '',
      stderr: '',
      error: '',
      name: '',
      isLoading: false,
      packageInstallMode: false,
      savePackage: false,
      devPackage: false
      //     drive: nonWindowsPlatforms.includes(process.platform) ? ' ' : ' /D '
    };
  }


  openConsole = () => {
    const {
      folderPath
    } = this.props;

    const os = process.platform;

    if (os === 'win32') {
      childProcess.exec(`start cmd.exe /K cd /D ${folderPath}`);
    } else if (os === 'freebsd' || os === 'linux' || os === 'openbsd') {
      console.log('todo');
    } else if (os === 'darwin') {
      childProcess.spawn('open', ['-a', 'Terminal', folderPath]);
    }
  };

  openNPMPackageInstaller = () => {
    this.setState({ packageInstallMode: true });
  };

  openGithub = () => {
    this.executeCommand(`github`);
  };

  openAtom = () => {
    const {
      folderPath
    } = this.props;
    this.executeCommand(`atom ${folderPath}`);
  };

  cleanGradle = () => {
    const isWin = process.platform === 'win32';
    if (isWin) {
      this.executeCommand(`cd android && gradlew clean`);
    } else {
      this.executeCommand(`cd android && ./gradlew clean`);
    }
  };

  runIos = () => {
    this.executeCommand(`react-native run-ios`);
  };

  runAndroid = () => {
    this.executeCommand(`react-native run-android`);
  };

  generateComponent = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g component ${name}`);
    }
  };

  generateSimpleContainer = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name} --containerType=simple`);
    }
  };

  generateBottomTabbedContainer = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=bottom`);
    }
  };

  generateTopTabbedComponent = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=top`);
    }
  };

  generateDrawerNavigationContainer = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=drawer`);
    }
  };

  generateCollapsibleToolbarContainer = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=collapsible`);
    }
  };

  generateBackdropContainer = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=backdrop`);
    }
  };

  generateCollapsibleDrawerContianer = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=collapsibledrawer`);
    }
  };

  generateSimpleLogin = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=login`);
    }
  };

  generateSmsLogin = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}  --containerType=smslogin`);
    }
  };

  generateRedux = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g redux ${name}`);
    }
  };

  generateSaga = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g saga ${name}`);
    }
  };

  generateScreen = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g screen ${name}`);
    }
  };

  generateList = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g list ${name} --type=Row --codeType=flatlist --dataType=Single`);
    }
  };

  generateSectionedList = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g list ${name} --type=Row --codeType=flatlist --dataType=Sectioned`);
    }
  };

  generateGridList = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g list ${name} --type=Grid --codeType=flatlist  --dataType=Single`);
    }
  };

  generateSectionedGridList = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g list ${name} --type=Grid --codeType=flatlist  --dataType=Sectioned`);
    }
  };

  addMaps = () => {
    this.executeCommand(`ignite add maps`);
  };

  addMapBox = () => {
    this.executeCommand(`ignite add mapbox`);
  };

  addi18n = () => {
    this.executeCommand(`ignite add i18n`);
  };

  addVectorIcons = () => {
    this.executeCommand(`ignite add vector-icons`);
  };

  addMaterialUi = () => {
    this.executeCommand(`ignite add material-ui`);
  };

  generateContainer = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g container ${name}`);
    }
  };

  executeCommand = (command) => {

    const {
      folderPath
    } = this.props;

    const {
      isLoading
    } = this.state;

    if (!isLoading) {
      this.setState({ isLoading: true }, () => {
        childProcess.exec(command, {
          shell: true,
          cwd: folderPath
        }, (error, stdout, stderr) => {
          this.setState({ stdout, stderr, error, name: '', isLoading: false });
        });
      });
    }
  };

  render() {

    const {
      boilerplate,
      history
    } = this.props;

    const {
      isLoading,
      name,
      stdout,
      stderr,
      error,
      packageInstallMode,
      savePackage,
      devPackage
    } = this.state;

    return (
      <div style={{ height: 710 }}>
        <div className="toolbar" style={{
          display: 'flex',
          flexDirection: 'row',
          width: '98%',
          height: 24,
          textAlign: 'right',
          justifyContent: 'right'
        }}>
          <a className="no-drag"
             onClick={() => packageInstallMode ? this.setState({ packageInstallMode: false }) : history.push('/')}>
            <i style={{ marginLeft: 6, height: 24 }} className="fa fa-arrow-left"/>
          </a>
          <div style={{ flex: 1 }}/>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().minimize();
          }}>
            <i style={{ marginRight: 8 }} className="fa fa-minus"/>
          </a>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().close();
          }}>
            <i style={{ marginRight: 16 }} className="fa fa-times"/>
          </a>
        </div>
        
        {packageInstallMode ?
          <Autocomplete
            wrapperStyle={{ width: '100%' }}
            onChange={(event) => this.setState({ name: event.target.value })}
            value={name}
            getItemValue={(item) => item.label}
            placeholder="Package Name ..."
            items={[
              { label: 'apple' },
              { label: 'banana' },
              { label: 'pear' }
            ]}
            renderMenu={(items)=><div style={{
              background: '#212121',
              zIndex: 999,
              position: 'absolute',
              padding: 8,
              width:405,
              borderBottomRightRadius: 4,
              borderBottomLeftRadius: 4
            }} children={items}/>}
            renderItem={(item, isHighlighted) =>
              <div style={{ background: '#212121' }}>
                {item.label}
              </div>
            }
            renderInput={(props) => <input
              {...props}
              placeholder="Component/Container name ..."
              style={{
                color: 'white',
                height: 32,
                width: '100%',
                backgroundColor: 'transparent',
                borderWidth: 0,
                borderBottomWidth: 2,
                alignSelf: 'center',
                borderBottomColor: 'white'
              }}/>
            }/>
          :
          <input
            value={name}
            onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
            placeholder="Component/Container name ..."
            style={{
              color: 'white',
              height: 32,
              width: '100%',
              backgroundColor: 'transparent',
              borderWidth: 0,
              borderBottomWidth: 2,
              alignSelf: 'center',
              borderBottomColor: 'white'
            }}/>
        }
        {packageInstallMode ?
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', height: 492 }}>
            <ul style={{ width: '100%' }}>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <label className="switch">
                  <input onChange={(e) => {
                    this.setState({ savePackage: e.target.value });
                  }} checked={savePackage} type="checkbox"/>
                  <span className="slider round"/>
                </label>
                <a style={{ fontSize: 16 }}> Save </a>

              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <label className="switch">
                  <input onChange={(e) => {
                    this.setState({ devPackage: e.target.value });
                  }} checked={devPackage} type="checkbox"/>
                  <span className="slider round"/>
                </label>
                <a style={{ fontSize: 16 }}> Dev </a>
              </li>
            </ul>
            <a
              onClick={() => {
                if (name.length > 0) {
                  this.executeCommand(`npm install ${name} ${savePackage ? ' --save' : ''}${devPackage ? ' -dev' : ''}`);
                }
              }}
              style={{
                color: '#212121',
                backgroundColor: '#eeeeee',
                padding: 8,
                alignItems: 'stretch', justifyContent: 'center',
                borderRadius: 16,
                fontSize: 16,
                textAlign: 'center',
                width: '95%'
              }}>
              <b style={{ alignSelf: 'center' }}>Install Package</b>
            </a>
          </div>
          :
          <div style={{ overflow: 'scroll', height: 492 }}>


            {(boilerplate === 'andross') &&
            <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-play fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.runAndroid()}> Run Android </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-play fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.runIos()}> Run IOS </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-broom fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.cleanGradle()}> Clean Gradle </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-atom fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openAtom()}> Open In Atom </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fab fa-github fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openGithub()}> Open In Github Desktop </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-terminal fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openConsole()
                }> Open In Console </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fab fa-npm fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openNPMPackageInstaller()
                }> Npm Package Installer </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateComponent(name)}> New Component </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateContainer(name)}> New
                  Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateRedux(name)}> New Redux </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSaga(name)}> New Saga </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateScreen(name)}> New Screen </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-list fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateList(name)}> New List </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-list fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSectionedList(name)}> New Sectioned List </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-th fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateGridList(name)}> New Grid </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-th fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSectionedGridList(name)}> New Sectioned
                  Grid </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMaps()}> Add Maps </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMapBox()}> Add MapBox </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addi18n()}> Add i18n </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addVectorIcons()}> Add Vector Icons </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMaterialUi()}> Add Material Ui </a>
              </li>
              {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
              {/* <i className="fa fa-fire fa-1x no-drag"/> */}
              {/* <Link style={{ fontSize: 16 }} to="/opened"> New List </Link> */}

              {/* </li> */}
              {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
              {/* <i className="fa fa-fire fa-1x no-drag"/> */}
              {/* <Link style={{ fontSize: 16 }} to="/opened"> New Map </Link> */}
              {/* </li> */}
            </ul>
            }
            {(boilerplate === 'ts_andross') &&
            <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-play fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.runAndroid()}> Run Android </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-play fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.runIos()}> Run IOS </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-broom fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.cleanGradle()}> Clean Gradle </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-atom fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openAtom()}> Open In Atom </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fab fa-github fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openGithub()}> Open In Github Desktop </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-terminal fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openConsole()
                }> Open In Console </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fab fa-npm fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openNPMPackageInstaller()
                }> Npm Package Installer </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateComponent(name)}> New Component </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSimpleContainer(name)}> Simple Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateBottomTabbedContainer(name)}> Bottom Tabbed
                  Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateTopTabbedComponent(name)}> Top Tabbed
                  Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateDrawerNavigationContainer(name)}> Drawer
                  Navigation
                  Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateCollapsibleToolbarContainer(name)}> Collapsible
                  Toolbar
                  Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateBackdropContainer(name)}> Backdrop
                  Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }}
                   onClick={() => this.generateCollapsibleDrawerContianer(name)}> Collapsible/Drawer
                  Container </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateRedux(name)}> New Redux </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSaga(name)}> New Saga </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSimpleLogin(name)}> New Simple Login </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSmsLogin(name)}> New Sms Login </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateScreen(name)}> New Screen </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-list fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateList(name)}> New List </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-list fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSectionedList(name)}> New Sectioned List </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-th fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateGridList(name)}> New Grid </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-th fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateSectionedGridList(name)}> New Sectioned
                  Grid </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMaps()}> Add Maps </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMapBox()}> Add MapBox </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addi18n()}> Add i18n </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addVectorIcons()}> Add Vector Icons </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMaterialUi()}> Add Material Ui </a>
              </li>
              {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
              {/* <i className="fa fa-fire fa-1x no-drag"/> */}
              {/* <Link style={{ fontSize: 16 }} to="/opened"> New List </Link> */}

              {/* </li> */}
              {/* <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}> */}
              {/* <i className="fa fa-fire fa-1x no-drag"/> */}
              {/* <Link style={{ fontSize: 16 }} to="/opened"> New Map </Link> */}
              {/* </li> */}


            </ul>
            }
            {boilerplate === 'bowser' &&
            <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-play fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.runAndroid()}> Run Android </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-play fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.runIos()}> Run IOS </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-broom fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.cleanGradle()}> Clean Gradle </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-atom fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openAtom()}> Open In Atom </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fab fa-github fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openGithub()}> Open In Github Desktop </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fas fa-terminal fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openConsole()
                }> Open In Console </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fab fa-npm fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.openNPMPackageInstaller()
                }> Npm Package Installer </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateBowserComponent(name)}> New Component </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateBowserSharedComponent(name)}> New Shared
                  Component </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateBowserModel(name)}> New Model </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-fire fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.generateBowserScreen(name)}> New Screen </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMaps()}> Add Maps </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMapBox()}> Add MapBox </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addi18n()}> Add i18n </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addVectorIcons()}> Add Vector Icons </a>
              </li>
              <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
                <i className="fa fa-plus fa-1x no-drag"/>
                <a style={{ fontSize: 16 }} onClick={() => this.addMaterialUi()}> Add Material Ui </a>
              </li>
            </ul>
            }
            {(stdout !== null && stdout !== undefined && stdout.length > 0) &&
            <div style={{ flex: 1 }}>
          <textarea wrap='off' rows={18} disabled style={{
            resize: 'none',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'white',
            fontSize: 14,
            width: '100%',
            maxWidth: '100%'
          }} value={`${stdout}\n${stderr}\n${error}`}/>
            </div>
            }
            {isLoading &&
            <div style={{ alignItems: 'center', justifyContent: 'center' }}
                 className='blurredOverlay'>
              <ReactLoading className="fa" type='bars' color='#f44336'/>
            </div>
            }
          </div>
        }
      </div>
    );
  }


  generateBowserComponent = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g component ${name}  --folder views`);
    }
  };

  generateBowserSharedComponent = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g component ${name}  --folder shared`);
    }
  };

  generateBowserModel = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g model ${name}  --folder models`);
    }
  };

  generateBowserScreen = (name) => {
    if (name.length > 0) {
      this.executeCommand(`ignite g screen ${name}  --folder views`);
    }
  };
}
