import * as React from 'react';
import {cx, applyCommonProps} from '../common';
import {Button} from '../Button';
import {Alert} from '../Alert';
import {Checkbox} from '../Checkbox';
import {TextField} from '../TextField';
import './WCPSignatureCapture.css';

export type WCPSignatureCaptureVariant = 'trigger' | 'terms' | 'base' | 'reauth';

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zM3.032 11.032l-.178.178a.5.5 0 0 0-.11.168l-1.5 3.75 3.75-1.5a.5.5 0 0 0 .168-.11l.178-.178H5a.5.5 0 0 1-.5-.5V12.5h-.5A.5.5 0 0 1 3.5 12v-.5h-.468z" fill="currentColor"/>
  </svg>
);

