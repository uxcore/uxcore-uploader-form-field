/**
 * UploaderFormField Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

/* eslint import/no-extraneous-dependencies: off */

const React = require('react');
const Message = require('uxcore-message');
const Const = require('uxcore-const');
const Button = require('uxcore-button');
const Form = require('uxcore-form/build/Form');
const UploaderFormField = require('../src');

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: Const.MODE.EDIT,
    };
    this.fileList = [{
      response: {
        url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
        name: '测试用',
      },
    }, {
      response: {
        url: 'http://gtms02.alicdn.com/tps/i2/TB1Xe3SMpXXXXX6XpXXTCU0QpXX-300-300.jpg',
        name: '测试用2',
      },
    }];
  }

  handleModeChange() {
    const me = this;
    me.setState({
      mode: me.state.mode === Const.MODE.EDIT ? Const.MODE.VIEW : Const.MODE.EDIT,
    });
  }

  handleValueGet() {
    const me = this;
    console.log(me.form.getValues());
  }

  handleDataChange(field, data) {
    // standalone mode
    console.log(data);
  }

  render() {
    const me = this;
    const props = {
      required: true,
      multiple: true,
      autoPending: true,
      url: 'http://eternalsky.me:8122/file/upload',
      isOnlyImg: true,
      withCredentials: true,
      name: 'file',
      jsxlabel: 'form 中使用',
      jsxname: 'upload',
      onfileuploadcompleting: (rep) => {
        const data = rep.getJson();
        if (!data.success) {
          Message.error(data.errorMsg);
        }
      },
      onfileuploaderror: (file, error) => {
        Message.error(`${error.name} ${error.message}`);
      },
      onqueueerror(error) {
        if (/FileSizeError/.test(error.message)) {
          Message.error(`文件超过 ${props.sizeLimit} 上传失败`);
        } else if (/FileExtensionError/.test(error.message)) {
          Message.error('文件格式不正确，上传失败');
        } else {
          Message.error(`${error.name} ${error.message}`);
        }
      },
    };
    return (
      <div>
        <Form jsxmode={me.state.mode} ref={(c) => { me.form = c; return false; }} jsxvalues={{
          upload: this.fileList,
        }}>
          <UploaderFormField {...props} />
        </Form>
        <UploaderFormField {...props}
          jsxmode={this.state.mode}
          value={this.fileList}
          standalone
          jsxlabel={'单独使用'}
          handleDataChange={this.handleDataChange.bind(this)}
        />
        <Button onClick={me.handleValueGet.bind(me)}>获取数据</Button>
        <Button onClick={me.handleModeChange.bind(me)}>切换模式</Button>
      </div>
    );
  }
}

module.exports = Demo;
