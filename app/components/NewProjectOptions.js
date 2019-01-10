/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/prop-types,prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable global-require */

// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
// import styles from './OpenedProject.css';
import routes from '../constants/routes';

const childProcess = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

// const nonWindowsPlatforms = ['aix',
//   'darwin',
//   'freebsd',
//   'linux',
//   'openbsd',
//   'sunos'];
type Props = {
  folderPath: string
};

export default class NewProjectOptions extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      stdout: '',
      stderr: '',
      error: '',
      name: '',
      isLoading: false,
      SqlRest: false,
      react: false,
      vue: false

      //     drive:nonWindowsPlatforms.includes(process.platform) ? ' ':' /D '
    };
  }

  executeCommand = (command) => {

    const {
      folderPath
    } = this.props;

    const {
      isLoading,
      name,
      SqlRest
    } = this.state;

    let path;

    const isWin = process.platform === 'win32';
    if (isWin) {
      path = folderPath + '\\' + name;
    } else {
      path = folderPath + '/' + name;
    }
    if (fs.existsSync(path)) {
      const { remote } = require('electron');
      const choice = remote.dialog.showMessageBox(
        remote.getCurrentWindow(),
        {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'A Project With The Same Name Exists Do You Want Replace The Previous Project ?'
        });

      if (choice === 0) {
        if (!isLoading) {
          this.setState({ isLoading: true }, () => {
            const rimraf = require('rimraf');
            rimraf(path, () => {
              childProcess.exec(command, {
                shell: true,
                cwd: folderPath
              }, (error, stdout, stderr) => {
                this.setState({ stdout, stderr, error, name: '', isLoading: false });
              });
            });
          });
        }
      }
    } else if (!isLoading) {
      this.setState({ isLoading: true }, () => {
        childProcess.exec(command, {
          shell: true,
          cwd: folderPath
        }, (error, stdout, stderr) => {
          const repoName = 'java-spring-rest-mysql-boilerplate';
          const tempPath = path + '\\' + repoName + '\\';
          const plainPath = tempPath + 'Plain';
          const restSqlPath = tempPath + 'SqlRest';
          ncp(plainPath, path, (err) => {
            if (err) {
              return console.error(err);
            }
            if (SqlRest === true) {
              ncp(restSqlPath, path, (e) => {
                if (e) {
                  return console.error(e);
                }
                rimraf(path + '\\' + repoName, () => {
                  this.setState({ stdout, stderr, error, name: '', isLoading: true }, () => {
                    childProcess.exec('gradlew build', {
                      shell: true,
                      cwd: path
                    }, (errors, sout, sterr) => {
                      this.setState({ stdout:sout, stderr:sterr, error:errors, name: '', isLoading: false });
                    });
                  });
                });
              });
            } else {
              rimraf(path + '\\' + repoName, () => {
                this.setState({ stdout, stderr, error, name: '', isLoading: true }, () => {
                  childProcess.exec('gradlew build', {
                    shell: true,
                    cwd: path
                  }, (errors, sout, sterr) => {
                    this.setState({ stdout:sout, stderr:sterr, error:errors, name: '', isLoading: false });
                  });
                });
              });
            }
          });
        });
      });
    }
  };

  render() {
    const {
      stdout,
      stderr,
      error,
      name,
      isLoading,
      SqlRest,
      react,
      vue

    } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 710 }}>
        <div className="toolbar" style={{
          display: 'flex',
          flexDirection: 'row',
          width: '98%',
          height: 24,
          textAlign: 'right',
          justifyContent: 'right'
        }}>
          <Link className="no-drag" to={routes.HOME}>
            <i style={{ marginLeft: 6, height: 24, color: '#f44336' }} className="fa fa-arrow-left"/>
          </Link>
          <div style={{ flex: 1 }}/>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().minimize();
          }}>
            <i style={{ marginRight: 8, color: '#f44336' }} className="fa fa-minus"/>
          </a>
          <a className='no-drag' onClick={() => {
            const { remote } = window.require('electron');
            remote.getCurrentWindow().close();
          }}>
            <i style={{ marginRight: 16, color: '#f44336' }} className="fa fa-times"/>
          </a>

        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <img alt='logo' width='100%' src={require('../../resources/logo.png')}/>
        </div>

        <input value={name}
               onChange={(event) => this.setState({ name: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) })}
               placeholder="Project's name ..." style={{
          color: '#f44336',
          height: 32,
          width: '100%',
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 2,
          borderBottomColor: '#f44336'
        }}/>

        <div style={{ height: 360 }}>
          <ul style={{ width: '92%', padding: 0, paddingLeft: 16 }}>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={() => {
                  this.setState({ SqlRest: !SqlRest });
                }} checked={SqlRest} type="checkbox"/>
                <span className="slider round"/>
              </label>
              <a style={{ fontSize: 16, color: '#f44336' }}> mySql & Rest</a>

            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={(e) => {
                  this.setState({ react: e.target.react });
                }} checked={react} type="checkbox"/>
                <span className="slider round"/>

              </label>
              <a style={{ fontSize: 16, color: '#f44336' }}> React</a>

            </li>
            <li style={{ alignItems: 'left', textAlign: 'left', marginBottom: 16 }}>
              <label className="switch">
                <input onChange={(e) => {
                  this.setState({ vue: e.target.vue });
                }} checked={vue} type="checkbox"/>
                <span className="slider round"/>

              </label>
              <a style={{ fontSize: 16, color: '#f44336' }}> Vue</a>

            </li>


            <li style={{ display: 'flex', paddingTop: 16 }}>
              <a
                onClick={() => {
                  if (name.length > 0) {
                    const path = this.props.folderPath + '\\' + name;
                    const repoName = 'java-spring-rest-mysql-boilerplate';
                    const tempPath = path + '\\' + repoName + '\\';
                    const plainPath = tempPath + 'Plain';
                    const restSqlPath = tempPath + 'SqlRest';
                    console.log('command', `mkdir ${name} && cd ${name} && git clone https://github.com/Esperlos/${repoName}.git && xcopy ${plainPath} ${path} /E /V /F /H /N ${SqlRest ? `&& xcopy ${path} ${restSqlPath} ${path} /E /V /F /H /N` : ''} && rm dir ${tempPath}`);
                    this.executeCommand(`mkdir ${name} && cd ${name} && git clone https://github.com/Esperlos/${repoName}.git`);

                  }
                }}
                style={{
                  flex: 1,
                  color: 'white',
                  backgroundColor: '#f44336',
                  padding: 8,
                  alignItems: 'stretch', justifyContent: 'center',
                  borderRadius: 16,
                  fontSize: 16,
                  textAlign: 'center'
                }}>
                {!isLoading ?
                  <b style={{ alignSelf: 'center' }}>Create New Cherry Garden</b>
                  :
                  <ReactLoading className="fa" type='bars' color='white' height={16} width={20}/>
                }
              </a>
            </li>
          </ul>


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
        </div>
      </div>
    );
  }
}
