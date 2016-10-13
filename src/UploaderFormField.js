/**
 * UploaderFormField Component for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

const React = require('react');
const classnames = require('classnames');
const Uploader = require('uxcore-uploader');
const FormField = require('uxcore-form-field');
const assign = require('object-assign');

Uploader.setSWF('/FlashPicker.swf');

class UploaderFormField extends FormField {

  handleChange(value) {
    this.handleDataChange(value);
  }

  addSpecificClass() {
    if (this.props.jsxprefixCls === 'kuma-uxform-field') {
      return classnames({
        [this.props.jsxprefixCls]: !!this.props.jsxprefixCls,
      }, 'kuma-upload-uxform-field');
    }
    return this.props.jsxprefixCls;
  }

  renderField() {
    return (
      <Uploader {...this.props}
        fileList={this.state.value}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

UploaderFormField.propTypes = assign(FormField.propTypes, {
});

UploaderFormField.defaultProps = assign(FormField.defaultProps, {
});

UploaderFormField.displayName = 'UploaderFormField';

module.exports = UploaderFormField;
